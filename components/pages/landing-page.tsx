"use client"

import { Button } from "@/components/ui/button"

interface LandingPageProps {
  onNext: () => void
}

export default function LandingPage({ onNext }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="inline-block bg-yakult-red rounded-full p-4 mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-yakult-red">
              Y
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-yakult-red mb-4 text-balance">Sehat Bersama Yakult</h1>

        <p className="text-lg md:text-xl text-gray-600 mb-12 text-balance">
          Bergabunglah dengan jutaan orang yang menjaga kesehatan pencernaan mereka setiap hari
        </p>

        <Button
          onClick={onNext}
          className="bg-yakult-red hover:bg-yakult-red-dark text-white px-12 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-lg"
        >
          Mulai Sekarang
        </Button>
      </div>
    </div>
  )
}
