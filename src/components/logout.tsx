"use client";
import { LogoutAction } from "@/lib/server-actions/auth-actions";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await LogoutAction();
    if (error) {
      console.log(error);
    } else {
      router.push("/");
    }
  };

  return (
    <DropdownMenuItem>
      <Button variant="ghost" className="w-full text-start" onClick={handleLogout}>
        Logout
      </Button>
    </DropdownMenuItem>
  );
};

export default Logout;
