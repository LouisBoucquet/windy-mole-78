const kv = await Deno.openKv();

type Todo = {
	date: string,
	description: string,
	assignee: string,
	completed: boolean,
}

export async function getTodos() {
	const todosIterated = kv.list({
		prefix: ['todos'],
	});

	const todos: any[] = []

	for await (const todo of todosIterated) {
		todos.push(todo);
	}

	return todos;
}

export async function addTodo(todo: Todo) {
	await kv.set(['todos', crypto.randomUUID()], todo);
}