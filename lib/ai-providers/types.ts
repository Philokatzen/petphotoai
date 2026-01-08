/**
 * AI Provider 抽象接口
 * 定义所有 AI 提供商必须实现的标准方法
 */

// 宠物元数据
export interface PetMeta {
  name: string;
  type: 'cat' | 'dog' | 'other';
  breed?: string;
  coatColor?: string;
  gender?: string;
}

// 训练结果
export interface TrainingResult {
  providerModelId: string;
  status: 'pending' | 'training' | 'ready' | 'failed';
  estimatedTime?: number; // 预计完成时间（秒）
}

// 训练状态
export interface TrainingStatus {
  status: 'pending' | 'training' | 'ready' | 'failed';
  progress?: number; // 0-100
  error?: string;
}

// 图片生成参数
export interface GenerationParams {
  photoPackId?: string;
  basePrompt?: string;
  numImages?: number;
  width?: number;
  height?: number;
  imageStrength?: number; // 0-1, 原图影响力
  cfgScale?: number; // 1-35, 提示词相关性
  steps?: number; // 10-50, 生成步数
  seed?: number;
}

// 图片生成结果
export interface GenerationResult {
  images: GeneratedImage[];
  status: 'completed' | 'failed';
  error?: string;
}

export interface GeneratedImage {
  url: string; // 图片 URL
  base64?: string; // base64 数据（可选）
  seed?: number;
}

// 重试配置
export interface RetryConfig {
  maxAttempts: number;
  initialDelay: number; // ms
  maxDelay: number; // ms
  backoffMultiplier: number;
  timeout: number; // ms
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  timeout: 120000, // 2 分钟
};

/**
 * AI Provider 抽象类
 */
export abstract class AIProvider {
  protected retryConfig: RetryConfig;

  constructor(retryConfig?: Partial<RetryConfig>) {
    this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  }

  /**
   * 启动宠物训练
   * @param petImages - 宠物照片 URL 列表（或 base64）
   * @param petMeta - 宠物元数据
   * @returns 训练任务信息
   */
  abstract startPetTraining(
    petImages: string[],
    petMeta: PetMeta
  ): Promise<TrainingResult>;

  /**
   * 获取训练状态
   * @param providerModelId - 提供商模型 ID
   * @returns 训练状态
   */
  abstract getTrainingStatus(providerModelId: string): Promise<TrainingStatus>;

  /**
   * 生成宠物图片
   * @param providerModelId - 训练好的模型 ID
   * @param referenceImages - 参考���片数组（可选）
   * @param params - 生成参数
   * @returns 生成结果
   */
  abstract generatePetImages(
    providerModelId: string,
    referenceImages?: string[],
    params?: GenerationParams
  ): Promise<GenerationResult>;

  /**
   * 工具方法：带重试的请求
   */
  protected async fetchWithRetry<T>(
    url: string,
    options?: RequestInit,
    customRetryConfig?: Partial<RetryConfig>
  ): Promise<T> {
    const config = { ...this.retryConfig, ...customRetryConfig };
    let lastError: Error | null = null;
    let delay = config.initialDelay;

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.timeout);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: response.statusText }));
          throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        return await response.json();
      } catch (error: any) {
        lastError = error;

        if (error.name === 'AbortError') {
          console.warn(`请求超时 (尝试 ${attempt}/${config.maxAttempts})`);
        } else {
          console.warn(`请求失败 (尝试 ${attempt}/${config.maxAttempts}):`, error.message);
        }

        if (attempt < config.maxAttempts) {
          await this.sleep(delay);
          delay = Math.min(delay * config.backoffMultiplier, config.maxDelay);
        }
      }
    }

    throw lastError || new Error('请求失败');
  }

  /**
   * 工具方法：延迟
   */
  protected sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * 获取 Provider 名称
   */
  abstract getProviderName(): string;
}
