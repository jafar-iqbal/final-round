
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"

const Profile = () => {
    const { user, Logout } = useAuth();
    const handleLogout = () => {
        Logout()
    }
    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button">
                <div className="avatar">
                    <div className=" w-10 rounded-full">
                        <img src={`${user?.photoURL || "/profile.png"}`} alt="image" />
                    </div>
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                    <Link>Dashboard</Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="border-2">LogOut</button>
                </li>
            </ul>
        </div>
    )
}
export default Profile