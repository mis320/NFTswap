import React from 'react'
import Header from "./header";
import Routers from "../router";
import Connect from "./connect";
export default function Index() {
    return (
        <>
            <Connect />
            <Header />
            <Routers />
            <hr></hr>
        </>
    )
}
