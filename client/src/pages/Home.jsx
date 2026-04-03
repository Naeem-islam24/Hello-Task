import { useRef } from 'react'
import Carousel from '../components/Carousel'
import CategoryHomeService from '../components/CategoryHomeService'
import WhyChooseUs from '../components/WhyChooseUs'
import ReviewSection from './reviewsection/ReviewSection'
import ServiceProvider from './ServiceProvider'

const Home = () => {
  const reviewRef = useRef();
  return (
    <div>
      <Carousel />
      <CategoryHomeService />
      <WhyChooseUs/>
      <ServiceProvider/>
       <ReviewSection ref={reviewRef} />

    </div>
  )
}

export default Home
