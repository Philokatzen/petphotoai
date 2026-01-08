import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetAllProcessing() {
  try {
    // 将所有状态为 PROCESSING 的任务标记为失败
    const result = await prisma.job.updateMany({
      where: {
        status: 'PROCESSING',
      },
      data: {
        status: 'FAILED',
      },
    });

    console.log(`✅ 已重置 ${result.count} 个 PROCESSING 任务为 FAILED`);
  } catch (error) {
    console.error('重置失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAllProcessing();
