import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: [
      { updatedAt: 'desc' },
      { createdAt: 'desc' }
    ],
  });
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const data = await request.json();
  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      category: data.category,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
  });
  return NextResponse.json(task);
}

export async function PUT(request: Request) {
  const data = await request.json();
  const { id, ...updateData } = data;
  
  if (updateData.dueDate) {
    updateData.dueDate = new Date(updateData.dueDate).toISOString();
  }

  const task = await prisma.task.update({
    where: { id },
    data: updateData,
  });
  return NextResponse.json(task);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
