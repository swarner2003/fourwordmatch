import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton(){
    const { logout, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <button onClick={() => logout()} className="text-2xl text-black bg-red-500 rounded-lg p-2 border-2 border-red-700">Logout</button>
        )
    )
}

export default LogoutButton