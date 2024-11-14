"use client";

export const usePrice = () => {

    try {
        const setPrice = (price) => {
            const PRECIO_STRING = price.toString(); // Convertir el precio a string
            const LONGITUD = PRECIO_STRING.length;
            let resultado = '';
            
            for (let i = LONGITUD - 1, contador = 0; i >= 0; i--) {
                resultado = PRECIO_STRING[i] + resultado;
                contador++;
                if (contador % 3 === 0 && i !== 0) {
                    resultado = '.' + resultado;
                }
            }
            return resultado;
        }
        return {setPrice};
    } catch (error) {
        console.log("usePrice", error.message);
    }
};