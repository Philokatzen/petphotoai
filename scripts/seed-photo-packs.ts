import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PHOTO_PACKS = [
  {
    nameCn: '证件照',
    descriptionCn: '专业证件照，纯净背景，适合正式场合',
    basePrompt: 'professional ID photo portrait, clean solid background, studio lighting, neutral expression, front view',
    negativePrompt: 'blurry, low quality, cartoon, illustration, sketch',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '漫画风',
    descriptionCn: '漫画风格，鲜艳色彩，粗线条，流行艺术',
    basePrompt: 'comic book art style, vibrant colors, bold outlines, pop art aesthetic, cel shading',
    negativePrompt: 'realistic, photograph, 3d render',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '雪景',
    descriptionCn: '冬日雪景，雪花飘落，可爱围巾和帽子',
    basePrompt: 'beautiful winter scene with falling snow, pet wearing cute scarf and hat, magical atmosphere, snowflakes, cold weather',
    negativePrompt: 'summer, hot, desert, beach',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '太空',
    descriptionCn: '宇宙星空背景，宇航员服装，科幻未来感',
    basePrompt: 'pet in outer space, cosmic background with stars and nebula, astronaut suit, sci-fi aesthetic, futuristic, galaxy',
    negativePrompt: 'earth, natural, ordinary',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '油画',
    descriptionCn: '古典油画风格，丰富纹理，艺术博物馆级品质',
    basePrompt: 'classical oil painting style, rich textures, artistic masterpiece, museum quality, brush strokes visible, chiaroscuro lighting',
    negativePrompt: 'digital, photograph, modern',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '国风',
    descriptionCn: '中国传统水墨画风格，淡雅意境，优雅笔触',
    basePrompt: 'traditional Chinese ink wash painting style, elegant brushstrokes, minimalist aesthetic, watercolor texture, artistic',
    negativePrompt: 'realistic, photograph, 3d',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '赛博朋克',
    descriptionCn: '霓虹灯光，未来城市背景，高科技感',
    basePrompt: 'cyberpunk aesthetic, neon lights, futuristic city background, high tech vibe, holographic elements, dark atmosphere',
    negativePrompt: 'natural, daylight, traditional',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '海滩',
    descriptionCn: '阳光海滩，海浪拍岸，棕榈树，热带风情',
    basePrompt: 'sunny beach scene, ocean waves, palm trees, tropical paradise, bright and colorful, blue sky, sand',
    negativePrompt: 'winter, cold, dark',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '森林',
    descriptionCn: '魔法森林，斑驳阳光，童话氛围',
    basePrompt: 'enchanted forest setting, magical woodland, dappled sunlight through trees, fairy tale atmosphere, moss and ferns',
    negativePrompt: 'urban, city, desert',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '万圣节',
    descriptionCn: '万圣节主题，南瓜装饰，可爱装扮',
    basePrompt: 'spooky Halloween theme, pumpkins, autumn leaves, playful costume, fun and festive, orange and black colors',
    negativePrompt: 'bright, cheerful, summer',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '圣诞',
    descriptionCn: '圣诞主题，节日装饰，温馨氛围',
    basePrompt: 'festive Christmas scene, holiday decorations, snow, Christmas tree, ornaments, cozy warm atmosphere, red and green colors',
    negativePrompt: 'summer, beach, hot',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '婚礼',
    descriptionCn: '优雅婚礼主题，正式装扮，浪漫氛围',
    basePrompt: 'elegant wedding theme, formal attire with flowers, beautiful bouquet, romantic atmosphere, soft lighting, dreamy',
    negativePrompt: 'casual, rugged, outdoor',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '超级英雄',
    descriptionCn: '超级英雄风格，动态姿势，强大气场',
    basePrompt: 'epic superhero style, dynamic action pose, powerful stance, comic book hero aesthetic, cape fluttering, dramatic angle',
    negativePrompt: 'ordinary, weak, casual',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '文艺复兴',
    descriptionCn: '文艺复兴肖像风格，古典艺术，华丽背景',
    basePrompt: 'Renaissance portrait style, classical art, ornate background, period clothing, dramatic lighting, oil painting texture',
    negativePrompt: 'modern, contemporary, digital',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
  {
    nameCn: '水彩',
    descriptionCn: '水彩画风格，柔和色彩，梦幻意境',
    basePrompt: 'delicate watercolor painting, soft pastel colors, artistic and dreamy, gentle brush strokes, flowing colors',
    negativePrompt: 'bold, dark, heavy',
    defaultNumImages: 4,
    speciesSupport: 'BOTH',
  },
];

async function seedPhotoPacks() {
  console.log('开始初始化 PhotoPack 数据...');

  for (const pack of PHOTO_PACKS) {
    const existing = await prisma.photoPack.findFirst({
      where: { nameCn: pack.nameCn },
    });

    if (!existing) {
      await prisma.photoPack.create({
        data: pack,
      });
      console.log(`✓ 创建主题包: ${pack.nameCn}`);
    } else {
      console.log(`- 主题包已存在: ${pack.nameCn}`);
    }
  }

  console.log('PhotoPack 初始化完成！');
}

async function main() {
  try {
    await seedPhotoPacks();
  } catch (error) {
    console.error('初始化失败:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
