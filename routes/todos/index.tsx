import type { Handlers } from "$fresh/server.ts";
import { addTodo } from "../../utils/todos.ts";

export const handler: Handlers<any> = {
	async POST(req, ctx) {
		
		const todo: any = Object.fromEntries((await req.formData()).entries());
		todo.completed = false;

		await addTodo(todo)

		const newUrl = new URL(req.url);
		newUrl.pathname = '/';

		return Response.redirect(newUrl);
	},
};
