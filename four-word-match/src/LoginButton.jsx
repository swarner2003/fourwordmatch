import { useAuth0 } from '@auth0/auth0-react';

function LoginButton(){
    const { loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        !isAuthenticated && (
            <button onClick={() => loginWithRedirect()} className="text-3xl text-barSP bg-barBGbg rounded-lg text-center p-2">Login</button>
        )
    )
}

export default LoginButton