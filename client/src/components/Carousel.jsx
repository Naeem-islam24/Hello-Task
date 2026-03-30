// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'

import bgimg1 from '../assets/images/Carosul01.jpg'
import bgimg2 from '../assets/images/Carosul02.jpg'
import bgimg3 from '../assets/images/Carosul03.jpg'

export default function Carousel() {
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <Swiper
        spaceBetween={24}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-xl overflow-hidden shadow-lg"
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text="One-stop solution for your services. Order any service, anytime."
          />
        </SwiperSlide>

        <SwiperSlide>
          <Slide
            image={bgimg2}
            text="Fast, affordable, and reliable service – book now."
          />
        </SwiperSlide>

        <SwiperSlide>
          <Slide
            image={bgimg3}
            text="Any Service, Any Time, Anywhere."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
