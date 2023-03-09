export type Participiant = {
    id: number
    username: string
    email: string
    address: string
}

export type ParticipiantsResponse = {
    meta: {
        currentPage: number
        perPage: number
        totalPages: number
    }
    items: Participiant[]
}