import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";


export const workspaces = pgTable('workspaces', {
    id : uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt : timestamp('created_at' , {
        withTimezone : true,
        mode : "string"
    }),
    workspaceOwner : uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId : uuid('icon_id').notNull(),
    data : text('data'),
    inTrash : text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),
})


export const folders = pgTable('folders', {
    id : uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt : timestamp('created_at' , {
        withTimezone : true,
        mode : "string"
    }),
    workspaceOwner : uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId : uuid('icon_id').notNull(),
    data : text('data'),
    inTrash : text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),
    workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id , {onDelete :"cascade"})
})

