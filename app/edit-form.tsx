"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { editTodo } from "./actions";
import { MdEdit, MdClose } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  id: number;
  todo: string;
}

const initialState = { message: null, success: null };

function Modal({ isOpen, onClose, id, todo }: ModalProps) {
  const [state, formAction] = useFormState(editTodo, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state?.success === true) {
      onClose();
    }
  }, [state]);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 ">
          <form action={formAction} className="bg-white p-4 rounded-md">
            <div className="flex justify-end text-white">
              <button
                className="bg-black rounded px-1.5 py-2
            hover:opacity-80 aria-disabled:opacity-50
            aria-disabled:cursor-not-allowed"
                onClick={onClose}
                type="button"
              >
                <MdClose />
              </button>
            </div>
            <label htmlFor="todo">Enter new task name</label>
            <input
              className="w-full box-border mb-2.5 rounded outline-offset-4 border border-stone-300 p-2.5"
              type="text"
              id="todo"
              name="todo"
              defaultValue={todo}
              autoFocus
              required
            />
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="todo" value={todo} />
            <p aria-live="polite" className="sr-only" role="status">
              {state?.message}
            </p>
            <button
              type="submit"
              aria-disabled={pending}
              className="bg-black w-100 text-white rounded w-full px-1.5 py-2
            hover:opacity-80 aria-disabled:opacity-50
            aria-disabled:cursor-not-allowed mb-1.5"
            >
              Edit task
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export function EditForm({ id, todo }: { id: number; todo: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="bg-black rounded text-white p-1 mb-0.5 mt-0.5 mr-0.5 ml-2.5"
        type="submit"
        onClick={() => setIsModalOpen(true)}
      >
        <MdEdit />
      </button>
      <Modal
        id={id}
        todo={todo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></Modal>
    </>
  );
}
