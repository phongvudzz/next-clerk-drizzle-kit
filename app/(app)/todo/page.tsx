import { getData } from "@/actions/todo-action";
import Todos from "@/components/todo/todos";

export default async function TodoPage() {
  const todos = await getData();
  return <Todos todos={todos} />;
}
