import { getLoggedUser } from "@/state/api/auth/authSlice";
import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector(getLoggedUser);

  return user ? true : false;
};

export default useAuth;
