var divArtigos = document.querySelector(".artigos");

const req = () => {
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
      elemento.target = "blank";
      divArtigos.appendChild(elemento);
    });
  };
};
