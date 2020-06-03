import { register } from "./data.js";
export default () => {
    const container = document.createElement("div");
    container.innerHTML = `
    <a href="/#login">Voltar</a>
    <h1> &lt;Nome Projeto&gt; </h1>
    <h2>Inclua seus dados</h2>
    <form id="register">
      <input id="name" type="text" placeholder="Seu nome completo">
      <input id="email" type="email" placeholder="Seu e-mail">
      <input id="password" type="password" placeholder="Sua senha">
      <button type="submit">CADASTRAR</button>
    </form>
    `;
    //       
    // <a href="#login" type="submit">Cadastrar</a>

    container.querySelector("#register").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = container.querySelector("#email").value
        const password = container.querySelector("#password").value
        const username = container.querySelector("#name").value

        console.log(username);
        console.log(email);
        console.log(password);

        register(email, password, username);
    });
    return container;
}