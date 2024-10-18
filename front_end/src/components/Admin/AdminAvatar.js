import { Button, Avatar, Popover } from 'antd';

import Image1 from '../../assets/top_product/nike.jpg'

export default function AdminAvatar(props) {
    // let { userLogin } = useSelector(state => state.UserReducer);
    // const dispatch = useDispatch();

    // let accessToken = {}
    // if (localStorage.getItem(TOKEN)) {
    //     accessToken = localStorage.getItem(TOKEN)
    // }

    // useEffect(() => {
    //     if (accessToken != null) {
    //         dispatch(getCurrentUserAction(accessToken))
    //     }
    // }, [accessToken, dispatch]);

    const userLogin = {
        id: 1,
        role: 'Admin',
        name: 'MinhCoi',
        email: 'adminMinhCoi@gmail.com'
    }

    console.log(userLogin?.email);

    const content = (
        <div style={{ width: 200 }}>
            <Button type="text" className='w-full text-left' href="/admin/tripmng">Super Admin</Button>
            <Button type="text" href="/users/profile" className='w-full text-left'>Profile</Button>
            <Button type="text" href="/home" className='w-full text-left' onClick={() => {
                // localStorage.removeItem(TOKEN)
                // window.location.reload()
            }}>Logout</Button>
        </div>
    );

    return <Popover placement="bottomRight" title={userLogin?.email} content={content} trigger="click">
        <button className=''>
            <div className='flex items-center gap-4 bg-blue-100 px-4 py-2 rounded-md hover:bg-blue-200'>
                <img src={Image1} className='w-[32px] h-[32px]  rounded-full' alt=''></img>
                <div className='flex flex-col items-start justify-between '>
                    <h1 className='font-serif text-sm text-gray-600'>{userLogin?.name}</h1>
                    <h3 className='font-normal text-sm text-gray-400'>{userLogin?.role}</h3>
                </div>
            </div>
        </button>
    </Popover>
}