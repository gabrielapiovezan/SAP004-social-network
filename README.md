# Umâmi

Para acessar a página [clique aqui](https://...). :computer:

## Índice

[arrumar]

- [1. Introdução](#1-introdução)
- [2. Resumo do projeto](#2-resumo-do-projeto)
- [3. Objetivos de aprendizagem](#3-objetivos-de-aprendizagem)
- [4. Considerações gerais](#4-considerações-gerais)
- [5. Entrega](#5-entrega)
- [6. Guias, dicas e leituras
  complementares](#6-guias-dicas-e-leituras-complementares)

---

## 1.Introdução - Resumo do projeto

O projeto **Umâmi**, se trata de uma rede social

Múltiplas telas, persistência de dados, Single-Page Application

<p align='center'>
<img src='https://media.giphy.com/media/10u6gt11vnm812/giphy.gif' alt='gif cozinheiro'> 
</p>

[foto desktop]

## 2.Definições do projeto

### Identificação do usuário - Principais usuários

Chefes, aspirantes, cozinheiros amadores...

### Objetivo

Reunir informações e receitas...

### Solução ???

## 3.Desenvolvimento

### Sobre a página

O nome foi escolhido ...
As cores foram pensadas...

<p align='center'>
<img src='./readme/mobile1.png' height='400px' alt='mobile 1'> <img src='./readme/mobile2.png' height='400px' alt='mobile 2'> <img src='./readme/mobile3.png' height='400px' alt='mobile 3'> <img src='./readme/mobile4.png' height='400px' alt='mobile 4'> 
</p>

<p align='center'>
<img src='./readme/desktop1.png' height='365px' alt='desktop 1'> 
</p>

### Cores

![Cores](./readme/cores.png)

### Protótipo

Protótipo previamente fornecido ....

- Tela mobile
<p align='center'>
<img src='https://user-images.githubusercontent.com/32286663/56174616-ec9f6100-5fb8-11e9-9edb-d5ef7c251d9c.png' alt='mobile' height='500px'> 
</p>
  <!-- ![mobile](https://user-images.githubusercontent.com/32286663/56174616-ec9f6100-5fb8-11e9-9edb-d5ef7c251d9c.png) -->

- Tela Desktop
<p align='center'>
<img src='https://user-images.githubusercontent.com/32286663/56174626-fcb74080-5fb8-11e9-8854-26e8d9c4e25f.png' alt='desktop' width='600px'> 
</p>
  <!-- ![desktop](https://user-images.githubusercontent.com/32286663/56174626-fcb74080-5fb8-11e9-8854-26e8d9c4e25f.png) -->

### Histórias de Usuário

- Como usuário novo, devo poder criar uma conta com email e senha válidos para poder iniciar uma sessão e ingressar na Rede Social.

- Como usuário novo, devo poder ter a opção de iniciar sessão com minha conta do Google para ingressar na Rede Social sem necessidade de criar uma conta de email válido.

- Como usuário logado devo poder criar, guardar, modificar no mesmo lugar (in place) e deletar publicações (post) privadas ou públicas.

- Como usuário logado devo poder ver todos os posts públicos e privados que criei até o momento, do mais recente para o mais antigo, assim como a opção de trocar a configuração de privacidade dos meus posts.

- Eu como usuário logado, posso dar like e ver a contagem de likes em minhas publicações

- Eu como usuário logado, posso escrever, salvar, editar ou deletar um comentário em minhas publicações.

- Eu como usuário logado, posso visualizar os dados de meu perfil criado, editá-los e incluir minha foto de perfil.

- Eu como usuário logado, posso adicionar fotos aos meus posts.

Todas as histórias implementadas levam em consideração critérios de aceitação e definições de pronto.

## 4.Estrutura e funcionalidades - Funcionamento

Temos ao total 4 telas, sendo elas: login, registro, linha do tempo e perfil.  
O usuário pode logar com email e senha, e pelo Google, também pode se registrar com um novo usuário.  
Como usuário logado consegue fazer post públicos e privados, com texto e imagens, além de editá-los, exclui-los e alterar a privacidade, pode visualizar os posts feitos até o momento por ele e outros usuários, dar _like_ e comentar nas postagens, editar e excluir estes comentários, visualiza os posts por ordem cronológica do mais recente para o mais antigo.  
No seu perfil consegue visualizar e alterar seus dados pessoais (Nome, foto, profissão, data de nascimento, email e senha) além de deletar sua conta.

## 5.Considerações técnicas

Para a construção do site foi utilizado o software Visual Studio Code com a extenção do Node-js.  
Sua marcação foi feita em HTML5 utilizando tags semânticas e sistema de rotas, sua estilização foi feita em CSS3 utilizando o conceito de mobile first e utilizando flexbox para o posicionamento dos elementos.  
Utilizamos o vanilla JavaScript na manipulação dos dados, funções assincronas, manipulação do DOM, modularização, uso de callbacks, consumo de Promises e template strings, levando em conta a separação de responsabilidade nos arquivos e criação de elementos.  
A manipulação e persistência dos dados foi feita através de um banco de dados não relacional, em tempo real, implementando operações CRUD (Criação, Leitura, Atualização e Remoção) de dados.  
Utilizamos o [Firebase](https://firebase.google.com/) (Hosting, Auth, Database e Firestore).  
Colaboração e organização com Trello, Git e GitHub.  
Interface hospedada usando Firebase Hosting.

### Instalação e execução. :octocat:

- [Clone](https://help.github.com/articles/cloning-a-repository/) o projeto na sua máquina executando o seguinte comando no seu terminal:

```sh
git clone (link do repositório)
```

- Instale as dependências do projeto com o comando:

```sh
npm install
```

- Rode o projeto na sua máquina com:

```sh
npm start
```

- E visualize o projeto no seu navegador com o link:

```sh
http://localhost:5000
```

## 6.Considerações gerais

## 7.Implementações futuras

## 8.Autoria

Este projeto foi feito por [Camila Cunha](https://github.com/camilagerarde), Gabriela Piovezam e Mariana Barros com base no projeto da Laboratoria.
