const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("form"); // Assume que o formulário é um elemento <form>

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const listaRespostas = {
    nome: e.target.elements["nome"].value,
    email: e.target.elements["email"].value,
    assunto: e.target.elements["assunto"].value,
    mensagem: e.target.elements["mensagem"].value,
  };

  localStorage.setItem("Contato", JSON.stringify(listaRespostas));
  alert("Sua mensagem foi enviada com sucesso");

  // Redirecionar ou limpar o formulário após o envio, se necessário.
  // e.target.reset(); // Descomente se quiser limpar o formulário
});

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificarCampo(campo));
  campo.addEventListener("invalid", (evento) => evento.preventDefault()); // Reseta a mensagem padrão do HTML.
});

const possiveisErros = [
  // Tipos de erro
  "valueMissing",
  "typeMismatch",
  "tooShort",
];

const mensagensDeErro = {
  // Mensagens
  nome: {
    valueMissing: "Este campo não pode estar vazio",
    tooShort: "Nome muito curto. Por favor, insira um nome válido",
  },
  email: {
    valueMissing: "Este campo não pode estar vazio",
    typeMismatch: "Por favor, insira um e-mail válido",
    tooShort: "E-mail muito curto. Por favor, insira um e-mail válido",
  },
  assunto: {
    valueMissing: "Este campo não pode estar vazio",
    tooShort: "O assunto é muito curto",
  },
  mensagem: {
    valueMissing: "Este campo não pode estar vazio",
    tooShort: "Sua mensagem é muito curta",
  },
};

function verificarCampo(campo) {
  let mensagemDeErro = "";

  if (campo.value.length <= 4) {
      console.log(" mensagem muito curta");
  }

  possiveisErros.forEach((erro) => {
    if (campo.validity[erro]) {
      mensagemDeErro = mensagensDeErro[campo.name][erro];
      console.log(mensagemDeErro);
    }
  });

  const erroNaTela = campo.parentNode.querySelector(".mensagem__erro");
  const validadorDeinput = campo.checkValidity();

  if (!validadorDeinput) {
    erroNaTela.textContent = mensagemDeErro;
  } else {
    erroNaTela.textContent = "";
  }
}