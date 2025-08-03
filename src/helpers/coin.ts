import axios from 'axios';
import { console } from 'inspector';

export async function getCriptomoneda() {
  const apiKey = process.env.API_CRYPTO;
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

  try {
    const response = await axios.get(url, {
      params: {
        convert: 'MXN',
      },
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });

    
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener criptomonedas:', error.message);
    throw error;
  }
}


export async function getHistorial(id: number){
    const apiKey = process.env.API_CRYPTO;
    const url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest';
    
    try {
        const response = await axios.get(url, {
        params: {
            id: id,
            convert: 'MXN',
        },
        headers: {
            'X-CMC_PRO_API_KEY': apiKey,
        },
        });
        
        // console.log('Historial obtenido:', response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener historial de criptomonedas:', error.message);
        throw error;
    }
}
