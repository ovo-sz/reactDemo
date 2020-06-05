import React, { useEffect } from 'react'
import { Link } from "umi"
import withRouter from "umi/withRouter"
import { Menu, Icon } from "antd"
import styles from './Nav.less'
import menuConfig from '@/config/menuConfig'
const { SubMenu } = Menu;
// <Icon type="user" />
function Nav({ location, loginUser, loginMenus, setTitle }) {
    let path = location.pathname;
    const hasAuth = (item) => { //~查询 登录用户的item(菜单栏)访问权限
        const { key, isPublic } = item;//所有菜单栏访问路径
        const username = loginUser.username || {};
        if (username === 'admin' || isPublic || loginMenus.indexOf(key) !== -1) {
            return true;
        } else if (item.children) {//如果 有item的某个子item权限
            return !!item.children.find(child => loginMenus.indexOf(child.key) !== -1)
        }
        
        return false
        //1.如果当前用户是admin  所有都能看见
        // 2.如果当前item为公开的 直接返回true (默认/home 所有人都可以访问 为公开的)
        //3.看key有没有在menus中
    }
    //显示一级还是二级menu 一级为menu 二级为subMenu
    let getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (path !== '/') { //不允许为根路径因为bug也不知道为啥
                if (item.key === path || path.indexOf(item.key) === 0) {//当前path路径为选中menu路径或者为选中menu路径的子路径都算
                    setTitle && setTitle(item.title) //设置到 库中
                }
            }
            //如果当前用户有对应的item 访问地址权限 就正常显示对应菜单项
            if (hasAuth(item)) {
                if (!item.children) {
                    return (
                        <Menu.Item key={item.key} >
                            <Link to={item.key} onClick={() => {
                                setTitle(item.title)//设置到 库中
                            }} >
                                <span className={styles.title}  >
                                    <Icon type={item.icon} style={{ fontSize: "20px" }} />
                                    <span>{item.title}</span>
                                </span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    return (
                        <SubMenu
                            key={item.key}
                            title={
                                <span className={styles.title} >
                                    <Icon type={item.icon} style={{ fontSize: "20px" }} />
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {getMenuNodes(item.children)}{/*递归children */}
                        </SubMenu>
                    )
                }
            } else {

            }
        })
    };
    const openKeys = [];//展开项
    for (const item of menuConfig) {
        // 访问为二级路由的时候
        if (item.children) { //访问某一个页面的时候 自动打开相应的 menu
            for (const subItem of item.children) {
                if (subItem.key === location.pathname && !openKeys.includes(item.key) || location.pathname.indexOf(subItem.key) === 0) {
        // 如果设置路径 === 当前路径  且 展开数组不包含他 || 或者 !!子路由!! 访问时 展开父级路由的展开项
                    path = subItem.key //展开当前的一级路由
                    openKeys.push(item.key);//存入展开的子路径
                }
            }
        }
    }

    return (      
        //defaultOpenKeys={二级路由展开方法} selectedKeys = 当前的页面路径 当前选中项 = menu key选择路径项
        <Menu defaultOpenKeys={openKeys} selectedKeys={[path]} theme="dark" mode="inline">
            {getMenuNodes(menuConfig)}
        </Menu>
    )
}


export default withRouter(Nav);