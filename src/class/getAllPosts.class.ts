import { IPosts } from "../interfaces/IData";

export class getAllposts {
  public async getAllPosts(): Promise<IPosts[]> {
    const response = await fetch("https://api-posts.codificando.xyz/posts", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }
}
