import React, { Component } from 'react'
import { Button, Layout, Form, Input, Icon, message } from 'antd'
import { Redirect } from "react-router-dom"
import withRouter from "umi/withRouter"
import css from './Login.less'
import { reqLogin } from '@/api';
const { Header, Content } = Layout;
const formTailLayout = {
    wrapperCol: { span: 18, offset: 3 },
};
/**
 * 进行login.js组件
 * 1.使用Form 进行表单验证
 * 2.onSumbit提交表单 并阻止默认事件
 * 3.将用户名和密码 提交到 请求接口进行请求 请求成功跳转到 / 路径
 * 4.将当前登录用户和可以登录用户 存到model 中
 * 5.完成 存到model的值将进行 路由权限校验(src>router) 和 检测当前用户是否登录
 */
class studentForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault(); //阻止表单默认行为：提交
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                message.error('输入格式有误,请重新输入')
            } else { //验证都通过
                //请求登录接口
                const result = await reqLogin(values.username, values.password)
                if (result.status === 0) {
                    message.success('登陆成功', 1, () => {
                        // 延迟1s 进行跳转
                        console.log(result.data)
                        this.props.onisUser(result.data); //设置当前登录用户信息
                        //将登录时的值 传入跳转过后的界面 以便权限路由 通过传入值与model的值进行对比
                        this.props.history.replace("/");
                    })
                } else {
                    message.error('账号密码错误,请重新输入', result.msg)
                }


            }
        })
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.props.loginId) {
            return <Redirect to="/" /> //如果已经登录了 访问login直接跳转到首页
        }
        return (
            <div className={css.container} >
                <Header className={css.header}>react后台系统练习</Header>
                <Content className={css.contents}>
                    <Form className={css.login} onSubmit={this.handleSubmit}>
                        <h2>后台管理系统</h2>
                        <Form.Item className={css.item} {...formTailLayout}>
                            {getFieldDecorator("username", {
                                initialValue: 'admin',
                                rules: [
                                    { required: true, message: "账户必须填写" },
                                    { whitespace: true, message: "不能含有空格" }

                                ]
                                // 如果你修改 就可以修改  如果为添加就不能动
                            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的账号" />)}
                        </Form.Item>
                        <Form.Item className={css.item} {...formTailLayout}>
                            {getFieldDecorator("password", {
                                rules: [
                                    { min: 2, required: true, message: '密码必须大于 3 位' },
                                    { max: 12, message: "密码不得大于12位" },
                                    {/*正则校验 +号每一位进行校验 */ },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: "格式必须为数字,英文,下划线" }
                                ]
                                // 如果你修改 就可以修改  如果为添加就不能动
                            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的密码" />)}
                        </Form.Item>
                        <Form.Item className={css.item} {...formTailLayout}>
                            <Button htmlType="submit" type="primary">登录</Button>
                        </Form.Item>
                    </Form>
                </Content>
            </div>
        )
    }
}
const HOC = Form.create({})
export default withRouter(HOC(studentForm))