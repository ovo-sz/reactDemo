import { connect } from "dva";
import Nav from '@/components/Nav/Nav.js'
import { routerRedux } from "dva/router"


export default connect(
    state => ({
        loginId: state.store.user._id,
        loginUser: state.store.user,
        loginMenus: state.store.user.role ? state.store.user.role.menus : [],
        title:state.store.title
    }), dispatch=>({
         async setTitle(title){
             await dispatch({type:'store/setTitle',payload:title})
        }
    }))(Nav)