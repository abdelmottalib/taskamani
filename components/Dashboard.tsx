import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaTasks, FaBars, FaTimes } from 'react-icons/fa';

interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#101213] md:hidden">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-white">TaskaMani</h1>
          <button
            className="p-2 rounded-md bg-gray-800 text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#101213] shadow-md transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-4 flex justify-between items-center md:mt-0 mt-16">
          <h1 className="text-2xl font-bold text-white md:block hidden">TaskaMani</h1>
        </div>
        <nav className="mt-8 w-[90%] mx-auto flex flex-col gap-2">
          <Link href="/" className={`flex rounded-xl items-center px-4 py-3 text-base ${pathname === '/' ? 'bg-[#1D1F20] text-white' : 'text-gray-400 hover:bg-[#1D1F20]'}`}>
            <FaHome className="mr-3 text-lg" /> Home
          </Link>
          <Link href="/tasks" className={`flex rounded-xl items-center px-4 py-3 text-base ${pathname === '/tasks' ? 'bg-[#1D1F20] text-white' : 'text-gray-400 hover:bg-[#1D1F20]'}`}>
            <FaTasks className="mr-3 text-lg" /> Tasks
          </Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#000000] md:mt-0 mt-16">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
