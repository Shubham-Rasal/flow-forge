"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { Workspace } from "@/lib/supabase/database.types";
import CreateWorkspace from "./create-workspace";
import { useWorkspace } from "./providers/workspace-provider";
import { useRouter } from "next/navigation";
type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface WorkspaceSwitcherProps extends PopoverTriggerProps {
  workspaces: Workspace[];
  createWorkspace: (workspace: Workspace) => Promise<any>;
}

export default function WorkspaceSwitcher({
  className,
  workspaces,
  createWorkspace,
}: WorkspaceSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [workspaceType, setWorkspaceType] = React.useState<
    "private" | "shared"
  >("private"); //default to private

  const router = useRouter();

  const { setWorkspace: setSelectedWorkspace, workspace: selectedWorkspace } =
    useWorkspace();
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] =
    React.useState(false);

  const groups = [
    {
      label: "Personal Account",
      workspaces: workspaces,
    },
    {
      label: "Other Workspaces",
      workspaces: [],
    },
  ];

  if (!selectedWorkspace)
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="text-lg text-center">
          You don&apos;t have any workspaces yet. Create one to get started.
        </p>
        <CreateWorkspace createWorkspace={createWorkspace} />
      </div>
    );

  //   console.log(workspaces);

  return (
    <Dialog
      open={showNewWorkspaceDialog}
      onOpenChange={setShowNewWorkspaceDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedWorkspace.bannerUrl}.png`}
                alt={selectedWorkspace.title}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedWorkspace.title}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.workspaces.map((workspace) => (
                    <CommandItem
                      key={workspace.id}
                      onSelect={() => {
                        setSelectedWorkspace(workspace);
                        router.replace(`/dashboard/${workspace.id}`);
                        setOpen(false);
                        console.log(workspace);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${workspace.bannerUrl}.png`}
                          alt={workspace.title}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {workspace.title}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedWorkspace.id === workspace.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewWorkspaceDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Workspace
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Add a new workspace to your account &apos;
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <CreateWorkspace createWorkspace={createWorkspace} />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewWorkspaceDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
