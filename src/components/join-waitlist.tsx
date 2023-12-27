"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Glow from "./glow-wrapper";
import { Icons } from "./icons";
import { SignUpAction } from "@/lib/server-actions/auth-actions";
import { useRouter } from "next/navigation";
import { useSupabaseUser } from "./user-provider";
import { ArrowBigRight, ArrowRight, ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function WaitlistForm() {
  const { user } = useSupabaseUser(); 

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  // function sleep(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { error } = await SignUpAction(data);

    if (error) {
      toast({
        title: error.toString(),
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">You have already Signed Up!</code>
          </pre>
        ),
      });
    }

    if (!error) {
      toast({
        title: "Thank you for signing up!!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }

    form.reset();
  }

  if (user)
    return (
      <div className="flex gap-2">
        <Link href={"/builder"}>
          <Button variant="link">
            Go to builder <ArrowRight />
          </Button>
        </Link>
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="shadow-lg"
                  placeholder="blueq@planner.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Join the waitlist to get early access.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="outline"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>Submit</>
          )}{" "}
        </Button>
        {/* <Button variant={"default"} type="submit">
          Submit
        </Button> */}
      </form>
    </Form>
  );
}
