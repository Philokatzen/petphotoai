import { prisma } from "./lib/prisma";

async function checkPets() {
  const pets = await prisma.pet.findMany({
    include: {
      assets: true,
      aiModels: true,
    },
  });

  console.log(`找到 ${pets.length} 个宠物:`);
  pets.forEach((pet) => {
    console.log(`- ${pet.name} (${pet.type})`);
    console.log(`  照片数量: ${pet.assets.length}`);
    console.log(`  AI模型: ${pet.aiModels.length}`);
  });
}

checkPets()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
