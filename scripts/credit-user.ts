import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function creditUser() {
  const userEmail = 'philoclaudia1994@gmail.com';
  const creditAmount = 100;

  try {
    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      console.log(`用户 ${userEmail} 不存在`);
      return;
    }

    console.log(`找到用户: ${user.name} (${user.email})`);

    // 获取当前余额
    const lastCredit = await prisma.credit.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    const currentBalance = lastCredit?.balance || 0;
    const newBalance = currentBalance + creditAmount;

    // 创建积分记录
    const credit = await prisma.credit.create({
      data: {
        userId: user.id,
        amount: creditAmount,
        balance: newBalance,
        reason: '系统充值',
      },
    });

    console.log(`✅ 充值成功！`);
    console.log(`   用户: ${user.name} (${user.email})`);
    console.log(`   充值金额: +${creditAmount} 积分`);
    console.log(`   原余额: ${currentBalance} 积分`);
    console.log(`   新余额: ${newBalance} 积分`);
  } catch (error) {
    console.error('充值失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

creditUser();
