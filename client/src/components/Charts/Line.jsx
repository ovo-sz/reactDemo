import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd'
import ReactEacharts from 'echarts-for-react'



//返回柱状图的配置对象
const getOption = (sales, stores) => {
    return {
        title: {
            text: '12月手机销量(纯虚拟)'
        },
        legend: {},
        tooltip: {},
        xAxis: {//x轴
            boundaryGap: true,
            type: 'category',
            data: ['小米', '魅族', '华为', '荣耀', 'VIVO', 'OPPO', 'OnePlus', 'Apple']
        },
        legend: {
            data: ['销量(单位:万)', '库存(单位:万)']
        },
        yAxis: {//
            type: 'value'
        },
        series: [{//y轴
            name: '销量(单位:万)',
            scale: true,
            data: sales,
            type: 'line'
        },
        {//y轴
            name: '库存(单位:万)',
            scale: true,
            data: stores,
            type: 'line'
        }]
    };

}


const Line = () => {
    const [sales, setSales] = useState([47, 12, 38, 57, 24, 52, 10, 43])//销量
    const [stores, setStores] = useState([24, 7, 20, 20, 27, 24, 10, 14])//库存
    const update = () => {
        setSales(sales.map(sale => sale + 1))
        setStores(stores.reduce((pre, store) => {
            if (store !== 0) {
                pre.push(store - 1)

            }else{
                pre.push(0)
            }
            return pre;
        }, []))
    }

    return (
        <div>
            <Card>
                <Button type='primary' onClick={() => { update() }}>更新</Button>

            </Card>
            <Card title='折线图'>
                <ReactEacharts style={{width:'70vw',height:'50vh',margin:'0 auto'}} option={getOption(sales, stores)}></ReactEacharts>
            </Card>
        </div>
    );
}

export default Line;
