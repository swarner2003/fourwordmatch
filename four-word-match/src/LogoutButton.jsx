import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton(){
    const { logout, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <button onClick={() => logout()} className="text-3xl text-barSP  bg-barBGbg rounded-lg p-2">Logout</button>
        )
    )
}

export default LogoutButton