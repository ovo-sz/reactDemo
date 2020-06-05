import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd'
import ReactEacharts from 'echarts-for-react'



//返回柱状图的配置对象

const getOption = () => {
    return {
        title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['小米', '华为(荣耀)', 'VIVO', 'OPPO', '魅族']
        },
        series: [
            {
                name: '访问热度',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 1748, name: '小米' },
                    { value: 2048, name: '华为(荣耀)' },
                    { value: 2122, name: 'VIVO' },
                    { value: 2322, name: 'OPPO' },
                    { value: 600, name: '魅族' },
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
}


const Line = () => {

    return (
        <div>
            <Card title='折线图' >
                <ReactEacharts style={{ width: 700, height: 700, margin: '0 auto' }} option={getOption()}></ReactEacharts>
            </Card>
        </div>
    );
}

export default Line;
