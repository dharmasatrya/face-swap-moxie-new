// ============================================
// app/page.tsx - Updated with API Integration (NO UPLOAD NEEDED)
// ============================================
"use client"

import { useState } from "react"
import LandingPage from "@/components/pages/landing-page"
import ActivitySelectionPage from "@/components/pages/activity-selection-page"
import UserInputPage from "@/components/pages/user-input-page"
import LoadingPage from "@/components/pages/loading-page"
import ResultsPage from "@/components/pages/results-page"
import ErrorModal from "@/components/pages/error-modal"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    photo: null as string | null,
  })
  const [swappedImageUrl, setSwappedImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleActivitySelect = (activity: string) => {
    setSelectedActivity(activity)
    setCurrentPage(2)
  }

  const handleUserDataSubmit = async (data: typeof userData) => {
    setUserData(data)
    setIsLoading(true)
    setCurrentPage(3)
    setError(null)

    try {
      // Convert base64 images to data URIs for Replicate
      const userPhotoBase64 = data.photo // This is already base64
      
      // Fetch activity image and convert to base64
      const activityImageMap: Record<string, string> = {
        padel: '/padel.png',
        pilates: '/pilates.png',
      }

      const activityImagePath = activityImageMap[selectedActivity || 'padel']
      const activityImageResponse = await fetch(activityImagePath)
      const activityImageBlob = await activityImageResponse.blob()
      
      // Convert activity image to base64
      const activityImageBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(activityImageBlob)
      })

      // Perform face swap with base64 images
      const faceSwapResponse = await fetch('/api/faceswap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          swap_image: userPhotoBase64, // User's selfie (face source)
          input_image: activityImageBase64, // Activity image (body target)
        }),
      })

      if (!faceSwapResponse.ok) {
        const errorData = await faceSwapResponse.json()
        throw new Error(errorData.error || 'Face swap processing failed')
      }

      const { url } = await faceSwapResponse.json()
      setSwappedImageUrl(url)

      // Move to results page
      setIsLoading(false)
      setCurrentPage(4)

    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memproses gambar')
      setIsLoading(false)
      setCurrentPage(2) // Go back to input page
    }
  }

  const handleReplay = () => {
    setCurrentPage(0)
    setSelectedActivity(null)
    setUserData({ name: "", gender: "", photo: null })
    setSwappedImageUrl(null)
    setIsLoading(false)
    setError(null)
  }

  const handleCloseError = () => {
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yakult-light via-white to-yakult-accent">
      {currentPage === 0 && <LandingPage onNext={() => setCurrentPage(1)} />}
      {currentPage === 1 && <ActivitySelectionPage onActivitySelect={handleActivitySelect} />}
      {currentPage === 2 && <UserInputPage onSubmit={handleUserDataSubmit} />}
      {currentPage === 3 && <LoadingPage />}
      {currentPage === 4 && (
        <ResultsPage 
          activity={selectedActivity} 
          userData={userData} 
          swappedImageUrl={swappedImageUrl}
          onReplay={handleReplay} 
        />
      )}
      
      <ErrorModal 
        isOpen={!!error} 
        onClose={handleCloseError}
        title="Oops! Terjadi Kesalahan"
        message={error || ''}
      />
    </div>
  )
}