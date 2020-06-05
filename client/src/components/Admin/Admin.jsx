import React, { useState, useEffect } from 'react';
import styles from './Admin.less'
import { Link } from 'react-router-dom'
import UserForm from './userForm.jsx'
import { Card, Input, Button, Icon, Table, message, Modal } from 'antd'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api';
import dayjs from 'dayjs'
/**
 * 添加 / 修改 用户列表
 * 
 */

const Admin = () => {
    const [pageSize, setPageSize] = useState(3)//每页显示的个数以及请求的个数
    const [isShow, setIsShow] = useState(false);//是否显示模态框
    const [users, setUsers] = useState([]);//用户列表
    const [roles, setRoles] = useState([]);//角色列表
    const [roleName, setRoleName] = useState([]);//角色列表
    const [userForm, setUserForm] = useState();// form对象
    const [nowUser, setNowUser] = useState();//保存当前编辑的user 有的话显示 修改 没有 显示添加用户
    const title = (
        <Button type='primary' onClick={() => {
            setIsShow(true)
            setNowUser(null)
        }}>创建用户</Button>

    )
    // 获取所有用户
    const getUserList = async () => {
        const result = await reqUsers();
        // 获取所有用户列表以及所属角色
        if (result.status === 0) {
            console.log(result)
            const { users, roles } = result.data;
            initRoleName(roles)
            setUsers(users)
            setRoles(roles)
        }
    }
    // 添加/更新用户
    const addUpdateUser = () => {
        setIsShow(false)

        userForm.validateFields(async (err, values) => {
            if (!err) {
                if (nowUser) {//有值为修改
                    values._id = nowUser._id
                }
                const result = await reqAddOrUpdateUser(values)
                console.log(result)
               
                if (result.status === 0) {
                    message.success(`${nowUser ? '修改' : '创建'} 用户成功`)
                    getUserList()
                } else {
                    message.error(`${nowUser ? '修改' : '创建'}用户失败`)
                }
            }
        })
        userForm.resetFields()//清除输入框内容

    }
    // 根据role的数组 生成包含所有角色名的对象(属性名用id值)
    const initRoleName = (roles) => {
        const roleName = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
        setRoleName(roleName)
    }
    //点击删除的提示框
    const deleteUser = (user) => {
        Modal.confirm({
            title: `确定删除${user.username} 吗`,
            onOk: async () => {
                const result = await reqDeleteUser(user._id);
                if (result.status === 0) {
                    message.success('删除用户成功!')
                    getUserList()//重新查询列表
                }

            },
        })
    }
    //点击添加用户
    const updateUser = (user) => {
        setIsShow(true)
        setNowUser(user)
    }

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            render: (create_time) => dayjs(create_time).format(`YYYY - MM - DD  HH: mm: ss`)
        },
        {
            title: '权限角色',
            dataIndex: 'role_id',
            render: (role_id) => roleName[role_id]
        },
        {
            title: '操作',
            render: (user) => {
                return (<span>
                    <Link to={{}} onClick={() => { updateUser(user) }}>修改 </Link>
                    <Link to={{}} onClick={() => { deleteUser(user) }}> 删除</Link>
                </span>)

            }
        },


    ];
    useEffect(() => {
        getUserList()
    }, []);
    return (
        <Card title={title} >
            <Table dataSource={users} bordered columns={columns}
                rowKey='_id'
                pagination={
                    {
                        defaultPageSize: 3,
                        showQuickJumper: true,
                        // total: total,
                        defaultPageSize: pageSize,
                    }}

            ></Table>
            <Modal title={nowUser ? '修改用户' : '创建用户'}
                visible={isShow}
                onOk={addUpdateUser}
                onCancel={() => {
                    userForm.resetFields()//情况之前输入的值
                    setIsShow(false)
                }}
            >
                <UserForm roles={roles}
                    nowUser={nowUser || {}}
                    setForm={(form) => {
                        setUserForm(form)
                    }}></UserForm>
            </Modal>
        </Card>
    );
};



export default Admin;
