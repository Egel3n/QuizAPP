import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    console.log("refreshTOKENN");
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    console.log("refreshTOKENN");
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.locals.accessToken);
      return {
        ...prev,
        username: response.data.locals.username,
        roles: response.data.locals.roles,
        accessToken: response.data.locals.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
