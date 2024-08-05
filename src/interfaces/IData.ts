export interface IDataLogin {
  email: string;
  password: string;
}

export interface IPosts {
  title: string;
  body: string;
  creationDate: string;
  creator: string;
  estimatedPublicationDate: string;
  status: string;
  approvalPercentage: number;
  corrections: string;
  platform: string;
  postUrl: string;
  multimediaUrl: string;
}
