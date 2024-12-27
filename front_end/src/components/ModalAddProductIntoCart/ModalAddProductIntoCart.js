function ModalAddProductIntoCart({ isOpen, onClose, nameProduct }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 sm:w-1/3">
                <h2 className="text-xl text-center font-bold text-gray-800 mb-4">
                    Sản Phẩm Đã Thêm.
                </h2>
                <p className="text-gray-600">
                    Sản phẩm  <strong>{nameProduct}</strong> đã được thêm vào giỏ hàng!
                </p>

                <div className="flex flex-col md:flex-row justify-center mt-6 gap-2 ">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Đóng
                    </button>
                    <button
                        onClick={() => {
                            window.location.href = '/system-account/cart-shopping';
                        }}
                        className="px-4 py-2 bg-primary/80 text-white rounded hover:bg-primary"
                    >
                        Xem Giỏ Hàng
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ModalAddProductIntoCart;