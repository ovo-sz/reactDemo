import React, { useState, useEffect } from 'react';
import { Row, Col, DatePicker, Empty } from 'antd';
import moment from 'moment';
import StatisticalCard from '@/components/StatisticalCard';
import { getEnergyConsumption } from '@/pages/cockpit/dashboard/services/geEnergyOverview';
import { getTime } from '@/utils/dateMethods';
import _ from 'lodash';
import { Pie } from 'ant-design-pro/lib/Charts';
import './OverviewCard.less';
import DaySelect from '@/components/DaySelect';
import theme from '@/themes/Theme.default';
const { RangePicker } = DatePicker;
interface Iprops {
  currenyActive: string;
  menu?: string;
}
export default function OverviewCard(props: Iprops) {
  const [active, setActive] = useState('day');
  const [xAxis, setXAxis] = useState([
    moment()
      .subtract(10, 'days')
      .format('MM-DD'),
  ]);
  const [pickerDate, setPickerDate] = useState<{ start?: string; end?: string }>({
    start: moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD'),
    end: moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD'),
  });
  const [selectFirstDate, setSelectFirstDate] = useState('');
  const [totalElectricityCost, setTotalElectricityCost] = useState<number>(0); //总用电费
  const [totalWaterCost, setTotalWaterCost] = useState<number>(0); //总用水费
  const [totalSteamCost, setTotalSteamCost] = useState<number>(0); //总蒸汽费
  const [totalGasCost, setTotalGasCost] = useState<number>(0); //总天然气费
  const [totalCost, setTotalCost] = useState<number>(0); //总耗能
  const [total10ThousandCost, set10ThousandTotalCost] = useState<number>(0);

  const selectList: { title: string; key: string; disabled?: boolean }[] = [
    { title: '日', key: 'day' },
    { title: '月', key: 'month', disabled: true },
    { title: '年', key: 'year', disabled: true },
  ];

  //  const onCalendarChange = (dates: any) => setSelectFirstDate(dates[0]);
  const onCalendarChange = (dates: AnimationPlaybackEvent) => {
    console.log(dates);

    if (!dates) {
      return setSelectFirstDate(
        moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD'),
      );
    } else {
      setSelectFirstDate(dates[0]);
    }
  };
  const onChange = (dates: any, dateString: any) => {
    if (!dates.length) {
      setSelectFirstDate('');
      setPickerDate({
        start: moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD'),
        end: moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD'),
      });
    } else {
      setPickerDate({ start: dateString[0], end: dateString[1] });
    }
  };

  const disabledDate = (current: any) => {
    if (selectFirstDate) {
      return (
        current < moment(selectFirstDate).subtract(14, 'days') ||
        current > moment(selectFirstDate).add('days', 14)
      );
    } else {
      return current > moment().subtract(1, 'days');
    }
  };

  useEffect(() => {
    let time = pickerDate['start'] && pickerDate['end'] ? pickerDate : getTime(active);
    let params: any = {
      branch: '染色分厂',
      metrics:
        'total_cost,total_cost_10_thousand_meters,total_electricity_cost,total_water_cost,total_steam_cost,total_gas_cost',
      interval: 'day',
      start: time.start,
      end: time.end,
    };
    if (props.menu) {
      params.menu = props.menu;
    }
    getEnergyConsumption(params).then(function(data) {
      if (data && data.data) {
        let xAxis: any[] = [];
        set10ThousandTotalCost(_.floor(data.cost_per_meter, 2));
        data.data.forEach((item: any) => {
          switch (item.metric) {
            case 'total_electricity_cost':
              let electricityCost: number = 0;
              xAxis = [];
              item.dps.forEach((item: any) => {
                xAxis.push(item[0].substring(5, 10));
                electricityCost += item[1];
              });
              setTotalElectricityCost(_.floor(electricityCost / 10000, 2));
              setXAxis(xAxis);
              break;
            case 'total_water_cost':
              let waterCost: number = 0;
              item.dps.forEach((item: any) => {
                waterCost += item[1];
              });
              setTotalWaterCost(_.floor(waterCost / 10000, 2));
              break;
            case 'total_steam_cost':
              let steamCost: number = 0;
              item.dps.forEach((item: any) => {
                steamCost += item[1];
              });
              setTotalSteamCost(_.floor(steamCost / 10000, 2));
              break;
            case 'total_gas_cost':
              let gasCost: number = 0;
              item.dps.forEach((item: any) => {
                gasCost += item[1];
              });
              setTotalGasCost(_.floor(gasCost / 10000, 2));
              break;
            case 'total_cost':
              let totalCost: number = 0;
              item.dps.forEach((item: any) => {
                totalCost += item[1];
              });
              setTotalCost(_.floor(totalCost / 10000, 2));
              break;
            default:
              break;
          }
        });
      }
    });
  }, [active, pickerDate]);

  const salesPieData = [
    {
      x: '电',
      y: _.floor(totalElectricityCost / totalCost, 2),
    },
    {
      x: '水',
      y: _.floor(totalWaterCost / totalCost, 2),
    },
    {
      x: '蒸汽',
      y: _.floor(totalSteamCost / totalCost, 2),
    },
    {
      x: '天然气',
      y: _.floor(totalGasCost / totalCost, 2),
    },
  ];

  const data = [
    {
      title: '总能耗(万元)',
      total: totalCost,
    },
    {
      title: '万米能耗(万元)',
      total: total10ThousandCost,
    },
    {
      title: '电(万元)',
      total: totalElectricityCost,
    },
    {
      title: '蒸汽(万元)',
      total: totalSteamCost,
    },
    {
      title: '天然气(万元)',
      total: totalGasCost,
    },
    {
      title: '水(万元)',
      total: totalWaterCost,
    },
  ];
  return (
    <div className="overview-card">
      <Row className={'title-card'}>
        <Col span={10} className="title-text">
          能耗总览
        </Col>
        <Col span={7}>
          <DaySelect active={active} setActive={setActive} selectList={selectList} />
        </Col>
        <Col span={7}>
          <RangePicker
            value={
              pickerDate.start && pickerDate.end
                ? [moment(pickerDate.start), moment(pickerDate.end)]
                : undefined
            }
            disabledDate={disabledDate}
            onCalendarChange={onCalendarChange}
            onChange={onChange}
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
          />
        </Col>
      </Row>
      <Row>
        <Col span={14}>
          <Row className="data-card">
            {data.length ? (
              data.map((item: any) => (
                <Col span={8} key={item.title} style={{ marginBottom: 10 }}>
                  <StatisticalCard title={item.title} num={item.total} />
                </Col>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Row>
        </Col>
        <Col span={10} className="pie-card padding-top-15">
          <Pie
            hasLegend={true}
            title="能耗占比"
            subTitle="能耗占比"
            data={salesPieData}
            colors={[theme.firstColor, theme.secondColor, theme.thirdColor, theme.fourthColor]}
            valueFormat={val => <span dangerouslySetInnerHTML={{ __html: '' }} />}
            height={200}
          />
        </Col>
      </Row>
    </div>
  );
}
