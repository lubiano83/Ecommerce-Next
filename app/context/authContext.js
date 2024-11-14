"use client";
import { createContext, useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const router = useRouter();
    const [ logged, setLogged ] = useState(false)

    const [formValues, setFormValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
        ...formValues,
        [name]: value,
        });
    };

    const userRegister = async (e) => {
        e.preventDefault();
    
        const formData = {
        first_name: formValues.first_name,
        last_name: formValues.last_name,
        email: formValues.email,
        password: formValues.password,
        };
    
        try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json', // Indica que estamos enviando JSON
            },
            body: JSON.stringify(formData), // Serializa los datos a JSON
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el registro del usuario');
        }
    
        const result = await response.json();
        alert('Usuario registrado con éxito');
        setFormValues({ first_name: '', last_name: '', email: '', password: '' }); // Reinicia el formulario
        router.push("/views/auth/login");
        } catch (error) {
        alert(`Error al registrar el usuario: ${error.message}`);
        }
    };

    const userLogin = async (e) => {
        e.preventDefault();
    
        const formData = {
            email: formValues.email,
            password: formValues.password,
        };
    
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json', // Indica que estamos enviando JSON
                },
                body: JSON.stringify(formData), // Serializa los datos a JSON
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el inicio de sesión');
            }
    
            const result = await response.json();
            
            // Guarda el token en una cookie usando js-cookie
            Cookies.set('coderCookieToken', result.token, {
                expires: 1, // Expira en 1 día, ajusta según sea necesario
                secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
                sameSite: 'strict',
                path: '/'
            });
            setLogged(true)
            alert('Inicio de sesión exitoso');
            setFormValues({ email: '', password: '' }); // Reinicia el formulario
            router.push("/");
        } catch (error) {
            alert(`Error al iniciar sesión: ${error.message}`);
        }
    };

    const userLogout = async () => {
        try {
            // Obtén el token desde la cookie
            const token = Cookies.get("coderCookieToken");

            const response = await fetch('/api/auth/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Envía cookies con la solicitud
                body: JSON.stringify({ token }), // Envía el token en el cuerpo
            });

            if (response.ok) {
                setLogged(false)
                Cookies.remove("coderCookieToken"); // Elimina el token de la cookie local
                router.push('/'); // Redirige al usuario a la página de inicio de sesión
            } else {
                const errorData = await response.json();
                alert(`Error al cerrar sesión: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("Hubo un problema al intentar cerrar sesión.");
        }
    };

    return (
        <AuthContext.Provider value={{ userRegister, userLogin, userLogout, handleChange, formValues, logged }}>
            {children}
        </AuthContext.Provider>
    )
};