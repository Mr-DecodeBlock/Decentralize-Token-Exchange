import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import {
  priceChartLoadedSelector,
  priceChartSelector,
} from "../../store/selectors";

import { chartOptions, dummyData } from "../PriceChartConfig";
const MarketSummary = (props) => {
  return (
    <div className="bg-[#20232C] p-4 lg:col-span-3 rounded-md text-white">
      <p className="text-lg">Market Summary</p>

      {props.priceChartLoded ? (
        <Chart
          options={chartOptions}
          series={props.priceChart.series}
          type="candlestick"
          width="100%"
          height="500"
        />
      ) : (
        ""
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    priceChartLoded: priceChartLoadedSelector(state),
    priceChart: priceChartSelector(state),
  };
}

export default connect(mapStateToProps)(MarketSummary);
