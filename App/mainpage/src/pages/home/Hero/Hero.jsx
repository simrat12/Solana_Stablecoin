import "./hero.css";
import miner from "../../../assets/logo.jpg";
import sol1 from "../../../assets/sol1.jpg";
import { AiOutlinePlus } from "react-icons/ai";
import sol2 from "../../../assets/sol2.jpg";
const Hero = () => {
  const handleConnectWallet = () => {
    // Redirect the user to the wallet dashboard after clicking the button
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className="hero">
      <div className="big-card">
        <div className="card-left">
          <div className="top-ctas">
            <div className="top-cta1">Decentralized Lending</div>
            <div className="top-cta2">
              Experience the future of lending on Solana.
            </div>
          </div>
          <div className="card-texts">
            <p className="card-heading-text">
              Secure, transparent, and hassle-free lending on the Solana
              blockchain..
            </p>
            <p className="card-normal-text">
              Unlocking Financial Opportunities{" "}
            </p>
          </div>
        </div>
        <div className="card-right">
          <img src={miner} alt="Antminner" />
          <div className="image-text">
            <p className="card-right-name">Borrow and Lend</p>
            <p>Decentralized Lending</p>
          </div>
          {/* <div className="btc-per-time">
            <p>0.4354556 BTC Daily</p>
          </div> */}
        </div>
      </div>
      <div className="middle-cards">
        <div className="middle-card">
          <div className="background-image">
            <img src="" alt="" />
          </div>
          <div className="middle-card-texts">
            <p className="middle-card-text-title">Instant Transactions</p>
            <p className="middle-card-text-desc">
              Enjoy near-instantaneous borrowing and lending transactions
            </p>
          </div>
        </div>

        <div className="middle-card">
          <div className="background-image">
            <img src="" alt="" />
          </div>
          <div className="middle-card-texts">
            <p className="middle-card-text-title">Reliable security system</p>
            <p className="middle-card-text-desc">
              Utilize robust smart contract development practices and audited
              code to ensure the security of user funds
            </p>
          </div>
        </div>

        <div className="middle-card">
          <div className="background-image">
            <img src="" alt="" />
          </div>
          <div className="middle-card-texts">
            <p className="middle-card-text-title">Global Accessibility</p>
            <p className="middle-card-text-desc">
              Reach a global audience with your lending application, enabling
              users from anywhere in the world to participate in the
              decentralized lending ecosystem powered by Solana.
            </p>
          </div>
        </div>
      </div>

      <div className="middle-objects">
        <div className="middle-object">
          <div className="background-image">
            <img src="" alt="" />
          </div>
          <div className="middle-object-texts">
            <p className="middle-object-text-title">23827</p>
            <p className="middle-object-text-desc">Users</p>
          </div>
        </div>

        <div className="middle-object">
          <div className="background-image">
            <img src="" alt="" />
          </div>
          <div className="middle-object-texts">
            <p className="middle-object-text-title">1310.8879</p>
            <p className="middle-object-text-desc">Users</p>
          </div>
        </div>

        <div className="middle-object">
          <div className="background-image">
            <img src="" alt="" />
          </div>
          <div className="middle-object-texts">
            <p className="middle-object-text-title">30207</p>
            <p className="middle-object-text-desc">Users</p>
          </div>
        </div>
      </div>

      <div className="what-is">
        <div className="what-is-left">
          <div className="what-is-texts">
            <div className="what-is-title">
              <p>Instant Transactions</p>
            </div>
            <p>
              Enjoy near-instantaneous borrowing and lending transactions on the
              Solana blockchain, eliminating lengthy approval processes and
              delays commonly associated with traditional financial systems.
            </p>
          </div>
          <div className="what-is-button">
            <button onClick={handleConnectWallet}>Borrow and lend </button>
          </div>
        </div>
        <div className="right-image">
          <img src={sol2} alt="miner man" />
        </div>
      </div>

      <div className="earn">
        <div className="earn-left">
          <div className="earn-texts">
            <div className="earn-title">
              <p>Competitive Interest Rates:</p>
            </div>
            <p>
              Benefit from competitive interest rates that are determined by the
              supply and demand dynamics of the lending market, allowing
              borrowers to access funds at affordable rates and lenders to earn
              attractive returns.
            </p>
          </div>
        </div>
        <div className="earn-image">
          <img src={sol1} alt="miner man" />
        </div>
        {/* <div className="earn-image">
          <video controls>
            <source src={swift} type="video/mp4" />
          </video>
        </div> */}
      </div>
      <div className="staggers">
        <div className="stagger one">
          <p className="title">Seamless Integration</p>
          <p>
          Seamlessly integrate your Solana lending application with popular decentralized finance (DeFi) protocols and Solstable pools to enhance Solstable and provide users with a wider range of lending options.
          </p>
        </div>

        <div className="stagger two">
          <p className="title">Automated Collateral Management:</p>
          <p>
          Implement smart contract functionality that automates collateral management, ensuring efficient loan Solstable processes in the event of default, reducing counterparty risk for lenders.
          </p>
        </div>

        <div className="stagger three">
          <p className="title">User Reputation System</p>
          <p>
          Introduce a reputation system that allows borrowers and lenders to build trust based on their past interactions, promoting responsible lending behavior and reducing the risk of defaults. Also, Enable borrowing and lending with a variety of digital assets, including cryptocurrencies and tokenized assets, providing users with flexibility and diverse lending options.
          </p>
        </div>
      </div>
      <div className="FAQ">
        <p className="title">FAQ</p>
        <div className="faq-lists">
          {[
            "How does the lending process work on Solstable?",
            "What is the minimum and maximum amount that can be borrowed on the platform?",
            "What are the interest rates offered for borrowing on Solstable?",
            "How is collateral handled in the lending process, and what happens in the event of default?",
            "Which digital assets are supported for lending and borrowing on the platform?",
            "How do I create an account and connect my Solana wallet to Solstable?",
          ].map((list, id) => (
            <div key={id} className="faq-list">
              <p>{list}</p>
              <AiOutlinePlus />
            </div>
          ))}
        </div>
      </div>
      <div className="end">
        <p>Start your bitcoin mining journey today!</p>
        <button onClick={handleConnectWallet}>
          <p>GET LOAN</p>
        </button>
      </div>
    </div>
  );
};

export default Hero;
