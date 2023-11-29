"use client";

import { useFormState, useFormStatus } from "react-dom";
import { deleteTodo } from "@/app/actions";
import { MdDelete } from "react-icons/md";

const initialState = {
  message: null,
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-black rounded text-white p-1 mt-0.5"
      type="submit"
      aria-disabled={pending}
    >
      <MdDelete />
    </button>
  );
}

export function DeleteForm({ id, todo }: { id: number; todo: string }) {
  const [state, formAction] = useFormState(deleteTodo, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="todo" value={todo} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
