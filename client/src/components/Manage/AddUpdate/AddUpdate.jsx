import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './AddUpdate.less'
import withRouter from "umi/withRouter"
import PicturesWall from './pictures.jsx'
import RichTextEditor from './richTextEditor'
import { Link } from 'react-router-dom'
import { reqCategorys, reqAddOrUpdateProduct } from '@/api'
import { Card, Form, Input, Icon, message, Button, Cascader } from 'antd'

/**
 * 产品的添加和更新子路由
 * 使用card 哈 table组件  
 * 其中有用到级联组件 我们请求所有列表 以及请求一二级列表 级联中有二级列表的点击后会出现,但是以一级列表不管有没有二级列表都会有箭头,因为请求数据没有标识是否有二级列表 所以我们需要点2下 这是数据问题  
 * 级联组件最最最终于的是 注意那个loadData 更新options 不要覆盖 [...options]
 * 当点击修改或者添加商品的时候 均 跳入这个组价内 所以跳转时 link传入 关键字判断 且 修改商品需要传入product对象渲染 更新数据
 */
const { Item } = Form;
const { TextArea } = Input;
const ManageAddUpdate = (props) => {
    const { getFieldDecorator, validateFields } = props.form
    const [options, setOptions] = useState([]);
    const [imgList, setImgList] = useState([]);//图片列表
    const Title = props.location.state.isUpdate
    const product = props.location.state.product || {}//修改商品调过来时需要携带数据
    //取出 商品分类ID  pCategoryId 一级列表分类id    categoryId 父级ID 一般为 0    图片数组 商品描述等↓↓
    const { pCategoryId, categoryId, imgs, detail } = product;
    const [editor, setEditor] = useState('')//获取富文本内容
    let categoryIds = []//渲染级联的数组
    if (Title === 'update') {//如果当前为修改
        // 商品是一个一级分类的商品
        if (pCategoryId === '0') {
            categoryIds.push(categoryId)
        } else {
            // 商品是一个二级分类的商品
            categoryIds.push(pCategoryId)
            categoryIds.push(categoryId)
        }
    }
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 8 }
    }

    const title = (
        <>
            <span>
                <Link to='/commodity/manage'><Icon style={{ fontSize: 20 }} type='arrow-left' /></Link>
            </span>
            <span style={{ fontSize: 20 }}>
                {Title === 'update' ? ' 修改商品' : ' 添加商品'}
            </span>
        </>
    )
    // 表单提交
    const submit = () => {//表单验证
        //收集表单数据
        validateFields(async (err, values) => {
            if (!err) {
                const { name, desc, price, categoryIds } = values;
                let pCategoryId, categoryId;
                if (categoryIds.length === 1) {//一级分类
                    pCategoryId = '0' //默认一级列表ID都为0
                    categoryId = categoryIds[0]

                } else { //二级列表
                    pCategoryId = categoryIds[0]
                    categoryId = categoryIds[1]
                }

                const product = { //数据体
                    pCategoryId,
                    categoryId,
                    name,
                    desc,
                    price,
                    imgs: imgList,//图片列表
                    detail: editor//富文本
                }
                // 如果是更新 需要填入_id值   如果是添加 不虚要填入_id值 
                if (Title === 'update') {
                    product._id = props.location.state.product._id;
                }
                const result = await reqAddOrUpdateProduct(product)
                if (result.status === 0) {
                    message.success(`商品${Title === 'update' ? "更新" : "添加"}成功`)
                    props.history.goBack()//返回上一页
                } else {
                    message.error(`商品${Title === 'update' ? "更新" : "添加"}失败`)
                }
            }
        })
    }
    // 自定义验证价格price
    const validataPrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            callback()
        } else {
            callback('价格必须大于0')
        }
    }

    //*请求一级列表 或 二级分类列表
    const getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)
        const categorys = result.data;
        if (result.status === 0) {
            if (parentId === '0') {//一级分类
                initOptions(categorys)//渲染options 
            } else {//二级分类
                return categorys//给到其他函数 处理options的children
            }
        }
    }
    //*初始化渲染options 设置到options
    const initOptions = async (categorys) => {
        const options = categorys.map(c =>
            //*处理一级列表
            ({
                value: c._id,
                label: c.name,
                isLeaf: false//是否显示箭头
            })
        )
        if (Title === 'update' && pCategoryId !== '0') {//*修改商品或者为id=0的时处理  二级列表
            //todo  获取一级列表的分类id pCategoryId 请求获取二级列表
            const subCategorys = await getCategorys(pCategoryId)
            // 生成对应的二级列表 
            const childrenOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true//是否显示箭头
            }))
            // 找到当前商品对应的一级options对象
            const targetOptions = options.find(option => {//value 存的是 id来的
                return option.value === pCategoryId//todo 判断options的一级列表的id是否等于 二级列表的分类id 返回对应的一级列表对象
            });
            //todo  关联到对应的一级列表
            targetOptions.children = childrenOptions
        }
        setOptions([...options])
    }
    // 加载下一级的回调函数
    const loadData = async (selectOptions) => {
        const target = selectOptions[0];//当前选中项
        target.loading = true;//加载中
        const subCategorys = await getCategorys(target.value);//请求到二级列表
        target.loading = false;//加载完毕
        if (subCategorys && subCategorys.length !== 0) {//有二级列表
            const childOptions = await subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true//是否显示箭头
            }))
            // 关联到当前的options的children上
            target.children = childOptions;
        } else { // 无二级分类
            target.isLeaf = true;//没二级分类 就不显示箭头
        }
        // 更新options
        setOptions([...options])
    }

    useEffect(() => {
        getCategorys('0')
    }, [])
    return (
        <Card title={title}>
            <Form {...formItemLayout}>
                <Item className={styles.item} label='商品名称'>
                    {getFieldDecorator('name', {
                        initialValue: product.name,
                        rules: [
                            { required: true, message: "必须输入商品名称" }
                        ]
                    })(
                        <Input placeholder="请输入商品名称"></Input>

                    )}
                </Item>
                <Item className={styles.item} label='商品描述'>
                    {getFieldDecorator('desc', {
                        initialValue: product.desc,
                        rules: [
                            { required: true, message: "必须输入商品描述" }
                        ]
                    })(
                        <TextArea placeholder="请输入商品名称" autoSize={{ minRows: 1, maxRows: 5 }}></TextArea>

                    )}
                </Item>
                <Item className={styles.item} label='商品价格'>
                    {getFieldDecorator('price', {
                        initialValue: product.price,

                        rules: [
                            { required: true, message: "必须输入商品价格" },

                            { validator: validataPrice }
                        ]
                    })(
                        <Input type='number' placeholder="请输入商品名称" addonAfter='元'></Input>

                    )}
                </Item>

                <Item className={styles.item} label='商品分类'>
                    {getFieldDecorator('categoryIds', {
                        initialValue: categoryIds,
                        rules: [
                            { required: true, message: "必须指定商品分类" }
                        ]
                    })(
                        <Cascader
                            loadData={loadData}//选中某一项时加载下一级列表数据
                            options={options}//显示列表数据
                            changeOnSelect
                        />

                    )}
                </Item>
                <Item className={styles.item} label='商品图片'>
                    {console.log(imgList)}

                    {getFieldDecorator('imgList', {
                    })(
                        <PicturesWall imgs={imgs} getImages={(fileList) => {
                            let files = fileList.map(file => file.name)
                            setImgList(files)
                        }}></PicturesWall>

                    )}
                </Item>
                <Item className={styles.item} labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} label='商品详情'>
                    <RichTextEditor geteditor={editorList => setEditor(editorList)} detail={detail}></RichTextEditor>
                </Item >
                <Item className={styles.item} >
                    <Button type='primary' onClick={() => { submit() }}>提交</Button>
                </Item>
            </Form>
        </Card >
    );
};



export default Form.create()(withRouter(ManageAddUpdate))


