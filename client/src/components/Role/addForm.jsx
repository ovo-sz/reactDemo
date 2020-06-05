import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item;
const AddForm = (props) => {
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
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
            <Item label='角色名称'>
                {getFieldDecorator('roleName', {
                    rules: [
                        { required: true, message: "角色名称必须填写" }
                    ]
                })(
                    <Input placeholder="请输入角色名称"></Input>
                )}
            </Item>
        </Form>
    )
}
export default Form.create()(AddForm)