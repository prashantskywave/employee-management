import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:5000/api/employees", {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch employees" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Backend server not running" },
      { status: 500 }
    );
  }
}
