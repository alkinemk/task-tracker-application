"use server";

import { revalidatePath } from "next/cache";
import prisma from "./lib/prisma";
import { z } from "zod";

export async function createTodo(prevState: any, formData: FormData) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const data = schema.parse({
    todo: formData.get("todo"),
  });

  if (!data) {
    return { message: "Failed to create todo" };
  }

  try {
    await prisma.todos.create({
      data: { text: data.todo },
    });
    revalidatePath("/");
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

// export async function editTodo(prevState: any, formData: FormData) {
//   const schema = z.object({
//     id: z.coerce.number(),
//     todo: z.string().min(1),
//   });
//   const data = schema.parse({
//     id: formData.get("id"),
//     todo: formData.get("todo"),
//   });

//   try {
//     await prisma.todos.update({
//       where: { id: data.id },
//       data: { text: data.todo, updatedAt: new Date() },
//     });

//     revalidatePath("/");
//     return { message: `Edited todo ${data.todo}`, success: true };
//   } catch (e) {
//     return { message: "Failed to edit todo" };
//   }
// }

export async function deleteTodo(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.coerce.number(),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    await prisma.todos.delete({ where: { id: data.id } });

    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}
