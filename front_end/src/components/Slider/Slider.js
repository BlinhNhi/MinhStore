import Slider from 'react-slick'



import Image1 from '../../assets/hero/sale-cnpHUeHf.png'
import Image2 from '../../assets/hero/shopping-vpNvhQDE.png'
import Image3 from '../../assets/hero/women-NhG2D3pl.png'


const ImageList = [
    {
        id: 1,
        image: Image1,
        title: "70% off on all Products Sale",
        description: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        id: 2,
        image: Image2,
        title: "30% off on all Women's Wear",
        description: "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        id: 3,
        image: Image3,
        title: "Upto 50% off on all Men's Wear",
        description: "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }

]

function CancelArrowSlider(props) {
    const { style } = props;
    return (
        <div
            style={{ ...style, display: "none", background: "red" }}
        />
    );
}


function SliderPage() {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        nextArrow: <CancelArrowSlider />,
        prevArrow: <CancelArrowSlider />,
        pauseOnHover: false,
        pauseOnFocus: true
    };
    return (
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-200 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200'>
            {/*  bg pattern */}

            <div className='h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9'>

            </div>
            {/* hero section */}
            <div className='container pb-8 sm:pb-0'>
                <Slider {...settings}>
                    {ImageList.map((data) => (
                        <div className='' key={data.id}>
                            <div className='grid grid-cols-1 sm:grid-cols-2'>
                                <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                                    <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{data.title}</h1>
                                    <p className='text-sm'>{data?.description}</p>
                                    <div>
                                        <button className='bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full'>
                                            Order Now
                                        </button>
                                    </div>
                                </div>
                                <div className='order-1 sm:order-2'>
                                    <div className='z-10 relative'>
                                        <img
                                            src={data?.image}
                                            alt=''
                                            className='w-[300px] h-[300px] sm:h-[450px] sm:w-[350px] sm:scale-125 lg:scale-120 object-contain mx-auto'
                                        >
                                        </img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

            </div>
        </div>
    );
}

export default SliderPage;