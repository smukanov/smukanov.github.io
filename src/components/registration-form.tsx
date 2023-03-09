import { useEthers } from "@usedapp/core"
import { FC, FormEvent, useState } from "react"
import { LocalStorage } from "../local-storage"
import { User } from "../types"
import { Button, Input } from "../ui"

type RegistrationFormProps = {
    onRegistered: (value: User) => void
}

export const RegistrationForm: FC<RegistrationFormProps> = ({onRegistered}) => {
    const {account, activateBrowserWallet} = useEthers()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [validateError, setValidateError] = useState(false)

    const validateFields = () => {
        const nameIsFilled = name.trim().length
        const emailIsFilled = email.trim().length

        return nameIsFilled && emailIsFilled
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(!account){
            activateBrowserWallet()
            return
        }

        if (!validateFields()){
            setValidateError(true)
            return
        }

        onRegistered({name, email})
        LocalStorage.setRegisteredUser({name, email})
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <label>
                    NAME
                    <Input
                        disabled={!account}
                        error={validateError && !name}
                        className="mt-2"
                        type="text"
                        placeholder="We will display your name in participation list"
                        onChange={e => setName(e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-5">
                <label>
                    EMAIL
                    <Input
                        disabled={!account}
                        error={validateError && !email}
                        className="mt-2"
                        type="text"
                        placeholder="We will display your email in participation list"
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
            </div>
            <Button type="submit">
                {account ? 'GET EARLY ACCESS' : 'CONNECT METAMASK'}
            </Button>
        </form>
    )
}