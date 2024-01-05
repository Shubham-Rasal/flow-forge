import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TurboNodeData } from "./turbo/node";
import CreateGoal from "./update-goal";
import { NodeProps } from "reactflow";
import UpdateGoal from "./update-goal";

export function UpdateDrawer(props: NodeProps<TurboNodeData>) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data } = props;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">{data.goal}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit goal</DialogTitle>
            <DialogDescription>
              Make changes to your goal here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <UpdateGoal {...props} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost">{data.goal}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit goal</DrawerTitle>
          <DrawerDescription>
            Make changes to your goal here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <UpdateGoal {...props} />
      </DrawerContent>
    </Drawer>
  );
}
