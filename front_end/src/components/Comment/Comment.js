import Slider from "react-slick";

const commentData = [
    {
        id: 1,
        name: "Victor",
        cmt: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi Sit asperiores modi",
        avtUser: "https://fastly.picsum.photos/id/986/101/101.jpg?hmac=jfvy3u9hhe57cqHuVyMJ0s36BnPiLv_KUOkdSNJSyfA"
    },
    {
        id: 2,
        name: "Satya Nadella",
        cmt: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi Sit asperiores modi",
        avtUser: "https://picsum.photos/102/102"
    },
    {
        id: 3,
        name: "Sachin Tendulkar",
        cmt: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi Sit asperiores modi",
        avtUser: "https://picsum.photos/103/103"
    },
    {
        id: 4,
        name: "Virat Kohli",
        cmt: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi Sit asperiores modi",
        avtUser: "https://fastly.picsum.photos/id/1068/104/104.jpg?hmac=IjxtHvTSfy-D8RJDcIrPZOVWg2l_T8kMPiJh4LS4X_g"
    },
]

function CancelArrowSlider(props) {
    const { style } = props;
    return (
        <div
            style={{ ...style, display: "none", background: "red" }}
        />
    );
}

function Comment() {
    var settings = {
        dots: true,
        infinite: true,
        // slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linner",
        nextArrow: <CancelArrowSlider />,
        prevArrow: <CancelArrowSlider />,
        pauseOnHover: false,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 100000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="py-10">
            <div className="container">
                <div className="text-center mb-10 max-w-[600px] mx-auto flex flex-col gap-2" data-aos="fade-up">
                    <p className="text-base text-yellow-500">Những ý kiến gần đây</p>
                    <h1 className="text-3xl font-bold">
                        Bình luận
                    </h1>
                    <p className="text-sm text-gray-400">Hãy nói lên ý kiến của bạn. Vì lượt ý kiến của bạn là một phần giúp cửa hàng
                        chúng tôi tiến bộ hơn. Chúng tôi luôn luôn ở bên bạn và lắng nghe ý kiến của bạn để phát triển tốt hơn
                    </p>
                </div>
                <div data-aos="zoom-in">
                    <Slider {...settings}>
                        {commentData?.map((data) => (
                            <div className="my-6">
                                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-orange-400/10 relative w-[80%]" key={data?.id}>
                                    <div className="mb-4">
                                        <img src={data?.avtUser} alt={data?.name} className="rounded-full w-20 h-20"></img>
                                    </div>
                                    <div className="flex items-center gap-4 flex-col">
                                        <div className="space-y-3">
                                            <p className="text-sm text-gray-500 dark:text-gray-100">{data?.cmt}</p>
                                            <h1 className="text-xl font-bold text-black/80 dark:text-white">{data?.name}</h1>
                                        </div>
                                    </div>
                                    <p className="text-black/20 text-9xl font-serif absolute top-0 right-0 dark:text-white">
                                        ''
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Comment;