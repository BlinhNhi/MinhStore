import Slider from 'react-slick'



import Image1 from '../../assets/hero/nike2.jpg'
import Image2 from '../../assets/hero/adidas.jpg'
import Image3 from '../../assets/hero/shopping-vpNvhQDE.png'


const ImageList = [
    {
        id: 1,
        image: Image1,
        title: "Just Do It",
        description: "Slogan 'Just Do It' của Nike không chỉ là một câu khẩu hiệu đơn thuần mà còn là một thông điệp truyền cảm hứng, một lời nhắc nhở về việc chúng ta cần phải hành động để đạt được những gì mình muốn."
    },
    {
        id: 2,
        image: Image2,
        title: "Impossible is nothing",
        description: " Adidas và slogan 'Impossible is nothing' đã tạo nên một sự kết hợp hoàn hảo, thể hiện tinh thần vượt qua giới hạn và khát khao chinh phục của con người. Thương hiệu này không chỉ cung cấp những sản phẩm chất lượng cao mà còn truyền cảm hứng cho mọi người sống một cuộc sống năng động và ý nghĩa."
    },
    {
        id: 3,
        image: Image3,
        title: "Cùng Chúng Tôi Mua Sắm?",
        description: "Bạn có muốn chọn cho mình một đôi giay khác không?"
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
        speed: 1000,
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
                                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>{data.title}</h1>
                                    <p className='text-sm'>{data?.description}</p>
                                    <div>
                                        <button className='bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full'>
                                            Đặt Hàng Ngay
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