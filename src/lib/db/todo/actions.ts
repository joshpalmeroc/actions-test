'use server';

import { actionClient } from '@/lib/safe-action';
import { createTodoSchema } from './schemas';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const createTodo = actionClient
	.schema(createTodoSchema)
	.action(async ({ parsedInput: { title } }) => {
		try {
			await sleep(2000);
			const todo = await prisma.todo.create({
				data: {
					title,
				},
			});
			revalidatePath('/');
			return todo;
		} catch (error) {
			console.error(error);
		}
	});
