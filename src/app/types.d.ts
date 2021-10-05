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
    time_played?: number
    avg_plays?: number
    hour?: string
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