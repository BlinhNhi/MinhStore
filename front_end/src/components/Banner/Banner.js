import BannerImg from '../../assets/women/women2.jpg'
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";

function Banner() {
    return (
        <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center ">
                    <div data-aos="zoom-in">
                        <img src={BannerImg} alt='banner' className='max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,0.2)] object-cover'></img>
                    </div>
                    <div className='flex flex-col justify-center gap-6 sm:pt-0'>
                        <h1 className='text-3xl sm:text-4xl font-bold'>Winter Sale upto 50% Off</h1>
                        <p className='text-base text-gray-500 tracking-wide leading-5 dark:text-gray-100'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio
                        </p>
                        <div className='flex flex-col gap-6'>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <div className='p-2 rounded-full bg-violet-100 dark:bg-violet-400 h-13 w-13 shadow-sm'>
                                    <GrSecure className='text-gray-500 font-bold dark:text-gray-100 text-2xl text-center'></GrSecure>

                                </div>
                                <p className='text-sm font-semibold text-gray-600 dark:text-gray-100'>Quantity Products</p>
                            </div>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <div className='p-2 rounded-full bg-yellow-100 dark:bg-yellow-400 h-13 w-13 shadow-sm'>
                                    <IoFastFood className='text-gray-500 font-bold dark:text-gray-100 text-2xl text-center'></IoFastFood>

                                </div>
                                <p className='text-sm font-semibold text-gray-600 dark:text-gray-100'>Fast Delivery</p>
                            </div>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <div className='p-2 rounded-full bg-green-100 dark:bg-green-400 h-13 w-13 shadow-sm'>
                                    <GiFoodTruck className='text-gray-500 font-bold dark:text-gray-100 text-2xl text-center'></GiFoodTruck>

                                </div>
                                <p className='text-sm font-semibold text-gray-600 dark:text-gray-100'>Easy Payment method</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;