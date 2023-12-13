export interface Article {
    id: number,
    author_name: string,
    title: string,
    excerpt: string,
    body: string,
    status: string,
    headline: boolean,
    creation_date: Date,
    publish_date: Date,
    category_id?: number,
    creator_id: number,
    url: string,
    source: string,
    caption: string
}