import React from "react";

const CsvUploadForm = ({ OnFileChangeHandler, onSubmitHandler }) => {
  return (
    <form className="row g-3">
      <div className="col-auto">
        <input
          className="form-control form-control-lg"
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={OnFileChangeHandler}
        />
      </div>
      <div className="col-auto">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={(e) => {
            onSubmitHandler(e);
          }}
        >
          {" "}
          Import csv file
        </button>
      </div>
    </form>
  );
};

export default CsvUploadForm;
