function ActionPopover({ onDelete, id, onUpdate }) {
    console.log('re-render');
    return (
        <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
            <button
                className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-500"
                onClick={() => console.log("Sửa", id)}
            >
                Sửa
            </button>
            <button
                className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-500 "
                onClick={() => onDelete(id)}
            >
                Xoá
            </button>
        </div>
    );
}

export default ActionPopover;