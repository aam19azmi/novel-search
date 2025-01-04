import { NextResponse } from "next/server";
import { genres } from "@/data/genres";

export async function GET() {
    return NextResponse.json(genres);
}