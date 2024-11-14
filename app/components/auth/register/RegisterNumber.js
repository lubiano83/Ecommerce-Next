import React from 'react';

const RegisterList = async() => {

    const userRegistered = await fetch("http://localhost:3000/api/auth/register", { cache: "no-cache"}).then(res => res.json());
    
    return (
        <div>Usuarios Registrados: {userRegistered.usersRegistered}</div>
    )
}; export default RegisterList;