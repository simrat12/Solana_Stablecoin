import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faFile } from "@fortawesome/free-solid-svg-icons";
import image1 from "../../assets/images/backgrounds/sol-logo.jpg";
import image2 from "../../assets/images/backgrounds/sol-logo.jpg";
import image3 from "../../assets/images/backgrounds/sol-logo.jpg";
import image4 from "../../assets/images/backgrounds/sol-logo.jpg";
import "./statistics.css";

const Statistics = () => {
  return (
    <div className="card">
      <h4>Solstable Statistics</h4>
      {/* Images */}
      <div className="image-container">
        <div>
          <img src={image1} alt="Image 1" />
          <div className="image-info">
            <div className="details">
              <span>
                <b>SOL</b>
              </span>
              <br />
              <span>$1937.33</span>
              <br />
              <span>Oracle Price</span>
            </div>
            <div className="icons">
              <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              <FontAwesomeIcon icon={faFile} />
            </div>
          </div>
        </div>
        <div>
          <img src={image2} alt="Image 2" />
          <div className="image-info">
            <div>
              <span>
                <b>SOLT</b>
              </span>
              <br />
              <span>$645.33</span>
              <br />
              <span>Market Price</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              <FontAwesomeIcon icon={faFile} />
            </div>
          </div>
        </div>
        <div>
          <img src={image3} alt="Image 3" />
          <div className="image-info">
            <div>
              <span>
                <b>SOL</b>
              </span>
              <br />
              <span>$543.56</span>
              <br />
              <span>Market Price</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              <FontAwesomeIcon icon={faFile} />
            </div>
          </div>
        </div>
        <div>
          <img src={image4} alt="Image 4" />
          <div className="image-info">
            <div>
              <span>
                <b>SUSD</b>
              </span>
              <br />
              <span>$987</span>
              <br />
              <span>Market Price</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              <FontAwesomeIcon icon={faFile} />
            </div>
          </div>
        </div>
      </div>

      {/* Section with list of names */}
      <div className="section">
        <h2>Protocol</h2>
        <table>
          <tr>
            <td>Borrowing Fee</td>
            <td>0.50%</td>
          </tr>
          <tr>
            <td>TVL</td>
            <td>402K SOL ($768M)</td>
          </tr>
          <tr>
            <td>Troves</td>
            <td>1,342</td>
          </tr>
          <tr>
            <td>SUSD supply</td>
            <td>293M</td>
          </tr>
          <tr>
            <td>SUSD in Stability Pool</td>
            <td>173M (59.1%)</td>
          </tr>
          <tr>
            <td>Staked SOLT</td>
            <td>50.5M</td>
          </tr>
          <tr>
            <td>Total Collateral Ratio</td>
            <td>261.9%</td>
          </tr>
          <tr>
            <td>Recovery Mode</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Recovery Mode Price Threshold</td>
            <td>$1,8733.99</td>
          </tr>
          <tr>
            <td>Kickback Rate</td>
            <td>99.00%</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
