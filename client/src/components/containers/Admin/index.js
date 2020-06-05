import { connect } from "dva";
import Menu from '@/components/Admin/Admin.jsx'
import { routerRedux } from "dva/router"
export default connect(
    state => ({
        loginId: state.store.user._id,
        loginName: state.store.user.username

    }),
    dispatch => ({
        onLoginOut() {
            dispatch(
                { type: "store/loginOut", payload: null })
            dispatch(routerRedux.replace('/login'))
        }
    }))(Menu)