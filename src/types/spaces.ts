export type subSpaceType = {
    id: number,
    name: string,
    slug: string,
    is_master: boolean
}

export const placeHolderSubSpace:subSpaceType = {
    id: 0,
    name: "",
    slug: "",
    is_master: false
}

export const placeHolderSpace:space = {
    id: 0,
    name: "Loading...",
    menu_logo: "",
    main_logo: "",
    slug: ""
}
declare global {
    interface Window {
        room:any
       
    }
}


export type space = {
    id: number,
    name: string,
    menu_logo: string,
    main_logo: string,
    slug: string,
    should_notify?: boolean,
    notification_before?: boolean,
    automatic_remainder?: boolean,
    google_calender_invites?: boolean,
    event_start?: string,
    event_mode?: boolean,
    event_end?: string,
    public_mode?: boolean,
    is_lobby?: boolean,
    lobby_type?: string,
    lobby_image?: string,
    lobby_video?: string,
    custom_turn_server_enabled?: boolean,
    custom_turn_server?: string,
    add_password?: boolean,
    friendly_url?: string,
    auto_start_space?: boolean,
    subrooms?:subSpaceType[],
}