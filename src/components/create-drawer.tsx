import * as React from "react";
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

import CreateGoal from "./create-goal";
import { ControlButton, NodeProps } from "reactflow";
import { PlusCircleIcon } from "lucide-react";

export function CreateDrawer() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <ControlButton>
            <PlusCircleIcon />
          </ControlButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create goal</DialogTitle>
            <DialogDescription>
              Make changes to your goal here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <CreateGoal />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <ControlButton>
          <PlusCircleIcon />
        </ControlButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create goal</DrawerTitle>
          <DrawerDescription>
            Make changes to your goal here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <CreateGoal />
      </DrawerContent>
    </Drawer>
  );
}
