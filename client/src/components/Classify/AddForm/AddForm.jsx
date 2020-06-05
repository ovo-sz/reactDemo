import React, { PureComponent } from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item;
const Option = Select.Option;
// 添加 / 更新分类
class AddForm extends PureComponent {
    static propTypes = {
        categorys: PropTypes.array.isRequired,//一级列表数组
        setForm: PropTypes.func.isRequired,
        parentId: PropTypes.string.isRequired//父分类ID
    }
    componentWillMount() {
        this.props.setForm(this.props.form)
    }
    render() {
        const { categorys,parentId } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (<Form>
            <span>当前分类:</span>
            <Item>
                {getFieldDecorator('parentId', {
                    initialValue: parentId
                })(
                    <Select label="商品分类">
                        <Option value='0'>一级分类列表</Option>
                        {
                            categorys.map(c =>
                                <Option key={c}value={c._id}>{c.name}</Option>
                            )
                        }
                    </Select>

                )}

            </Item>
            <span>添加分类:</span>
            <Item>
                {getFieldDecorator('categoryName', {
                    rules: [
                        { required: true, message: "分类名称必须填写" }
                    ]
                })(
                    <Input placeholder="请输入分类名称"></Input>

                )}
            </Item>
        </Form>)
    }
}
// 更新分类
class UpdateForm extends PureComponent {
    static protoType = {
        categoryName: PropTypes.string,
        setForm: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categoryName } = this.props;
        return (<Form>
            <span>当前分类:</span>
            <Item>
                {getFieldDecorator('categoryName', {
                    initialValue: categoryName,
                    rules: [
                        { required: true, message: "分类名称必须填写" }
                    ]
                })(
                    <Input placeholder="请输入分类名称"></Input>

                )}
            </Item>
        </Form>)
    }
}
const Add = Form.create()(AddForm)
const Update = Form.create()(UpdateForm)
export {
    Add,
    Update
} 
