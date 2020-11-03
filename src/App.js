import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllModules } from "ag-grid-enterprise";

import { Button } from "@material-ui/core";

import { DEFAULT_CONFIG, DATA, COLUMNS } from "./data";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

import "./App.css";

let gridApi = null;

const App = () => {
  const initTable = (params) => {
    gridApi = params.api;
    gridApi.sizeColumnsToFit();
  };

  const copyData = (e) => {
    const copiedData =
      gridApi &&
      gridApi.getDataAsCsv().replace(/["]+/g, "").replace(/,/g, "\t");
    navigator.clipboard.writeText(copiedData);
    // console.log(copiedData);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const loadData = (evt) => {
    const files = evt.target.files;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const parseDate = event.target.result;
      setSelectedFile(JSON.parse(parseDate));
    };
    reader.readAsText(file);
  };

  const saveData = () => {
    const jsonDate = JSON.stringify(selectedFile ? selectedFile : COLUMNS);

    const download = (content, fileName, contentType) => {
      const a = document.createElement("a");
      const file = new Blob([content], { type: contentType });
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    };
    download(jsonDate, "Date.json", "json/plain");
  };

  const pasteData = () => {
    navigator.clipboard.readText().then((t) => {
      const firstStageData = t.split("\n").map((item) => item.trim());
      const secondStageData = firstStageData.map((item) => item.split("\t"));
      const finalResult = secondStageData[0].map((item) => {
        return {
          headerName: item,
          field: item.toLowerCase(),
        };
      });
      setSelectedFile(finalResult);
    });
  };

  return (
    <div className="wrapper">
      <div className="ag-theme-balham table">
        <AgGridReact
          modules={AllModules}
          columnDefs={selectedFile ? selectedFile : COLUMNS}
          defaultColDef={DEFAULT_CONFIG}
          rowData={DATA}
          onGridReady={initTable}
        />
      </div>
      <div className="buttons">
        <Button variant="outlined" onClick={copyData}>
          Copy
        </Button>

        <Button variant="outlined" style={{ position: "relative" }}>
          Load
          <input
            className="input-block"
            variant="outlined"
            onChange={loadData}
            type="file"
          />
        </Button>

        <Button variant="outlined" onClick={saveData}>
          Save
        </Button>
        <Button variant="outlined" onClick={pasteData}>
          Paste
        </Button>
      </div>
    </div>
  );
};

export default App;
