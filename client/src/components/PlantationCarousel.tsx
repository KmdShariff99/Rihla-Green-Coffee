import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const slides = [
  { src: "/images/coffee-cherries.jpg", alt: "Ripe and green coffee cherries growing on a plantation branch", label: "The cherry stage" },
  { src: "/images/coffee-plantation.jpg", alt: "Coffee plantation landscape in India", label: "Indian origin" },
  { src: "/images/green-coffee-beans.jpg", alt: "Green coffee beans prepared for export", label: "Export-ready green coffee" },
];

export function PlantationCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) => setActiveSlide((current) => (current + direction + slides.length) % slides.length);

  return <div className="relative overflow-hidden bg-primary" aria-roledescription="carousel" aria-label="Coffee origin images">
    <div className="aspect-[4/3] sm:aspect-[16/10]">
      {slides.map((slide, index) => <img key={slide.src} src={slide.src} alt={slide.alt} loading={index === 0 ? "eager" : "lazy"} decoding="async" className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-1000 ${activeSlide === index ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} aria-hidden={activeSlide !== index} />)}
    </div>
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/65 to-transparent px-5 pb-5 pt-16 text-white sm:px-7"><div><p className="eyebrow text-accent">Rihla Global</p><p className="mt-2 font-serif text-2xl">{slides[activeSlide].label}</p></div><div className="flex items-center gap-2"><button type="button" onClick={() => move(-1)} className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-black/20 transition-colors hover:bg-white/20" aria-label="Previous image"><ChevronLeft className="size-4" /></button><button type="button" onClick={() => move(1)} className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-black/20 transition-colors hover:bg-white/20" aria-label="Next image"><ChevronRight className="size-4" /></button></div></div>
    <div className="absolute left-5 top-5 flex gap-1.5 sm:left-7 sm:top-7" role="tablist" aria-label="Choose coffee origin image">{slides.map((slide, index) => <button key={slide.src} type="button" role="tab" aria-selected={activeSlide === index} aria-label={`Show ${slide.label}`} onClick={() => setActiveSlide(index)} className={`h-1.5 rounded-full transition-all ${activeSlide === index ? "w-8 bg-accent" : "w-2 bg-white/60"}`} />)}</div>
  </div>;
}
