"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConversation } from "@/hooks/useConversation";
import { useNavigation } from "@/hooks/useNavigation";
import { UserButton } from "@clerk/clerk-react";
import Link from "next/link";

const MobileNav = () => {
  const paths = useNavigation();

  const { isActive } = useConversation();

  if (isActive) return null;

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => (
            <li key={id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={path.href} className="relative inline-flex">
                    <Button
                      variant={path.active ? "default" : "ghost"}
                      size="icon"
                    >
                      {path.icon}
                    </Button>
                    {path.count ? (
                      <Badge className="absolute -top-2 -right-2 h-5 min-w-5 p-0 flex items-center justify-center text-xs rounded-full">
                        {path.count}
                      </Badge>
                    ) : null}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{path.name}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
