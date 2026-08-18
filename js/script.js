const temasEl = document.getElementById("temas");
const gruposEl = document.getElementById("grupos");
const sortearBtn = document.getElementById("sortearBtn");
const limparBtn = document.getElementById("limparBtn");
const novoSorteioBtn = document.getElementById("novoSorteioBtn");
const mensagemEl = document.getElementById("mensagem");
const resultadoSection = document.getElementById("resultadoSection");
const resultadoEl = document.getElementById("resultado");

function parseLinhas(texto) {
  return texto
    .split("\n")
    .map((linha) => linha.trim())
    .filter((linha) => linha.length > 0);
}

function embaralhar(lista) {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

function definirMensagem(texto, tipo = "") {
  mensagemEl.textContent = texto;
  mensagemEl.className = tipo ? `message ${tipo}` : "message";
}

function renderizarResultado(grupos, temasEmbaralhados) {
  resultadoEl.innerHTML = grupos
    .map(
      (grupo, indice) => `
        <article class="result-item">
          <span class="position">${indice + 1}</span>
          <span class="result-group">${grupo}</span>
          <span class="result-theme">${temasEmbaralhados[indice]}</span>
        </article>
      `
    )
    .join("");

  resultadoSection.classList.remove("hidden");
}

function sortear() {
  const temas = parseLinhas(temasEl.value);
  const grupos = parseLinhas(gruposEl.value);

  if (temas.length === 0 && grupos.length === 0) {
    definirMensagem("Digite pelo menos um tema e um grupo.", "error");
    resultadoSection.classList.add("hidden");
    return;
  }

  if (temas.length === 0) {
    definirMensagem("Digite pelo menos um tema.", "error");
    resultadoSection.classList.add("hidden");
    return;
  }

  if (grupos.length === 0) {
    definirMensagem("Digite pelo menos um grupo.", "error");
    resultadoSection.classList.add("hidden");
    return;
  }

  if (temas.length !== grupos.length) {
    definirMensagem(
      `A quantidade de temas (${temas.length}) deve ser igual à de grupos (${grupos.length}).`,
      "warning"
    );
    resultadoSection.classList.add("hidden");
    return;
  }

  const temasEmbaralhados = embaralhar(temas);
  renderizarResultado(grupos, temasEmbaralhados);
  definirMensagem("Sorteio realizado com sucesso!", "success");
}

function limpar() {
  temasEl.value = "";
  gruposEl.value = "";
  resultadoEl.innerHTML = "";
  resultadoSection.classList.add("hidden");
  definirMensagem("");
}

sortearBtn.addEventListener("click", sortear);
limparBtn.addEventListener("click", limpar);
novoSorteioBtn.addEventListener("click", sortear);
