import logo from '../logo_3.png';
import fullLogo from '../full_logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { useEffect, useState } from 'react';

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState(null); // Initialize to null

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector('.enableEthereumButton');
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      updateButton();
      getAddress();
      window.location.replace(location.pathname);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  }

  useEffect(() => {
    if (window.ethereum === undefined) return;

    const checkConnection = async () => {
      try {
        const val = await window.ethereum.request({ method: 'eth_chainId' });
        toggleConnect(val !== null && val !== undefined);
        if (val) {
          getAddress();
          updateButton();
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    };

    checkConnection();

    const accountsChangedListener = function(accounts) {
      window.location.replace(location.pathname);
    };

    window.ethereum.on('accountsChanged', accountsChangedListener);

    return () => {
      window.ethereum.off('accountsChanged', accountsChangedListener);
    };
  }, [location.pathname]);

  return (
    <div className="">
      <nav className="w-screen">
        <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
              <img src={fullLogo} alt="" width={120} height={120} className="inline-block -mt-2"/>
              <div className='inline-block font-bold text-xl ml-2'>
                NFT Marketplace
              </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              <li className={location.pathname === "/" ? 'border-b-2 hover:pb-0 p-2' : 'hover:border-b-2 hover:pb-0 p-2'}>
                <Link to="/">Marketplace</Link>
              </li>
              <li className={location.pathname === "/sellNFT" ? 'border-b-2 hover:pb-0 p-2' : 'hover:border-b-2 hover:pb-0 p-2'}>
                <Link to="/sellNFT">List My NFT</Link>
              </li>
              <li className={location.pathname === "/profile" ? 'border-b-2 hover:pb-0 p-2' : 'hover:border-b-2 hover:pb-0 p-2'}>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite}>{connected ? "Connected" : "Connect Wallet"}</button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className='text-white text-bold text-right mr-10 text-sm'>
        {currAddress !== null ? (currAddress !== "0x" ? "Connected to" : "Not Connected. Please login to view NFTs") : "Loading..."}
        {currAddress !== null && currAddress !== "0x" ? (currAddress.substring(0, 15) + '...') : ""}
      </div>
    </div>
  );
}

export default Navbar;
