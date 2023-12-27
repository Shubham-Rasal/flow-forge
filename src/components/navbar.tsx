"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

const components: { title: string; href: string; description: string }[] = [
  // {
  //   title: "Login",
  //   href: "/login",
  //   description:
  //     "Login to your account.",
  // },
  // {
  //   title: "Signup",
  //   href: "/signup",
  //   description:
  //     "Create an account.",
  // },
  // {
  //   title: "Task Editor",
  //   href: "/editor",
  //   description:
  //     "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  // },
];

export function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <Button variant={"link"}>
              Home
            </Button>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <Link href="/builder" legacyBehavior passHref>
            <Button variant={"link"}>
              Plan Builder
            </Button>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
