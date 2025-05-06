import React from "react";

function ActionPopover({ id, comment, onDelete, onEdit }) {
    console.log('re-render');
    console.log(comment);
    return (
        <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
            <button
                className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => onEdit(id, comment)}
            >
                Sửa
            </button>
            <button
                className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => onDelete(id)}
            >
                Xoá
            </button>
        </div>
    );
}

export default React.memo(ActionPopover);
