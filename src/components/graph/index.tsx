import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';

const AreaChartExample = () => {
  const data = [
    { value: 100 },
    { value: 1 },
    { value: 10 },
    { value: 40 },
    { value: 50 },
    { value: 10 },
    { value: 99 },
    { value: 10 },
    { value: 20 },
    { value: 100 },
    { value: 1 },
    { value: 52 },
    { value: 97 },
    { value: 39 },
    { value: 20 },
    { value: 69 },
    { value: 90 },
  ];

  return (
    <div className="rounded-lg bg-primary-color p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Area Chart</h2>
        <div className="text-sm text-gray-500">July 2023</div>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            {/* <CartesianGrid /> */}
            {/* <XAxis dataKey="month" /> */}
            {/* <YAxis /> */}
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stackId="1"
              strokeLinecap="butt"
              stroke="#008BCD"
              strokeWidth={5}
              fill="rgba(0, 139, 205, 0.3)"
              dot={false}
              tooltipType="none"
              connectNulls
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartExample;
