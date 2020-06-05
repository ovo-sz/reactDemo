import React, { useState, useEffect } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {rithText} from '@/api/'
/**
 * 富文本编辑器 指定商品详情  yarn add react-draft-wysiwyg  第三方富文本库  注意 他需要手动引入css
 * 在标签 设置editorStyle 给下面输入框样式
 * 
 */


export default (props) => {
    const [editorState, setEditorState] = useState();//初始化数据时 传入
    const uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                // 如果是开发模式 记得/db 加载前面
                xhr.open('POST', 'http://localhost:5000/manage/img/upload');
                const data = new FormData();
                data.append('image', file);//image为传入到接口时文件的名字
                xhr.send(data);
                xhr.addEventListener('load', () => { //成功
                    const response = JSON.parse(xhr.responseText);
                    const url = response.data.url;//得到图片地址
                    resolve({data:{link:url}});//上传图片获取数据
                });
                xhr.addEventListener('error', () => {//失败
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }
    useEffect(() => {
        if (typeof props.detail == 'string') {
            //判断是否富文本已有值
            const contentBlock = htmlToDraft(props.detail);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)//有值付给富文本
            } else {
                setEditorState(EditorState.createEmpty())//没值创建个空的

            }
        }


    }, []);



    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)//创建一个无内容编辑对象 接收内容
    };
    const setEditorList = () => { //设置失焦时 设置内容列表 从而传给父级
        setEditorState(editorState)
        // 这个是将富文本的 html标签传还给父级
        props.geteditor(draftToHtml(convertToRaw(editorState.getCurrentContent())))//触发函数 传给父级

    }
    return (
        <Editor
            editorState={editorState}
            onBlur={setEditorList}
            editorStyle={{ border: '1px solid black', height: 200, marginTop: 20, paddingLeft: 10 }}
            onEditorStateChange={onEditorStateChange}
            toolbar={{ //上传图片 并且显示
                image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
            }}
        />
    )
}
