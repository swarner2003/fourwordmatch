import { useAuth0 } from '@auth0/auth0-react';

function ProfileButton(){
    const { logout, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <a href="/profile"><button className="text-2xl max-lg:text-[8px] max-lg:p-0.5 text-barSP hover:bg-barBGbg transition-colors duration-300 ease-in-out rounded-lg text-center p-2">Profile</button></a>
        )
    )
}

export default ProfileButton