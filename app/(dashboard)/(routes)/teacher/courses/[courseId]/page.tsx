import { IconBadge } from "@/components/ui/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { courseId?: string } }) => {
  const session = await auth();
  const userId = session?.userId;

  if (!userId) {
    return redirect("/");
  }

  if (!params?.courseId) {
    return <div>Invalid Course ID</div>; // Handle missing course ID
  }

  // Fetch course data based on courseId
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  if (!course) {
    return redirect("/");
  }

  // Check completion of required fields
  const requiredFields = [
    course.title,
    course.description,
    course.imgUrl,
    course.price,
    course.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields} / ${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-medium">
          <h1 className="flex flex-col gap-y-2">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customer your course</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
