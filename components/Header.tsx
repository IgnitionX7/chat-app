"use client";

import { UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        Convex + Next.js + Clerk
        <UserButton />
      </header>
    </>
  );
}
export default Header;
