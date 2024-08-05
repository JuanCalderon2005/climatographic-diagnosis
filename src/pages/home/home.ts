import { LoginForm } from "../../class/login.class";
import { navigateTo } from "../../Router";

export function home() {
  const root = document.querySelector(".root") as HTMLDivElement;

  root.innerHTML = /*html*/ `
      <div class="container">
    <input type="checkbox" id="check">
    <div class="login form">
      <header>Login</header>
      <form class='form-login' action="#">
        <input type="text" placeholder="Enter your email" class='loginInput'>
        <input type="password" placeholder="Enter your password" class='passwordInput'>
        <input type="button" id='Blogin' class="button" value="Login">
      </form>
      <div class="signup">
        <span class="signup">Don't have an account?
          <label for="check">Signup</label>
        </span>
      </div>
    </div>
    `;

  const singup = document.querySelector(".signup") as HTMLDivElement;
  singup.addEventListener("click", () => {
    navigateTo("/register");
  });

  const buttonLogin = document.getElementById("Blogin") as HTMLButtonElement;
  buttonLogin.addEventListener("click", async () => {
    const form = document.querySelector(".form-login") as HTMLFormElement;
    const loginForm = new LoginForm(form);
    const values = loginForm.getValues();

    const userData = fetch("https://api-posts.codificando.xyz/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.statusText === 'Created') {
        alert("Sesion iniciada");
        console.log(response);
        navigateTo("/dashboard");
      } else {
        alert("Error al iniciar sesion");
        console.log(response);
      }
    });
  });
}
