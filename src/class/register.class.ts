import { IDataLogin } from "../interfaces/IData";

export class RegisterForm {
    private form: HTMLFormElement;

    constructor(form: HTMLFormElement) {
        this.form = form;
    }

    private getInputValueRegister(selector: string): string {
        const input = this.form.querySelector(selector) as HTMLInputElement;
        return input ? input.value : "";
    }

    getValuesRegister(): IDataLogin {
        const emailValue = this.getInputValueRegister(".registerInput");
        const passwordValue = this.getInputValueRegister(".registerpasswordInput");

        if (!emailValue || !passwordValue) {
            alert("All fields are required");
            throw new Error("All fields are required");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            alert("Invalid email");
            throw new Error("Invalid email");
        }

        return {
            email: emailValue,
            password: passwordValue,
        };
    }
}
