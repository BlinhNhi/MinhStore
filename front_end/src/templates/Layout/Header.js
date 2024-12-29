import { useState, useEffect, useMemo } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { ImSearch } from "react-icons/im";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { TbUserCircle } from "react-icons/tb";
import { IoMdLogIn } from "react-icons/io";

import Logo from '../../assets/logo.png'
import DarkMode from '../../components/DarkMode/DarkMode';
import { getProductsOfSearchNameAction } from "../../redux_store/actions/ProductAcction";
import { getCurrentUserAction } from "../../redux_store/actions/AuthAction";
import { Menu } from "../../utils/data/dataMenuNavbar";
import LowerNavbar from "../../components/LowerNavbar/LowerNavbar";
import { TOKEN } from "../../utils/variable";

const setInput = {
    page: 1,
    searchName: "",
};

function Header() {
    const dispatch = useDispatch();

    const [isOpenMenu, setIsOpenMenu] = useState('hidden ');
    const [valueSearch, setValueSearch] = useState(null);
    let { userLogin } = useSelector(state => state.UserReducer);
    const accessToken = useMemo(() => {
        return localStorage.getItem(TOKEN) || "";
    }, []);
    useEffect(() => {
        setTimeout(() => {
            if (accessToken && accessToken != null) {
                dispatch(getCurrentUserAction(accessToken))
            }
        }, 1000)
    }, [accessToken, dispatch]);

    const handelOnChangeSearch = (e) => {
        setValueSearch(e.target.value);
    }
    const handleSearch = (e) => {
        e.preventDefault();
        setInput.searchName = valueSearch;
        console.log(valueSearch);
        if (valueSearch !== null) {
            dispatch(getProductsOfSearchNameAction(setInput));
            const queryString = new URLSearchParams(setInput).toString();
            window.location.href = `/search?${queryString}`;
        }
    }


    return (
        <div className='shadow-md  dark:bg-gray-900 dark:text-white duration-200 relative z-40'>
            {/* Navbar of Phone */}
            <div
            >
                <div
                    className={`gap-4  pt-10 w-[100%]  fixed text-sm ${isOpenMenu}  top-[-8px] translate-y-1  h-full
                    sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden dark:bg-gray-900/90 bg-white/90 text-gray-700 z-[100] 
                    `}

                >
                    <div
                        className="pb-4 flex justify-between mx-2 border-b-2 border-gray-500 "

                    >
                        <DarkMode></DarkMode>
                        <h1 className="text-2xl font-semibold dark:text-white text-gray-600">Menu</h1>
                        <div
                            onClick={() => {
                                setIsOpenMenu('hidden')
                            }}
                            className="flex gap-1 rounded-2xl items-center w-30 mx-2 px-2 py-1
                 hover:bg-yellow-600 hover:border-yellow-600 dark:hover:bg-yellow-600 dark:hover:border-yellow-600
                  hover:text-white border  dark:bg-white dark:text-black relative bg-gray-500 text-white ">
                            <IoClose className="font-bold text-2xl" />
                            <p className="font-semibold text-sm">Đóng</p>
                        </div>
                    </div>
                    <ul className="flex flex-col gap-3 px-2 mt-2">
                        {Menu.map((data) => (
                            <li key={data.id}>
                                <a className="inline-block px-4 hover:text-primary duration-200 dark:text-white hover:no-underline dark:hover:text-primary" href={data.link}>{data.name}</a>
                            </li>
                        ))}
                        <li className="group relative cursor-pointer px-[16px] py-0">
                            <div className="flex dark:text-white items-center gap-[4px]   hover:no-underline dark:hover:text-orange-400 hover:text-orange-400">
                                Trending Products
                                <span>
                                    <FaAngleDown className="transition-all duration-200 group-hover:rotate-180 " />
                                </span>
                            </div>
                            {/* <div className="w-[200px] bg-red-500 absolute p-4 right-0 bg-transparent"></div>
                    <div className="mt-2 absolute  hidden group-hover:block group-focus:block w-[200px] right-0 rounded-md bg-white p-2 text-black shadow-md">
                        <ul>
                            {DropdownLinks.map((data) => (
                                <li key={data.id} >
                                    <a href={data.link} className="inline-block w-full rounded-md p-2 hover:bg-primary/20 hover:no-underline">{data.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div> */}
                        </li>

                        <li className="group relative  cursor-pointer px-[16px] py-0">
                            <div className=" dark:text-white items-center flex gap-1 hover:no-underline dark:hover:text-orange-400 hover:text-orange-400">
                                <h2 className="">My Account</h2>
                                <TbUserCircle className="text-xl font-bold " />
                            </div>
                            {/* <ul>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                    </ul> */}
                        </li>
                    </ul>
                </div>
            </div>
            {/* upper Navbar */}
            <div className='bg-primary/40 py-2'>
                <div className='container flex justify-between items-center'>
                    <div>
                        <a href='/' className="font-bold text-base sm:text-base md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl items-center  flex gap-2 hover:no-underline hover:text-gray-400 dark:hover:text-orange-200"><img src={Logo} className="w-10 uppercase" alt='Logo'></img>MinhCoi Store</a>
                    </div>
                    {/* search bar and order btn */}
                    <div className='flex justify-between items-center gap-4 relative'>
                        <div className='group relative hidden sm:block'>
                            <form onSubmit={handleSearch}>
                                <input
                                    onChange={handelOnChangeSearch}
                                    type='text'
                                    placeholder='Tìm Kiếm'
                                    className='lg:w-[200px]  xl:w-[200px] md:w-[200px]  2xl:w-[200px]  lg:group-hover:w-[240px] xl:group-hover:w-[240px]
                                     md:group-hover:w-[240px] 2xl:group-hover:w-[240px]  sm:w-[150px] sm:group-hover:w-[200px] 
                                    rounded-full border border-priamry px-2 py-1 focus:border-primary focus:outline-none focus:border-1
                                     dark:bg-gray-800 dark:border-gray-500 transition-all duration-300 '
                                ></input>
                            </form>
                            <ImSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
                        </div>
                        {/* order btn */}
                        <button
                            onClick={() => alert("Ordering not available yet")}
                            className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white focus:outline-none  py-1 px-4 rounded-full hidden sm:flex md:flex xl:flex lg:flex 2xl:flex items-center gap-3 group"
                        >
                            <span className='group-hover:block hidden transition-all duration-200'>Order</span>
                            <FaShoppingCart className='text-xl text-white drop-shadow-sm cursor-pointer' />
                        </button>

                        {/* Dark Mode Switch */}
                        <div className="hidden  sm:block md:block xl:block lg:block 2xl:block">
                            <DarkMode></DarkMode>
                        </div>
                        {/* Information User */}
                        <div>
                            {
                                userLogin !== null ? <div className="hidden sm:block md:block xl:block lg:block 2xl:block relative group cursor-pointer">
                                    <FaUser className="text-3xl rounded-2xl p-1 border-2  hover:border-white  border-primary text-gray-400 hover:text-gray-100 bg-gray-50 hover:bg-primary z-50 " />
                                    <div className="w-[200px] bg-transparent absolute p-4 right-0 "></div>
                                    <ul className="absolute hidden group-hover:block  bg-white  shadow border border-gray-200 z-40 right-0 rounded-md mt-4 px-4 pb-4 text-left w-[200px]">
                                        <li className="text-gray-600  hover:text-primary py-2">
                                            <a href="/system-account/my-account/">Thông Tin Tài Khoản</a>
                                        </li>
                                        <li className="text-gray-600 hover:text-primary   py-2">
                                            <button
                                                onClick={() => {
                                                    localStorage.removeItem(TOKEN)
                                                    window.location.reload()
                                                }}
                                            >
                                                Đăng Xuất
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                    : <div className="hidden sm:block md:block xl:block lg:block 2xl:block relative group cursor-pointer">
                                        <div className="flex items-center justify-center gap-1 hover:text-gray-400 text-gray-700 dark:text-gray-100 dark:hover:text-primary">
                                            <IoMdLogIn className="text-lg font-semibold" />
                                            <a className="text-base font-semibold cursor-pointer " href="/login">
                                                Đăng Nhập
                                            </a>
                                        </div>
                                    </div>
                            }
                        </div>
                        {/* Menu of screen < 640px */}
                        <div
                            onClick={() => {
                                setIsOpenMenu('block transition-all ease-in duration-500 delay-200')
                            }}
                            className="flex items-center justify-center gap-2 cursor-pointer dark:hover:text-white
                    sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden px-2 py-1 border-white border bg-white rounded-lg
                    hover:bg-yellow-500 hover:border-yellow-500  hover:text-white dark:bg-gray-900 dark:hover:bg-yellow-500
                    ">
                            <IoMenu className="font-bold text-xl " />
                            <p className="font-semibold ">Menu</p>
                        </div>

                    </div>
                </div>
            </div>
            <LowerNavbar></LowerNavbar>
            <div className='h-10 sm:hidden'>
                <form onSubmit={handleSearch} >
                    <div className="flex items-center justify-center mt-3 sm:hidden rounded-full border mx-2 py-1 px-4  border-1 dark:bg-gray-800 dark:border-gray-500   transition-all duration-300">
                        <input
                            onChange={handelOnChangeSearch}
                            type='text'
                            placeholder='Tìm Kiếm'
                            className='w-full outline-none  dark:text-gray-100 dark:bg-gray-800 '
                        ></input>
                        <ImSearch className=' cursor-pointer w-10 text-2xl p-1 text-gray-500 hover:text-yellow-500 ' />
                    </div>
                </form>
            </div>
        </div>);
}

export default Header;