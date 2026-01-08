import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetFailedGenerations() {
  try {
    // 将状态为 PROCESSING 且创建时间超过 5 分钟的任务标记为失败
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const result = await prisma.job.updateMany({
      where: {
        status: 'PROCESSING',
        createdAt: {
          lt: fiveMinutesAgo,
        },
      },
      data: {
        status: 'FAILED',
      },
    });

    console.log(`✅ 已重置 ${result.count} 个失败的任务`);
  } catch (error) {
    console.error('重置失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetFailedGenerations();
