import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "没有上传文件" }, { status: 400 });
    }

    // 验证文件类型
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "只支持图片文件" }, { status: 400 });
    }

    // 验证文件大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "图片大小不能超过 10MB" },
        { status: 400 }
      );
    }

    // 生成唯一文件名
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${session.user.id}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

    // 创建 Supabase 客户端（使用 anon key 因为 bucket 是 public 的）
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, anonKey);

    // 将 File 转换为 Blob
    const arrayBuffer = await file.arrayBuffer();

    // 上传到 Supabase Storage
    const { data, error } = await supabase.storage
      .from("Photopet.ai")
      .upload(fileName, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Supabase 上传错误:", error);
      return NextResponse.json(
        { error: `图片上传失败: ${error.message}` },
        { status: 500 }
      );
    }

    // 获取公共 URL
    const { data: { publicUrl } } = supabase.storage
      .from("Photopet.ai")
      .getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("上传错误:", error);
    return NextResponse.json(
      { error: "上传失败，请稍后重试" },
      { status: 500 }
    );
  }
}
