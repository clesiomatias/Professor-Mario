var divArtigos = document.querySelector(".artigos");

const req = () => {
  var requestURL = "https://api.github.com/repos/ProfMLE/Rep01/contents/";
  var request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    var conteudos = request.response;
    var nomes = conteudos.map((item) => item.name.split(".").shift());
    nomes.map((item) => {
      let elemento = document.createElement("h2");
      elemento.innerHTML = item;
      divArtigos.appendChild(elemento);
    });
  };
};
