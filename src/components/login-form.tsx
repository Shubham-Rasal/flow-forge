"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Icons } from "./icons";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import { toast } from "./ui/use-toast";
import {
  LoginAction,
  signInWithGithubAction,
} from "@/lib/server-actions/auth-actions";
import { useRouter } from "next/navigation";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const loginResponse = await LoginAction(data);
    console.log(loginResponse.data);

    toast({
      title: "Check for a magic link in your inbox!",
    });
  }

  //handle github login
  async function onGithubLogin() {
    console.log("github login");
    toast({
      title: "Github login is not yet implemented!",
    });

    const { data, error } = await signInWithGithubAction();
    if (error) {
      toast({
        title: "Error logging in with Github!",
        description: error.toString(),
      });
    }

    //redirect to github for login
    const { url } = data;

    if(!url) {
      toast({
        title: "Error logging in with Github!",
        description: "No url returned from server.",
      });
      return;
    }

    router.push(url);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label className="sr-only" htmlFor="email">
                      Email
                    </Label>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} type="submit">
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={onGithubLogin}
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
