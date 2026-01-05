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
                username: process.env.GEONAMES_USER || ''
                // Mi Usuario de GeoNames
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
