import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// import * as dotenv from 'dotenv'
// dotenv.config({ path: '.env' })

const {
  NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY,
} = process.env;
const supabaseUrl = NEXT_PUBLIC_SUPABASE_PROJECT_URL;
const supabaseKey = NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY;

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient(
      { cookies },
      {
        supabaseKey,
        supabaseUrl,
      }
    );
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin + "/dashboard");
}
