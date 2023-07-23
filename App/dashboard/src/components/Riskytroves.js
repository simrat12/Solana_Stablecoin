import React from "react";
import "./Riskytroves.css";
import Statistics from "./dashboard/Statistics";

const Riskytroves = () => {
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

                  

                  <th id="arrowshift" scope="col"><b>1</b> to <b>20</b> of <b>498</b></th>
                  
                  <th id="arrowshift" scope="col">
                    <i id="leftright" className="fa fa-arrow-left"></i>
                    <i id="leftright" className="fa fa-arrow-right"></i>
                  </th>

                  <th id="arrowshift" scope="col">
                    <i id="leftright" className="fa fa-refresh"></i>
                  </th>
                </tr>
                
                <tr>
                  <th scope="col">
                    <i className="fa fa-list"></i>
                  </th>
                  <th scope="col">Owner</th>

                  <th scope="col">Collateral (ETH)</th>

                  <th scope="col">Debt (LUSD)</th>
                  <th scope="col">Coll.(Ratio)</th>
                  
                </tr>

              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="text-primary">
                    Oxe.....5vbv <i className="fa fa-clipboard"></i>
                  </td>

                  <td>134.655,333</td>
                  <td className="text-warning">768.655</td>
                  <td className="text-warning">122.99%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="text-primary">
                    Oxe.....5vbv <i className="fa fa-clipboard"></i>
                  </td>

                  <td>134.655,333</td>
                  <td className="text-warning">768.655</td>
                  <td className="text-warning">122%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="text-primary">
                    Oxe.....5vbv <i className="fa fa-clipboard"></i>
                  </td>

                  <td>134.655,333</td>
                  <td className="text-warning">768.655</td>
                  <td className="text-warning">122.9%</td>
                </tr>
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
