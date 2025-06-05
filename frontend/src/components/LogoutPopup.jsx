import logoutImg from "../assets/logoutImg.png"
import logout1 from "../assets/logout1.png"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../operations/authApi";
import toast from "react-hot-toast";

const LogoutPopup = ({ onClose, onConfirm }) => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCancelbtn = () => {
        onClose();
        navigate("/");
        // console.log("Cancel button clicked");
    };

    const handleConfirmbtn = () => {
        dispatch(logout(navigate))
        onConfirm();
        navigate("/");
        toast.success("Logged out")
        // console.log("Confirm button clicked");
    };

    return (
        <div className="bg-white flex flex-col items-center h-[300px] w-[300px] rounded-lg p-5 shadow-lg">
            <img src={logoutImg} alt="Logout" className="h-[150px] w-[150px] mb-4" />

            <h1 className="text-[#242565] text-xl font-semibold mb-2">
                {`Hi, ${user.userName}`}
            </h1>

            <p className="text-gray-600 text-sm text-center mb-2">
                Are you sure you want to log out?
            </p>

            <div className="flex gap-4">
                <button onClick={handleCancelbtn} className="w-[100px] rounded-md border border-[#242565] text-[#242565] bg-white font-poppins text-sm px-5 py-2  transition duration-300">
                    No
                </button>
                <button onClick={handleConfirmbtn} className="w-[100px] rounded-md border bg-[#4f8f5e] hover:bg-[#3b6a46]  font-poppins text-sm px-5 py-2 transition duration-300">
                    Confirm
                </button>
            </div>
        </div>

    );
};

export default LogoutPopup;
