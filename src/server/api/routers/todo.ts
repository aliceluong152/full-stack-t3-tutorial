import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { todoInput } from "../../../types"; 

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    //Fetch all todos for the authenticated user.
  
    const todos = await ctx.prisma.todo.findMany({
      where: { userId: ctx.session.user.id }, 

    });
    console.log("todo from prisma", todos.map(({ id, text, done }) => ({ id, text, done })));
    
  }),
  create: protectedProcedure.input(todoInput).mutation(async ({ ctx, input }) => {
    return ctx.prisma.todo.create({
      data: {
        text: input,
        userId: ctx.session.user.id, //connect to the authenticated user
      },
    });
  }),
  delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.prisma.todo.delete({
      where: { id: input },
    });
  }), 
  toggle: protectedProcedure.input(
    z.object({ 
      id: z.string(),
      done:z.boolean()}))
      .mutation(async ({ ctx, input:{id,done} }) => {
    return ctx.prisma.todo.update({
      where: { id},
      data: { done},
    });
  }),
});

