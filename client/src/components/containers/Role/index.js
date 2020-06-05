import { connect } from "dva";
import Role from '@/components/Role/Role.jsx'


export default connect(
    state => ({
        loginId: state.store.user._id,
        loginName: state.store.user.username
    }), null)(Role)