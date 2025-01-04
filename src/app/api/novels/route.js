import { NextResponse } from "next/server";
import { novels } from "@/data/novels";
  
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (query) {
        const results = novels.filter(
        (novel) =>
            novel.title.toLowerCase().includes(query.toLowerCase()) ||
            novel.author.toLowerCase().includes(query.toLowerCase())
        );
        return NextResponse.json(results);
    }

    return NextResponse.json(novels);
}
  