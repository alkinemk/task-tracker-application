"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Validate the data using zod schema
    const schema = z.object({
      id: z.coerce.number(),
      todo: z.string().min(1),
    });
    const data = schema.parse({
      id: formData.get("id"),
      todo: formData.get("todo"),
    });

    try {
      await prisma.todos.update({
        where: { id: data.id },
        data: { text: data.todo, updatedAt: new Date() },
      });

      return NextResponse.json({
        message: `Edited todo ${data.todo}`,
        success: true,
      });
    } catch (e) {
      return { message: "Failed to edit todo" };
    }
  } catch (error) {
    console.error("Error processing form data:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
