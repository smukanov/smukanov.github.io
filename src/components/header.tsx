import { useEthers } from "@usedapp/core"
import { FC } from "react"
import { Button } from "../ui"

const Logo = () => {
    return (
        <div className="w-40 h-10 bg-gray-500 justify-center items-center flex border-dashed border-2 border-white">
            LOGO
        </div>
    )
}

const ConnectButton = () => {
    const {activateBrowserWallet, account, deactivate} = useEthers()

    const handleOnClick = () => {
        if (account){
            deactivate()
        }
        else {
            activateBrowserWallet()
        }
    }

    return (
        <Button onClick={handleOnClick}>
            {account ?? 'CONNECT METAMASK'}
        </Button>
    )
}

type HeaderProps = {
    className?: string
}

export const Header: FC<HeaderProps> = ({className = ''}) => {
    return (
        <div className={`flex justify-between ${className}`}>
            <Logo />
            <ConnectButton />
        </div>
    )
}