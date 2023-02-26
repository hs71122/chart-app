import { React, useState } from "react";
import { Link } from "react-router-dom";
import { csvFileToArray } from "../../util/chart_data-parser";
import CsvTable from "./CsvTable";
import CsvUploadForm from "./CsvUploadForm";

const HomePage = ({ uploadHandler }) => {
  const [file, setFile] = useState();
  const [csvArray, setCsvArray] = useState([]);
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  //handle on submit event
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        const array = csvFileToArray(text);
        setCsvArray(array);
        uploadHandler(array);
      };
      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...csvArray));

  return (
    <div className="container" style={{ padding: "10px" }}>
      <div className="row justify-content-center">
        <div className="col-6">
          <div style={{ textAlign: "center" }}>
            <h1>Data Visualizer </h1>
            <CsvUploadForm
              OnFileChangeHandler={handleOnChange}
              onSubmitHandler={handleOnSubmit}
            />
          </div>
          {csvArray.length > 0 ? (
            <>
              <hr />
              <Link to={"/reports"} className="btn btn-success btn-lg">
                View the Report
              </Link>
              <br />
            </>
          ) : (
            <></>
          )}
          <CsvTable headers={headerKeys} rows={csvArray} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
