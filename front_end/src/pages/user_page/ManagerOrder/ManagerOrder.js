function ManagerOrder() {
    return (
        <div className="mt-10">
            <div class="hidden sm:block overflow-x-auto w-full ">
                <table class="table-auto w-full items-center">
                    <thead className="text-center ">
                        <tr>
                            <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Ngày</th>
                            <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Trạng thái</th>
                            <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Tổng</th>
                            <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Các thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-center ">
                        <tr>
                            <td className="px-6 py-6">01/2025</td>
                            <td className="px-6 py-6">Đang xử lý</td>
                            <td className="px-6 py-6">2,370,000₫ cho 2 mục</td>
                            <td><button class="bg-black dark:bg-gray-200 dark:text-gray-600 text-white px-4 py-2 rounded">Xem</button></td>
                        </tr>
                    </tbody>
                </table>

            </div>


            <div class="sm:hidden w-full">
                <div class="border-2 border-gray-400 rounded-md p-4 mb-4">
                    <div class="flex justify-between mb-2">
                        <span class="font-medium">Ngày</span>
                        <span>01/2025</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="font-medium">Trạng thái</span>
                        <span>Đang xử lý</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="font-medium">Tổng</span>
                        <span>2,370,000₫ cho 2 mục</span>
                    </div>
                    <div class="flex justify-end">
                        <button class="bg-black dark:bg-gray-200 dark:text-gray-600 text-white px-4 py-2 rounded">Xem</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagerOrder;