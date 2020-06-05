import React, { useState, useEffect } from 'react';
import { Card, Icon, List, message } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Detail.less'
import withRouter from "umi/withRouter"
import { reqCategory } from '@/api';

/**
 * 产品管理详情页
 * 1.接收manage Link传入过来的商品信息数据 进行渲染
 * 2.然后 商品所属分类那块 需要进行请求  在接收的数据中有父级分类ID和当前分类ID 进行传入
 * 3.2层分类需要请求2次 用promise.all请求即可
 * 
 * 
 */

const Item = List.Item;
const ManageDetail = (props) => {
    console.log(props)
    // pCategoryId 父分类ID, categoryId 当前分类ID
    const { name, desc, price, detail, imgs, pCategoryId, categoryId } = props.location.state.product;
    const imgUrl = 'http://localhost:5000/manage/img/';
    const [cNameOne, setcNameOne] = useState();//一级分类名
    const [cNameTwo, setcNameTwo] = useState();//二级分类名
    const title = (<span>
        <Link to='/commodity/manage'><Icon type="arrow-left"></Icon></Link>
        <span> 商品详情</span>
    </span>)
    const getName = async () => {
        if (pCategoryId === 0) { //一级分类
            const result = await reqCategory(categoryId)
            setcNameOne(result.data.name)
        } else {//二级分类  需要获得一级分类和当前二级分类
            //    reqCategory(pCategoryId)//先查一级分类  父分类
            //      reqCategory(categoryId)//再查二级分类
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
            setcNameOne(results[0].data.name)
            setcNameTwo(results[1].data.name)
        }

    }
    useEffect(() => {
        getName()
    }, [])
    return (
        <Card title={title} className={styles.detail}>
            <List>
                <Item>
                    <span className={styles.title}>商品名称:</span>
                    <span>{name}</span>
                </Item>
                <Item>
                    <span className={styles.title}>商品描述:</span>
                    <span>{desc}</span>
                </Item>
                <Item>
                    <span className={styles.title}>商品价格:</span>
                    <span>{price}元</span>
                </Item>
                <Item>
                    <span className={styles.title}>所属分类:</span>
                    <span>{cNameOne}  {cNameTwo ? '--->' + cNameTwo : ''}</span>
                </Item>
                <Item>
                    <span className={styles.title}>商品图片:</span>
                    {imgs.map(img => (
                        <img src={imgUrl + img} alt={img} key={img}></img>
                    ))}
                </Item>
                <Item >
                    <span className={styles.title}>商品详情:</span>
                    <span className={styles.editor}dangerouslySetInnerHTML={{__html: detail}}></span>
                </Item>
            </List>
        </Card>
    );
};



export default withRouter(ManageDetail);
