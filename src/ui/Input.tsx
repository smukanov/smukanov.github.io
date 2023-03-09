import { ComponentProps, FC } from "react"

type InputProps = ComponentProps<'input'> & {
    error?: boolean
}

export const Input: FC<InputProps> = ({className, error, ...rest}) => {
    const borderColor = rest.disabled ? 'border-gray-500' : error ? 'border-red-600' : 'border-white'
    return (
        <input 
            {...rest}
            className={`${className} block py-1.5 px-3 bg-black border ${borderColor} w-full rounded-2xl`} 
        />
    )
}