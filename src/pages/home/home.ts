import { LoginForm } from "../../class/login.class";
import { navigateTo } from "../../Router";

export function home() {
    const root = document.querySelector('.root') as HTMLDivElement;

    root.innerHTML = /*html*/ `
    <div class="container">
    <input type="checkbox" id="check">
    <div class="login form">
      <header>Login</header>
      <form class='form' action="#">
      <input class='loginInput' type="text" placeholder="Enter your email">
      <input class='passwordInput' type="password" placeholder="Enter your password">
        <input type="button" class="buttonLogin" value="Login">
      </form>
      </div>
    </div>
  </div>
    `;

    const buttonLogin = document.querySelector('.buttonLogin') as HTMLButtonElement;
    buttonLogin.addEventListener('click', async () => {
      const form = document.querySelector('.form') as HTMLFormElement;
      const login = new LoginForm(form);
      const data = login.getValues();
      if (data.email === 'eve.holt@reqres.in' && data.password === 'cityslicka') {
        const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        for (const key in result) {
          if (Object.prototype.hasOwnProperty.call(result, key)) {
            const token = result[key];
            localStorage.setItem('token', token);
            alert('Login successful');
            navigateTo('/dashboard');
          }
        }
      } else {
        alert('Invalid email or password');
      }
    });
    

}