import React from "react";
import { Menu, LogOut } from "lucide-react";
import { User } from "firebase/auth";

interface HeaderProps {
  onLogoClick: () => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  isLoggingIn: boolean;
}

export default function Header({
  onLogoClick,
  user,
  onLogin,
  onLogout,
  isLoggingIn,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-4 md:px-6 bg-[#0f0f0f] border-b border-[#222222] text-white select-none backdrop-blur-md bg-opacity-95">
      {/* Left section: castration.fan Logo */}
      <div className="flex items-center gap-4">
        <div 
          onClick={onLogoClick} 
          className="flex items-center gap-2 cursor-pointer active:opacity-85 transition-all duration-200 group"
        >
          <div className="flex items-center justify-center w-8 h-6 bg-red-600 rounded-lg shadow-lg group-hover:bg-red-500 transition-colors">
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight font-sans flex items-center gap-1 text-[#F1F1F1] group-hover:text-white">
            Castration Fans
            <span className="text-[9px] tracking-widest text-[#3EA6FF] font-bold self-center px-1.5 py-0.5 bg-[#181818] border border-[#272727] rounded-full uppercase ml-1">
              PRO
            </span>
          </span>
        </div>
      </div>

      {/* Middle section: Empty placeholder */}
      <div className="flex-1" />

      {/* Right section: Empty placeholder */}
      <div className="flex items-center gap-2" />
    </header>
  );
}
