import React, { useState, useEffect } from 'react';
import styles from './Manage.less'
import { Link } from 'react-router-dom'
import { Card, Select, Input, Button, Icon, Table, message } from 'antd'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';

const Option = Select.Option;
/**
 * 产品管理主要内容展示
 * 1.使用Card 和 Table 进行简单的布局
 * 2.进行请求数据渲染 配合table的onchange 里的pagenum 点击表格时 传入 当前页码 
 * 3.接收到页码后 服务器那边 将总数据 和 页码 以及 每页展示量 进行相互配合 切割数据 返回list给我们
 * 4.进行搜索字段的请求 获取关键字 以及是描述还是名称来搜索 传入到函数 请求
 * 5.点击上架下架按钮 进行 请求 点击时 切换按钮样式
 * 6.点击上架下架按钮发请求时 当前的页面需要刷新 传入当前的页面进行页面刷新请求
 * 7. 接下来完成添加商品和商品详情
 * 8.点击商品详情是 Link携带当前点击的 商品数据过去 给详情页渲染
 * 9.然后其他的在商品详情Detail.jsx处理
 * 10.完成添加商品
 */
const Manage = () => {
    const [product, setproduct] = useState([])//商品数组
    const [total, setTotal] = useState(0)//总数
    const [pageSize, setPageSize] = useState(3)//每页显示的个数以及请求的个数
    const [pageNum, setPageNum] = useState(3)//分页页码数
    const [loading, setloading] = useState()//每页显示的个数以及请求的个数
    const [searchName, setSearchName] = useState('')//搜索的关键字
    const [searchType, setSearchType] = useState('productName')//搜索的字段 默认按商品名称搜 /其次为描述搜
    const title = (<span className={styles.title}>
        <Select value={searchType} onChange={value => { setSearchType(value) }} style={{ width: 150 }}>
            <Option value='productName'>按名字搜索</Option>
            <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input value={searchName} onChange={e => { setSearchName(e.target.value) }} style={{ width: 150, margin: '0 15px' }} placeholder='请输入关键字' />
        <Button type='primary' onClick={() => { getProducts(1) }}>搜索</Button>
        {/* 每次点搜索 都默认调到第一页 */}

    </span>)
    const extra = (<Link to={{
        pathname: '/commodity/manage/AddUpdate',
        state: { isUpdate: 'add' }
    }}><Button type='primary'>添加商品<Icon type='plus' /></Button></Link>)
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (price) => {
                return `￥ ${price}`//指定返回的形式
            }
        },
        {
            width: 120,
            title: '状态',
            render: (product) => {
                const { status, _id } = product;
                return (
                    <span>
                        <Button type={status === 1 ? 'danger' : 'primary'} onClick={() => {
                            updataStatus(_id, status === 1 ? 2 : 1)
                        }}>{status === 1 ? '下架' : '上架'}</Button>
                        <span>{status === 1 ? '在售' : '已下架'}</span>
                    </span>
                )
            }
        },
        {
            width: 80,
            title: '操作',
            render: (product) => {
                return (
                    <span>
                        <Link to={
                            {
                                pathname: '/commodity/manage/detail',
                                state: { product }
                            }
                        }>详情</Link>
                        <div><Link to={{
                            pathname: '/commodity/manage/AddUpdate',
                            state: {
                                isUpdate: 'update',
                                product: product || {}
                            }
                        }} style={{ color: 'purple' }}>修改</Link></div>
                    </span>

                )
            }
        }
    ];
    // 请求分页数据
    const getProducts = async (pageNum) => {
        setloading(true)
        setPageNum(pageNum)
        let result;
        // 关键字有值 
        if (searchName) { //搜索关键字分类
            result = await reqSearchProducts({ pageNum, pageSize, searchName, searchType })
        } else {    //点击页码 的一般分页
            result = await reqProducts(pageNum, pageSize)//pageSize
        }
        // 分页的逻辑主要在 服务端实现的 
        // 拿到数据 进行设置
        if (result.status === 0) {
            const { total, list } = result.data;
            setTotal(total)//设置页总数
            setproduct(list)//设置请求的商品数组
        }
        setloading(false)
    }
    //更新商品状态
    const updataStatus = async (productId, status) => {
        const result = await reqUpdateStatus(productId, status)
        if (result.status === 0) {
            message.success('修改商品状态成功')
            getProducts(pageNum)
        }
    }
    useEffect(() => {
        getProducts(1)
        return () => { };
    }, [])
    return (
        <Card className={styles.contianer} title={title} extra={extra}>
            <Table dataSource={product} bordered columns={columns}
                loading={loading}
                rowKey='_id'
                pagination={
                    {
                        current: pageNum,
                        defaultPageSize: 3,
                        showQuickJumper: true,
                        total: total,
                        defaultPageSize: pageSize,
                        onChange: (pageNum) => { getProducts(pageNum) }
                    }}

            ></Table>
        </Card>
    );
};



export default Manage;
