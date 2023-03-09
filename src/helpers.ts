export const checkMetamaskInstalled = () => {
    //@ts-ignore
    if (typeof window.ethereum !== 'undefined' && !navigator.brave) {
        return true
    }
    return false
}