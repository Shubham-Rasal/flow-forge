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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Workspace } from "@/lib/supabase/database.types";
import CreateWorkspace from "./create-workspace";
import { createWorkspace } from "@/lib/server-actions/workspace-actions";
type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface WorkspaceSwitcherProps extends PopoverTriggerProps {
  workspaces: Workspace[];
}

export default function WorkspaceSwitcher({
  className,
  workspaces,
}: WorkspaceSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [workspaceType, setWorkspaceType] = React.useState<
    "private" | "shared"
  >("private"); //default to private
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] =
    React.useState(false);

  const groups = [
    {
      label: "Personal Account",
      workspaces: workspaces,
    },
    {
      label: "Other Workspaces",
      workspaces: workspaces,
    },
  ];

  const collaborators = [
    {
      name: "John Doe",
      email: "joh1n@doe.com",
    },
    {
      name: "John Doe",
      email: "joh12n@doe.com",
    },
    {
      name: "John Doe",
      email: "joh234n@doe.com",
    },
  ];

  const [selectedWorkspace, setSelectedWorkspace] = React.useState<Workspace>(
    groups[0]?.workspaces[0]
  );

  //   console.log(workspaces);

  const handleCreateWorkspace = async () => {

    console.log
   
  }

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
                        setOpen(false);
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
                          selectedWorkspace === workspace
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
            Add a new workspace to your account.
          </DialogDescription>
        </DialogHeader>
        <CreateWorkspace createWorkspace={createWorkspace}/>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewWorkspaceDialog(false)}
          >
            Cancel
          </Button>
          <Button 
          onClick={handleCreateWorkspace}
          type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
