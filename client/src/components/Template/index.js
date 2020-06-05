import Menu from '@/components/containers/Menu'
import Nav from '@/components/containers/Nav'
import { connect } from "dva";
import { Layout } from 'antd';
import styles from './index.less'
import withRouter from "umi/withRouter";
import menuConfig from '../../config/menuConfig';



const { Header, Sider, Content } = Layout;

function Index(props) {
  //得到单前需要显示的路径
  return (
    <Layout style={{ height: '100vh', width: '100vw' }}>
      <Header style={{ height: '90px', width: '100vw', lineHeight: '90px' }}><Menu /></Header>
      <Layout>
        <Sider style={{ height: '100vh', width: '100vw', }} width={280}><Nav /></Sider>
        <Layout>
          <span className={styles.title}>当前位置 ><span> {props.title}</span></span>
          <Content style={{ height: 'auto', width: '100%', background: '#fff' }} className={styles.content}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout >
  )
}
export default connect(
  state => ({
    title: state.store.title
  })
)(withRouter(Index))
