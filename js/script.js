var divArtigos = document.querySelector(".artigos");
var ultimo = document.querySelector(".ultimo-artigo");

const post = (endereco) => {
  fetch(endereco)
    .then((response) => response.json())
    .then((data) => {
      let nome = data.files[0].filename.split(".").shift();

      let ultimo_elemento = document.createElement("a");
      ultimo_elemento.innerHTML = nome;
      ultimo_elemento.href = `https://github.com/ProfMLE/Rep01/blob/master/${nome}.pdf`;
      ultimo_elemento.target = "_blank";
      ultimo.appendChild(ultimo_elemento);
    })
    .catch((error) => console.error("Erro:", error));
};

const ultimoArtigo = () => {
  let requestURL = "https://api.github.com/users/ProfMLE/events";

  fetch(requestURL)
    .then((response) => response.json())
    .then((data) => {
      let elementos = data.filter((item) => item.repo.name == "ProfMLE/Rep01");
      if (elementos.length > 0) {
              let primeiro = elementos[0].payload.commits[0].url;
              post(primeiro);
            } else {
              console.log("Nenhum evento PushEvent encontrado para o repositório ProfMLE/Rep01.");
            }
          })     
   
    .catch((error) => console.error("Erro:", error));
};

  
  const req = () => {
    ultimoArtigo();
    var requestURL = "https://api.github.com/repos/ProfMLE/Rep01/contents/";

    fetch(requestURL)
      .then((response) => response.json())
      .then((data) => {
        var nomes = data.map((item) => item.name);

        nomes.map((item) => {
          let elemento = document.createElement("a");
          elemento.innerHTML = item.split(".").shift();
          elemento.href = `https://github.com/ProfMLE/Rep01/blob/master/${item}`;
          elemento.target = "_blank";
          divArtigos.appendChild(elemento);
        });
      })
      .catch((error) => console.error("Erro:", error));
  };

const updateCurrentDate = () => {
  var currentYear = new Date().getFullYear();
  var spanElement = document.querySelector(".current-date");
  if (spanElement) {
    spanElement.textContent = currentYear;
  }
};

window.onload = () => updateCurrentDate();