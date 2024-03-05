export interface IEvent {
    id?: number,
    title?: string,
    date_start?: string,
    date_finish?: string,
    time_start?: string,
    time_finish?: string,
    city?: string,
    address?: string,
    description?: string,
    contacts?: string,
    link?: string,
    cost?: number,
    path_picture?: string,
    organizer_id?: number,
    date_created?: string,
}

export interface IMaster {
    id?: number,
    nickname?: string,
    title?: string,
    descriprion?: string,
    picture?: string,
    city?: string,
    contacts?: string,
    time?: string,
    category?: string
}

export interface IProduct {
    id?: number,
    title?: string,
    picture?: string,
    descriprion?:
    string,
    cost?: number,
    idMaster?: number,
}

export interface IMastersEvents {
    id: number,
    master_id: number,
    event_id: number,
    is_paid: false,
    nickname: string,
    title: string,
    description: string,
    city: string,
    contacts: string,
    picture_path: string,
    user_id: number,
    date_start: string,
    address: string
}