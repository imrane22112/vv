import React from "react";
import { 
  Home, 
  Sparkles
} from "lucide-react";

interface SidebarProps {
  resetAll: () => void;
  activeTab: "home" | "exclusive";
  setActiveTab: (tab: "home" | "exclusive") => void;
}

export default function Sidebar({
  resetAll,
  activeTab,
  setActiveTab,
}: SidebarProps) {
  const mainNavigation: { id: "home" | "exclusive"; label: string; icon: any }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "exclusive", label: "Exclusive", icon: Sparkles },
  ];

  const handleTabClick = (tabId: "home" | "exclusive") => {
    setActiveTab(tabId);
    if (tabId === "home") {
      resetAll();
    }
  };

  return (
    <aside className="w-60 bg-[#0f0f0f] border-r border-[#222222] text-[#F1F1F1] flex-shrink-0 hidden md:flex flex-col h-[calc(100vh-3.5rem)] select-none py-3 text-sm">
      {/* Primary Navigation tabs */}
      <div className="px-3 space-y-1">
        {mainNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center gap-5 px-4 py-2.5 rounded-xl text-left transition-all duration-200 font-medium cursor-pointer ${
                isActive 
                  ? "bg-[#272727] text-white font-semibold shadow-md" 
                  : "hover:bg-[#181818] text-[#AAAAAA] hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-red-500" : "text-[#AAAAAA]"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer Details */}
      <div className="mt-auto px-6 py-4 text-[10px] text-[#606060] leading-relaxed font-sans border-t border-[#181818]">
        <p className="hover:underline cursor-pointer">About Press Copyright</p>
        <p className="hover:underline cursor-pointer">Creators Advertise Developers</p>
        <p className="mt-3 font-semibold text-[#808080] hover:text-[#AAAAAA] transition-colors duration-200">© 2026 Castration Fans LLC</p>
      </div>
    </aside>
  );
}
