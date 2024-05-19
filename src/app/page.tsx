import prisma from '@/lib/db';
import CreateTodoForm from './_components/create-todo-form';

const HomePage = async () => {
	const todos = await prisma.todo.findMany();
	return (
		<main className='container mx-auto py-24'>
			<h1 className='text-5xl font-semibold mb-4'>Todos</h1>
			<CreateTodoForm todos={todos} />
		</main>
	);
};
export default HomePage;
