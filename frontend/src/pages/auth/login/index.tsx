import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "@/api/axios";
import Input from "@/components/auth/input";
import { isExpiredToken } from "@/hooks/useAuth";
import { payloadType } from "@/types/BaseResponse";

function Login() {
  const navigate = useNavigate();
  const [isErrorMsgHidden, setIsErrorMsgHidden] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const { mutate: sendData} = useMutation({
    mutationKey: ["login-mutation"],
    mutationFn: async () => {
      event?.preventDefault();
      const res = await axios.post(
        "/api/user/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return res;
    },
    onSuccess: res => {
      console.log(res.data.token);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/table");
      }
      const payload: payloadType = jwtDecode(res.data.data.token);
      // navigate("/table");
      setIsErrorMsgHidden(true);
    },
    onError: () => {
      setIsErrorMsgHidden(false);
      return false;
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token") === undefined || localStorage.getItem("token") === "undefined") {
      localStorage.removeItem("token");
    }
    if (localStorage.getItem("token")) {
      if (!isExpiredToken()) {
        navigate("/table");
      }
    }
  }, [navigate]);
  return (
    // create login page center
    <section className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-96 rounded-lg bg-gray-100 p-4 shadow-md">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <form className="mt-4 space-y-4">
          <div>
            <label className="block" htmlFor="email">
              Email
            </label>
            {/* <input className="w-full rounded-lg border border-gray-300 p-2" id="email" type="email" /> */}
            <Input placeholder="Email" setValue={setEmail} value={email} />
          </div>
          <div>
            <label className="block" htmlFor="password">
              Password
            </label>
            <Input
              placeholder="Password"
              setValue={setPassword}
              style="w-full"
              type={isPasswordHidden ? "password" : "text"}
              value={password}
            />
          </div>
          <button className="w-full rounded-lg bg-blue-500 p-2 text-white" onClick={() => sendData()} type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
