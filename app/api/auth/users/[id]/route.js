import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = await params; // Captura el ID del usuario desde los parámetros de la ruta

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
    const id = params.id;

    try {
        // Extraer el FormData de la solicitud
        const formData = await request.formData();

        // Reenviar la solicitud al backend
        const backendResponse = await fetch(`http://localhost:8080/api/auth/users/${id}`, {
            method: "PATCH",
            body: formData,
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json();
            return NextResponse.json({ message: errorData.message }, { status: backendResponse.status });
        }

        const data = await backendResponse.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error en la API de Next.js:", error);
        return NextResponse.json({ message: "Error interno en la API de Next.js" }, { status: 500 });
    }
}