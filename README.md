# TaskaMani - Task Management System

TaskaMani is a modern task management application built with Next.js, React, and Prisma. It provides a user-friendly interface for managing tasks, including features like task creation, editing, and deletion, as well as task categorization and prioritization.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (version 14 or later)
- npm (usually comes with Node.js)
- PostgreSQL database

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/abdelmottalib/taskamani
   cd taskamani
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/taskamani?schema=public"
   ```
   Replace `username`, `password`, and `taskamani` with your PostgreSQL credentials and desired database name.

4. Set up the database:
   ```
   npx prisma migrate dev
   ```
   This command will create the database and apply all migrations.

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application pages and API routes
- `components/`: React components used throughout the application
- `lib/`: Utility functions and shared code
- `prisma/`: Prisma schema and migrations
- `public/`: Static assets
- `types/`: TypeScript type definitions

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm start`: Runs the built app in production mode
- `npm run lint`: Lints the codebase
- `npm run migrate`: Runs Prisma migrations

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
