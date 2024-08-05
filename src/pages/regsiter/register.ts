import { navigateTo } from "../../Router";
import { RegisterForm } from "../../class/register.class";

export function register() {
    const root = document.querySelector(".root") as HTMLDivElement;

    root.innerHTML = /*html*/ `
        <div class="container">
        <input type="checkbox" id="check">
        <div class="login form">
        <header>Signup</header>
        <form class='form-register' action="#">
            <input type="text" placeholder="Enter your email" class='registerInput'>
            <input type="password" placeholder="Create a password" class='registerpasswordInput'>
            <input type="button" id='Bregister' class="button" value="Signup">
        </form>
        <div class="signup">
            <span class="signup">Already have an account?
            <label for="check">Login</label>
            </span>
        </div>
        </div>
    </div>
        `;

    const singup = document.querySelector(".signup") as HTMLDivElement;
    singup.addEventListener("click", () => {
        navigateTo("/");
    });

    const buttonRegister = document.getElementById(
        "Bregister"
    ) as HTMLButtonElement;
    buttonRegister.addEventListener("click", async () => {
        const form = document.querySelector(".form-register") as HTMLFormElement;
        const registerForm = new RegisterForm(form);
        const values = registerForm.getValuesRegister();
        const userData = fetch("https://api-posts.codificando.xyz/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((response) => {
            if (response.status === 201) {
                alert("Usuario creado");
                console.log(response.status);
                navigateTo("/");
            } else {
                alert("Error al iniciar sesion");
                console.log(response.status);
            }
        });
    });
}
