import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../Components/Common/InputBox";
import PasswordInput from "../Components/Common/passwordInput";
import { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverhelpers";
import { useCookies } from "react-cookie";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response && !response.err) {
      console.log(response);
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home");
    } else {
      alert("Failure");
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center ">
      <div className="logo p-6 w-full border-b border-solid border-gray-300 flex justify-center">
        <Icon icon="logos:spotify" width="150" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center  justify center flex-col">
        <div className="font-bold mb-12">To continue, log in to Spotify.</div>
        <InputBox
          label="Email Address or Username"
          placeholder="Email address or username"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          setValue={setpassword}
        />
        <div className="flex w-full justify-end mt-8">
          <button
            className="bg-green-400 font-semibold p-3 px-10 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            Log In
          </button>
        </div>
        <div className="logo p-6 w-full border-b border-solid border-gray-300 flex justify-center"></div>
        <div className="font-semibold my-5 ">Don't have an account?</div>
        <div className=" text-gray-400 w-full flex items-center justify-center border py-4 rounded-full border-double border-gray-400">
          <Link to="/signup"> SIGN UP FOR SPOTIFY</Link>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
