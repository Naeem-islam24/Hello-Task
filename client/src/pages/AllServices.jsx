import { useState, useEffect } from 'react'
import axios from 'axios'
import ServiceCard from '../components/ServiceCard'

const AllServices = () => {

    const [services, setServices] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        fetchAllServices()
    }, [search, category, sort, currentPage])

    const fetchAllServices = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/all-services`,
                {
                    params: {
                        search,
                        category,
                        sort,
                        page: currentPage,
                        limit: 8
                    }
                }
            )

            setServices(data.services)
            setTotalPages(data.totalPages)

        } catch (error) {
            console.log(error)
        }
    }

    // 🔍 Search
    const handleSearch = (e) => {
        e.preventDefault()
        const value = e.target.search.value
        setSearch(value)
        setCurrentPage(1)
    }

    // 🔄 Reset
    const handleReset = () => {
        setSearch('')
        setCategory('')
        setSort('')
        setCurrentPage(1)
    }

    return (
        <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>

            {/* 🔎 Filters */}
            <div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-6'>

                    {/* Category */}
                    <select
                        onChange={(e) => {
                            setCategory(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={category}
                        className='border p-3 rounded-lg'
                    >
                        <option value=''>Filter By Category</option>
                        <option value='Ac Solution'>Ac Solution</option>
                        <option value='Cleaning Solution'>Cleaning Solution</option>
                        <option value='Shifting Solution'>Shifting Solution</option>
                        <option value="Health Care">Health Care</option>
                        <option value="Electric Solution">Electric Solution</option>
                        <option value="Maid Service">Maid Service</option>
                    </select>

                    {/* Search */}
                    <form onSubmit={handleSearch}>
                        <div className='flex border rounded-lg overflow-hidden'>
                            <input
                                className='px-4 py-2 outline-none'
                                type='text'
                                name='search'
                                placeholder='Find services...'
                            />
                            <button className='px-4 bg-gray-700 text-white'>
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Sort */}
                    <select
                        onChange={(e) => {
                            setSort(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={sort}
                        className='border p-3 rounded-lg'
                    >
                        <option value=''>Sort</option>
                        <option value='asc'>Ascending</option>
                        <option value='dsc'>Descending</option>
                    </select>

                    {/* Reset */}
                    <button onClick={handleReset} className='px-4 py-2 bg-red-500 text-white rounded-lg'>
                        Reset
                    </button>
                </div>

                {/* 📦 Services */}
                <div className='grid grid-cols-1 gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {services.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))}
                </div>
            </div>

            {/* 🔢 Pagination */}
            <div className="flex justify-center mt-10 gap-2 flex-wrap">

                {/* Prev */}
                <button
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                    Prev
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages).keys()].map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number + 1)}
                        className={`px-4 py-2 rounded-lg border ${
                            currentPage === number + 1
                                ? 'bg-blue-600 text-white'
                                : 'bg-white hover:bg-gray-100'
                        }`}
                    >
                        {number + 1}
                    </button>
                ))}

                {/* Next */}
                <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                    Next
                </button>

            </div>
        </div>
    )
}

export default AllServices