import { navigateTo } from "../../Router";
import { getAllposts } from "../../class/getAllPosts.class";
import { IPosts } from "../../interfaces/IData";

export function dashboard() {
  const root = document.querySelector(".root") as HTMLDivElement;
  root.innerHTML = /*html*/ `
  <div class="header">
      <h1>posts a day</h1>
      <button class="openDialog">crear</button>
      <button id="logout" class="button">Logout</button>
  </div>
  <div class="container1">
    <div class="container0">
        <dialog id="dialog">
  <form id="postForm">
    <h2>¿Estás seguro de que quieres publicar?</h2>
    <p>Una vez que publiques, no podrás deshacer esta acción.</p>

    <label for="title">Título:</label>
    <input type="text" id="title" name="title">

    <label for="body">Cuerpo:</label>
    <input type="text" id="body" name="body">

    <label for="creationDate">Fecha de Creación:</label>
    <input type="text" id="creationDate" name="creationDate">

    <label for="creator">Creador:</label>
    <input type="text" id="creator" name="creator">

    <label for="estimatedPublicationDate">Fecha Estimada de Publicación:</label>
    <input type="text" id="estimatedPublicationDate" name="estimatedPublicationDate">

    <label for="status">Estado:</label>
    <input type="text" id="status" name="status">

    <label for="approvalPercentage">Porcentaje de Aprobación:</label>
    <input type="number" id="approvalPercentage" name="approvalPercentage">

    <label for="corrections">Correcciones:</label>
    <input type="text" id="corrections" name="corrections">

    <label for="platform">Plataforma:</label>
    <select id="platform" name="platform">
      <option value="Facebook">Facebook</option>
      <option value="Instagram">Instagram</option>
      <option value="X">X</option>
    </select>

    <label for="postUrl">URL del Post:</label>
    <input type="url" id="postUrl" name="postUrl">

    <label for="multimediaUrl">URL Multimedia:</label>
    <input type="url" id="multimediaUrl" name="multimediaUrl">

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
  formCreatePost.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title") as HTMLInputElement;
    const body = document.getElementById("body") as HTMLInputElement;
    const creationDate = document.getElementById(
      "creationDate"
    ) as HTMLInputElement;
    const creator = document.getElementById("creator") as HTMLInputElement;
    const estimatedPublicationDate = document.getElementById(
      "estimatedPublicationDate"
    ) as HTMLInputElement;
    const status = document.getElementById("status") as HTMLInputElement;
    const approvalPercentage = document.getElementById(
      "approvalPercentage"
    ) as HTMLInputElement;
    const corrections = document.getElementById(
      "corrections"
    ) as HTMLInputElement;
    const platform = document.getElementById("platform") as HTMLSelectElement;
    const postUrl = document.getElementById("postUrl") as HTMLInputElement;
    const multimediaUrl = document.getElementById(
      "multimediaUrl"
    ) as HTMLInputElement;

    const post: IPosts = {
      title: title.value,
      body: body.value,
      creationDate: creationDate.value,
      creator: creator.value,
      estimatedPublicationDate: estimatedPublicationDate.value,
      status: status.value,
      approvalPercentage: Number(approvalPercentage.value),
      corrections: corrections.value,
      platform: platform.value,
      postUrl: postUrl.value,
      multimediaUrl: multimediaUrl.value,
    };

    console.log(post);

    fetch(
      `https://api.languagetool.org/v2/check?text=${title.value}&language=es`,
      {
        method: "POST",
      }
    ).then((response) => {
      console.log(response);
    });

    const result = fetch("https://api-posts.codificando.xyz/posts", {
      headers: {
        "Content-Type": "application/json",
        "x-user-email": sessionStorage.getItem("x-user-email") as string,
      },
      method: "POST",
      body: JSON.stringify(post),
    }).then((response) => {
      if (response.status === 201) {
        alert("Post creado correctamente");
        dialog.close();
      } else {
        alert("Error al crear el post");
      }
    });
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
                <menu>
                  <button class="edit">Editar</button>
                  <button class="delete">Eliminar</button>
                </menu>
            </div>
            `;

    });
  });
}

class FormEditor {
  private form: HTMLFormElement;
  private fields: { [key: string]: HTMLInputElement } = {};

  constructor(formId: string) {
    this.form = document.getElementById(formId) as HTMLFormElement;

    // Buscar todos los campos del formulario y almacenarlos en el objeto fields
    const fieldElements = this.form.querySelectorAll<HTMLInputElement>(
      "input, select, textarea"
    );
    fieldElements.forEach((field) => {
      this.fields[field.id] = field;
    });
  }

  submitForm(callback: (data: IPosts) => void): void {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const post: IPosts = {
        title: this.getFieldValue("title"),
        body: this.getFieldValue("body"),
        creationDate: this.getFieldValue("creationDate"),
        creator: this.getFieldValue("creator"),
        estimatedPublicationDate: this.getFieldValue(
          "estimatedPublicationDate"
        ),
        status: this.getFieldValue("status"),
        approvalPercentage: Number(this.getFieldValue("approvalPercentage")),
        corrections: this.getFieldValue("corrections"),
        platform: this.getFieldValue("platform"),
        postUrl: this.getFieldValue("postUrl"),
        multimediaUrl: this.getFieldValue("multimediaUrl"),
      };

      callback(post);
    });
  }

  getFieldValue(fieldId: string): string {
    const field = this.fields[fieldId];
    if (!field) {
      throw new Error(`No se encontró el campo con el ID "${fieldId}"`);
    }
    return field.value;
  }

  setFieldValue(fieldId: string, value: string): void {
    const field = this.fields[fieldId];
    if (!field) {
      throw new Error(`No se encontró el campo con el ID "${fieldId}"`);
    }
    field.value = value;
  }

  resetForm(): void {
    this.form.reset();
  }
}


