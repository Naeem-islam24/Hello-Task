/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'


const ServiceCard = ({ service }) => {
  const { _id, title, bannerImage } = service || {}
  //console.log("_id:", _id);

  return (
    <Link
      to={`/service/${_id}`}
      className="w-72 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 block"
    >
      <figure className="w-full h-40 overflow-hidden">
        <img
          src={bannerImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="px-3 py-2 text-center">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
    </Link>
  )
}

export default ServiceCard;
