/**
 * 获取宠物类型的中文显示
 */
export function getPetTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    CAT: "猫咪",
    DOG: "狗狗",
    OTHER: "宠物",
  };

  return typeMap[type] || "宠物";
}
