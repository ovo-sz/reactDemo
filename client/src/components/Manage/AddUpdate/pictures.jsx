import React, { useState, useEffect } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { reqDeleteImg } from '@/api'
export default (props) => {
    const [fileList, setFileList] = useState([]);//图片列表 要么为默认图片 要么 为 传入图片
    const imgUrl = 'http://localhost:5000/upload/';
    const [previewVisible, setPreviewVisible] = useState(false);//是否显示图片预览窗口
    const [previewImage, setPreviewImage] = useState('');//大图的url
    const handlePreview = (file) => {
        setPreviewImage(file.url || file.thumbUrl);//thumbUrl  没上传成功的话 显示图片的base64 默认显示
        setPreviewVisible(true);
    }

    // 上传 /  删除 图片
    const handleChange = async ({ file, fileList }) => {
        //一旦上传成功 将图片信息纠正 name和url
        if (file.status === 'done') {//上传图片
            // file 当前操作图片  
            const result = file.response;//{status:0,data:{name:'xxx.png',url:'图片地址'}}
            if (result.status === 0) {
                message.success('上传图片成功')
                const { name, url } = result.data;
                // 注意 file 传入了 fileList 之后 会变成不一样的对象(但是值是相同的 文件一样) 所以要从fileList赋值
                file = fileList[fileList.length - 1]
                file.name = name;
                file.url = url;
                setPreviewImage(file.url)  //设置预览图

            } else {
                message.error('上传图片失败')

            }
        } else if (file.status === 'removed') {//删除图片
            console.log(file.name)
            const result = await reqDeleteImg(file.name)
            if (result.status === 0) {
                message.success('删除图片成功')

            } else {
                message.error('删除图片失败')

            }
        }

        setFileList([...fileList])

        console.log(fileList)
    }
    const handleCancel = () => {//隐藏图片预览
        setPreviewVisible(false);
    }
    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div >Upload</div>
        </div>
    );
    // 获取所有已上传图片的文件名数组   传给父组件
    useEffect(() => {
        props.getImages(fileList)
    }, [fileList]);
    // componentDitMount
    useEffect(() => {
        if (props.imgs) {
            if (Array.isArray(props.imgs)) {
                const imgList = props.imgs.map((img, index) => ({
                    uid: -index,
                    name: img,
                    status: 'done',
                    url: imgUrl + img

                }))
                setFileList(imgList)
            } else {
                setFileList([])
            }
        }

    }, []);
    return (
        <>
            <Upload
                // /db 如果是开发模式加上这个在action请求链接前面
                action='http://localhost:5000/manage/img/upload'//上传图片的地址
                listType="picture-card"
                accept='image/*'//只接收图片
                name='image' //指定发送到后台的名字  请求参数名
                fileList={fileList} //已经上传图片的列表
                onPreview={handlePreview} //显示指定图片的预览图
                onChange={handleChange}
            >
                {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            {/* 图片预览↓ */}
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
}
