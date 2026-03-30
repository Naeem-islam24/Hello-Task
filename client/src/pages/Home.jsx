import Carousel from '../components/Carousel'
import CategoryHomeService from '../components/CategoryHomeService'
import WhyChooseUs from '../components/WhyChooseUs'
import ServiceProvider from './ServiceProvider'

const Home = () => {
  return (
    <div>
      <Carousel />
      <CategoryHomeService />
      <WhyChooseUs/>
      <ServiceProvider/>
    </div>
  )
}

export default Home
