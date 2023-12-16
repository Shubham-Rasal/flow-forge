"use client";
import { Button } from "@/components/ui/button";
import { LogoutAction } from "@/lib/server-actions/auth-actions";
import { useRouter } from "next/navigation";
import React from "react";

const DashBoard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await LogoutAction();
    if (error) {
      console.log(error);
    } else {
      router.push("/login");
    }
  };

  return (
    <div>
      DashBoard
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default DashBoard;
