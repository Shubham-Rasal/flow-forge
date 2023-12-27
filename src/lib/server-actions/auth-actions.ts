"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { z } from "zod";
import { cookies } from "next/headers";
import * as dotenv from "dotenv";
import { loginSchema } from "../types";
dotenv.config({
  path: ".env",
});

const {
  NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY,
} = process.env;
const supabaseUrl = NEXT_PUBLIC_SUPABASE_PROJECT_URL;
const supabaseKey = NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY;

export async function LoginAction({
  email,
  password,
}: z.infer<typeof loginSchema>) {
  const authClient = createRouteHandlerClient(
    { cookies },
    {
      supabaseKey,
      supabaseUrl,
    }
  );
  const signInResponse = await authClient.auth.signInWithPassword({
    email,
    password,
  });

  return signInResponse;
}

//signup

export async function SignUpAction({
  email,
  password,
}: z.infer<typeof loginSchema>) {
  const authClient = createRouteHandlerClient(
    { cookies },
    {
      supabaseKey,
      supabaseUrl,
    }
  );

  //check if user exists
  const user = await authClient.from("users").select("*").eq("email", email);
  if (user.data?.length) {
    return { error: "user already exists" };
  }

  const signUpResponse = await authClient.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`,
    },
  });

  return signUpResponse;
}

//logout
export async function LogoutAction() {
  const authClient = createRouteHandlerClient(
    { cookies },
    {
      supabaseKey,
      supabaseUrl,
    }
  );
  const response = await authClient.auth.signOut();
  
  return response;
}
