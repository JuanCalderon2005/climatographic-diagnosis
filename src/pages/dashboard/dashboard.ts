import { navigateTo } from "../../Router";
import { CreatePosts } from "../../class/createPosts.class";
import { getAllposts } from "../../class/getAllPosts.class";

export function dashboard() {
  const root = document.querySelector(".root") as HTMLDivElement;
  root.innerHTML = /*html*/ `
    <div class="container0">
        <div class="container1">
        <div class="header">
            <h1>Dashboard</h1>
            <button class="openDialog">crear</button>
            <button id="logout" class="button">Logout</button>
        </div>
        <dialog id="dialog">
            <form id="postForm">
            <h2>¿Estás seguro de que quieres publicar?</h2>
            <p>Una vez que publiques, no podrás deshacer esta acción.</p>

            <label for="title">Título:</label>
            <input type="text" id="title" name="title" required>

            <label for="creationDate">Fecha de Creación:</label>
            <input type="date" id="creationDate" name="creationDate" required>

            <label for="estimatedPublicationDate">Fecha Estimada de Publicación:</label>
            <input type="date" id="estimatedPublicationDate" name="estimatedPublicationDate" required>

            <label for="platform">Plataforma:</label>
            <select id="platform" name="platform" required>
            <option value="">Selecciona una plataforma</option>
            <option value="Twitter">Twitter</option>
            <option value="Facebook">Facebook</option>
            </select>

            <label for="approvalPercentage">Porcentaje de Calidad de la Publicación:</label>
            <input type="range" id="approvalPercentage" name="approvalPercentage" min="0" max="100" required>
            <div id="approvalIndicator"></div>

            <menu>
            <button type="button" id="cancel">Cancelar</button>
            <button type="submit" id="confirm">Publicar</button>
            </menu>
            </form>
        </dialog>
    </div>
    <div class='printPosts'></div>
    
    `;

  const logout = document.getElementById("logout") as HTMLButtonElement;
  logout.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    navigateTo("/");
    location.reload();
  });
  const dialog = document.getElementById("dialog") as HTMLDialogElement;
  const openDialog = document.querySelector(".openDialog") as HTMLButtonElement;
  openDialog.addEventListener("click", () => {
    dialog.showModal();
  });

  const formCreatePost = document.getElementById("postForm") as HTMLFormElement;
  const createPost = new CreatePosts(formCreatePost);
    formCreatePost.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = createPost.getValues();
        console.log(values);
        dialog.close();
    });

  const posts = new getAllposts();
  posts.getAllPosts().then((data) => {
    const container = document.querySelector(".printPosts") as HTMLDivElement;
    data.forEach((post) => {
      container.innerHTML += /*html*/ `
            <div class="post">
                <h2><strong>${post.title}</strong></h2>
                <p><strong>Creación:</strong> ${post.creationDate}</p>
                <p><strong>Publicación:</strong> ${post.estimatedPublicationDate}</p>
                <p><strong>Plataforma:</strong> ${post.platform}</p>
                <p><strong>Calidad de la Publicación:</strong> ${post.approvalPercentage}</p>
            </div>
            `;
    });
  });
}
