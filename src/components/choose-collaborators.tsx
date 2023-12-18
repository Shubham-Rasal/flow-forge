"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { getAllCollaborators } from "@/lib/server-actions/workspace-actions";

const collaborators = [
  {
    name: "John Doe",
    email: "test@test.com",
    id: "dslkfj",
  },
];

//array of objects
const CollaboratorsSchema = z.object({
  collaborators: z.array(
    z.object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
    })
  ),
});

export function ChooseCollaborators() {
  const form = useForm<z.infer<typeof CollaboratorsSchema>>({
    resolver: zodResolver(CollaboratorsSchema),
  });

  function onSubmit(data: z.infer<typeof CollaboratorsSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="collaborators"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              {collaborators.map((collaborator) => (
                <FormField
                  key={collaborator.email}
                  control={form.control}
                  name="collaborators"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={collaborator.email}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(collaborator)}
                            onCheckedChange={(checked: any) => {
                              return checked
                                ? field.onChange([...field.value, collaborator])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== collaborator
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {collaborator.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
