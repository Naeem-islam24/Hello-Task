import Carousel from '../components/Carousel'
import CategoryHomeService from '../components/CategoryHomeService'
import WhyChooseUs from '../components/WhyChooseUs'
import ReviewSection from './reviewsection/ReviewSection'
import ServiceProvider from './ServiceProvider'

const Home = () => {
  return (
    <div>
      <Carousel />
      <CategoryHomeService />
      <WhyChooseUs/>
      <ServiceProvider/>
       <ReviewSection/>

    </div>
  )
}

export default Home
