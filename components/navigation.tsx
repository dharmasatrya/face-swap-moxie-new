"use client"

import { Theater as Create, ImageIcon, User } from "lucide-react"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "create", label: "Create", icon: Create },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "profile", label: "Profile", icon: User },
]

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden backdrop-blur-xl bg-background/40 border-t border-white/10">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-4 px-3 transition-all duration-300 ${
                isActive ? "text-blue-500" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
