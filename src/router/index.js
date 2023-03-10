import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NFTswap from "../pages/NFTswap";
import Mine from "../pages/mine";
export default function Routers() {
    return (
        <>

            <Routes>
                <Route path={'/'} element={<NFTswap/>} />
                <Route path={'/Mine'} element={<Mine/>} />
            </Routes>

        </>
    )
}
