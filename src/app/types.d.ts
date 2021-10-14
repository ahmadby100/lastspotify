interface DB_result {
    album?: string,
    artist?: string,
    date?: string,
    duration?: number,
    tags?: string
    track?: string,
    weekday?: string
    plays?: number,
    type?: string,
    album_image?: string,
    artist_image?: string
    time_played?: string,
    avg_plays?: number
    hour?: number
    rtype?: string,
    genres?: string,
    img?: string
    day?: string
}

export interface DBResponse {
    requestParams: {
        period: {
            length: number,
            from: string,
            to: string
        },
        offset: number,
        type: string,
        query: string
    },
    results: DB_result[] 
}

export interface chartData {
    label: string,
    backgroundColor: string,
    borderColor: string,
    data: chartInnerData,
    stepped: boolean
}

export interface chartInnerData {
    Mon: number,
    Tue: number,
    Wed: number,
    Thur: number,
    Fri: number,
    Sat: number,
    Sun: number
}

export interface chartConfig {
    type: string,
    data: chartInnerData,
    options: {
        animation?: {
            onComplete?: Function,
            delay?: Function,

        },
        elements?: {
            line?: {
                tension?: number
            }
        },
        legend?: {
            display?: boolean
        },
        responsive?: boolean,
        plugins?: {
            title?: {
                display?: boolean,
                text?: string[]
            },
            scales?: {
                y?: {
                    type?: string,
                    display?: boolean,
                    position?: string
                }
            }
        }
    }
}

export interface daily_plays {
    curr: Object,
    prev: Object
}
export interface TopType {
    title?: string | undefined,
    artist: string | undefined,
    img: string | undefined,
    plays: number | undefined
}
export interface Top {
    track: {
        top: TopType,
        next: Array<TopType>
    },
    artist: {
        top: TopType,
        next: Array<TopType>
    },
    album: {
        top: TopType,
        next: Array<TopType>
    }
}

export interface Single {
    top: TopType,
    next: Array<TopType>
}
export interface Next {
    track: Array<TopType>,
    album: Array<TopType>,
    artist: Array<TopType>
}

export interface Highlights {
    curr_plays: DBResponse,
    curr_active: DBResponse,
    curr_time: DBResponse
    prev_plays?: DBResponse,
    prev_active?: DBResponse,
    prev_time?: DBResponse
}
export interface Discoveries {
    track: {
        plays: DBResponse,
        data: DBResponse,
        prev?: DBResponse
    },
    album: {
        plays: DBResponse,
        data: DBResponse,
        prev?: DBResponse
    },
    artist: {
        plays: DBResponse,
        data: DBResponse,
        prev?: DBResponse
    }
}