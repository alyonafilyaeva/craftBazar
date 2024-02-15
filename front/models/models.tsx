export interface IEvent {
    id?: number,
    title?: string,
    date?: string,
    time_start?: string,
    time_finish?: string,
    city?: string,
    address?: string,
    descriprion?: string,
    link?: string,
    cost?: number,
    picture?: string,
    idOrganizer?: number,
    dateCreated?: string,
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