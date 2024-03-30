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

// Funções de chamada ao backend
// ------ função de login
document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var username = document.getElementById("name").value;
      var password = document.getElementById("password").value;

      var formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      var url = "https://marleite.pythonanywhere.com/login";
      var request = new Request(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      fetch(request)
        .then((response) => {
          if (response.ok) {
            window.location.href = "/pages/upload_form.html";
          } else {
            window.alert("Erro no login\nUsuário ou senha inválido!");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    });
  }

  var uploadForm = document.getElementById("upload-form");
  if (uploadForm) {
    uploadForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var uploader = document.getElementById("file").value;
      var fileInput = document.getElementById("file");
      var file = fileInput.files[0];

      var formData = new FormData();
      formData.append("uploader", uploader);
      formData.append("file", file);

      fetch("https://marleite.pythonanywhere.com/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erro ao fazer upload do arquivo");
          }
        })
        .then((data) => {
          console.log("Sucesso:", data);
          alert("Arquivo enviado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro:", error);
          alert("Erro ao fazer upload do arquivo!");
        });
    });
  }
});

// Função para carregar e exibir a lista de arquivos
// Função para carregar e exibir a lista de arquivos com botões de download
function loadFilesWithDownloadButtons() {
  fetch("https://marleite.pythonanywhere.com/files")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao carregar os arquivos");
      }
    })
    .then((data) => {
      const filesContent = document.querySelector(".files-content");
      filesContent.innerHTML = ""; // Limpa o conteúdo atual

      data.forEach((file) => {
        const fileItem = document.createElement("div");
        fileItem.classList.add("file-item");

        const fileName = document.createElement("span");
        fileName.textContent = file.filename;
        fileItem.appendChild(fileName);

        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download";
        downloadButton.addEventListener("click", function () {
          window.location.href = `https://marleite.pythonanywhere.com/download/${file.id}`;
        });

        fileItem.appendChild(downloadButton);

        filesContent.appendChild(fileItem);
      });
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao carregar os arquivos!");
    });
}

// Função para carregar e exibir a lista de arquivos com botões de exclusão
function loadFilesWithDeleteButtons() {
  fetch("https://marleite.pythonanywhere.com/files")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao carregar os arquivos");
      }
    })
    .then((data) => {
      const filesContent = document.querySelector(".files-content");
      filesContent.innerHTML = ""; // Limpa o conteúdo atual

      data.forEach((file) => {
        const fileItem = document.createElement("div");
        fileItem.classList.add("file-item");

        const fileName = document.createElement("span");
        fileName.textContent = file.filename;
        fileItem.appendChild(fileName);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", () => deleteFile(file.id));
        fileItem.appendChild(deleteButton);

        filesContent.appendChild(fileItem);
      });
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao carregar os arquivos!");
    });
}

// Função para deletar um arquivo
function deleteFile(fileId) {
  fetch(` https://marleite.pythonanywhere.com/delete/${fileId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao deletar o arquivo");
      }
    })
    .then((data) => {
      console.log("Sucesso:", data);
      alert("Arquivo deletado com sucesso!");
      // Recarrega a página após a exclusão bem-sucedida do arquivo
      location.reload();
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao deletar o arquivo!");
    });
}


// Verifica em qual página estamos e decide qual função de carregamento de arquivos chamar
if (document.querySelector(".files-content-download")) {
  // Estamos na página "arquivos.html", então carregamos os arquivos com botões de download
  document.addEventListener("DOMContentLoaded", loadFilesWithDownloadButtons);
} else if (document.querySelector(".files-content-delete")) {
  // Estamos na página "delete_files.html", então carregamos os arquivos com botões de exclusão
  document.addEventListener("DOMContentLoaded", loadFilesWithDeleteButtons);
}
