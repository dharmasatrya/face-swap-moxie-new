"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ActivitySelectionPageProps {
  onActivitySelect: (activity: string) => void
}

export default function ActivitySelectionPage({ onActivitySelect }: ActivitySelectionPageProps) {
  const activities = [
    {
      id: "padel",
      title: "Bermain Padel",
      icon: "🎾",
      description: "Olahraga yang menyenangkan dan energik",
    },
    {
      id: "pilates",
      title: "Pilates",
      icon: "🧘",
      description: "Latihan fleksibilitas dan kekuatan inti",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-yakult-red mb-4 text-center">Pilih Aktivitasmu</h1>
        <p className="text-center text-gray-600 mb-12 text-lg">Ayo Mulai Bergerak!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="cursor-pointer border-2 border-yakult-red/20 hover:border-yakult-red hover:shadow-xl transition-all duration-300 overflow-hidden group"
              onClick={() => onActivitySelect(activity.id)}
            >
              <div className="p-8 text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {activity.icon}
                </div>
                <h2 className="text-2xl font-bold text-yakult-red mb-2">{activity.title}</h2>
                <p className="text-gray-600 mb-6">{activity.description}</p>
                <Button
                  className="w-full bg-yakult-red hover:bg-yakult-red-dark text-white font-semibold py-2 rounded-lg transition-all duration-300"
                  onClick={() => onActivitySelect(activity.id)}
                >
                  Pilih
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
