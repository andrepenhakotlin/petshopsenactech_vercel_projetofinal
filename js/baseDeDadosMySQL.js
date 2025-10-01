//Função para Cadastrar um Pet:
function preenchimentoCampos(registro, nome, tipo, idade) {
  const registro = document.getElementById(registro).value.trim();
  const nome = document.getElementById(nome).value.trim();
  const tipo = document.getElementById(tipo).value.trim();
  const idade = document.getElementById(idade).value.trim();

  if (!idRegistro || !nome || !tipo || !idade) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const pet = { registro, nome, tipo, idade };

  // Enviar para o servidor
  fetch("http://localhost:3000/api/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Pet cadastrado com sucesso!") {
        alert("Pet cadastrado com sucesso!");
        atualizarTabela(); // Atualiza a tabela
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      alert("Erro ao cadastrar pet: " + error);
    });
}
//Função para Excluir um Pet:
function excluirPet(idCampo) {
  const registro = document.getElementById(idCampo).value.trim();

  if (registro === "") {
    alert("Por favor, informe o número do registro para excluir.");
    return;
  }

  // Enviar para o servidor
  fetch(`http://localhost:3000/api/pets/${registro}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Pet excluído com sucesso!") {
        alert("Pet excluído com sucesso!");
        atualizarTabela(); // Atualiza a tabela
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      alert("Erro ao excluir pet: " + error);
    });
}
//Função para Mostrar os Pets na Tabela:
function atualizarTabela() {
  const tabela = document.getElementById("tabelaPets");
  tabela.innerHTML = ""; // Limpa a tabela

  fetch("http://localhost:3000/api/pets")
    .then((response) => response.json())
    .then((pets) => {
      pets.forEach((pet) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${pet.registro}</td>
          <td>${pet.nome}</td>
          <td>${pet.tipo}</td>
          <td>${pet.idade}</td>
        `;
        tabela.appendChild(linha);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar pets:", error);
    });
}

// Ao carregar a página, já exibe os pets cadastrados
window.onload = atualizarTabela;