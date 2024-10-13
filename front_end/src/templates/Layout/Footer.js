import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { MdLocationOn } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";

import FooterImage from "../../assets/website/footer.jpg";
import logo from "../../assets/logo.png";
import { BiPhone } from "react-icons/bi";

const footerImg = {
    backgroundImage: `url(${FooterImage})`,
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
};

const footerLinks = [
    {
        title: "Home",
        link: "/",
    },
    {
        title: "About Us",
        link: "/",
    },
    {
        title: "Contact",
        link: "/",
    },
    {
        title: "Blog",
        link: "/",
    },
];

const information = [
    {
        title: "Facebook",
        link: "https://www.facebook.com/lom.cauli",
        icon: <FaFacebook></FaFacebook>
    },
    {
        title: "Zalo",
        link: "/2",
        icon: <SiZalo></SiZalo>
    },
    {
        title: "0917023265",
        link: "tel:0917023265",
        icon: <BiPhone></BiPhone>
    },
]
function Footer() {
    return (
        <div>
            <div className="text-white  pb-44" style={footerImg}>
                <div className="container">
                    <div className="grid md:grid-cols-3 pt-5" data-aos="zoom-in">
                        <div className="py-8 px-4">
                            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
                                <img src={logo} alt="logo" className="max-w-[50px]"></img>
                                MinhCoi Store
                            </h1>
                            <p>
                                Tìm kiếm đôi giày sneaker yêu thích của bạn tại MinhCoi Store,
                                cửa hàng giày sneaker và phụ kiện thời trang đường phố hàng đầu
                                Việt Nam. Chúng tôi có đầy đủ các loại giày sneaker từ
                                các thương hiệu nổi tiếng nhất thế giới từ Nike, Adidas,
                                Converse đến New Balance, Jordan, Vans…v.v. Đội ngũ nhân viên
                                thân thiện và nhiệt tình sẽ giúp bạn tìm được đôi giày hoàn hảo
                                cho phong cách của mình.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
                            <div>
                                <div className="py-8 px-4">
                                    <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                                        Links
                                    </h1>
                                    <ul className="flex flex-col gap-3">
                                        {footerLinks.map((data) => (
                                            <li
                                                className="cursor-pointer hover:text-yellow-500 hover:translate-x-1 duration-300  text-gray-200"
                                                key={data.title}
                                            >
                                                <span>{data?.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <div className="py-8 px-4">
                                    <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                                        Thông Tin Liên Hệ
                                    </h1>
                                    <ul className="flex flex-col gap-3">
                                        {information.map((data) => (
                                            <li
                                                className="
                                                cursor-pointer hover:text-yellow-500 hover:translate-y-3 duration-500 flex gap-4 
                                                items-center text-gray-200"
                                                key={data.title}
                                            >
                                                <div className="font-medium text-lg ">
                                                    {data?.icon}
                                                </div>
                                                <a link={data.link} href={data.link}>{data?.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mt-6">
                                    <a href="/" className="hover:text-yellow-400">
                                        <FaInstagram className="text-3xl"></FaInstagram>
                                    </a>
                                    <a href="/" className="hover:text-yellow-400">
                                        <FaFacebook className="text-3xl"></FaFacebook>
                                    </a>
                                    <a href="/" className="hover:text-yellow-400">
                                        <FaLinkedin className="text-3xl"></FaLinkedin>
                                    </a>
                                </div>
                                <div className="mt-6 flex flex-col gap-3">
                                    <div className="flex items-center gap-3 hover:cursor-pointer">
                                        <MdLocationOn className="text-xl"></MdLocationOn>
                                        <p>Lâm Đồng</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaMobileAlt className="text-xl"></FaMobileAlt>
                                        <a
                                            className="hover:cursor-pointer hover:text-white"
                                            href="tel:0917023265"
                                        >
                                            0917023265
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
