import { NextResponse } from 'next/server';

export async function DELETE(request) {
    console.log("DELETE /api/auth/logout llamado");

    try {
        // Reenvía las cookies al backend
        const cookies = request.headers.get('cookie');

        const response = await fetch("http://localhost:8080/api/auth/users", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                cookie: cookies, // Reenvía las cookies al backend
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error del backend:", errorData);
            return NextResponse.json({ message: errorData.message }, { status: response.status });
        }

        const data = await response.json();
        console.log("Respuesta del backend:", data);
        return NextResponse.json({ message: "Sesión cerrada con éxito" }, { status: 200 });
    } catch (error) {
        console.error("Error en la API de Next.js al cerrar sesión:", error.message);
        return NextResponse.json({ message: "Error al cerrar sesión", error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        // Llama a la ruta de logout en el backend de Express
        const response = await fetch("http://localhost:8080/api/auth/users", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Asegura que las cookies se envíen
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message }, { status: response.status });
        }

        return NextResponse.json({ message: "Sesión cerrada con éxito" }, { status: 200 });
    } catch (error) {
        console.error("Error en la API de Next.js al cerrar sesión:", error.message);
        return NextResponse.json({ message: "Error al cerrar sesión", error: error.message }, { status: 500 });
    }
}