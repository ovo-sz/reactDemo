import styles from './Home.less'
import withRouter from "umi/withRouter";
import { Calendar } from 'antd'; 
function Index(props) {
    function onPanelChange(value, mode) {
        console.log(value, mode);
      }
    return (
        <div className = {styles.home}>
            <div className={styles.calendar}>
            <div className={styles.title}>欢迎使用后台管理系统</div>
                <Calendar fullscreen={true}  onPanelChange={onPanelChange} />
            </div>
       </div>
    )
}
export default withRouter(Index)
