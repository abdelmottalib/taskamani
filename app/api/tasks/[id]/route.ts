import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const data = await request.json();
  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      category: data.category,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
  });

  return NextResponse.json(updatedTask);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ message: 'Task deleted successfully' });
}
