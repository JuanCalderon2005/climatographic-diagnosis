export interface IDataLogin {
    email: string;
    password: string;
}

export interface IPosts {
    id: number;
    postByUser: number;
    title: string;
    body: string;
    creationDate: string;
    estimatedPublicationDate: string;
    status: string;
    approvalPercentage: number;
    corrections: string;
    platform: string;
    postUrl: string;
    multimediaUrl: string;
    deletedAt: string | null;
}

export interface IPostsData extends Partial<IPosts> {
    title: string;
    creationDate: string;
    estimatedPublicationDate: string;
    platform: string;
    approvalPercentage: number;
}