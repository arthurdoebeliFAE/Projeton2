import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Eventos() {
  const [listaEventos, setListaEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/eventos')
      .then(res => res.json())
      .then(dados => setListaEventos(dados));
  }, []);

  // Função que o botão vai chamar
  const handleInscricao = async (id) => {
    const resposta = await fetch('http://localhost:3000/inscrever', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventoId: id })
    });

    if (resposta.ok) {
      alert("Inscrição confirmada! 🎟️");
      navigate('/dashboard'); // Leva o usuário para ver a inscrição
    } else {
      alert("Erro ao se inscrever.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📅 Eventos Disponíveis</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {listaEventos.map((evento) => (
          <div key={evento.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '200px' }}>
            <h3>{evento.titulo}</h3>
            <p>{evento.data}</p>
            <p>{evento.local}</p>
            
            {/* O botão agora chama a função handleInscricao com o ID do evento */}
            <button 
              onClick={() => handleInscricao(evento.id)}
              style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px', width: '100%', cursor: 'pointer' }}
            >
              Inscrever-se
            </button>
          </div>
        ))}

      </div>
      <br />
      <Link to="/dashboard">Ir para Meus Eventos</Link>
    </div>
  );
}

export default Eventos;