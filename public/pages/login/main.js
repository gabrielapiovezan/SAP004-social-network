import { login, loginGoogle } from './data.js';
import { button } from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import { link } from '../elementos/objetos/link.js';
import { image } from '../elementos/objetos/image.js';

export default () => {
	const container = document.createElement('div');
	container.classList.add("container");

	container.innerHTML =
		`<figure>
				${image({ src: "/pages/elementos/imagens/IMG2.png", class: "img-login", alt: "logo-umâmi" })}
			</figure>
			<div class="login">
				<h1> &lt; Umâmi &gt; </h1>
				<h2>Bem vindo!</h2>
				<form id="login-email">
					${input({ type: "email", id: "email", placeholder: " E-mail", class: "input" })}
					${input({ type: "password", id: "password", placeholder: " Senha", class: "input" })}     
					${button({ name: "Entrar" })}
				</form>
				<div id="error" class="error"></div>
				<p>Entrar com Google</p>
				${input({ type: "image", src: "./pages/elementos/icones/icon-google-32.png", id: "gmailBtn", class: "icon-google" })}
				<p>Não tem uma conta? ${link({ href: "#register", name: "Cadastre-se", title: "cadastre-se", target: "_self" })}</p>
			</div>`;

	container.querySelector("#login-email").addEventListener("submit", (event) => {
		event.preventDefault();
		const email = container.querySelector('#email').value;
		const password = container.querySelector('#password').value;
		login(email, password, printErrorLogin, redirectHome);

	});

	const printErrorLogin = (answer) => {
		container.querySelector("#error").innerHTML = answer;
	};

	container.querySelector("#gmailBtn").addEventListener('click', (event) => {
		event.preventDefault();
		loginGoogle(redirectHome);
	});

	function redirectHome() {
		window.location.hash = 'home';
	}

	return container;
}