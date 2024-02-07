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

export interface IEvents {
    [key: string]: IEvent;
  }