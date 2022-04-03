import React from "react";
import Chart from "react-apexcharts";
import { chartOptions, dummyData } from "../PriceChartConfig";
const MarketSummary = () => {
  return (
    <div className="bg-[#20232C] p-4 lg:col-span-2 rounded-md text-white">
      <p className="text-lg">Market Summary</p>
      <Chart
        options={chartOptions}
        series={dummyData}
        type="candlestick"
        width="100%"
        height="350"
      />
    </div>
  );
};

export default MarketSummary;
