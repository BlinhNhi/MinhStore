import { memo } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const notActive =
    "w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-600 text-lg font-medium cursor-pointer rounded-md";
const active =
    "w-[46px] h-[48px] flex justify-center items-center bg-primary text-white  text-lg font-medium hover:opacity-90 rounded-md";

function PageNumber({ number, currentPage, icon, setCurrentPage, type }) {

    const [searchParams] = useSearchParams()
    let entries = searchParams.entries();
    const location = useLocation()

    const append = (entries) => {
        let params = {};
        for (let [key, value] of entries) {
            if (key !== "page") {
                params[key] = value;
            }
        }
        params["page"] = +number; // Thêm `page` vào sau cùng
        return params;
    };
    const navigate = useNavigate();

    const handleChangePage = () => {
        if (number !== "...") {
            setCurrentPage(+number);
            navigate({
                pathname: location.pathname,
                search: createSearchParams(append(entries)).toString(),
            });
        }
    };


    return (
        <div
            className={+number === +currentPage ? `${active} ${number === '...' ? 'cursor-text' : 'cursor-pointer'}` : `${notActive} ${number === '...' ? 'cursor-text' : 'cursor-pointer'}`}
            onClick={handleChangePage}
        >
            {icon || number}
        </div>
    );
}

export default memo(PageNumber);
