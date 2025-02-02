import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPaymentDetailAction } from "../../redux_store/actions/PaymentAction";

function ModalOrderDetail({ isOpen, onClose, paymentId }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPaymentDetailAction(paymentId));
    }, [dispatch])
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-2/3">
                <h2 className="text-base sm:text-xl font-bold text-gray-800 mb-4">
                    Đơn hàng chi tiết
                </h2>
                <div>

                </div>
                <div className="flex justify-end mt-6 space-x-4">
                    <button
                        onClick={onClose}
                        className="py-1 px-2 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold
                         bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Thoát
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalOrderDetail;