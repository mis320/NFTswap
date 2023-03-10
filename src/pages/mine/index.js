import React, { useEffect, useState, useRef } from 'react'
import { NFT_HELP_TOKEN, TOKEN_ABI, NFT_BASE_TOKEN, NFT_SWAP_TOKEN } from "../../base";
import { useSelector, } from 'react-redux'
import { getMethods, formWei, toWei } from "../../utils";
import { toast, } from "react-toastify";
import "./style.css"
export default function Mine() {
    const NFT0 = (prpops) => {
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
                        <h2 onClick={() => {
                            revoke(prpops.tokenId)
                        }} >{'下架'}</h2>
                        <h2 onClick={() => {
                            upDateView(
                                prpops.tokenId,
                                prpops.Eth,
                                prpops.tokenUrl,
                                "更新",
                                true
                            )

                        }}>{'更新'}</h2>

                    </div>
                </div>
            </div>
        )
    }
    const NFT1 = (prpops) => {
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
                        <h2 onClick={() => {
                            upDateView(
                                prpops.tokenId,
                                prpops.Eth,
                                prpops.tokenUrl,
                                "上架",
                                false
                            )
                        }}>{'上架'}</h2>

                    </div>
                </div>
            </div>
        )
    }
    const NFT2 = (prpops) => {
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
                    {/* <div className="nft-card-overlay">
                        <h2>{'上架'}</h2>

                    </div> */}
                </div>
            </div>
        )
    }
    const userSing = useSelector(state => state.ethers)
    const [notPushMapT, setNotPushMapT] = useState([]);
    const [userPushMap, setUserPushMap] = useState([]);
    const [upDataFlag, setUpDataFlag] = useState("none");
    const [oneNft, setOneNft] = useState({});
    //const [price, setPrice] = useState();
    const price = useRef(null);
    useEffect(() => {
        console.log("getUserNft()");
        getUserNft()
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
        let userPushMap = []
        for (let index = 0; index < nftList.length; index++) {
            console.log(nftList[index][1] == account, nftList[index][1], account);

            if (nftList[index][1].toLocaleLowerCase() == account.toLocaleLowerCase()) {
                userPushMap.push(
                    {
                        tokenId: parseInt(nftList[index][0]),
                        Eth: formWei(nftList[index][2], 18),
                        tokenUrl: 'https://storage.googleapis.com/nftimagebucket/tokens/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/' + parseInt(nftList[index][0]) + ".png"
                    }
                )
            }

        }
        setUserPushMap(userPushMap)

    }

    const getUserNft = async () => {
        const sing = await userSing.provider
        const account = userSing.account
        const nftList = await getMethods(sing, TOKEN_ABI, NFT_HELP_TOKEN).getOwnedTokenIdList.staticCall(
            NFT_BASE_TOKEN,
            account,
            0,
            10000
        )


        // mapT = res
        let NotPushMap = []
        for (let index = 0; index < nftList.length; index++) {
            NotPushMap.push(
                {
                    tokenId: parseInt(nftList[index]),
                    Eth: '???',
                    tokenUrl: 'https://storage.googleapis.com/nftimagebucket/tokens/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/' + parseInt(nftList[index]) + ".png"
                }
            )
        }

        setNotPushMapT(NotPushMap)
    }

    const upDateView = async (
        tokenId,
        Eth,
        tokenUrl,
        text,
        isUpDate
    ) => {
        setOneNft({
            tokenId: tokenId,
            Eth: Eth,
            tokenUrl: tokenUrl,
            text: text,
            isUpDate: isUpDate
        })
        setUpDataFlag("")
    }


    const update = async (tokenId_, price_) => {
        const sing = await userSing.provider
        const account = userSing.account
        try {

            console.log(price_, toWei(price_, 18))
            const tx = await getMethods(sing, TOKEN_ABI, NFT_SWAP_TOKEN).update(
                NFT_BASE_TOKEN,
                tokenId_,
                toWei(price_, 18),
            )
            await tx.wait()
            toast.success("success", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });

        } catch (error) {
            toast.error("fail", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            throw ("fail")
        }
    }
    const list = async (tokenId_, price_, isError = true) => {
        const sing = await userSing.provider
        const account = userSing.account
        try {

            console.log(price_, toWei(price_, 18))
            const tx = await getMethods(sing, TOKEN_ABI, NFT_SWAP_TOKEN).list(
                NFT_BASE_TOKEN,
                tokenId_,
                toWei(price_, 18),
            )

            await tx.wait()
           
            toast.success("success", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });

        } catch (error) {

            if (isError) {
                toast.error("fail", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored",
                });

            }
            throw ("fail")
        }
    }
    const setApprovalForAll = async () => {
        const sing = await userSing.provider
        const account = userSing.account
        try {


            const tx = await getMethods(sing, TOKEN_ABI, NFT_BASE_TOKEN).setApprovalForAll(
                NFT_SWAP_TOKEN,
                true,
            )
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
            //throw ("fail")
        }
    }

    const isSetApprovalForAll = async () => {
        const sing = await userSing.provider
        const account = userSing.account
        const is = await getMethods(sing, TOKEN_ABI, NFT_BASE_TOKEN).isApprovedForAll(

            account,
            NFT_SWAP_TOKEN,
        )

        console.log(is);

        return is
    }

    const revoke = async (tokenId_) => {
        const sing = await userSing.provider
        const account = userSing.account

        try {

            const tx = await getMethods(sing, TOKEN_ABI, NFT_SWAP_TOKEN).revoke(
                NFT_BASE_TOKEN,
                tokenId_
            )

            await tx.wait()
            toast.success("success", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });

        } catch (error) {
            toast.error("fail", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            throw ("fail")
        }
    }

    const InputData = () => {
        return (
            <>
                <div style={{ display: upDataFlag }}>
                    <div className='InputData'  >
                        <div style={{
                            display: "flex",
                            backgroundColor: "rgb(235, 235, 235)",
                            width: 300,
                            height: 400,
                            flexDirection: "column",
                            justifyContent: "space-between",
                            borderRadius: 10

                        }}>
                            <div style={{
                                padding: 10,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                fontSize: 14,
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                                onClick={() => {
                                    setUpDataFlag("none")
                                }}
                            >
                                <div> X</div>
                            </div>

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                flexWrap: "nowrap",
                                alignContent: "flex-start",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                borderRadius: "10px",
                                marginBottom: 50
                            }}>
                                <div style={{
                                    marginBottom: 40
                                }}>
                                    <NFT2 tokenId={oneNft.tokenId} txt={"更新"} Eth={oneNft.Eth} tokenUrl={oneNft.tokenUrl} key={oneNft.tokenId} />

                                </div>
                                <input style={{
                                    width: 200,
                                    marginBottom: 10,

                                }

                                } ref={price} placeholder='修改价格'></input>
                                <button style={{
                                    width: 210,
                                    cursor: "pointer",
                                    userSelect: "none",
                                }
                                } onClick={async () => {
                                    const price0 = price.current.value
                                    if (price0 > 0) {

                                        if (oneNft.isUpDate) {
                                            update(
                                                oneNft.tokenId,
                                                price0
                                            )
                                        } else {

                                            try {
                                                await list(
                                                    oneNft.tokenId,
                                                    price0,
                                                    false
                                                )

                                            } catch (error) {

                                                if (!await isSetApprovalForAll()) {
                                                    await setApprovalForAll()
                                                    await list(
                                                        oneNft.tokenId,
                                                        price0,
                                                    )
                                                }



                                            }


                                        }




                                        console.log(price0)
                                    } else {

                                    }


                                }}>{oneNft.text}</button>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }





    return (
        <div>
            已上架 <hr />
            <div style={
                { marginBottom: "30px" }
            } className='NFTcenter'>
                {
                    userPushMap.map((k, index) => {
                        return <NFT0 tokenId={k.tokenId} txt={"更新"} Eth={k.Eth} tokenUrl={k.tokenUrl} key={index} />
                    })
                }
            </div>
            未上架 <hr />
            <div className='NFTcenter'>
                {
                    notPushMapT.map((k, index) => {
                        return <NFT1 tokenId={k.tokenId} txt={"上架"} Eth={k.Eth} tokenUrl={k.tokenUrl} key={index} />
                    })
                }
            </div>

            <InputData />
        </div>

    )
}
