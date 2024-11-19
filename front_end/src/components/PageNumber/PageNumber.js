import { memo } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const notActive =
    "w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300  cursor-pointer rounded-md";
const active =
    "w-[46px] h-[48px] flex justify-center items-center bg-[#E13427] text-white hover:opacity-90 rounded-md";

function PageNumber({ number, currentPage, icon, setCurrentPage, type }) {

    const [searchParams] = useSearchParams()
    let entries = searchParams.entries();
    // console.log('entries', entries);
    const location = useLocation()
    // const append = (entries) => {
    //     let params = [];
    //     searchParams.append('page', +number);
    //     for (let entry of entries) {
    //         params.push(entry)
    //         console.log('entry', entry);
    //         console.log('entries', entries);

    //     }
    //     let searchParamsObject = {};
    //     params?.forEach(i => {
    //         if (Object.keys(searchParamsObject)?.some(item => item === i[0] && item !== 'page')) {
    //             searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
    //         } else {

    //             searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
    //         }

    //     });
    //     return searchParamsObject
    // }
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
