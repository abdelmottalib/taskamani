# TaskaMani - Task Management System

TaskaMani is a modern task management application built with Next.js, React, and Prisma. It provides a user-friendly interface for managing tasks, including features like task creation, editing, and deletion, as well as task categorization and prioritization.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/abdelmottalib/taskamani
   cd taskamani
   ```

2. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```

3. The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `app/`: Contains the main application pages and API routes
- `components/`: React components used throughout the application
- `lib/`: Utility functions and shared code
- `prisma/`: Prisma schema and migrations
- `public/`: Static assets
- `types/`: TypeScript type definitions

## Docker Configuration

The project uses Docker for easy setup and deployment. The main configuration files are:

- `Dockerfile`: Defines the container for the Next.js application
- `docker-compose.yml`: Orchestrates the application and database containers

## Environment Variables

The necessary environment variables are set in the `docker-compose.yml` file. For local development without Docker, you can create a `.env` file in the root directory with the following content:

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
