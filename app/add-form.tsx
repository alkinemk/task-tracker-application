"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { createTodo } from "@/app/actions";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-black w-100 text-white rounded w-full px-1.5 py-2 hover:opacity-80 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
      type="submit"
      aria-disabled={pending}
    >
      Add
    </button>
  );
}

export function AddForm() {
  const [state, formAction] = useFormState(createTodo, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter task</label>
      <input type="hidden" name="created_at" value={Date.now()} />
      <input
        className="w-full box-border mb-2.5 rounded outline-offset-4 border border-stone-300 p-2.5"
        type="text"
        id="todo"
        name="todo"
        required
        autoFocus
      />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
