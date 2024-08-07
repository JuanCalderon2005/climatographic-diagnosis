import { IPosts } from "../interfaces/IData";
  
  export class PostsManager {
    private apiUrl: string;
    private containerSelector: string;
  
    constructor(apiUrl: string, containerSelector: string) {
      this.apiUrl = apiUrl;
      this.containerSelector = containerSelector;
    }
  
    async getAllPosts() {
      try {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error al obtener los posts:", error);
        throw error;
      }
    }
  
    renderPosts(data: IPosts[]) {
      const container = document.querySelector(this.containerSelector) as HTMLDivElement;
      container.innerHTML = "";
  
      if (Array.isArray(data)) {
        data.forEach((post) => {
          if (post.title && post.creationDate && post.estimatedPublicationDate && post.platform && post.approvalPercentage) {
            container.innerHTML += /*html*/ `
              <div class="post" id="post-${post.id}">
                <p><strong>${post.id}</strong></p>
                <h2><strong>${post.title}</strong></h2>
                <p><strong>Creación:</strong> ${post.creationDate}</p>
                <p><strong>Publicación:</strong> ${post.estimatedPublicationDate}</p>
                <p><strong>Plataforma:</strong> ${post.platform}</p>
                <p><strong>Calidad de la Publicación:</strong> ${post.approvalPercentage}</p>
                <input type='button' class="edit-button" data-id="${post.id}" value='editar'>
              </div>
            `;
          }
        });
  
        this.attachEditEvents(data);
      } else {
        console.error("La respuesta no es un array de posts");
      }
    }
  
    attachEditEvents(data: IPosts[]) {
      const editButtons = document.querySelectorAll(".edit-button") as NodeListOf<HTMLButtonElement>;
  
      editButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const button = event.target as HTMLButtonElement;
          const postId = button.getAttribute("data-id");
          const post = data.find((p) => p.id === (postId ? parseInt(postId) : undefined));
  
          if (post) {
            this.openEditDialog(post);
          }
        });
      });
    }
  
    openEditDialog(post: IPosts) {
      const editDialog = document.getElementById("editDialog") as HTMLDialogElement;
      editDialog.showModal();
  
      const editTitle = document.getElementById("editTitle") as HTMLInputElement;
      const editBody = document.getElementById("editBody") as HTMLInputElement;
      const editCreationDate = document.getElementById("editCreationDate") as HTMLInputElement;
      const editCreator = document.getElementById("editCreator") as HTMLInputElement;
      const editEstimatedPublicationDate = document.getElementById("editEstimatedPublicationDate") as HTMLInputElement;
      const editStatus = document.getElementById("editStatus") as HTMLInputElement;
      const editApprovalPercentage = document.getElementById("editApprovalPercentage") as HTMLInputElement;
      const editCorrections = document.getElementById("editCorrections") as HTMLInputElement;
      const editPlatform = document.getElementById("editPlatform") as HTMLSelectElement;
      const editPostUrl = document.getElementById("editPostUrl") as HTMLInputElement;
      const editMultimediaUrl = document.getElementById("editMultimediaUrl") as HTMLInputElement;
  
      // Asignar valores del post al formulario de edición
      editTitle.value = post.title;
      editBody.value = post.body;
      editCreationDate.value = post.creationDate;
      editCreator.value = post.creator;
      editEstimatedPublicationDate.value = post.estimatedPublicationDate;
      editStatus.value = post.status;
      editApprovalPercentage.value = post.approvalPercentage.toString();
      editCorrections.value = post.corrections;
      editPlatform.value = post.platform;
      editPostUrl.value = post.postUrl;
      editMultimediaUrl.value = post.multimediaUrl;
  
      const id = post.id;
      console.log(typeof id);
  
      const formEditPost = document.getElementById("editDialog") as HTMLFormElement;
  
      const confirmEdit = document.getElementById("confirmEdit") as HTMLButtonElement;
  
      confirmEdit.addEventListener("click", async (e) => {
        e.preventDefault();
        await this.savePostEdit(id, editTitle, editBody, editCreationDate, editCreator, editEstimatedPublicationDate, editStatus, editApprovalPercentage, editCorrections, editPlatform, editPostUrl, editMultimediaUrl, editDialog);
      });
    }
  
    async savePostEdit(id: number|undefined, editTitle: HTMLInputElement, editBody: HTMLInputElement, editCreationDate: HTMLInputElement, editCreator: HTMLInputElement, editEstimatedPublicationDate: HTMLInputElement, editStatus: HTMLInputElement, editApprovalPercentage: HTMLInputElement, editCorrections: HTMLInputElement, editPlatform: HTMLSelectElement, editPostUrl: HTMLInputElement, editMultimediaUrl: HTMLInputElement, editDialog: HTMLDialogElement) {
      const post: IPosts = {
        title: editTitle.value,
        body: editBody.value,
        creationDate: editCreationDate.value,
        creator: editCreator.value,
        estimatedPublicationDate: editEstimatedPublicationDate.value,
        status: editStatus.value,
        approvalPercentage: Number(editApprovalPercentage.value),
        corrections: editCorrections.value,
        platform: editPlatform.value,
        postUrl: editPostUrl.value,
        multimediaUrl: editMultimediaUrl.value,
      };
  
      const result = await fetch(`${this.apiUrl}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-user-email": sessionStorage.getItem("x-user-email") as string,
        },
        method: "PUT",
        body: JSON.stringify(post),
      });
  
      if (result.status === 201) {
        alert("Post editado correctamente");
        editDialog.close();
      } else {
        alert("Error al editar el post");
        console.log(result);
      }
    }
  }
  
  // Uso de la clase
  const postsManager = new PostsManager('https://api-posts.codificando.xyz/posts', '.printPosts');
  postsManager.getAllPosts().then((data) => postsManager.renderPosts(data));
  