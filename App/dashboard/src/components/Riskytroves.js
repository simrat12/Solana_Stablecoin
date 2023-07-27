import React, { useState } from "react";
import "./Riskytroves.css";
import Statistics from "./dashboard/Statistics";

const Riskytroves = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalItems = 498;

  const handlePageChange = (direction) => {
    if (direction === "right") {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "left") {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

  // Sample data for table rows
  const tableRows = [
    {
      id: 1,
      owner: "Oxe.....5vbv",
      collateral: "134.655,333",
      debt: "768.655",
      ratio: "122.99%",
    },
    {
      id: 2,
      owner: "Oxe.....5vbv",
      collateral: "134.655,333",
      debt: "768.655",
      ratio: "122%",
    },
    {
      id: 3,
      owner: "Oxe.....5vbv",
      collateral: "134.655,333",
      debt: "768.655",
      ratio: "122.9%",
    },
    // Add more table rows here as needed
  ];

  return (
    <div className="container-fluid" style={{ marginTop: "10px" }}>
      <div className="row">
        <div className="col-md-12">
          <div id="trovesrisk" className="col-md-8">
            <table className="table crypto-table">
              <thead>
                <tr id="mainhead">
                  <th id="arrowshift" scope="col">
                    <i className="fa fa-warning"></i>
                  </th>
                  <th id="arrowshift" scope="col">Risky Troves</th>

                  <th id="arrowshift" scope="col">
                    <b>{startIndex}</b> to <b>{endIndex}</b> of <b>{totalItems}</b>
                  </th>

                  <th id="arrowshift" scope="col">
                    {currentPage > 1 && (
                      <i
                        id="leftarrow"
                        className="fa fa-arrow-left"
                        onClick={() => handlePageChange("left")}
                      ></i>
                    )}
                  </th>

                  <th id="arrowshift" scope="col">
                    {endIndex < totalItems && (
                      <i
                        id="rightarrow"
                        className="fa fa-arrow-right"
                        onClick={() => handlePageChange("right")}
                      ></i>
                    )}
                  </th>

                  <th id="arrowshift" scope="col">
                    <i
                      id="leftright"
                      className="fa fa-refresh"
                      onClick={() => window.location.reload()}
                    ></i>
                  </th>
                </tr>

                <tr>
                  <th scope="col">
                    <i className="fa fa-list"></i>
                  </th>
                  <th scope="col">Owner</th>

                  <th scope="col">Collateral (ETH)</th>

                  <th scope="col">Debt (SUSD)</th>
                  <th scope="col">Coll.(Ratio)</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td className="text-primary">
                      {row.owner} <i className="fa fa-clipboard"></i>
                    </td>
                    <td>{row.collateral}</td>
                    <td className="text-warning">{row.debt}</td>
                    <td className="text-warning">{row.ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Statistics />
        </div>
      </div>
    </div>
  );
};

export default Riskytroves;
