import { connect } from "dva";
import Home from '@/components/Home/Home.jsx'

export default connect(
    state => ({
    loginId: state.store.user._id,
}),null)(Home)