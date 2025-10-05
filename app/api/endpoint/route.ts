import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        console.log(data);
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log('Error getting data', error);
        return NextResponse.json({ status: 500 });
    }
}