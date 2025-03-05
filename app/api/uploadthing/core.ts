import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser(); // Use currentUser() for user data in Clerk
  if (!user) {
    throw new Error("Unauthorized");
  }
  return { userId: user.id };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(handleAuth) // Directly pass handleAuth as it's already an async function
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(handleAuth) // Directly pass handleAuth
    .onUploadComplete(() => {}),
  chapterVideo: f({
    video: { maxFileCount: 1, maxFileSize: "512GB" },
  })
    .middleware(handleAuth) // Directly pass handleAuth
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
