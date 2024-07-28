import React from 'react';
import Image from 'next/image';
import '../app/globals.css';
import { IoMdLogOut } from 'react-icons/io';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
  // username: string;
  // onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen relative`}>
        <div className="bg-cover bg-fixed bg-center filter blur-sm absolute inset-0 z-0" style={{ backgroundImage: "url('/bg.jpg')" }}></div>
        <header className="bg-white shadow-md py-4 p-14 relative z-10">
          <div className="container mx-auto flex justify-between items-center">
            <Image src="/logo.png" alt="Logo" width={100} height={40} />
            <div>
              <a href="#" className="mr-4">Organizations</a>
            </div>
          </div>
        </header>
        <header className="bg-black bg-opacity-35 shadow-md py-4 relative z-10 p-8">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl text-white font-bold">Task Board</div>
            {/* <div className="flex items-center">
              {username && (
                <>
                  <span className="text-white mr-4">{username}</span>
                  <button onClick={onLogout} className="text-white">
                    <IoMdLogOut size={24} />
                  </button>
                </>
              )}
            </div> */}
          </div>
        </header>
        <div className="relative z-10 max-h-screen overflow-y-auto mr-1 scrollbar-hide" style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
