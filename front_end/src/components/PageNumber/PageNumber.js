import { memo } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

// số và icon phân trang
const notActive =
    "w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300  cursor-pointer rounded-md";
const active =
    "w-[46px] h-[48px] flex justify-center items-center bg-[#E13427] text-white hover:opacity-90 rounded-md";

function PageNumber({ number, currentPage, icon, setCurrentPage, type }) {
    // console.log(currentPage);
    const [searchParams] = useSearchParams()
    let entries = searchParams.entries();
    const location = useLocation()
    const append = (entries) => {
        let params = [];
        searchParams.append('page', +number);
        for (let entry of entries) {
            params.push(entry)
        }
        let searchParamsObject = {};
        params?.forEach(i => {
            // searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] }
            // ?
            if (Object.keys(searchParamsObject)?.some(item => item === i[0] && item !== 'page')) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {

                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }

        });
        return searchParamsObject
    }
    const navigate = useNavigate();
    const handleChangePage = () => {
        if (!(number === "...")) {
            // console.log(append(entries));

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
