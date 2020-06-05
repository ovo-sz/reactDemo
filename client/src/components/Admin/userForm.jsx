import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd'

const Item = Form.Item;
const Option = Select.Option;
const UserForm = (props) => {
    const roles = props.roles;//角色列表
    const userList = props.nowUser || {};//编辑的列表信息
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
    }
    const setForm = () => {
        props.setForm(props.form)
    }

    const { getFieldDecorator } = props.form;
    useEffect(() => {
        setForm()
    }, []);
    return (
        <Form {...formItemLayout}>
            <Item label='用户名'>
                {getFieldDecorator('username', {
                    initialValue: userList.username,
                    rules: [
                        {
                            required: true, message: "用户名称必须填写",
                            min: 2, required: true, message: '用户名必须大于 3 位'
                        }
                    ]
                })(
                    <Input placeholder="请输入用户名"></Input>
                )}
            </Item>
            {/* 修改时不显示密码 添加时才显示 */}
            {userList._id ? null : <Item label='密码'>
                {getFieldDecorator('password', {
                    initialValue: userList.password,
                    rules: [
                        {
                            required: true, message: "密码必须填写",
                            min: 2, required: true, message: '密码必须大于 3 位'
                        }
                    ]
                })(
                    <Input type='password' placeholder="请输入密码"></Input>
                )}
            </Item>}
            <Item label='邮箱'>
                {getFieldDecorator('email', {
                    initialValue: userList.email,

                })(
                    <Input placeholder="请输入邮箱"></Input>
                )}
            </Item>
            <Item label='手机号'>
                {getFieldDecorator('phone', {
                    initialValue: userList.phone,
                })(
                    <Input placeholder="请输入手机号"></Input>
                )}
            </Item>
            <Item label='权限角色'>
                {getFieldDecorator('role_id', {
                    initialValue: userList.role_id,
                    rules: [
                        { required: true, message: "角色必须填写" }
                    ]
                })(
                    <Select placeholder='请选择角色'>
                        {roles.map(role =>

                            <Option key={role._id} value={role._id}>{role.name}</Option>)}
                    </Select>
                )}
            </Item>
        </Form>
    )
}

export default Form.create()(UserForm)