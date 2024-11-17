import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = params; // Captura el ID del usuario desde los parámetros de la ruta

    try {
        const response = await fetch(`http://localhost:8080/api/auth/users/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Incluye cookies si son necesarias
        });

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

export async function PATCH(request, { params }) {
    const { id } = await params; // Captura el ID del usuario desde los parámetros de la ruta
    const body = await request.json(); // Procesa el cuerpo de la solicitud

    try {
        const response = await fetch(`http://localhost:8080/api/auth/users/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Incluye cookies si son necesarias
            body: JSON.stringify(body), // Envía el cuerpo con los datos actualizados
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message }, { status: response.status });
        }

        const updatedData = await response.json();
        return NextResponse.json(updatedData, { status: 200 });
    } catch (error) {
        console.error("Error en la API de Next.js al actualizar usuario:", error.message);
        return NextResponse.json({ message: "Error al actualizar el usuario", error: error.message }, { status: 500 });
    }
}