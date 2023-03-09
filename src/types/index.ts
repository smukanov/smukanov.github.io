export type User = {
    name: string
    email: string
}

export type UserWithWallet = User & {wallet: string}