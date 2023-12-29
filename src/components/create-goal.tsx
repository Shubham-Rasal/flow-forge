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

import { toast } from "@/components/ui/use-toast";

import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DrawerClose, DrawerFooter } from "./ui/drawer";
import { TurboNodeData } from "./turbo/node";
import { useFlowStore, RFState } from "./turbo/store";
import { NodeProps } from "reactflow";
//make a ts enum for goal types
const goalTypes = [
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "yearly",
] as const;

export const GoalSchema = z.object({
  type: z.enum(goalTypes),
  date: z.date(),
  time: z.string(),
  description: z.string(),
  goal: z.string().max(50),
  attachable: z.boolean(),
});

export default function CreateGoal({ data, id }: NodeProps<TurboNodeData>) {
  const form = useForm<z.infer<typeof GoalSchema>>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      type: data.type,
      attachable: data.attachable,
      date: data.date || new Date(),
      time: data.time || "12:00",
      description: data.description || "",
      goal: data.goal,
    },
  });

  const updateNode = useFlowStore((state: RFState) => state.updateNode);

  function onSubmit(data: z.infer<typeof GoalSchema>) {
    updateNode(id, data);
    console.log(JSON.stringify(data, null, 2));

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-fit">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="">
              {/* <FormLabel>Notify me about...</FormLabel> */}
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col flex-wrap space-y-1"
                >
                  <div className="flex gap-2">
                    {goalTypes.map((type) => (
                      <FormItem
                        key={type}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <div>
                            <RadioGroupItem
                              value={type}
                              key={type}
                              id={type}
                              className="peer sr-only"
                            />
                            <FormLabel
                              htmlFor={type}
                              className="flex flex-col items-center
                               justify-between rounded-md border-2 border-muted bg-popover
                                p-2  hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary 
                                [&:has([data-state=checked])]:border-primary"
                            >
                              {type}
                            </FormLabel>
                          </div>
                        </FormControl>
                      </FormItem>
                    ))}
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormControl>
                <Input placeholder="Project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormControl>
                <Textarea placeholder="Complete the project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mx-2 lg:mx-0 mt-2 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Attachable Property</FormLabel>
                <FormDescription>
                  Can connect other tasks to this goal.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <DrawerFooter>
          <Button type="submit">Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  );
}
