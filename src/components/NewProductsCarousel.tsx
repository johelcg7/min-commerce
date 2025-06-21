'use client'

import { ProductCard } from "@/components/ProductCard"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, FreeMode, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  stock: number
}

export default function NewProductsCarousel({ products }: { products: Product[] }) {
  return (
    <div className="relative z-10 w-full max-w-7xl mt-16">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center animate-fade-in uppercase">
        Novedades
      </h2>
      <Swiper
        modules={[Scrollbar, FreeMode, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        freeMode={true}
        loop={true}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="!pb-8"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}