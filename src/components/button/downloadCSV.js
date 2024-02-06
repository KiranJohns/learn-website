import React from "react";
import { FaDownload } from "react-icons/fa";

function DownloadCSV(records) {
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function saveCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ marginRight: "1.5rem" }}>
        <button
          className="btn btn-primary "
          title="Download Report"
          onClick={(e) => saveCSV(records)}
        >
          <FaDownload style={{ fontSize: ".9rem" }} />
        </button>
      </div>
    </div>
  );
}

export default DownloadCSV;
