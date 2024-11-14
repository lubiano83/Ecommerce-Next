import React from 'react';

const LoginList = async() => {

    const userLogged = await fetch("http://localhost:3000/api/auth/login", { cache: "no-cache"}).then(res => res.json());
    
    return (
        <div>
            Usuarios Logeados: {userLogged.usersOnline}
        </div>
    )
}; export default LoginList;
