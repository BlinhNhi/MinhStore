import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import connection from "../../utils/signalr";
import { useDispatch, useSelector } from "react-redux";
import { getCommentByIdProductAction } from "../../redux_store/actions/CommentAction";

const Comment = ({ productId, userId }) => {
    const dispatch = useDispatch();
    let { arrComment } = useSelector((state) => state.CommentReducer);
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState(arrComment);

    useEffect(() => {
        dispatch(getCommentByIdProductAction(productId));
    }, [productId]);

    useEffect(() => {
        setComments(arrComment); // Cập nhật comments với dữ liệu từ arrComment
    }, [arrComment]);

    // Kết nối SignalR và nhận comment real-time
    useEffect(() => {
        const startConnection = async () => {
            try {
                // Kiểm tra nếu kết nối đang ở trạng thái Disconnected
                if (connection.state === signalR.HubConnectionState.Disconnected) {
                    await connection.start();  // Bắt đầu kết nối tới SignalR Hub
                }
            } catch (err) {
                console.error("Connection failed: ", err);
            }
        };
        startConnection();
        // Lắng nghe sự kiện "ReceiveComment" từ SignalR
        connection.on("ReceiveComment", (receivedProductId, senderId, message, createdAt) => {
            if (receivedProductId === productId) {
                setComments(prev => [...prev, { userId: senderId, message, createdAt }]);
            }
        });
        // Clean up khi component bị unmount hoặc khi productId thay đổi
        return () => {
            connection.off("ReceiveComment");
        };
    }, [productId]);

    // Gửi comment
    const handleSend = async () => {
        if (!message.trim()) return;
        await connection.invoke("SendComment", productId, userId, message);
        setMessage("");
    };

    console.log('render  component Comment');

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                {comments.map((c, idx) => (
                    <div key={idx} className="p-3 border rounded-lg shadow-md bg-gray-100">
                        <strong className="text-blue-500">{c.userId}</strong>: {c.message}
                        <div className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
                    </div>
                ))}
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default React.memo(Comment);
