"use client"

import { useState } from "react"
import LandingPage from "@/components/pages/landing-page"
import ActivitySelectionPage from "@/components/pages/activity-selection-page"
import UserInputPage from "@/components/pages/user-input-page"
import LoadingPage from "@/components/pages/loading-page"
import ResultsPage from "@/components/pages/results-page"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    photo: null as string | null,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleActivitySelect = (activity: string) => {
    setSelectedActivity(activity)
    setCurrentPage(2)
  }

  const handleUserDataSubmit = (data: typeof userData) => {
    setUserData(data)
    setIsLoading(true)
    setCurrentPage(3)

    // Simulate processing delay
    setTimeout(() => {
      setIsLoading(false)
      setCurrentPage(4)
    }, 3000)
  }

  const handleReplay = () => {
    setCurrentPage(0)
    setSelectedActivity(null)
    setUserData({ name: "", gender: "", photo: null })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yakult-light via-white to-yakult-accent">
      {currentPage === 0 && <LandingPage onNext={() => setCurrentPage(1)} />}
      {currentPage === 1 && <ActivitySelectionPage onActivitySelect={handleActivitySelect} />}
      {currentPage === 2 && <UserInputPage onSubmit={handleUserDataSubmit} />}
      {currentPage === 3 && <LoadingPage />}
      {currentPage === 4 && <ResultsPage activity={selectedActivity} userData={userData} onReplay={handleReplay} />}
    </div>
  )
}
