export function notFound(){
    const root = document.querySelector('.root') as HTMLDivElement;

    root.innerHTML = /*html*/ `
        <h1>404</h1>
        <p>Page not found</p>
    `;
}