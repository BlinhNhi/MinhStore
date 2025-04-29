import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";

import { Form } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BsThreeDots } from "react-icons/bs";

import { getCommentByIdProductAction } from "../../redux_store/actions/CommentAction";
import { getCodeProduct } from "../../utils/format/getCodeProduct";
import { createConnection } from "../../utils/signalR";
import ActionPopover from "../ActionPopover/ActionPopover";

const connection = createConnection("https://localhost:7234/commentHub");
const Comment = ({ productId, userId }) => {
    const dispatch = useDispatch();
    let { arrComment } = useSelector((state) => state.CommentReducer);
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState(arrComment);
    const [menuOpen, setMenuOpen] = useState(null);
    const editorRef = useRef();

    useEffect(() => {
        dispatch(getCommentByIdProductAction(productId));
    }, [productId]);

    useEffect(() => {
        const startConnection = async () => {
            try {
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
        setComments(arrComment);
        // Clean up khi component bị unmount hoặc khi productId thay đổi
        return () => {
            connection.off("ReceiveComment");
        };
    }, [productId, arrComment]);

    const handleSend = async () => {
        if (!message.trim()) return;
        await connection.invoke("SendComment", productId, userId, message);
        editorRef.current.setData("");
    };

    const handleCancelSend = () => {
        setMessage("");
        if (editorRef.current) {
            editorRef.current.setData("");
        }
    };

    const toggleMenu = (index) => setMenuOpen(prev => prev === index ? null : index);


    return (
        <div className="space-y-4">
            <div className="space-y-2">
                {comments.map((c, idx) => (
                    <div key={idx} className="p-3 border rounded-lg shadow-md bg-gray-100 flex items-center justify-between">
                        <div>
                            <div className="flex gap-2 items-center">
                                <h3 className="text-primary text-base font-bold">{getCodeProduct(c.userId)}</h3>
                                <span className="text-sm text-gray-500 font-normal">{new Date(c.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: c.message }}></div>
                        </div>
                        <div className="relative">
                            <button onClick={() => toggleMenu(idx)}>
                                <BsThreeDots className="text-xl cursor-pointer dark:text-gray-400 dark:hover:text-gray-500" />
                            </button>
                            {menuOpen === idx && (
                                <ActionPopover id={c.id}></ActionPopover>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col">
                <Form.Item >
                    <CKEditor
                        className="rounded-lg overflow-hidden"
                        name="content"
                        editor={ClassicEditor}
                        config={{
                            placeholder: "Nhập bình luận tại đây..."
                        }}
                        onChange={(event, editor) => {
                            setMessage(editor.getData())
                        }}
                        onReady={(editor) => {
                            editorRef.current = editor;
                            editor.editing.view.change((writer) => {
                                writer.setStyle(
                                    "height",
                                    "200px",
                                    editor.editing.view.document.getRoot()
                                );
                            });
                        }}
                    ></CKEditor>
                </Form.Item>
                <div className="flex gap-2 w-full">
                    <button
                        onClick={handleSend}
                        className="px-3  py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 focus:outline-none"
                    >
                        Bình luận
                    </button>
                    <button
                        onClick={handleCancelSend}
                        className="px-3  py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 focus:outline-none"
                    >
                        Huỷ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Comment);
