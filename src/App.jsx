import './App.css';
import { useState, useEffect } from 'react';


function App() {

  // 🔹 Carregar tarefas direto no useState para evitar estado inicial vazio
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  const [novaTarefa, setNovaTarefa] = useState('');
  const [editando, setEditando] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');

  // 🔹 Atualizar o LocalStorage sempre que "tarefas" mudar
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]); // Atualiza toda vez que a lista de tarefas mudar

  function adicionarTarefa(e) {
    e.preventDefault();
    if (novaTarefa.trim() === '') return;
    setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
    setNovaTarefa('');
  }

  function removerTarefa(index) {
    setTarefas((prevTarefas) => prevTarefas.filter((_, i) => i !== index));
  }

  function editarTarefa(index) {
    setEditando(index);
    setTextoEditado(tarefas[index]);
  }

  function salvarEdicao(index) {
    if (textoEditado.trim() === '') return;
    setTarefas((prevTarefas) => {
      const novasTarefas = [...prevTarefas];
      novasTarefas[index] = textoEditado;
      return novasTarefas;
    });
    setEditando(null);
  }

  return (
    <div className='form'>
      <h2>Lista de Tarefas</h2>
      <form onSubmit={adicionarTarefa}>
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            {editando === index ? (
              <>
                <div>
                  <input
                    type="text"
                    value={textoEditado}
                    onChange={(e) => setTextoEditado(e.target.value)}
                  />
                    <button onClick={() => salvarEdicao(index)}>Salvar</button>
                    <button onClick={() => setEditando(null)}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
              <span className='lista'>
                {tarefa}
                <span>
                <button onClick={() => editarTarefa(index)}>✏️ Editar</button>
                <button onClick={() => removerTarefa(index)}>❌ Remover</button>
                </span>
              </span> 
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

