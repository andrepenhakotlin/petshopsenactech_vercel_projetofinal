async function excluirPet(inputId) {
  const registro = document.getElementById(inputId).value;

  if (!registro) {
    alert("Por favor, informe o número do registro do pet a ser excluído.");
    return;
  }

  const confirmacao = confirm(`Tem certeza que deseja excluir o pet com registro ${registro}?`);

  if (!confirmacao) return;

  try {
    const response = await fetch(`http://localhost:3001/api/pets/${registro}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
      alert('Pet excluído com sucesso!');
      location.reload(); // Atualiza a tabela
    } else {
      alert(`Erro: ${data.error}`);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao conectar com o servidor.');
  }
}
