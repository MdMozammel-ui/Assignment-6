import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.abcz.workers.dev/api/fitlog",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch workouts from external API" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Proxy Error:", error);

    return NextResponse.json(
      { error: "Failed to connect to workout API" },
      { status: 500 }
    );
  }
}