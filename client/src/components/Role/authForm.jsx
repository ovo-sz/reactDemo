import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Tree
} from 'antd'
import menuList from '@/config/menuConfig'

const Item = Form.Item

const { TreeNode } = Tree;

/*
添加分类的form组件
 */
export default class AuthForm extends PureComponent {

  static propTypes = {
    role: PropTypes.object
  }

  constructor(props) {
    super(props)

    // 根据传入角色的menus生成初始状态
    const { menus } = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }

  /*
  为父组件提交获取最新menus数据的方法
   */
  getMenus = () => this.state.checkedKeys


  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}> //* 这里的key 被树组件的CheckedKeys 监听
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  // 选中某个node时的回调
  onCheck = checkedKeys => {
    this.setState({ checkedKeys }); //todo  选中某个数选项 向数组添加该路由路径
    //由于同名 所以只写了一个 不要被迷惑了
  };
  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList)
  }
  // 根据新传入的role来更新checkedKeys状态
  /*
  当组件接收到新的属性时自动调用
   */
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps()', nextProps)
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
    // this.state.checkedKeys = menus
  }

  render() {
    const { role } = this.props
    const { checkedKeys } = this.state
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 6 },  // 左侧label的宽度
      wrapperCol: { span: 18 }, // 右侧包裹的宽度
    }
    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled />
        </Item>
        <Tree
          checkable
          defaultExpandAll={true}//默认展开所有树节点
          checkedKeys={checkedKeys}//手动控制已选中的树选项
          onCheck={this.onCheck}//选中选项获得他的key值
        >
          <TreeNode title="平台权限" key="all">
            {/* 就是上面遍历menuConfig那块 */}
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}