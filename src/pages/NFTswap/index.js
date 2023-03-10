import React, { useState, useEffect } from 'react'
import "./style.css"
import { NFT_SWAP_TOKEN, TOKEN_ABI, NFT_BASE_TOKEN } from "../../base";
import { useSelector, } from 'react-redux'
import { getMethods, formWei, toWei } from "../../utils";
import { toast, } from "react-toastify";
export default function NFTswap() {
    const userSing = useSelector(state => state.ethers)
    const [mapT, setMapT] = useState([]);
    useEffect(() => {
        console.log("getNftSwapList()");
        getNftSwapList()
    }, [userSing])

    const getNftSwapList = async () => {
        const sing = await userSing.provider
        const account = userSing.account
        const nftList = await getMethods(sing, TOKEN_ABI, NFT_SWAP_TOKEN).getNftList.staticCall(
            NFT_BASE_TOKEN,
            0,
            10000
        )

        console.log(nftList);
        // mapT = res
        let NotPushMap = []
        for (let index = 0; index < nftList.length; index++) {
            NotPushMap.push(
                {
                    tokenId: parseInt(nftList[index][0]),
                    Eth: formWei(nftList[index][2], 18),
                    tokenUrl: 'https://storage.googleapis.com/nftimagebucket/tokens/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/' + parseInt(nftList[index][0]) + ".png"
                }
            )
        }

        setMapT(NotPushMap)
    }

    const buy = async (tokenId, value) => {
        const sing = await userSing.provider
        const account = userSing.account
        try {
            const tx = await getMethods(sing, TOKEN_ABI, NFT_SWAP_TOKEN).purchase(
                NFT_BASE_TOKEN,
                tokenId, {
                value: toWei(value, 18)
            })
            await tx.wait()
            toast.success("ApprovalForAll success", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });

        } catch (error) {
            toast.error("ApprovalForAll fail", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            throw ("fail")
        }

    }
    const NFT = (prpops) => {
        return (
            <div>
                <div className="nft-card">
                    <img src={prpops.tokenUrl} alt="NFT Image" />
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }}
                    >
                        <div>#{prpops.tokenId}</div>
                        <div>{prpops.Eth}ETH</div>
                    </div>
                    <div className="nft-card-overlay">
                        <h2 onClick={async () => {
                            await buy(prpops.tokenId, prpops.Eth)
                            await getNftSwapList()
                        }} >购买</h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='NFTcenter'>
            {
                mapT.map((k, index) => {
                    return <NFT tokenId={k.tokenId} Eth={k.Eth} tokenUrl={k.tokenUrl} key={index} />
                })
            }
        </div>
    )
}
