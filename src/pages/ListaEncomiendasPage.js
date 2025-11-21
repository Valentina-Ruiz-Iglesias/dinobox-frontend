import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaEncomiendasPage() {
  const [encomiendas, setEncomiendas] = useState([]);
  const [loading, setLoading] = useState(true);       
  const [error, setError] = useState(null);            

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/api/v1/encomiendas')
      .then(response => {
        setEncomiendas(response.data);
        setError(null);
      })
      .catch(() => setError('No se pudo cargar la lista de encomiendas.'))
      .finally(() => setLoading(false));                
  }, []);

  if (loading) return <p>Cargando la lista de encomiendas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Encomiendas</h2>
      <ul>
        {encomiendas.length === 0 && <li>No hay encomiendas</li>}
        {encomiendas.map(e => (
          <li key={e.id}>
            <strong>{e.remitente}</strong> → {e.destinatario} | Código: {e.codigoSeguimiento} | Estado: {e.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaEncomiendasPage;
