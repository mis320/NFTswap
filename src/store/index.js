
import Ethers from "./Ethers";
import { configureStore } from '@reduxjs/toolkit'

import thunk from "redux-thunk";
export const store = configureStore({
    reducer: {
        ethers: Ethers
    },
    middleware : [thunk],
})