
import React from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import { data } from "./mock";

const margin = { left: 50, right: 50, top: 10, bottom: 30 };

const CandleStickChart = fitWidth(({ type, width, ratio }) => {
  // console.log(data);
  const xAccessor = (d) => new Date(d.date);
  const xExtents = [
    xAccessor(last(data)),
    xAccessor(data[0])
  ];

  return (
    <ChartCanvas
      height={500}
      ratio={ratio}
      width={width}
      margin={margin}
      type={type}
      seriesName="MSFT"
      data={data}
      xAccessor={xAccessor}
      xScale={scaleTime()}
      xExtents={xExtents}
    >
      <Chart
        id={1}
        yExtents={(d) => [d.high, d.low]}
      >
        <XAxis
          axisAt="bottom"
          orient="bottom"
          ticks={6}
        />
        <YAxis
          axisAt="right"
          orient="right"
          ticks={5}
        />
        <CandlestickSeries
          width={timeIntervalBarWidth(utcDay)}
        />
      </Chart>
    </ChartCanvas>
  );
});

CandleStickChart.propTypes = {
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChart.defaultProps = {
  type: "svg",
};

export default CandleStickChart;
