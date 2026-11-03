import { NextResponse } from "next/server";
import { getMergedPortfolio } from "@/lib/github";

export async function GET() {
  try {
    const portfolio = await getMergedPortfolio();
    return NextResponse.json(portfolio, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to load GitHub portfolio data",
        message,
        syncedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
