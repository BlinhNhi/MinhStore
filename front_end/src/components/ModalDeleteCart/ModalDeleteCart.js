function ModalDeleteCart({ isOpen, onClose, onConfirm, orderName }) {

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 sm:w-1/3">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Xác nhận xóa đơn hàng
                </h2>
                <p className="text-gray-600">
                    Bạn có chắc muốn xóa đơn hàng: <strong>{orderName}</strong>?
                </p>
                <div className="flex justify-end mt-6 space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalDeleteCart;