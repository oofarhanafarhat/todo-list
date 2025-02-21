import { NextRequest, NextResponse } from "next/server";
import { db } from "../../lib/drizzle";
import { todoTable } from "../../lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const games = await db.select().from(todoTable);

    return NextResponse.json({ message: "API called successfully", games });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: (error as { message: string }).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();

    if (!req.game) {
      throw new Error("Please enter a valid game name");
    }

    const insertedTask = await db
      .insert(todoTable)
      .values({ game: req.game })
      .returning();

    return NextResponse.json(insertedTask[0]);
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      );
    }

    await db.delete(todoTable).where(eq(todoTable.id, id));

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
