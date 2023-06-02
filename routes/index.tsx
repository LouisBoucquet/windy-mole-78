import type { Handlers, PageProps } from "$fresh/server.ts";
import { getTodos } from "../utils/todos.ts";

interface HomeProps {
  todos: any[];
}

export const handler: Handlers<HomeProps> = {
  async GET(_req, ctx) {
    const todos = await getTodos('asdf');

    return ctx.render({ todos });
  },
};

export default function Home(props: PageProps<HomeProps>) {
  return (
    <>
      <form class="bg-red-400 m-4 p-6 rounded-lg text-white" action="/todos/" method="post">
          <input required placeholder="date" name="date" type="datetime-local" />
          <input required placeholder="description" name="description" type="text" />
          <input required placeholder="assignee" name="assignee" type="text" />
          <button>Add todo!</button>
      </form>
      <ul>

      {
        props.data.todos.map(todo => <li>
          TODO:
          <br />
          description: {todo.value.description}
          <br />
          assignee: {todo.value.assignee}
          <br />
          date: {todo.value.date}
          <br />
          completed: {todo.value.completed.toString()}
          <br />
        </li>)
      }
      </ul>
    </>
  );
}
