#!/bin/bash
echo "开始监控数据库连接..."
echo "请在 Supabase 控制台恢复项目：https://supabase.com/dashboard"
echo ""

for i in {1..60}; do
  echo "[$(date '+%H:%M:%S')] 检查连接... (尝试 $i/60)"

  RESULT=$(npx prisma db push --accept-data-loss 2>&1)

  if echo "$RESULT" | grep -q "Can't reach database server"; then
    echo "❌ 数据库仍未在线"
  elif echo "$RESULT" | grep -q "Error"; then
    echo "❌ 数据库仍未在线"
  else
    echo ""
    echo "🎉 数据库已成功连接！"
    echo "$RESULT"
    exit 0
  fi

  sleep 3
done

echo ""
echo "⏱️ 超时：请手动检查 Supabase 项目是否已恢复"
