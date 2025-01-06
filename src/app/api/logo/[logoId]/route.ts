import { NextResponse } from "next/server";
import { getPrisma, prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { logoId: string } }
) {
  try {
    const prisma = getPrisma();

    const logo = await prisma.logoHistory.findUnique({
      where: {
        id: params.logoId,
      },
    });

    if (!logo) {
      return NextResponse.json({ error: "Logo not found" }, { status: 404 });
    }

    return NextResponse.json(logo);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch logo" },
      { status: 500 }
    );
  }
}
