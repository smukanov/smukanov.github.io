import { ComponentProps, FC } from "react"

type ButtonProps = ComponentProps<'button'>

export const Button: FC<ButtonProps> = ({children, className, ...rest}) => {
    const btnColor = rest.disabled ? 'opacity-50' : ''
    return (
        <button {...rest} className={`${className} ${btnColor} bg-orange-600 px-10 py-2 rounded-3xl`}>
            {children}
        </button>
    )
}