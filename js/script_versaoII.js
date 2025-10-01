function preenchimentoCampos(idRegistro, idNome, idTipo, idIdade) {
  const registro = document.getElementById(idRegistro).value.trim();
  const nome = document.getElementById(idNome).value.trim();
  const tipo = document.getElementById(idTipo).value.trim();
  const idade = document.getElementById(idIdade).value.trim();

  if (!registro || !nome || !tipo || !idade) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Criar objeto com dados do pet
  const pet = {
    registro,
    nome,
    tipo,
    idade
  };

  // Recuperar os pets existentes do localStorage
  let pets = JSON.parse(localStorage.getItem("pets")) || [];

  // Adicionar novo pet
  pets.push(pet);

  // Salvar no localStorage
  localStorage.setItem("pets", JSON.stringify(pets));

  alert("Pet cadastrado com sucesso!");

  // Limpa os campos
  document.getElementById(idRegistro).value = "";
  document.getElementById(idNome).value = "";
  document.getElementById(idTipo).value = "";
  document.getElementById(idIdade).value = "";
}


// -- ROTINA DE EXCLUSÃO -->

function excluirPet(idCampo) {
  const registro = document.getElementById(idCampo).value.trim();

  if (registro === "") {
    alert("Por favor, informe o número do registro para excluir.");
    return;
  }

  // Supondo que os dados estejam salvos no localStorage com a chave 'pets'
  let pets = JSON.parse(localStorage.getItem('pets')) || [];

  const novoArray = pets.filter(pet => pet.registro !== registro);

  if (pets.length === novoArray.length) {
    alert("Registro não encontrado.");
  } else {
    localStorage.setItem('pets', JSON.stringify(novoArray));
    alert("Pet excluído com sucesso!");
    document.getElementById(idCampo).value = "";
  }
}

const tabela = document.getElementById("tabelaPets");
const formPet = document.getElementById("formPet");

// Função para mostrar os pets na tabela
function atualizarTabela() {
  tabela.innerHTML = ""; // limpa a tabela

  const pets = JSON.parse(localStorage.getItem("pets")) || [];

  pets.forEach(pet => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${pet.registro}</td>
      <td>${pet.nome}</td>
      <td>${pet.tipo}</td>
      <td>${pet.idade}</td>
    `;
    tabela.appendChild(linha);
  });
}

// Ao carregar a página, já exibe os pets cadastrados
atualizarTabela();

// Captura o evento submit do formulário
formPet.addEventListener("submit", function(event) {
  event.preventDefault(); // evita o envio do formulário tradicional e o reload da página

  // Pega os dados do formulário
  const novoPet = {
    registro: formPet.registro.value,
    nome: formPet.nome.value,
    tipo: formPet.tipo.value,
    idade: formPet.idade.value
  };

  // Recupera os pets do localStorage e adiciona o novo pet
  const pets = JSON.parse(localStorage.getItem("pets")) || [];
  pets.push(novoPet);

  // Salva de volta no localStorage
  localStorage.setItem("pets", JSON.stringify(pets));

  // Atualiza a tabela com os novos dados
  atualizarTabela();

  // Limpa o formulário
  formPet.reset();
});
