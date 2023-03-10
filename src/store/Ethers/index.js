import { createSlice } from '@reduxjs/toolkit'

export const Ethers = createSlice({
    name: 'ethers',
    initialState: {
        provider: '0x0',
        account: '0x0',
        chainId: '0x0',
    },
    reducers: {
        newEthers: (state, action) => {
            state.provider = action.payload.provider
            state.account = action.payload.account
            state.chainId = action.payload.chainId
            //console.log(state.provider, state.account, state.chainId)
        },
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { newEthers } = Ethers.actions

export default Ethers.reducer