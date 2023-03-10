import React, { useState, useEffect } from 'react'
import { toast,  } from "react-toastify";
import { BrowserProvider } from "ethers";
import { formatAddress } from "../../utils/fromat";
import { SupportingNetwork, } from "../../config/chainId";
import { useSelector, useDispatch } from 'react-redux'
import { newEthers } from "../../store/Ethers";
import { formWei } from "../../utils";

import './style.css'
import { NFT_HELP_TOKEN, TOKEN_ABI, NFT_BASE_TOKEN } from "../../base";
import { getMethods } from "../../utils";
export default function Connect() {
    const [account, setAccount] = useState(null);
    const ethersObj = useSelector(state => state.ethers)
    const dispatch = useDispatch()
    useEffect(() => {
        connects()
    }, [])

    const connects = async () => {
        setAccount(null)
        dispatch(newEthers({
            provider: undefined,
            account: undefined,
            chainId: undefined,
        }))
        const accounts = (await window.ethereum.send('eth_requestAccounts')).result[0];
        const provider = new BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const chainId = (await provider.getNetwork()).chainId
        console.log(TOKEN_ABI);
        console.log(accounts, chainId, SupportingNetwork.includes(parseInt(chainId)));

        //console.log("provider", provider);
        if (!SupportingNetwork.includes(parseInt(chainId))) {
            toast.error(" Network Error", {
                position: toast.POSITION.TOP_LEFT,
                theme: "colored",
            });
            throw ("Network Error")
        }
        setAccount(accounts)
        dispatch(newEthers({
            provider: signer,
            account: accounts,
            chainId: parseInt(chainId),
        }))

        console.log("accounts", accounts);
        const getBlockNumber = await provider.getBlockNumber()
        const balance = await provider.getBalance(accounts)
        console.log(formWei(balance, 18), getBlockNumber);

    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "flex-end",
                alignItems: "center",
            }}
        >
            <button
                onClick={() => {
                    connects()
                }}
                style={{

                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 35,
                    cursor: "pointer",
                    userSelect: "none",
                    backgroundColor: "rgb(255 221 245)",
                    border: "1px solid rgb(167 175 210)",
                    color: "rgb(0, 0, 0)",
                    fontWeight: 500,
                    width: 130,
                    height: 49,

                }}
            >
                <p className='accountP' id="msg"  >   {account ? formatAddress(account) : "Connect"}</p>
            </button>
            
        </div>

    )
}
