import { connect } from "dva";
import LoginForm from '@/components/Login/Login.js'
export default connect(
    state => ({
        loginId: state.store.user._id,
    }),
    dispatch => ({
        async onisUser(isUser) {
            await dispatch(
                { type: "store/isUser", payload: { isUser } })
        },
         setTitle(title) {
             dispatch(
                { type: "store/setTitle", payload: { title } })
        }
    }))(LoginForm)