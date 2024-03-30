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

      var url = "http://0.0.0.0:5000/login";
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

      var uploader = document.getElementById("uploader").value;
      var fileInput = document.getElementById("file");
      var file = fileInput.files[0];

      var formData = new FormData();
      formData.append("uploader", uploader);
      formData.append("file", file);

      fetch("http://0.0.0.0:5000/upload", {
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
document.addEventListener("DOMContentLoaded", function () {
  // Função para carregar e exibir a lista de arquivos
  function loadFiles() {
    fetch("http://0.0.0.0:5000/files")
      .then((response) => response.json())
      .then((data) => {
        const filesContent = document.querySelector(".files-content");
        filesContent.innerHTML = ""; // Limpa o conteúdo atual

        data.forEach((file) => {
         
          const fileName = file.uploader;
          const fileId = file.id;
          

          const fileItem = document.createElement("div");
          fileItem.classList.add("file-item");

          const fileNameElement = document.createElement("span");
          fileNameElement.textContent = fileName;

          const downloadButton = document.createElement("button");
          downloadButton.textContent = "Download";
          downloadButton.addEventListener("click", function () {
            window.location.href = `http://0.0.0.0:5000/download/${fileId}`;
          });

          fileItem.appendChild(fileNameElement);
          fileItem.appendChild(downloadButton);

          filesContent.appendChild(fileItem);
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar a lista de arquivos:", error);
      });
  }

  // Chama a função para carregar a lista de arquivos quando a página é carregada
  loadFiles();
});
function loadFiles() {
  fetch("http://0.0.0.0:5000/files")
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
  fetch(`http://0.0.0.0:5000/delete/${fileId}`, {
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
      // Recarrega a lista de arquivos após a exclusão
      loadFiles();
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao deletar o arquivo!");
    });
}

if (document.querySelector(".files-content")) {
  // Adiciona o event listener para carregar os arquivos quando a página é carregada
  document.addEventListener("DOMContentLoaded", loadFiles);
}
