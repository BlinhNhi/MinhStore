import React from "react";
function OrderDetail() {
    const order = [
        {
            id: "480751",
            date: "01/2025",
            status: "Đang xử lý",
            total: "2,370,000₫",
            customer: {
                name: "MeoMeo GauGau",
                phone: "1120030120312",
                email: "gauconbubu@gmail.com",
                address: "test 123, Bình Dương",
            },
            shipping: "Miễn phí cho đơn hàng trên 1tr đồng (3-4 ngày)",
            paymentMethod: "Thanh toán khi nhận hàng (COD)",
            items: [
                { name: "Vans Old Skool Classic Black", size: 45, quantity: 1, price: "775,000₫" },
                { name: "Balenciaga Triple S Trainer Black Red", size: 37, quantity: 1, price: "1,595,000₫" },
            ],
        },
    ];

    if (!order) {
        return <p>Không tìm thấy đơn hàng.</p>;
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container">
                <div className="py-10">
                    <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
                    <p>Đơn hàng #{order.id} đã được đặt lúc {order.date} và hiện tại là <strong>{order.status}</strong>.</p>
                    <h2 className="text-xl font-bold mt-4">SẢN PHẨM</h2>
                    <table className="table-auto w-full mt-2 border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Tên sản phẩm</th>
                                <th className="border border-gray-300 px-4 py-2">Size</th>
                                <th className="border border-gray-300 px-4 py-2">Số lượng</th>
                                <th className="border border-gray-300 px-4 py-2">Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.items?.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{item?.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item?.size}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item?.quantity}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item?.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="mt-4">Tổng số phụ: {order.total}</p>
                    <p>Giao nhận hàng: {order.shipping}</p>
                    <p>Phương thức thanh toán: {order.paymentMethod}</p>
                    <h2 className="text-xl font-bold mt-4">ĐỊA CHỈ THANH TOÁN</h2>
                    <p>{order.customer?.name}</p>
                    <p>{order.customer?.address}</p>
                    <p>{order.customer?.phone}</p>
                    <p>{order.customer?.email}</p>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
