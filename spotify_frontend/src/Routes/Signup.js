import { Icon } from "@iconify/react";
import InputBox from "../Components/Common/InputBox";
import PasswordInput from "../Components/Common/passwordInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverhelpers";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Email and Confirm Email must match. Please check again");
      return;
    }
    const data = { email, password, userName, firstName, lastName };
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      data
    );
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
        <div className="font-bold mb-12 text-2xl">
          Sign up for free to start listening.
        </div>
        <InputBox
          label="What's your email ? "
          placeholder="Enter your email."
          value={email}
          setValue={setEmail}
        />
        <InputBox
          label="Confirm your email "
          placeholder="Enter your email again."
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <InputBox
          label="Username "
          placeholder="Enter your Username."
          value={userName}
          setValue={setUserName}
        />
        <PasswordInput
          label="Create a password"
          placeholder="Create a Strong Password"
          value={password}
          setValue={setPassword}
        />
        <div className=" w-full flex justify-between  space-x-4  items-center">
          <InputBox
            label="First Name"
            placeholder="First name."
            value={firstName}
            setValue={setFname}
          />
          <InputBox
            label="Last Name"
            placeholder="Last name."
            value={lastName}
            setValue={setLname}
          />
        </div>
        <div className="flex w-full justify-center mt-8">
          <button
            className="bg-green-400 font-semibold p-3 px-10 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            Sign up
          </button>
        </div>
        <div className="logo p-6 w-full border-b border-solid border-gray-300 flex justify-center"></div>
        <div className="font-semibold my-5 ">Aready have an account?</div>
        <div className=" text-gray-400 w-full flex items-center justify-center border py-4 rounded-full border-double border-gray-400">
          <Link to="/login">LOG IN INSTEAD.</Link>
        </div>
      </div>
    </div>
  );
};
export default SignupComponent;
