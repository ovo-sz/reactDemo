import { connect } from "dva";
import Menu from '@/components/Menu/Menu.js'
import { routerRedux } from "dva/router"

export default connect(
    state => ({
        loginId: state.store.user._id,
        loginName: state.store.user.username
    }), 
    dispatch => ({
        async onLoginOut() {
            await dispatch(
                { type: "store/loginOut", payload: {} })
            dispatch(routerRedux.replace('/login'))
        }
    }))(Menu)