import useToken from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import SignupForm from "./Account/SignUpForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Account/LoginForm";
import ProjectForm from "./Project/ProjectForm";
import ProjectList from "./Project/ProjectList";
import ProjectDetails from "./Project/ProjectDetails";
import React from "react";
import LandingPage from "./Landingpage/LandingPage";
import Nav from "./navbar";
import Dashboard from "./Dashboard/Dashboard";
import EditProfile from "./Account/EditProfile";
import Profile from "./Account/Profile";
import MentorsList from "./Mentors/MentorsList";
import MentorProfile from "./Mentors/MentorProfile";


function App() {
	const { token } = useToken();
	const domain = /https:\/\/[^/]+/;
	const basename = process.env.PUBLIC_URL.replace(domain, '');

	if (token) {
		return (
			<div>
				<BrowserRouter basename={basename}>
					<Nav />
					<Routes>
						<Route path='/dashboard' element={<Dashboard />}></Route>
						<Route path='/signup' element={<SignupForm />}></Route>
						<Route path='/login' element={<LoginForm />}></Route>
						<Route path='/' element={<LandingPage />}></Route>
						<Route path='/profile/edit' element={<EditProfile />}></Route>
						<Route path='/profile' element={<Profile />}></Route>
						<Route path='/profile/:id' element={<MentorProfile />}></Route>
						<Route path="/projects/new" element={<ProjectForm />}></Route>
						<Route path="/projects" element={<ProjectList />}></Route>
						<Route path="/project-details/:project_id/" element={<ProjectDetails />}></Route>
						<Route path="/mentors" element={<MentorsList />}></Route>
					</Routes>
				</BrowserRouter>
			</div>
		);
	} else {
		return (
			<div>
				<BrowserRouter basename={basename}>
					<Routes>
						<Route path='/' element={<LandingPage />}></Route>
						<Route path='/signup' element={<SignupForm />}></Route>
						<Route path='/login' element={<LoginForm />}></Route>
					</Routes>
				</BrowserRouter>
			</div>
		);
	}
}
export default App;
