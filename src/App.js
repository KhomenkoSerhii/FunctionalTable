import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllModules } from "ag-grid-enterprise";
import moment from "moment";

import { Button } from "@material-ui/core";

import Chart from "./components/Chart";

import { DEFAULT_CONFIG, DATA, COLUMNS } from "./constants";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

import "./App.css";
import { data } from "./components/Chart/mock";

let gridApi = null;

const App = () => {
  const initTable = (params) => {
    gridApi = params.api;
    gridApi.sizeColumnsToFit();
  };

  const copyData = () => {
    const copiedData =
      gridApi &&
      gridApi.getDataAsCsv().replace(/["]+/g, "").replace(/,/g, "\t");
    navigator.clipboard.writeText(formatData(copiedData));
    console.log(formatData(copiedData));
  };

  const formatData = (data) => {
    let indexOfDate
    return data.split('\n').map(r => r.split('\t')).map((r, i) => {
      if (i === 0) {
        r.map((item, index) => {
          if (item.includes('Date')) {
            return indexOfDate = index
          }
        })
        return r
      } else {
        r[indexOfDate] = moment(+r[indexOfDate]).format('DD/MM/YYYY')
        return r
      }
    }).map(r => r.join('\t')).join('\n')
  }


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

  const formatValue = (type, params) => {
    switch (type) {
      case "date":
        return moment(params.value).format("DD/MM/YYYY")
      default:
        return params.value;
    }
  };


  const [formatedDate, setFormatedDate] = useState([])

  useEffect(() => {
    const filtered = []
    DATA.forEach((i) => {
      const formatedDateItem = moment(i.date).format("DD/MM/YYYY")
      filtered.push({ ...i, date: formatedDateItem })
    })
    setFormatedDate([...filtered])
  }, [DATA])


  return (
    <div className="wrapper">
      <div className="ag-theme-balham table">
        <AgGridReact
          modules={AllModules}
          columnDefs={selectedFile ? selectedFile : COLUMNS.map((item) => ({
            ...item,
            valueFormatter: (params) => formatValue(item.type, params),
          }))}
          defaultColDef={DEFAULT_CONFIG}
          rowData={DATA}
          onGridReady={initTable}
        />
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

      <div className="chart">
        <Chart />
      </div>
    </div>
  );
};

export default App;
