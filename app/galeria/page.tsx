export default function GalleryPage() {
  return (
    <section className="py-20 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
          Galeria
        </h1>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="aspect-square bg-gray-800 rounded-lg overflow-hidden group">
              <img
                src={`https://images.unsplash.com/photo-15${i}0000000-000000000000?w=400&q=80`}
                alt={`Projeto ${i}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}