import { TOKEN } from "../../../utils/variable";

function CartShoppingUser() {
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    } else {
        window.location.href = '/';
    }
    return (
        <div>
            CartShoppingUser
        </div>
    );
}

export default CartShoppingUser;