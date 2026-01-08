import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanup() {
  // 删除旧的 AI 模型和相关任务
  const result = await prisma.aIModel.deleteMany({});
  
  console.log(`删除了 ${result.count} 个旧的 AI 模型`);
  
  // 同时删除相关任务
  const jobs = await prisma.job.deleteMany({
    where: {
      type: 'TRAIN'
    }
  });
  
  console.log(`删除了 ${jobs.count} 个训练任务`);
}

cleanup()
  .then(() => prisma.$disconnect())
  .catch(console.error);
