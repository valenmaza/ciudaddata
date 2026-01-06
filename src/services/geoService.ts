import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEONAMES_URL = 'http://api.geonames.org/searchJSON';

export const getCityInfo = async (cityName: string) => {
    try {
        const response = await axios.get(GEONAMES_URL, {
            params: {
                q: cityName,
                maxRows: 1,
                username: process.env.GEONAMES_USER
            }
        });
        
        if (!response.data.geonames || response.data.geonames.length === 0) {
            throw new Error('Ciudad no encontrada');
        }

        return response.data.geonames[0];
    } catch (error) {
        throw new Error('Error al conectar con GeoNames');
    }
};

export const getCountryPopulation = async (countryCode: string): Promise<{ country: string; population: number; year: string }> => {
  try {
    const url = `http://api.worldbank.org/v2/country/${encodeURIComponent(countryCode)}/indicator/SP.POP.TOTL?format=json&per_page=100`;
    const response = await axios.get(url);
    const payload = response.data;

    if (!Array.isArray(payload) || !Array.isArray(payload[1])) {
      const err: any = new Error('Datos de población no encontrados');
      err.status = 404;
      throw err;
    }

    const records = payload[1];
    const record = records.find((r: any) => r && r.value !== null && r.value !== undefined);
    if (!record) {
      const err: any = new Error('Datos de población no encontrados');
      err.status = 404;
      throw err;
    }

    return {
      country: record.country?.value || countryCode,
      population: Number(record.value),
      year: String(record.date)
    };
  } catch (error: any) {
    if (error?.status) throw error;
    const err: any = new Error('Error al obtener la población del Banco Mundial');
    err.status = 500;
    throw err;
  }
};