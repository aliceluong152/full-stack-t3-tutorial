import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allTodosOutput = RouterOutput["todo"]["all"];

export type Todo = allTodosOutput[number];

export const todoInput = z
  .string({
    required_error: "Describe your todo",
  })
  .min(1)
  .max(50);
//This setup helps ensure that the data being handled conforms
// to expected types and formats, which improves robustness
// and maintainability in your application.