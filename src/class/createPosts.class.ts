import { IPostsData } from "../interfaces/IData";

export class CreatePosts {
    private form: HTMLFormElement;

    constructor(form: HTMLFormElement) {
        this.form = form;
    }

    private getInputValue(selector: string): string {
        const input = this.form.querySelector(selector) as HTMLInputElement;
        return input ? input.value : "";
    }

    getValues(): IPostsData {
        const titleValue = this.getInputValue("#title");
        const creationDate = this.getInputValue("#creationDate");
        const estimatedPublicationDate = this.getInputValue("#estimatedPublicationDate");
        const platform = this.getInputValue("#platform");
        const approvalPercentage = parseFloat(this.getInputValue("#approvalPercentage"));

        if (!titleValue || !creationDate || !estimatedPublicationDate || !platform || !approvalPercentage) {
            alert("All fields are required");
            throw new Error("All fields are required");
        }

        return {
            title: titleValue,
            creationDate: creationDate,
            estimatedPublicationDate: estimatedPublicationDate,
            platform: platform,
            approvalPercentage: approvalPercentage,
        };
    }
}
