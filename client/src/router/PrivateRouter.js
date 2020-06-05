import { connect } from "dva";
import { Redirect } from "react-router-dom"

function PrivateRouter(props) {
    // props就 connect注入的 因为 这个组件要用在别的地方
    if (props.login===undefined) {
        // 未登录  就触发 跳转函数 调到login
        return <Redirect to="/login" />;
    }
    else {
    return props.children;
    }
}
const mapStateToProps = state => ({
    login: state.store.user._id //当前是否有用户登录中
})

export default connect(mapStateToProps, null)(PrivateRouter);

