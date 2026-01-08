/**
 * AI Provider 工厂和实例管理
 */

import { AIProvider } from './types';
import { StabilityAIProvider } from './stability';

export type SupportedProvider = 'stability' | 'replicate';

// Provider 配置
export interface ProviderConfig {
  provider: SupportedProvider;
  apiKey: string;
  retryConfig?: {
    maxAttempts?: number;
    initialDelay?: number;
    maxDelay?: number;
    timeout?: number;
  };
}

/**
 * 创建 AI Provider 实例
 */
export function createAIProvider(config: ProviderConfig): AIProvider {
  switch (config.provider) {
    case 'stability':
      return new StabilityAIProvider(config.apiKey, config.retryConfig);

    case 'replicate':
      // 预留 Replicate Provider
      throw new Error('Replicate provider 尚未实现');

    default:
      throw new Error(`不支持的 provider: ${config.provider}`);
  }
}

/**
 * 从环境变量获取默认 Provider
 */
export function getDefaultAIProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER || 'stability') as SupportedProvider;
  const apiKey = process.env.STABILITY_API_KEY;

  if (!apiKey) {
    throw new Error('缺少 API Key');
  }

  return createAIProvider({
    provider,
    apiKey,
    retryConfig: {
      maxAttempts: 3,
      initialDelay: 1000,
      maxDelay: 10000,
      timeout: 120000, // 2 分钟
    },
  });
}
