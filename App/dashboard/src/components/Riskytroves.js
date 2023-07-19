import React from "react";
import "./Riskytroves.css";
import Statistics from "./dashboard/Statistics";

const Riskytroves = () => {
  return (
    <div
      className="container-fluid"
      style={{ marginTop: "10px" }}
    >
      <div className="row">
        <div className="col-md-12">
          <div id="trovesrisk" className="col-md-8">
            <table className="table crypto-table">
              <thead>
                <tr>
                  <th scope="col"><i className="fa fa-arrow-down"></i></th>
                  <th scope="col">Name</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">Market Cap</th>
                  <th scope="col">Price</th>
                  <th scope="col">Supply</th>
                  <th scope="col">Vol(24h)</th>
                  <th scope="col">%(24h)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="text-danger">
                    Oxe.....5vbv <i className="fa fa-arrow-down"></i>
                  </td>
                  <td>SOL</td>
                  <td>$134.655,333</td>
                  <td className="text-warning">$768.655</td>
                  <td className="text-warning">$122.998</td>
                  <td className="text-warning">$5.443.233,600</td>
                  <td className="text-success">
                    %5.54 <i className="fa fa-arrow-up"></i>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="text-danger">
                    Oxe.....5vbv <i className="fa fa-arrow-down"></i>
                  </td>
                  <td>SOL</td>
                  <td>$134.655,333</td>
                  <td className="text-warning">$768.655</td>
                  <td className="text-warning">$122.998</td>
                  <td className="text-warning">$5.443.233,600</td>
                  <td className="text-danger">
                    %8.14 <i className="fa fa-arrow-down"></i>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="text-danger">
                    Oxe.....5vbv <i className="fa fa-arrow-down"></i>
                  </td>
                  <td>SOL</td>
                  <td>$134.655,333</td>
                  <td className="text-warning">$768.655</td>
                  <td className="text-warning">$122.998</td>
                  <td className="text-warning">$5.443.233,600</td>
                  <td className="text-success">
                    %6.85 <i className="fa fa-arrow-up"></i>
                  </td>
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
