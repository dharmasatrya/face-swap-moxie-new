export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-yakult-red/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yakult-red animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-yakult-red/10 flex items-center justify-center text-3xl">
              Y
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-yakult-red mb-2">Memproses Hasil Terbaikmu</h2>
        <p className="text-gray-600 text-lg">Yuk, tunggu sebentar...</p>
      </div>
    </div>
  )
}
