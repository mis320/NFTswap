

export function formatAddress(str) {
    return str.slice(0, 8) + "..." + str.slice(-5);
}