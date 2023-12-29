"use client";

import { AuthUser } from "@supabase/supabase-js";
import { Subscription } from "@/lib/supabase/database.types";
import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useToast } from "@/components/ui/use-toast";
import { getUserSubscriptionStatus } from "@/lib/server-actions/workspace-actions";

type SupabaseUserContextType = {
  user: AuthUser | null;
  subscription: Subscription | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
  subscription: null,
});

export const useSupabaseUser = () => {
  if (!SupabaseUserContext) {
    throw new Error(
      "useSupabaseUser must be used within a SupabaseUserProvider"
    );
  }

  return useContext(SupabaseUserContext);
};

interface SupabaseUserProviderProps {
  children: React.ReactNode;
}

export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { toast } = useToast();

  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY,
  });

  //Fetch the user details
  //subscrip
  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user }, error
        } = await supabase.auth.getUser();
        if (!user) return;

        setUser(user);
        console.log(user);
        // const { data, error } = await getUserSubscriptionStatus(user.id);
        // if (data) setSubscription(data);
        if (error) {
          toast({
            title: "Unexpected Error",
            description: error.toString(),
          });
        }
      } catch (error) {
        toast({
          title: "Unexpected Error",
          description: "Error fetching user details.",
        });
        console.log(error);
      }
    };

    getUser();
  }, [supabase, toast]);
  return (
    <SupabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};
