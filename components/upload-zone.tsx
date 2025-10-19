"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadZoneProps {
  onImageUpload: (image: string) => void
  uploadedImage: string | null
}

export default function UploadZone({ onImageUpload, uploadedImage }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0])
    }
  }

  if (uploadedImage) {
    return (
      <div className="relative group">
        <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded" className="w-full h-64 object-cover rounded-lg" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
          onClick={() => onImageUpload(null)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition-all duration-300 cursor-pointer ${
        isDragging
          ? "border-blue-500 bg-blue-500/10"
          : "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10"
      }`}
      onClick={() => fileInputRef.current?.click()}
    >
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

      <div className="flex flex-col items-center gap-3">
        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20">
          <Upload className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <p className="text-foreground font-semibold">Drag and drop your picture</p>
          <p className="text-sm text-muted-foreground">or click to browse</p>
        </div>
      </div>
    </div>
  )
}
