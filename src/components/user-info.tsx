import { FC } from "react";
import { User } from "../types";
import { Button } from "../ui";

type UserInfoProps = {
    user: User
    disabled?: boolean
    onBtnClick: () => void
}

export const UserInfo: FC<UserInfoProps> = ({user, onBtnClick, disabled}) => {
    return (
        <div>
            <div className="mb-5">
                <div>NAME</div>
                <h2 className="text-orange-600 text-3xl">{user.name.toUpperCase()}</h2>
            </div>
            <div className="mb-5">
                <div>EMAIL</div>
                <h2 className="text-orange-600 text-3xl">{user.email.toUpperCase()}</h2>
            </div>
            <Button disabled={disabled} onClick={onBtnClick}>
                LIST ME TO THE TABLE
            </Button>
        </div>
    )
}