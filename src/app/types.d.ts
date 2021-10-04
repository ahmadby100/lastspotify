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
