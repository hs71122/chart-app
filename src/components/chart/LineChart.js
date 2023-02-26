import React from "react";
import { CanvasJSChart } from "canvasjs-react-charts";

const LineChart = ({ data }) => {
  const config = {
    animationEnabled: true,
    title: {
      text: "Purchase Report",
      fontSize: 22,
    },
    axisY: {
      title: "Price",
      titleFontSize: 20,
    },
    axisX: {
      title: "Date",
      titleFontSize: 20,
    },
    height: 500,
    zoomEnabled: true,
    dataPointMaxWidth: 50,
    toolTip: {
      shared: true,
    },
    data: data,
  };
  return <CanvasJSChart options={config} />;
};

export default LineChart;
