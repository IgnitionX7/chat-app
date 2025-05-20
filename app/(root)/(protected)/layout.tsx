"use client";
import { Authenticated } from "convex/react";

type Props = {
  children: React.ReactNode;
};
function layout({ children }: Props) {
  return (
    <>
      <Authenticated>{children}</Authenticated>
    </>
  );
}
export default layout;
