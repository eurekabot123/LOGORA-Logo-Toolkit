// src/app/api/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import {
  getLogoHistorys,
  getLogoHistorysById,
  getLogoHistorysCount,
  getUserLogoHistorys,
  getUserLogoHistorysCount,
} from "@/models/logoHistory";
import { getUser } from "@/service/user";
// import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    console.log("API: 开始获取历史记录...");
    console.log("Database URL:", process.env.DATABASE_URL);
    // const prisma = getPrisma();

    const url = req.url;
    const params = url.split("?")[1];
    const query = new URLSearchParams(params);
    const isMine = query.get("isMine");
    const limit = parseInt(query.get("limit") || "12") as number;
    const page = parseInt(query.get("page") || "1") as number;

    let logoHistorys: any = [];
    let total = 0;
    if (isMine) {
      const user = await getUser(req);
      if (!user.email && !user.phone)
        return Response.json({ code: 1, message: "未登录" });
      logoHistorys = await getUserLogoHistorys(
        user.phone || user.email!,
        page,
        limit
      );
      total = await getUserLogoHistorysCount(user.phone || user.email!);
    } else if (typeof query.get("id") == "string") {
      logoHistorys = await getLogoHistorysById(query.get("id") as string);
      total = -1;
    } else {
      logoHistorys = await getLogoHistorys(page, limit);
      total = await getLogoHistorysCount();
    }
    return NextResponse.json(logoHistorys || [], {
      status: 200,
    });
  } catch (error) {
    console.error("数据库错误详情:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch history",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
