import BannerImgAdidas from '../../assets/banner/adidasBanner.jpg'
import BannerImgNike from '../../assets/banner/nikeBanner.jpg'

import { GrSecure, GrTechnology } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
import { MdDesignServices, MdOutlineHighQuality } from 'react-icons/md';
import { PiHandCoins } from 'react-icons/pi';

function Banner(data) {
    let dataProduct = data;
    console.log(dataProduct?.dataAdidas);
    console.log(dataProduct?.dataNike);

    return (
        <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center ">
                    <div data-aos="zoom-in">
                        <img src={dataProduct?.dataAdidas ? BannerImgAdidas : BannerImgNike} alt='banner' className='max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,0.2)] object-cover'></img>
                    </div>
                    <div className='flex flex-col justify-center gap-6 sm:pt-0'>
                        <h1 className='text-2xl sm:text-3xl font-bold'>{dataProduct?.dataAdidas?.header || dataProduct?.dataNike?.header}</h1>
                        <p className='text-base text-gray-500 tracking-wide leading-5 dark:text-gray-100'>
                            {dataProduct?.dataAdidas?.subHeader || dataProduct?.dataNike?.subHeader}
                        </p>
                        <div className='flex flex-col gap-6'>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <div className='p-2 rounded-full bg-violet-100 dark:bg-violet-400 h-13 w-13 shadow-sm'>
                                    <MdOutlineHighQuality className='text-gray-500 font-bold dark:text-gray-100 text-2xl text-center'></MdOutlineHighQuality>

                                </div>
                                <p className='text-sm font-semibold text-gray-600 dark:text-gray-100'>{dataProduct?.dataAdidas?.descriptionOne || dataProduct?.dataNike?.descriptionOne}</p>
                            </div>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <div className='p-2 rounded-full bg-red-100 dark:bg-red-400 h-13 w-13 shadow-sm'>
                                    <GrTechnology className='text-gray-500 font-bold dark:text-gray-100 text-2xl text-center'></GrTechnology>

                                </div>
                                <p className='text-sm font-semibold text-gray-600 dark:text-gray-100'>{dataProduct?.dataAdidas?.descriptionTwo || dataProduct?.dataNike?.descriptionTwo}</p>

                            </div>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <div className='p-2 rounded-full bg-green-100 dark:bg-green-400 h-13 w-13 shadow-sm'>
                                    <MdDesignServices className='text-gray-500 font-bold dark:text-gray-100 text-2xl text-center'></MdDesignServices>
                                </div>
                                <p className='text-sm font-semibold text-gray-600 dark:text-gray-100'>{dataProduct?.dataAdidas?.descriptionThree || dataProduct?.dataNike?.descriptionThree}</p>
                            </div>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <div className='p-2 rounded-full bg-yellow-100 dark:bg-yellow-400 h-13 w-13 shadow-sm'>
                                    <PiHandCoins className='text-gray-500 font-bold dark:text-gray-100 text-2xl text-center'></PiHandCoins>
                                </div>
                                <p className='text-sm font-semibold text-gray-600 dark:text-gray-100'>{dataProduct?.dataAdidas?.descriptionFour || dataProduct?.dataNike?.descriptionFour}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;