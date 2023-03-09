import { User, UserWithWallet } from "../types"

export class LocalStorage {
    private static REGISTERED_USER = 'REGISTERED_USER'
    private static PARTICIPANT_USER = 'PARTICIPANT_USER'

    private static getParsedValue(key: string){
        const item = localStorage.getItem(key)
        return item === null ? null : JSON.parse(item)
    }

    private static setStringifiedValue(key: string, value: any){
        const json = JSON.stringify(value)
        localStorage.setItem(key, json)
    }

    static getRegisteredUser = (): User => this.getParsedValue(this.REGISTERED_USER)

    static getParticipantUser = (): UserWithWallet => this.getParsedValue(this.PARTICIPANT_USER)

    static setRegisteredUser = (user: User) => this.setStringifiedValue(this.REGISTERED_USER, user)

    static setParticipantUser = (user: UserWithWallet) => this.setStringifiedValue(this.PARTICIPANT_USER, user)

    static clearRegisteredUser(){
        localStorage.removeItem(this.REGISTERED_USER)
    }

    static clearParticipantUser(){
        localStorage.removeItem(this.PARTICIPANT_USER)
    }

    static clearStorage(){
        localStorage.clear()
    }
}