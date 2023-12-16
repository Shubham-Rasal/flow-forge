"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { z } from "zod";
import { cookies } from "next/headers";
import * as dotenv from "dotenv";
import { loginSchema } from "../types";
dotenv.config({
  path: ".env",
});

const { NEXT_PUBLIC_SUPABASE_PROJECT_URL, NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY } = process.env;
const supabaseUrl = NEXT_PUBLIC_SUPABASE_PROJECT_URL;
const supabaseKey = NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY;

export async function LoginAction({
  email,
  password,
}: z.infer<typeof loginSchema>) {
  const authClient = createRouteHandlerClient({ cookies } ,{
    supabaseKey,
    supabaseUrl,
  });
  const signInResponse = await authClient.auth.signInWithPassword({
    email,
    password,
  });

    if (signInResponse.error) {
        throw new Error(signInResponse.error.message);
    }

    return signInResponse;

}

//signup

export async function SignUpAction({
  email,
  password,
}: z.infer<typeof loginSchema>) {
  const authClient = createRouteHandlerClient({ cookies } ,{
    supabaseKey,
    supabaseUrl,
  });
  const signUpResponse = await authClient.auth.signUp({
    email,
    password
  });

    if (signUpResponse.error) {
        throw new Error(signUpResponse.error.message);
    }

    return signUpResponse;

}
