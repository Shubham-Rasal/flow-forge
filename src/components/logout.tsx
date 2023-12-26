"use client";
import { LogoutAction } from "@/lib/server-actions/auth-actions";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

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

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
