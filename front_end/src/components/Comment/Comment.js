import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";

import { Form, notification } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BsThreeDots } from "react-icons/bs";

import { getCommentByIdProductAction } from "../../redux_store/actions/CommentAction";
import { getListRestrictedWordAction } from "../../redux_store/actions/RestrictedWordAction";
import ActionPopover from "../ActionPopover/ActionPopover";

import { getCodeProduct } from "../../utils/format/getCodeProduct";
import { createConnection } from "../../utils/signalR";

const connection = createConnection("https://localhost:7234/commentHub");
const Comment = ({ productId, userId }) => {
    const dispatch = useDispatch();

    let { arrComment } = useSelector((state) => state.CommentReducer);
    let { arrRestrictedWord } = useSelector((state) => state.RestrictedWordReducer);
    const [comment, setComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);
    const [listComments, setListComments] = useState([]);
    const [menuOpen, setMenuOpen] = useState(null);
    const popoverRef = useRef(null);
    const editorRef = useRef();

    useEffect(() => {
        dispatch(getCommentByIdProductAction(productId));
        dispatch(getListRestrictedWordAction())
    }, [dispatch]);

    useEffect(() => {
        const startConnection = async () => {
            try {
                if (connection.state === signalR.HubConnectionState.Disconnected) {
                    await connection.start();
                }
            } catch (err) {
                console.error("Connection failed: ", err);
            }
        };
        startConnection();
        connection.on("ReceiveComment", (newComment) => {
            if (newComment.productId === productId) {
                setListComments(prev => [...prev, newComment]);
            }
        });
        connection.on("DeleteComment", (deletedId) => {
            setListComments(prev => prev.filter(c => c.id !== deletedId));
        });

        setListComments(arrComment);
        return () => {
            connection.off("ReceiveComment");
            connection.off("DeleteComment");
        };
    }, [productId, arrComment]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setMenuOpen(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCreateComment = async () => {
        const containsRestricted = arrRestrictedWord.some((it) => {
            return comment?.toLowerCase().includes(it?.word?.toLowerCase())
        }
        );
        if (containsRestricted) {
            notification.error({
                closeIcon: true,
                message: "Tạo bình luận thất bại",
                description: <>Bình luận không hợp lệ.</>,
            });
            return;
        }
        else if (!comment.trim()) {
            notification.error({
                closeIcon: true,
                message: "Tạo bình luận thất bại",
                description: <>Vui lòng không nhập khoảng trắng.</>,
            });
            return;
        }
        if (editCommentId) {
            await connection.invoke("UpdateComment", editCommentId, comment);
            setEditCommentId(null);
        } else {
            await connection.invoke("CreateComment", productId, userId, comment);
        }
        editorRef.current.setData("");
        setComment("");
    };

    const handleDeleteComment = useCallback(async (id) => {
        await connection.invoke("DeleteComment", id);
        setMenuOpen(null);
    }, []);

    const handleEdit = useCallback((id, comment) => {
        setEditCommentId(id);
        setComment(comment);
        editorRef.current?.focus();
        editorRef.current?.setData(comment);
    }, []);

    const handleCancelSend = () => {
        setComment("");
        if (editorRef.current) {
            editorRef.current.setData("");
        }
    };

    const toggleMenu = (index) => setMenuOpen(prev => prev === index ? null : index);
    return (
        <div className="space-y-4 w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2">
            <div className="space-y-2">
                {listComments.map((c, idx) => (
                    <div key={idx} className="p-3 border rounded-lg shadow-md bg-gray-100 flex items-center justify-between">
                        <div>
                            <div className="flex gap-2 items-center">
                                <h3 className="text-primary text-base font-bold">{getCodeProduct(c.userId)}</h3>
                                <span className="text-sm text-gray-500 font-normal">{new Date(c.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: c.message }}></div>
                        </div>
                        <div className="relative">
                            {c.userId === userId && <button onClick={() => toggleMenu(idx)}>
                                <BsThreeDots className="text-xl cursor-pointer dark:text-gray-400 dark:hover:text-gray-500" />
                            </button>}
                            {menuOpen === idx && (
                                <div ref={popoverRef}>
                                    <ActionPopover
                                        id={c.id}
                                        comment={c.message}
                                        onDelete={handleDeleteComment}
                                        onEdit={handleEdit}
                                    />
                                </div>
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
                            setComment(editor.getData())
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
                        onClick={handleCreateComment}
                        className="px-3 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500"
                    >
                        {editCommentId ? "Cập nhật" : "Bình luận"}
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
