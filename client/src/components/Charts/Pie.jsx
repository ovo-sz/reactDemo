import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd'
import ReactEacharts from 'echarts-for-react'



//返回柱状图的配置对象
const getOption = (sales, stores) => {
    return {
        title: {
            text: '手机关注度波动量'
        },
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: ['product', '2017', '2018', '2019'],
            source: [
                { product: '小米', '2017': 90.3, '2018': 97.8, '2019': 110.7 },
                { product: '华为', '2017': 83.1, '2018': 93.4, '2019': 114.1 },
                { product: '魅族', '2017': 86.4, '2018': 65.2, '2019': 45.0 },
                { product: 'VIVO', '2017': 100.4, '2018': 104.9, '2019': 106.1 },
                { product: 'OPPO', '2017': 99.4, '2018': 101.9, '2019': 102.1 },
                { product: '荣耀', '2017': 72.4, '2018': 89.9, '2019': 124.1 }
            ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' }
        ]
    };

}


const Pie = () => {
    const [sales, setSales] = useState([47, 12, 38, 57, 24, 52, 10, 43])//销量
    const [stores, setStores] = useState([24, 7, 20, 20, 27, 24, 10, 14])//库存
    const update = () => {
        setSales(sales.map(sale => sale + 1))
        setStores(stores.reduce((pre, store) => {
            if (store !== 0) {
                pre.push(store - 1)

            } else {
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

export default Pie;
