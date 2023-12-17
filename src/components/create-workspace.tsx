"use client";
import { Subscription, User, Workspace } from "@/lib/supabase/database.types";
import { useToast } from "./ui/use-toast";
import { AuthUser } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createWorkspaceSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createWorkspace } from "@/lib/supabase/queries";
import { generateRandomId } from "@/lib/utils";

type CreateWorkspaceProps = {
  subscriptionstatus: Subscription | null;
  user: AuthUser;
};

const CreateWorkspace = ({
  subscriptionstatus,
  user,
}: CreateWorkspaceProps) => {
  const { toast } = useToast();

  //   console.log(subscriptionstatus);

  const router = useRouter();
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY,
  });
  const [submitError, setSubmitError] = useState<string>("");

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      logo: "",
      name: "Default Workspace",
    },
  });

  async function onSubmit(values: z.infer<typeof createWorkspaceSchema>) {
    //generate workspace id of 6 characters
    const file = values.logo?.[0];
    let filePath = null;
    const workspaceUUID = generateRandomId(6);
    console.log(file);

    if (file) {
      try {
        const { data, error } = await supabase.storage
          .from("workspace-logos")
          .upload(`workspaceLogo.${workspaceUUID}`, file, {
            cacheControl: "3600",
            upsert: true,
          });
        if (error) throw new Error("");
        filePath = data.path;
      } catch (error) {
        console.log("Error", error);
        toast({
          variant: "destructive",
          title: "Error! Could not upload your workspace logo",
        });
      }
    }
    try {
      const newWorkspace: Workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: "testIcon",
        id: workspaceUUID,
        inTrash: "",
        title: values.name,
        workspaceOwner: user.id,
        logo: filePath || null,
        bannerUrl: "",
      };
      const { data, error: createError } = await createWorkspace(newWorkspace);
      if (createError) {
        throw new Error();
      }

      toast({
        title: "Workspace Created",
        description: `${newWorkspace.title} has been created successfully.`,
      });

      router.replace(`/dashboard/${newWorkspace.id}`);
    } catch (error) {
      console.log(error, "Error");
      toast({
        variant: "destructive",
        title: "Could not create your workspace",
        description:
          "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
      });
    } finally {
      form.reset();
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input
                    disabled={
                      subscriptionstatus?.status === "active" ? false : true
                    }
                    type="file"
                    accept="image/*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Link href="/">Back to home</Link>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateWorkspace;
