import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { _id } = await params; // Captura el ID del usuario desde los parámetros de la ruta

    try {
        // Llama a la ruta de Express para obtener el usuario por ID
        const response = await fetch(`http://localhost:8080/api/auth/users/${_id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Asegura que las cookies se envíen si es necesario
        });

        // Manejo de errores en la respuesta
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message }, { status: response.status });
        }

        const userData = await response.json();
        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        console.error("Error en la API de Next.js al obtener usuario:", error.message);
        return NextResponse.json({ message: "Error al obtener el usuario", error: error.message }, { status: 500 });
    }
}
