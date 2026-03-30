/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slide = ({ image, text }) => {
  return (
    <div
      className="relative w-full h-[32rem] lg:h-[38rem] 
bg-top bg-cover bg-no-repeat rounded-xl overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >

      <div className="absolute inset-0 bg-black/50"></div>


      <div className="relative z-10 flex items-center h-full px-6 lg:px-16">
        <div className="max-w-xl text-white">
          <h1 className="text-2xl lg:text-4xl font-semibold leading-snug">
            {text}
          </h1>

          <p className="mt-3 text-sm lg:text-base text-gray-200">
            Book trusted services at affordable prices
          </p>

          <Link
            to="/all-services"
            className="inline-block mt-6 px-6 py-3 text-sm font-medium rounded-md bg-gray-800 hover:bg-gray-700 transition"
          >
            Book Services
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Slide
