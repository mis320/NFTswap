
import { Contract, parseUnits, formatUnits } from "ethers";
export const getMethods = (provider, abi, token) => {
    return new Contract(token, abi, provider)
}
// const signer = await provider.getSigner()
// const res = await getMethods(signer, TOKEN_ABI, TOKEN).decimals.staticCall()
// const gasLimit = await getMethods(signer, TOKEN_ABI, TOKEN).transfer.estimateGas(
//     "0x00000",
//     toWei("99", 18)
// )
// console.log(res);
// console.log(gasLimit);
// const res3 = await getMethods(signer, TOKEN_ABI, TOKEN).transfer.send(
//     "0x00000",
//     toWei("99", 18),
//     {
//         gasLimit: gasLimit,
//         gasPrice: toWei("10", "9"),
//         //eip1559
//         //    maxPriorityFeePerGas: toWei("1","9"), 
//         //    maxFeePerGas: toWei("200","9")
//     }
// )

// console.log(res3);


export const formWei = (number, unit) => {
    return formatUnits(String(number), parseInt(unit))
}
export const toWei = (number, unit) => {
    return parseUnits(String(number), parseInt(unit))
}