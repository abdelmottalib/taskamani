import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const totalTasks = await prisma.task.count();
  const completedTasks = await prisma.task.count({ where: { status: 'DONE' } });
  const overdueTasks = await prisma.task.count({
    where: {
      dueDate: { lt: new Date() },
      status: { not: 'DONE' },
    },
  });

  const tasksByStatus = await prisma.task.groupBy({
    by: ['status'],
    _count: true,
  });

  const tasksByCategory = await prisma.task.groupBy({
    by: ['category'],
    _count: true,
  });

  const tasksByPriority = await prisma.task.groupBy({
    by: ['priority'],
    _count: true,
  });

  const stats = {
    totalTasks,
    completedTasks,
    overdueTasks,
    tasksByStatus: Object.fromEntries(
      tasksByStatus.map(({ status, _count }) => [status, _count])
    ),
    tasksByCategory: Object.fromEntries(
      tasksByCategory.map(({ category, _count }) => [category, _count])
    ),
    tasksByPriority: Object.fromEntries(
      tasksByPriority.map(({ priority, _count }) => [priority, _count])
    ),
  };

  return NextResponse.json(stats);
}
