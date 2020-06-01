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
                <button id="btn" type="submit">CADASTRAR</button> 
            </form>
            `;
  return container
}

// document.getElementById("btn").addEventListener("click", function getName() {
//   let name = document.getElementById("name")
//   console.log(name.value)
// })