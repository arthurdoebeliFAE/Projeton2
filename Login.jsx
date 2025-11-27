import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  // Variáveis para guardar o que o usuário digita
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Hook para mudar de página automaticamente
  const navigate = useNavigate();

  // Função disparada ao clicar em "Entrar"
  const handleLogin = async () => {
    // 1. Manda os dados para o Backend
    const resposta = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const dados = await resposta.json();

    // 2. Verifica se o backend aceitou
    if (dados.sucesso) {
      alert("Login com Sucesso!");
      navigate('/dashboard'); // Manda para a área privada
    } else {
      alert("Erro: " + dados.mensagem);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>🔐 Login ConectaTech</h2>
      
      <input 
        type="email" 
        placeholder="Email (teste@teste.com)" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: '5px', padding: '8px' }} 
      />
      <br />
      
      <input 
        type="password" 
        placeholder="Senha (123456)" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '5px', padding: '8px' }} 
      />
      <br />
      
      <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Entrar
      </button>

      <br /><br />
      <Link to="/eventos">Ver eventos sem login</Link>
    </div>
  );
}

export default Login;