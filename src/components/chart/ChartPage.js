import { React, useMemo, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LineChart from "./LineChart";
import { aggregate } from "../../util/chart_data-parser";

const ChartPage = ({ data }) => {
  const [selectedBuyer, setSelectedBuyer] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2022-01-01"));
  const [endDate, setEndDate] = useState(new Date("2022-01-30"));
  const [isAggregate, setIsAggregate] = useState(false);

  const buyersOptions = [
    ...new Set(
      data.map((val, i) => {
        return val.Buyer;
      })
    ),
  ].map((val) => {
    return { value: val, label: val };
  });
  const factoryOptions = [
    ...new Set(
      data.map((val, i) => {
        return val.Factory;
      })
    ),
  ].map((val) => {
    return { value: val, label: val };
  });

  const dataPoints = useMemo(() => {
    const dataArray = [];
    let filteredData = data.filter((item) => {
      if (!startDate) {
        return true;
      }
      const itemDate = new Date(item.Date);
      const selectedStartDate = new Date(startDate);
      const selectedEndDate = new Date(endDate);
      return itemDate >= selectedStartDate && itemDate <= selectedEndDate;
    });
    if (selectedBuyer.length > 0) {
      const selectedBuyerName = selectedBuyer.map((item) => {
        return item.value;
      });
      filteredData = filteredData.filter((item) => {
        return selectedBuyerName.includes(item.Buyer);
      });
    }
    if (selectedFactory.length > 0) {
      const selectedFactoryName = selectedFactory.map((item) => {
        return item.value;
      });
      filteredData = filteredData.filter((item) => {
        return selectedFactoryName.includes(item.Factory);
      });
    }
    const crossList = [];
    buyersOptions.forEach((bVal) => {
      if (isAggregate) {
        crossList.push(bVal.value);
      } else {
        factoryOptions.forEach((fVal) => {
          crossList.push(bVal.value + "-" + fVal.value);
        });
      }
    });
    crossList.forEach((hItem) => {
      let dataItem = {};
      dataItem[hItem] = [];
      if (isAggregate) {
        filteredData.forEach((rItem) => {
          if (hItem === rItem.Buyer) {
            dataItem[hItem] = [
              ...dataItem[hItem],
              { y: +rItem.Price, x: new Date(rItem.Date) },
            ];
          }
        });
        dataItem[hItem] = aggregate(dataItem[hItem], ["x"], "y");
      } else {
        filteredData.forEach((rItem) => {
          if (hItem === rItem.Buyer + "-" + rItem.Factory) {
            dataItem[hItem] = [
              ...dataItem[hItem],
              { y: +rItem.Price, x: new Date(rItem.Date) },
            ];
          }
        });
      }
      dataArray.push(dataItem);
    });
    let dataPoints = [];
    dataArray.forEach((value, index) => {
      console.log();
      dataPoints.push({
        type: "spline",
        name: Object.keys(value)[0],
        showInLegend: true,
        dataPoints: value[Object.keys(value)[0]],
      });
    });
    return dataPoints;
  }, [
    buyersOptions,
    factoryOptions,
    data,
    selectedBuyer,
    selectedFactory,
    startDate,
    endDate,
    isAggregate,
  ]);

  return (
    <div className="vstack gap-12">
      <div className="hstack gap-3 d-flex justify-content-center card bg-light">
        <div>
          <label className="form-check-label" htmlFor="start-date">
            Start Date
          </label>
          <DatePicker
            id="start-date"
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div>
          <label className="form-check-label" htmlFor="end-date">
            End Date
          </label>
          <DatePicker
            id="end-date"
            dateFormat="yyyy-MM-dd"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div>
          <label className="form-check-label" htmlFor="buyer-option">
            Buyer
          </label>
          <Select
            id="buyer-option"
            defaultValue={selectedBuyer}
            options={buyersOptions}
            isMulti
            onChange={setSelectedBuyer}
          />
        </div>
        <div>
          <label className="form-check-label" htmlFor="factory-option">
            Factory
          </label>
          <Select
            id="factory-option"
            defaultValue={selectedFactory}
            options={factoryOptions}
            isMulti
            onChange={setSelectedFactory}
          />
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={isAggregate}
            onChange={() => setIsAggregate(!isAggregate)}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Aggregate
          </label>
        </div>
      </div>
      <br />
      <LineChart data={dataPoints} />
    </div>
  );
};

export default ChartPage;
