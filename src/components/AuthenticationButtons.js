import { useAuth0 } from "@auth0/auth0-react";

export default function AuthenticationButtons() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();

    if(!isAuthenticated) 
    return (
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <button onClick={() => loginWithRedirect()} className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Sign in
            </button>
        </div>
    );
    
    return (
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <button onClick={() => logout({ returnTo: window.location.origin })} type="button" className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-sm text-gray-900 border border-gray-300 dark:border-gray-600 dark:hover:bg-gray-100 ">
                Sign out
            </button>
        </div>
    )
}