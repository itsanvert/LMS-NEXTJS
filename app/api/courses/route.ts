// /app/api/courses/route.ts (or /pages/api/courses.ts depending on your setup)
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // Ensure this returns a userId
    console.log("Authenticated user ID:", userId); // Debugging line for userId

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title } = await req.json(); // Extract title from request body
    console.log("Received title:", title); // Debugging line for title

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });
    console.log("Created Course:", course); // Log the created course
    // Debugging line for created course

    return NextResponse.json({ message: "Success", course });
  } catch (error) {
    console.error("[COURSES ERROR]", error); // Detailed error logging
    return new NextResponse("Internal Error", { status: 500 });
  }
}
