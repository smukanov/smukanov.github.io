import { FC } from "react"

type CloseButtonProps = {
    className?: string
    onClick?: () => void
}

export const CloseButton: FC<CloseButtonProps> = ({className = '', onClick}) => {
    return (
        <div className={`${className} inline-block text-2xl rotate-45 cursor-pointer hover:text-red-600`} onClick={onClick}>+</div>
    )
}