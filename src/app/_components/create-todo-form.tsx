'use client';

import { createTodo } from '@/lib/db/todo/actions';
import { createTodoSchema } from '@/lib/db/todo/schemas';
import { Todo } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAction, useOptimisticAction } from 'next-safe-action/hooks';

type Props = {
	todos: Todo[];
};
const CreateTodoForm = ({ todos }: Props) => {
	const { execute, status, optimisticState } = useOptimisticAction(createTodo, {
		currentState: todos,
		updateFn: (prevState, newTodo) => {
			return [...prevState, newTodo];
		},
	});
	const { register, handleSubmit, reset } = useForm<
		z.infer<typeof createTodoSchema>
	>({
		resolver: zodResolver(createTodoSchema),
	});
	return (
		<div>
			<form className='space-y-4' onSubmit={handleSubmit(execute)}>
				<Input type='text' {...register('title')} />
				<Button disabled={status === 'executing'}>
					{status === 'executing' ? 'Creating...' : 'Create Todo'}
				</Button>
			</form>
			<div className='space-y-4 mt-12'>
				{optimisticState.map(todo => (
					<p key={todo.id}>{todo.title}</p>
				))}
			</div>
		</div>
	);
};
export default CreateTodoForm;
