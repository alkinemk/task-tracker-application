"use client";

import { useState, useEffect } from "react";
import { Task } from "@/app/types";
import { DeleteForm } from "@/app/delete-form";
import { EditForm } from "@/app/edit-form";

export function Tasks({ todos }: { todos: Task[] }) {
  const [selectedSort, setSelectedSort] = useState("CoTn");
  const [sortedArray, setSortedArray] = useState<Task[]>(todos);

  const sortingFunctions: Record<string, (a: Task, b: Task) => number> = {
    alphabetically: (a, b) => a.text.localeCompare(b.text),
    creation_date_from_oldest_to_newest: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    creation_date_from_newest_to_oldest: (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    updated_date_from_oldest_to_newest: (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    updated_date_from_newest_to_oldest: (a, b) =>
      new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
  };

  useEffect(() => {
    const newArray = todos.slice().sort(sortingFunctions[selectedSort]);
    setSortedArray(newArray);
  }, [selectedSort, todos]);

  return (
    <>
      {sortedArray.length > 0 && (
        <>
          <div className="flex justify-between mt-2.5">
            <div className="font-bold py-0.5">Your tasks</div>
            <div className="w-32">
              <select
                className="ps-1.5  w-full border rounded py-0.5"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                name="sort"
              >
                <option value="alphabetically">alphabetically</option>
                <option value="creation_date_from_oldest_to_newest">
                  creation date (oldest to newest)
                </option>
                <option value="creation_date_from_newest_to_oldest">
                  creation date (newest to oldest)
                </option>
                <option value="updated_date_from_oldest_to_newest">
                  update date (oldest to newest)
                </option>
                <option value="updated_date_from_newest_to_oldest">
                  update date (newest to oldest)
                </option>
              </select>
            </div>
          </div>
          <div className="border rounded mb-2.5 mt-1.5 pt-2.5 p-2.5">
            <div className="grid grid-cols-4 gap-4 px-2.5">
              <span>Task name</span>
              <span>Created at</span>
              <span>Updated at</span>
            </div>
            <ul className="mt-2.5">
              {sortedArray.map((todo) => (
                <li
                  className="bg-white p-2.5 mb-2.5 rounded border border-stone-300 grid grid-cols-4 gap-4 items-center"
                  key={todo.id}
                >
                  <span className="col-span-1">{todo.text}</span>
                  <span className="col-span-1">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </span>
                  <span className="col-span-1">
                    {new Date(todo.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex justify-end col-span-1">
                    <EditForm id={todo.id} todo={todo.text} />
                    <DeleteForm id={todo.id} todo={todo.text} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
