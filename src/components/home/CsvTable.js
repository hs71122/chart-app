import React from "react";

const CsvTable = ({ headers, rows }) => {
  return (
    <table className="table table-hover table-bordered">
      <thead>
        <tr key={"header"}>
          {headers.map((key, index) => (
            <th key={"tr" + index}>{key}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((item, i) => (
          <tr key={"tr-" + i}>
            {Object.values(item).map((val, j) => (
              <td key={"tr-" + i + "-td-" + j}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CsvTable;
