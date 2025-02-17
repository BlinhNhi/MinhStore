import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (onStatusUpdate) => {
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:7234/paymentHub") // Đổi cổng theo backend của bạn
            .withAutomaticReconnect()
            .build();
        connection.start()
            .then(() => console.log("SignalR Connected"))
            .catch(err => console.error("SignalR Connection Error:", err));

        // Lắng nghe sự kiện cập nhật trạng thái đơn hàng
        connection.on("ReceiveOrderStatusUpdate", (orderId, newStatus) => {
            console.log(`Đơn hàng ${orderId} cập nhật trạng thái: ${newStatus}`);
            onStatusUpdate(orderId, newStatus);
        });

        return () => {
            connection.stop();
        };
    }, [onStatusUpdate]);
};

export default useSignalR;