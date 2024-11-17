
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageNumber from "../PageNumber/PageNumber";
import { getProductListOptionsAction } from "../../redux_store/actions/ProductAcction";

const setInput = {
    searchName: "",
    searchCategory: "",
    searchColor: "",
    searchSize: "",
    fromPrice: "",
    toPrice: "",
    sort: "",
    dayStart: "",
    page: 1
};

function Pagination({ sendValueToSearch }) {
    //?
    const dispatch = useDispatch();
    let { arrProducts, quantityProducts } = useSelector(state => state.ProductReducer)
    const [arrPage, setArrPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isHideEnd, setIsHideEnd] = useState(false);
    const [isHideStart, setIsHideStart] = useState(false);
    const [searchParams] = useSearchParams();


    // console.log("currentPage : ", currentPage);
    useEffect(() => {
        const page = searchParams.get('page');
        console.log('page', page);
        page && +page !== currentPage && setCurrentPage(+page);
        !page && setCurrentPage(1)
        // handleSendToParent();
        setInput.page = currentPage;
        dispatch(getProductListOptionsAction(setInput));
    }, [searchParams]);


    console.log('test', currentPage);
    const handleSendToParent = () => {
        sendValueToSearch(currentPage); // Gửi giá trị từ con ra cha
        console.log(currentPage);
    };

    useEffect(() => {
        let maxPage = Math.ceil(quantityProducts / 8);
        console.log('max page : ', maxPage);
        let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2);
        let start = (currentPage - 2) <= 0 ? 1 : (currentPage - 2);
        let temp = [];
        for (let i = start; i <= end; i++) {
            // push so trang dc hien thi trong phân trang
            temp.push(i);
        }
        setArrPage(temp);
        // console.log(temp);

        // Ẩn thanh start end khi page là 1 và 16
        currentPage >= (maxPage - 2) ? setIsHideEnd(true) : setIsHideEnd(false);
        currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false);

    }, [quantityProducts, arrProducts, currentPage]);
    // console.log(arrPage);



    return (
        <div className="flex items-center justify-center gap-2 py-5">
            {!isHideStart && (
                <PageNumber
                    number={1}
                    setCurrentPage={setCurrentPage}
                ></PageNumber>
            )}
            {(!isHideStart && currentPage !== 4) && <PageNumber number={"..."}></PageNumber>}

            {arrPage.length > 0 &&
                arrPage.map((item) => {
                    return (
                        <PageNumber
                            key={item}
                            number={item}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        ></PageNumber>
                    );
                })}

            {!isHideEnd && <PageNumber number={"..."}></PageNumber>}
            {!isHideEnd && (
                <PageNumber
                    icon={">"}
                    number={Math.floor(quantityProducts / arrProducts.length)}
                    // ?
                    setCurrentPage={setCurrentPage}
                ></PageNumber>
            )}
        </div>
    );
}

export default Pagination;
