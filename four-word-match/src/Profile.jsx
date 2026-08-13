import { useAuth0 } from '@auth0/auth0-react';

function Profile(){
    const { user, isAuthenticated, isLoading} = useAuth0();

    if (!isAuthenticated) {
        return (
            <h1 className="flex justify-center items-center text-2xl">Please login to view your profile</h1>
        )
    }

    if (isLoading) {
        return (
            <h1 className="flex justify-center items-center text-2xl">Loading Profile Information</h1>
        )
    }

    return (
        isAuthenticated && (
            <div>
                <h1 className="flex justify-center items-center text-2xl">Welcome to profile</h1>
                <h1 className="flex justify-center items-center text-xl">User ID: {user.sub}</h1>
            </div>
        ) 
    )
}

export default Profile