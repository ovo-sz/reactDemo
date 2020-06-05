import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Table, Button, Icon, message, Modal, Form, Select, Input } from 'antd'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '@/api';
import styles from './Classify.less';
import { Add, Update } from './AddForm/AddForm'
/*
主要思路:
1.请求一级列表  创建参数parentId 默认为0 渲染到表格  0为一级列表 
2.将请求服务器函数 放入到 Effect 进行初次执行请求 一级列表 id 为0
3.点击子列表 要请求道二级列表 , 通过tabel的reder的参数 传入 点击事件中 获取到一级列表的 id值
4.获取到一级列表的id值后 进行设置 parentID  Effect的依赖项 为 parentId ID发生变化 触发effect的请求函数 请求函数更具ID请求
5.将渲染函数绑定到 显示子列表按钮上 二级列表请求完毕 渲染到table  
6.添加返回link 也就是重新传入 0 渲染一级列表 二级列表返回一节列表 就是重新请求
7.完成 添加和修改按钮的点击事件,以及他们显示的框的显示和隐藏 使用的是Model组件内嵌Form组件
8.Form组件是额外的一个模块点击修改按钮 通过父传子 函数 子调用父函数 将里面的Form对象 导出  获取From对应的值 然后进行请求
9.Form组件内 需要父组件传入一级分类名一级ID 给其渲染 option下拉列表 就是添加显示的;
10.进行表单验证 验证通过请求对应分类ID修改后的列表即可

*/

const Classify = () => {
  const [categorys, setcategorys] = useState([]);//一级分类列表
  const [subCategorys, setsubCategorys] = useState([]);//二级分类列表
  const [catLoading, setcatLoading] = useState(true);//加载中
  const [parentId, setparentId] = useState('0');//修改分类ID
  const [parentName, setparentName] = useState('');//修改名称
  // ````````````````````````````````````````````````````````
  const [visible, setvisible] = useState(0);//添加/修改确认框是否显示隐藏 0都不显示 1添加 2修改
  const [categoryName, setcategoryName] = useState('');//点击修改分类 显示当前类型
  const [categoryId, setcategoryId] = useState('');//点击修改分类 显示当前类型的ID  添加分分类也有用到
  const [updateForm, setupdateForm] = useState({});//更新 / 存储Model里面的Form的Form对象以便获取到值
  const [addForm, setaddForm] = useState({});//添加 / 存储Model里面的Form的Form对象以便获取到值

  const columns = [
    {
      title: '分类的名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      width: '300px',
      render: (type) => (//*type为单前点击列表的信息
        <span className={styles.subcate}>
          <Link to={{}} onClick={() => { //指定to为空对象
            updateClick(type)   
          }}>修改分类</Link>
          {parentId === '0' ? <Link to={{}} onClick={() => { //指定to为空对象
            showSubCategorys(type)
          }}>查看子分类</Link> : ''}
        </span>
      )
    },
  ];

  const title = parentId === '0' ? (<span className={styles.catTitle}>一级商品分类列表</span>) : (
    <span className={styles.catTitle}>
      <Link to={{}} onClick={() => { setparentId('0') }}>一级商品分类列表 </Link>
      <Icon type='arrow-right'></Icon>
      <span> {parentName}</span>
    </span>
  )


  const extra = (
    <Button type='primary' onClick={() => {
      addClick()
    }}>
      <Icon type="plus"></Icon>
      添加
    </Button>
  );

  // 请求一级列表
  const getCategorys = async (id) => {
    // 如果传入了id就用他的 否则用state的
    const myId = id || parentId
    const result = await reqCategorys(myId)
    if (result.status === 0) {
      if (myId === '0') { //如果为0为一级
        setcategorys(result.data)
        setcatLoading(false)
      } else {//二级分类列表
        setsubCategorys(result.data)
        setcatLoading(false)
      }

    } else {
      message.error('获取分类列表失败')
    }
  }



  //二级列表获取事件
  const showSubCategorys = (type) => { //获取点击的当前行所有信息
    setcatLoading(true)
    setparentId(type._id) //设置当前id
    setparentName(type.name)//设置当前的分类名

  }

  // 对话框点击取消隐藏
  const AddModalCancel = async () => {
    addForm.resetFields()//清除输入数据 !!  不然修改后 所以表格都会显示修改值
    setvisible(0)
  }
  const UpdateModalCancel = async () => {
    updateForm.resetFields()//清除输入数据 !!  不然修改后 所以表格都会显示修改值
    setvisible(0)
  }

  //显示更新列表
  const updateClick = (type) => {
    setcategoryName(type.name)//设置修改时显示的分类
    setcategoryId(type._id)
    setvisible(2)
  }

  //显示添加列表
  const addClick = () => {
    setvisible(1)
  }




  // 点击确认 添加分类
  const addCategory = (type) => {
    // 表单验证通过才能执行下列的代码
    addForm.validateFields(async (err, values) => {
      if (!err) {
        const { parentId: parentIdForm, categoryName } = values
        setvisible(0);
        addForm.resetFields()//清除输入数据 !! 让下次打开显示正常而不是上次修改值
        const result = await reqAddCategory(categoryName, parentIdForm)
        if (result.status === 0) {
          if (parentIdForm === parentId) {//form选中的id === 分类ID
            getCategorys();//重新请求当前分类id 
          } else if (parentId === '0') { //二级分类列表添加一级列表的分类,重新获取一级分类列表,但不需要显示;
            getCategorys('0') //获取一级列表 不会跳转
          }

        }
      }
    })


  }
  // 点击确认 更新分类
  const updateCategory = (type) => {
    // 表单验证通过才能执行下列的代码
    updateForm.validateFields(async (err, values) => {
      if (!err) {
        setvisible(0);
        const categoryName = values.categoryName;
        updateForm.resetFields()//清除输入数据 !! 让下次打开显示正常而不是上次修改值
        const result = await reqUpdateCategory({ categoryId, categoryName })
        if (result.status === 0) {
          getCategorys();//重新请求
        }
      }
    })

  }



  useEffect(() => {
    getCategorys()
    return () => {
    };
  }, [parentId]); //只要 parentId 依赖项一变化 就马上进行页面重新渲染

  return (
    <>
      <Card title={title} extra={extra} >
        <Table rowKey='_id' bordered dataSource={parentId === '0' ? categorys : subCategorys}
          columns={columns} loading={catLoading}
          pagination={
            {
              defaultPageSize: 5,
              showQuickJumper: true
            }
          } />
      </Card>
      <Modal
        title="添加分类"
        visible={visible === 1}//是否修改
        onOk={addCategory}//回调函数
        onCancel={AddModalCancel}//点击取消
      >
        <Add    //*ADDForm组件
          categorys={categorys}
          parentId={parentId}
          setForm={(form) => { setaddForm(form) }} />
      </Modal>
      <Modal
        title="更新分类"
        visible={visible === 2}//是否修改
        onOk={updateCategory}//回调函数
        onCancel={UpdateModalCancel}//点击取消
      >
        <Update categoryName={categoryName}  //*Update 更新组件
          setForm={(form) => { setupdateForm(form) }}
        />
      </Modal>
    </>
  )
}

export default Classify;
