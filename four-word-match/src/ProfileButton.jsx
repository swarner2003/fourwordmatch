import { useAuth0 } from '@auth0/auth0-react';

function ProfileButton(){
    const { logout, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <a href="/profile"><button className="text-2xl text-barSP bg-barBGbg rounded-lg text-center p-2">Profile</button></a>
        )
    )
}

export default ProfileButton