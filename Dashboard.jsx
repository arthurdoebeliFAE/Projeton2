import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [meusEventos, setMeusEventos] = useState([]);

  // Busca inicial
  useEffect(() => {
    fetch('http://localhost:3000/minhas-inscricoes')
      .then(res => res.json())
      .then(dados => setMeusEventos(dados));
  }, []);

  // Função para cancelar
  const handleCancelar = async (id) => {
    if(!confirm("Tem certeza que quer cancelar esta inscrição?")) return;

    // 1. Avisa o backend para deletar
    await fetch(`http://localhost:3000/inscricoes/${id}`, { method: 'DELETE' });

    // 2. Atualiza a lista na tela (remove o evento visualmente)
    setMeusEventos(meusEventos.filter(evento => evento.id !== id));
  };

  return (
    <div style={{ padding: '20px', background: '#f4f4f4', minHeight: '100vh', fontFamily: 'Arial' }}>
      <h2>👤 Minha Área</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', maxWidth: '600px' }}>
        <h3>Meus Eventos:</h3>

        {meusEventos.length === 0 ? (
          <p style={{ color: '#888' }}>Você ainda não se inscreveu em nada.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
              {meusEventos.map((evento) => (
                  <li key={evento.id} style={{ 
                      borderBottom: '1px solid #eee', 
                      padding: '15px 0', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center' 
                  }}>
                      <div>
                        <strong>{evento.titulo}</strong>
                        <div style={{ fontSize: '0.9em', color: '#666' }}>{evento.data}</div>
                      </div>
                      
                      {/* Botão Vermelho de Cancelar */}
                      <button 
                        onClick={() => handleCancelar(evento.id)}
                        style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Cancelar
                      </button>
                  </li>
              ))}
          </ul>
        )}

        <br />
        <Link to="/eventos" style={{ textDecoration: 'none', color: '#007bff' }}>
          <strong>+ Buscar mais eventos</strong>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;