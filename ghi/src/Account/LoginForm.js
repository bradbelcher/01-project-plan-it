import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();
    navigate("/dashboard");
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="container mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg max-w-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={process.env.PUBLIC_URL + "/project_logo.png"}
              alt="Your Company"
            />
            <h1 className="mt-5 text-center text-3xl font-bold leading-4 text-gray-900 pb-5">
              Log in to your account
            </h1>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="pb-4 pt-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
