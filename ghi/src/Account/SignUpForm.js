import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const { register } = useToken();
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const accountData = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      picture: picture,
      password: password,
      years_of_experience: '',
      education: '',
      tech_stacks: []
    };
    register(accountData, `${process.env.REACT_APP_API_HOST}/api/accounts`);
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
            <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Register
            </h1>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(e) => handleRegistration(e)} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    autoComplete="last_name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="picture" className="block text-sm font-medium leading-6 text-gray-900">
                  Profile Picture
                </label>
                <div className="mt-2">
                  <input
                    id="picture"
                    name="picture"
                    type="text"
                    autoComplete="picture"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setPicture(e.target.value);
                    }}
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
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}
