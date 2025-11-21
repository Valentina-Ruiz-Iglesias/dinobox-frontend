import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [mensaje, setMensaje] = useState('Cargando...');

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/encomiendas/ping')
      .then(response => setMensaje(response.data))
      .catch(() => setMensaje('No hay conexión con el backend'));
  }, []);

  return (
    <div>
      <h2>Bienvenido a Dinobox</h2>
      <p>Conexión con backend: <strong>{mensaje}</strong></p>
    </div>
  );
}

export default HomePage;
