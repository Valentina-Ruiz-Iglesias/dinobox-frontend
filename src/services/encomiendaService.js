import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/encomiendas';

export async function crearEncomienda(datos) {
  return await axios.post(BASE_URL, datos);
}
