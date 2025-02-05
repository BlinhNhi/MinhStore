import CardDashBoard from "../../../components/CardDashBoard/CardDashBoard";
import ChartAdmin from "../../../components/ChartAdmin/ChartAdmin";
import TableAdmin from "../../../components/TableAdmin/TableAdmin";

function DashBoard() {
    return (
        <div className="text-gray-800 dark:text-gray-200">
            <div className="flex flex-col gap-2">
                <h2 className="font-medium text-xl text-gray-500 dark:text-gray-300">Xin Chào, MinhStore! </h2>
                <h4 className="font-normal text-gray-400 dark:text-gray-200">Đây là những gì diễn ra với cửa hàng bạn từ trước nay.</h4>
                <CardDashBoard></CardDashBoard>

                <div className="mt-10">
                    <ChartAdmin></ChartAdmin>
                </div>
                <TableAdmin></TableAdmin>
            </div>

        </div>
    );
}

export default DashBoard;