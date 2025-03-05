import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Wait for the authentication to resolve and retrieve the user ID
    const { userId } = await auth();
    const { courseId } = params;
    const values = await req.json();

    // If no user ID is found, respond with Unauthorized status
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(course);
    // Process the PATCH request (you can add any specific logic here)
    const data = await req.json(); // Assuming you're expecting a JSON body

    // Example: Check if the data has the required fields
    if (!data.someField) {
      return new NextResponse("Bad Request: Missing someField", {
        status: 400,
      });
    }

    // Perform your actual update logic here (e.g., update database, etc.)
    // For example:
    // const updatedData = await updateData(userId, data);

    // Respond with a success message after the update
    return new NextResponse("Update successful", { status: 200 });
  } catch (error) {
    console.error("[COURSE_ID]", error);
    // In case of an error, return a 500 Internal Server Error
    return new NextResponse("Internal Error", { status: 500 });
  }
}
