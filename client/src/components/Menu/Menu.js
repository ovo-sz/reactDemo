/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styles from "./Menu.less"
import { Row, Col, Button, Popconfirm } from "antd"
import dayjs from 'dayjs'

export default function (props) {
    let timer;
    let times = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const [nowTime, setnowTime] = useState(times);
    function confirm(e) {
        props.onLoginOut()//登出
    }

    //进行动态调用 时间
    const getTimer = () => {
        timer = setInterval(() => {
            times = dayjs().format(`YYYY-MM-DD  HH:mm:ss`);
            setnowTime(times)
        }, 60000);
    }
    useEffect(() => {
        getTimer()
        return () => {
            clearInterval(timer) //组件卸载时 清除定时器 防止内存泄漏
        }
    }, [])

    return (
        <Row className={styles.header} type="flex" justify="space-between" abc='123'>
            <Col className={styles.title}>
                <h1>后台界面管理系统</h1>
            </Col>

            <Col>
                <span className={styles.times}>{nowTime}</span>
            </Col>

            <Col>
                <span>欢迎你 ></span>
                <span className={styles.user}>{props.loginName}</span>
                <Popconfirm
                    placement="leftBottom"
                    title="是否退出登录"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" shape="circle" icon="logout"></Button>
                </Popconfirm>
            </Col>

        </Row>
    );
}
