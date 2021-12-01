var divArtigos = document.querySelector(".artigos");
var ultimo = document.querySelector(".ultimo-artigo");
const post = (endereco) => {
  var resp;
  let requestURL = endereco;
  let request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    let resposta = request.response;
    console.log(resposta.files[0].filename);
    console.log(resposta.files[0].blob_url);
  };
};

const ultimoArtigo = () => {
  let requestURL = "https://api.github.com/users/ProfMLE/events";
  let request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    let conteudo = request.response;
    let elementos = conteudo.filter(
      (item) => item.repo.name == "ProfMLE/Rep01"
    );
    let primeiro = elementos.filter(
      (item) => item.payload.commits[0].message == "Add files via upload"
    )[0].payload.commits[0].url;
    post(primeiro);
  };
};

const req = () => {
  ultimoArtigo();
  var requestURL = "https://api.github.com/repos/ProfMLE/Rep01/contents/";
  var request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    var conteudos = request.response;
    var nomes = conteudos.map((item) => item.name);

    nomes.map((item) => {
      let elemento = document.createElement("a");
      elemento.innerHTML = item.split(".").shift();
      elemento.href = `https://github.com/ProfMLE/Rep01/blob/master/${item}`;
      elemento.target = "_blank";
      divArtigos.appendChild(elemento);
    });
  };
};
