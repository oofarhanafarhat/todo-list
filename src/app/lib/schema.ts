import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const todoTable = pgTable("games", {
    id: serial("id").primaryKey(),
    game: varchar("game", { length: 300 }).notNull(),
});

export type Todo = InferSelectModel<typeof todoTable>;
export type NewTodo = InferInsertModel<typeof todoTable>;