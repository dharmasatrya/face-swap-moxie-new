"use client"

interface StyleSelectorProps {
  selectedStyle: string | null
  onStyleSelect: (style: string) => void
}

const styles = [
  {
    id: "anime",
    name: "Anime",
    image: "/anime-character-art-style-illustration.jpg",
  },
  {
    id: "oil-painting",
    name: "Oil Painting",
    image: "/oil-painting-portrait-style.jpg",
  },
]

export default function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {styles.map((style) => (
        <div
          key={style.id}
          onClick={() => onStyleSelect(style.id)}
          className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
            selectedStyle === style.id ? "ring-2 ring-blue-500 scale-105" : ""
          }`}
        >
          <img
            src={style.image || "/placeholder.svg"}
            alt={style.name}
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <span className="text-white font-semibold">{style.name}</span>
          </div>

          {selectedStyle === style.id && (
            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
