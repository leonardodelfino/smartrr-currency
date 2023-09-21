import React, { FunctionComponent, useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, LabelList, Tooltip } from 'recharts';
import Title from './Title';
import { currencyApi } from '../../config/axios-services';

interface CurrencyRate {
  currencyTime: string;
  baseCurrency: string;
  targetCurrency: string;
  exchangeRate: number;
}

interface ChartData {
  time: string;
  amount: number;
}

function createData(data: CurrencyRate[]): ChartData[] {
  return data.map((item) => ({
    time: new Date(item.currencyTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    amount: parseFloat(item.exchangeRate.toFixed(2)), 
  }));
}

const CustomizedLabel: FunctionComponent<any> = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = useState<ChartData[]>([]);
  const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          baseCurrency: 'USD',
          targetCurrency: 'BRL',
          sortBy: 'currencyTime:asc',
          limit: 24,
        };

        const response = await currencyApi.get('/currency-rates', { params });
        const results: CurrencyRate[] = response.data.results;
        const chartData = createData(results);

        setData(chartData);

        const maxAmount = Math.max(...results.map((item) => item.exchangeRate));
        const minAmount = Math.min(...results.map((item) => item.exchangeRate));
        setYAxisDomain([
          minAmount - 0.1,
          maxAmount + 0.1,
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            domain={yAxisDomain}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            tickFormatter={(tick) => tick.toFixed(2)} // Format Y-axis tick values with 2 decimal places
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Exchange Rate (BRL)
            </Label>
          </YAxis>
          <Tooltip />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          >
            <LabelList content={<CustomizedLabel />} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
