import { Task } from "../types";
import prisma from "./prisma";

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    await prisma.$connect();
    let todos = await prisma.todos.findMany();
    return todos;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
