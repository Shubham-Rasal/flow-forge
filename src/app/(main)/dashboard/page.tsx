import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import db from '@/lib/supabase/db';
import { redirect } from 'next/navigation';
import { getUserSubscriptionStatus } from '@/lib/supabase/queries';
import CreateWorkspace from '@/components/create-workspace';
import { createWorkspace } from '@/lib/server-actions/workspace-actions';
import { Workspace } from '@/lib/supabase/database.types';

const DashboardPage = async () => {
  const supabase = createServerComponentClient({ cookies }, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const workspace = await db.query.workspaces.findFirst({
    where: ({workspaceOwner} : any, { eq } : any) => eq(workspaceOwner, user.id),
  });

  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  if (subscriptionError) return;




  if (!workspace)
    return (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Welcome {user.email}</h1>
          <p className="text-lg text-center">
            You don't have any workspaces yet. Create one to get started.
          </p>
        <CreateWorkspace
          createWorkspace={createWorkspace}
        />
      </div>
    );

  redirect(`/dashboard/${workspace.id}`);
};

export default DashboardPage;