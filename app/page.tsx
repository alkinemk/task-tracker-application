import { AddForm } from "@/app/add-form";
import { fetchTasks } from "@/app/lib/helpers";
import { Tasks } from "@/app/components/Tasks";

export const preferredRegion = "home";

export default async function Home() {
  let todos = await fetchTasks();

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <AddForm />
      <Tasks todos={todos} />
    </main>
  );
}
