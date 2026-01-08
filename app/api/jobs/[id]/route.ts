import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { jobService } from "@/lib/services/job-service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/jobs/[id] - 获取任务状态
 * 用于前端轮询任务进度
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const { id: jobId } = await params;

    const jobStatus = await jobService.getJobStatus(jobId, session.user.id);

    return NextResponse.json(jobStatus);
  } catch (error: any) {
    console.error("获取任务状态错误:", error);

    if (error.message === "任务不存在") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: error.message || "获取失败" },
      { status: 500 }
    );
  }
}
