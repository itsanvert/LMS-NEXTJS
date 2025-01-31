"use client";

import { UserButton, useClerk } from "@clerk/clerk-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export const NavbarRoutes = () => {
  const { signOut } = useClerk();
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  const handleExit = async () => {
    await signOut({ redirectUrl: "/" }); // Sign out and handle redirection
    router.push("/"); // Explicit redirect to homepage after sign out
  };

  return (
    <div className="flex gap-x-2 ml-auto items-center">
      {/* Conditionally render buttons based on page */}
      {isTeacherPage || isPlayerPage ? (
        <Button onClick={handleExit} size="sm" variant="ghost">
          <LogOut className="h-4 w-4 mr-2" />
          Exit
        </Button>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}

      {/* Ensure UserButton remains outside of conditional rendering */}
      <UserButton />
    </div>
  );
};
