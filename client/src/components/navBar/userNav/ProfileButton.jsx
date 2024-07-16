import { RiAccountPinBoxFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useSignoutMutation } from "../../../redux/api/authApiSlice";
import { logOut } from "../../../redux/slices/authSlice";
import { showToast } from "../../";

export default function ProfileButton() {
  const dispatch = useDispatch();
  const [signout] = useSignoutMutation();
  const HandleLogout = async () => {
    await showToast(
      signout(),
      () => {
        dispatch(logOut());
      },
      () => {}
    );
  };

  const Tab = ({ name, Icon, onClick }) => (
    <div
      onClick={onClick}
      className="hover:bg-primary hover:text-white rounded-lg px-4 cursor-pointer flex items-center justify-between"
    >
      <span>{name}</span>
      <Icon className="ml-4 text-xl" />
    </div>
  );

  return (
    <div className="absolute bg-white rounded-lg py-4 px-2 text-[0.9rem] top-10 right-1 flex flex-col gap-3 border-2 border-primary">
      <Tab name="Profile" Icon={RiAccountPinBoxFill} />
      <Tab name="Settings" Icon={IoMdSettings} />
      <Tab name="Logout" Icon={PiSignOutBold} onClick={HandleLogout} />
    </div>
  );
}
