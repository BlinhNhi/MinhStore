import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminTemplate from "../../templates/AdminTemplate";
import { useEffect, useState } from "react";
import { TOKEN } from "../variable";
import { getCurrentUserAction } from "../../redux_store/actions/AuthAction";
import Loading from "../../components/Loading/Loading";

const CheckRoleAdmin = ({ Component }) => {
    const dispatch = useDispatch();
    const { userLogin } = useSelector((state) => state.UserReducer);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem(TOKEN) || "";
        if (accessToken) {
            dispatch(getCurrentUserAction(accessToken)).finally(() => {
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [dispatch]);


    if (isLoading) {
        return <div><Loading></Loading></div>;

    }


    if (!userLogin || userLogin.role !== "Admin") {
        return <Navigate to="/" replace />;
    }

    return <AdminTemplate Component={Component} />;
};

export default CheckRoleAdmin;
