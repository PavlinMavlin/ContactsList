import axios from "axios"


const instance = axios.create({
    baseURL: "https://reqres.in/api/",
})
//API
export const contactsAPI = {
    getContacts() {
        return instance.get<GetContactResponseType>("users")
    },
    deleteContact(id: number) {
        return instance.delete(`users/${id}`)
    },
    createContact(name: string, lastName: string) {
        return instance.post<CreateContactResponseType>(`users/`, {name: name, job: lastName})
    },
    updateContact(name: string, lastName: string, id: number) {
        return instance.put<UpdateContactResponseType>(`users/${id}`, {name: name, job: lastName})
    },
}

//types
export  type GetContactResponseType = {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: Array<ContactType>
    support: SupportType
}
type SupportType = { url: string, text: string }

export type ContactType = {
    avatar: string
    email: string
    first_name: string
    id: number
    last_name: string
}

export type CreateContactResponseType = {
    createdAt: string
    id: string
    job: string
    name: string
}
export type UpdateContactResponseType = {
    job: string
    name: string
    updatedAt: string
}