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
  NEXT_PUBLIC_VERCEL_URL,
  NODE_ENV,
} = process.env;
const supabaseUrl = NEXT_PUBLIC_SUPABASE_PROJECT_URL;
const supabaseKey = NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY;
let siteUrl: string;
if (NODE_ENV != "production") siteUrl = "http://localhost:3000/builder";
else siteUrl = NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000/builder";

export async function LoginAction({ email }: z.infer<typeof loginSchema>) {
  const authClient = createRouteHandlerClient(
    { cookies },
    {
      supabaseKey,
      supabaseUrl,
    }
  );
  const signInResponse = await authClient.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      // emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`,
      emailRedirectTo: `http://localhost:3000/api/auth/callback`,
    },  
  });

  return signInResponse;
}

//signup

export async function SignUpAction({ email }: z.infer<typeof loginSchema>) {
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
    return { error: "User already exists." };
  }

  const signUpResponse = await authClient.auth.signInWithOtp({
    email,
    options: {
      // emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`,
      emailRedirectTo: `http://localhost:3000/api/auth/callback`,
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
