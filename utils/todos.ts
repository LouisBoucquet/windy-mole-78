const kv = await Deno.openKv();

type Todo = {
	date: string,
	description: string,
	assignee: string,
	completed: boolean,
}

export async function getTodos(assignee: string) {
	const todosIterated = kv
		.list({
			prefix: ['todos', assignee],
		});

	const todos: any[] = []

	for await (const todo of todosIterated) {
		todos.push(todo);
	}

	return todos;
}

export async function addTodo(todo: Todo) {
	const mainKey = ['todos', crypto.randomUUID()];
	const assigneeKey = ['todos', todo.assignee, crypto.randomUUID()];

	await kv
		.atomic()
		.check({ key: mainKey, versionstamp: null })
		.check({ key: assigneeKey, versionstamp: null })
		.set(mainKey, todo)
		.set(assigneeKey, todo)
		.commit();
}