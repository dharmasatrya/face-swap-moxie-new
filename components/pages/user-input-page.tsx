"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface UserInputPageProps {
  onSubmit: (data: { name: string; gender: string; photo: string | null }) => void
}

export default function UserInputPage({ onSubmit }: UserInputPageProps) {
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [photo, setPhoto] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ name?: string; gender?: string }>({})
  const [cameraMode, setCameraMode] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (cameraMode && !cameraActive) {
      startCamera()
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [cameraMode])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.")
      setCameraMode(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        const photoData = canvasRef.current.toDataURL("image/jpeg")
        setPhoto(photoData)
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
        }
        setCameraActive(false)
        setCameraMode(false)
      }
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }
    setCameraActive(false)
    setCameraMode(false)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhoto(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}
    if (!name.trim()) newErrors.name = "Nama tidak boleh kosong"
    if (!gender) newErrors.gender = "Pilih jenis kelamin"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ name, gender, photo })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl border-2 border-yakult-red/20 shadow-xl">
        <div className="p-8 md:p-12">
          <h1 className="text-4xl font-bold text-yakult-red mb-2 text-center">Upload Selfie</h1>
          <p className="text-center text-gray-600 mb-8">Lengkapi datamu untuk memulai</p>

          <div className="space-y-8">
            {/* Photo Upload / Camera Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">Foto Selfie</label>

              {!photo && (
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setCameraMode(false)}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      !cameraMode ? "bg-yakult-red text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Upload Foto
                  </button>
                  <button
                    onClick={() => setCameraMode(true)}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      cameraMode ? "bg-yakult-red text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Ambil Foto
                  </button>
                </div>
              )}

              {cameraMode && !photo ? (
                <div className="border-2 border-yakult-red/30 rounded-lg p-8 text-center space-y-4">
                  <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="flex gap-3">
                    <button
                      onClick={capturePhoto}
                      className="flex-1 bg-yakult-red hover:bg-yakult-red-dark text-white font-semibold py-2 rounded-lg transition-all"
                    >
                      Ambil Foto
                    </button>
                    <button
                      onClick={stopCamera}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 rounded-lg transition-all"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-yakult-red/30 rounded-lg p-8 text-center hover:border-yakult-red transition-colors">
                  {photo ? (
                    <div className="space-y-4">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt="Uploaded selfie"
                        className="w-32 h-32 rounded-lg object-cover mx-auto"
                      />
                      <p className="text-sm text-gray-600">Foto berhasil diambil</p>
                      <label className="inline-block">
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        <span className="text-yakult-red cursor-pointer font-semibold hover:underline">Ubah Foto</span>
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                      <div className="space-y-2">
                        <div className="text-4xl">📸</div>
                        <p className="font-semibold text-gray-700">Pilih Gambar</p>
                        <p className="text-sm text-gray-500">atau drag and drop</p>
                      </div>
                    </label>
                  )}
                </div>
              )}
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
              <Input
                type="text"
                placeholder="Masukkan nama lengkapmu"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors({ ...errors, name: undefined })
                }}
                className="w-full px-4 py-3 border-2 border-yakult-red/20 rounded-lg focus:border-yakult-red focus:outline-none"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">Jenis Kelamin</label>
              <div className="flex gap-4">
                {["Pria", "Wanita"].map((option) => (
                  <label key={option} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={gender === option}
                      onChange={(e) => {
                        setGender(e.target.value)
                        if (errors.gender) setErrors({ ...errors, gender: undefined })
                      }}
                      className="w-4 h-4 text-yakult-red"
                    />
                    <span className="ml-2 text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-yakult-red hover:bg-yakult-red-dark text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Upload & Proses
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
