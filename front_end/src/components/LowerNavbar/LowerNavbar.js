import { FaAngleDown } from "react-icons/fa";
import { DropdownLinks, Menu } from "../../utils/data/dataMenuNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListCategoriesAction } from "../../redux_store/actions/CategoryAction";
import { NavLink } from "react-router-dom";

function LowerNavbar() {
    const dispatch = useDispatch()
    const { arrCategories } = useSelector(state => state.CategoryReducer);
    useEffect(() => {
        dispatch(getListCategoriesAction())
    }, [dispatch])
    return (
        < div className="flex justify-center" >
            <ul className="sm:flex md:flex lg:flex xl:flex 2xl:flex hidden  items-center gap-4 sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base">
                {Menu.map((data) => (
                    <li key={data.id}>
                        <NavLink className="inline-block px-4 hover:text-primary duration-200 hover:no-underline text-base" to={data.link}>{data.name}</NavLink>
                    </li>
                ))}
                <li className="group relative cursor-pointer">
                    <div className="flex items-center gap-[4px]  py-2  hover:no-underline dark:hover:text-orange-400">
                        Hãng Khác
                        <span>
                            <FaAngleDown className="transiton-all duration-200 group-hover:rotate-180 " />
                        </span>
                    </div>
                    <div className="w-[200px] bg-red-500 absolute p-4 right-0 bg-transparent"></div>
                    <div className="mt-2 absolute z-20 hidden group-hover:block group-focus:block w-[200px] right-0 rounded-md bg-white p-2 text-black shadow-md">
                        <ul>
                            {arrCategories?.map((data, i) => (
                                data?.name === "Adidas" || data?.name === "Nike" ? <div key={data?.id}></div> :
                                    <li key={data.id}>
                                        <NavLink key={i} to={`/search?searchCategory=${data.name}&page=1`} className="inline-block w-full text-base rounded-md p-2 hover:bg-primary/20 hover:no-underline">{data?.name}</NavLink>
                                    </li>
                            ))}

                        </ul>
                    </div>

                </li>
                {/* <li className="group relative cursor-pointer">
                    <div className="flex items-center gap-[4px]  py-2  hover:no-underline dark:hover:text-orange-400">
                        Có Thể Bạn Quan Tâm
                        <span>
                            <FaAngleDown className="transiton-all duration-200 group-hover:rotate-180 " />
                        </span>
                    </div>
                    <div className="w-[200px] bg-red-500 absolute p-4 right-0 bg-transparent"></div>
                    <div className="mt-2 absolute z-[30] hidden group-hover:block group-focus:block w-[200px] right-0 rounded-md bg-white p-2 text-black shadow-md">
                        <ul>
                            {DropdownLinks.map((data) => (
                                <li key={data.id} >
                                    <a href={data.link} className="inline-block w-full text-base rounded-md p-2 hover:bg-primary/20 hover:no-underline">{data.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </li> */}
            </ul>


        </div >
    );
}

export default LowerNavbar;