// ============================================
// components/pages/results-page.tsx - Updated
// ============================================
"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ResultsPageProps {
  activity: string | null
  userData: {
    name: string
    gender: string
    photo: string | null
  }
  swappedImageUrl: string | null
  onReplay: () => void
}

export default function ResultsPage({ activity, userData, swappedImageUrl, onReplay }: ResultsPageProps) {
  const activityTitles: Record<string, string> = {
    padel: "Siap Padel Bersama Yakult!",
    pilates: "Pilates Pro Bareng Yakult!",
  }

  const activityEmojis: Record<string, string> = {
    padel: "🎾",
    pilates: "🧘",
  }

  const handleSaveImage = async () => {
    if (!swappedImageUrl) return
    
    try {
      const response = await fetch(swappedImageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `yakult-${activity}-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error saving image:', error)
      alert('Gagal menyimpan gambar')
    }
  }

  const handleMoreDetails = () => {
    window.open("https://yakult.co.id", "_blank")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* Result Card */}
        <Card className="border-2 border-yakult-red/20 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-yakult-red to-yakult-red-dark p-8 md:p-12 text-center relative">
            <div className="absolute top-4 right-4 text-4xl opacity-20">{activityEmojis[activity || "padel"]}</div>

            {swappedImageUrl && (
              <img
                src={swappedImageUrl}
                alt="Face Swapped Result"
                className="w-full max-w-md rounded-2xl object-cover mx-auto mb-6 border-4 border-white shadow-lg"
              />
            )}

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{activityTitles[activity || "padel"]}</h2>
            <p className="text-white/90 text-lg">Selamat, {userData.name}!</p>
          </div>
        </Card>

        {/* Promo Text Card */}
        <Card className="border-2 border-yakult-red/20 shadow-lg p-8">
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Jaga kesehatan pencernaanmu dengan Yakult! Setiap hari, jutaan bakteri baik L. casei Shirota siap temani
              aktifmu.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              Minum Yakult setiap hari untuk bantu jaga daya tahan tubuhmu dan maksimalkan setiap gerakanmu!
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={handleMoreDetails}
            className="bg-yakult-red hover:bg-yakult-red-dark text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Selengkapnya di Yakult.co.id
          </Button>
          <Button
            onClick={handleSaveImage}
            className="bg-yakult-accent hover:bg-yakult-accent-dark text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Simpan Gambar
          </Button>
          <Button
            onClick={onReplay}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Coba Lagi
          </Button>
        </div>
      </div>
    </div>
  )
}
