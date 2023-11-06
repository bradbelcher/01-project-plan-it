import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";
import jwtDecode from 'jwt-decode';
import Select from 'react-select';


function EditProfile() {
    const { token } = useToken();
    const [education, setEducation] = useState('');
    const [years, setYears] = useState('');
    const [picture, setPicture] = useState('');
    const [isMentor, setIsMentor] = useState(false);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [techStacksOptions, setTechStacksOptions] = useState([]);
    const [selectedTechStacks, setSelectedTechStacks] = useState([]);


    const decodedToken = jwtDecode(token);

    const id = decodedToken.account.id;

    const handleTechStackChange = (selectedOptions) => {
        const selectedTechStackValues = selectedOptions.map(option => option.value);
        setSelectedTechStacks(selectedTechStackValues);
    };
    const handleEducationChange = event => {
        setEducation(event.target.value);
    };
    const handleYearsChange = event => {
        setYears(event.target.value);
    };
    const handlePictureChange = event => {
        setPicture(event.target.value);
    };
    const handleIsMentorChange = () => {
        setIsMentor(!isMentor);
    };

    const fetchAccountData = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/accounts/${id}`;
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setEmail(data.email);
            setYears(data.years_of_experience);
            setPicture(data.picture);
            setEducation(data.education);
            setIsMentor(data.is_mentor);
            setSelectedTechStacks(data.tech_stacks)
        }
    };

    const fetchTechStacks = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/tech-stacks/`;
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        if (response.ok) {
            const data = await response.json();
            setTechStacksOptions(data);
        };
    };


    const handleSubmit = async event => {
        event.preventDefault();
        const data = {};
        data.username = username;
        data.first_name = firstName;
        data.last_name = lastName;
        data.email = email;
        data.education = education;
        data.years_of_experience = years;
        data.picture = picture;
        data.is_mentor = isMentor;
        data.tech_stacks = selectedTechStacks;

        const url = `${process.env.REACT_APP_API_HOST}/api/accounts/${id}`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {

            navigate('/profile');
            fetchAccountData();

        }
    };








    useEffect(() => {
        if (token) {
            fetchAccountData();
            fetchTechStacks();
        }
    }, [token]); // eslint-disable-line

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={process.env.PUBLIC_URL + "/project_logo.png"}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">

                        Edit Profile</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form onSubmit={handleSubmit} className="space-y-6" id="edit-profile-form">
                        <label htmlFor="years">Years of Experience</label>
                        <div className="mt-2">
                            <input value={years} onChange={handleYearsChange} type="text" id="years" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <label htmlFor="education">Education</label>
                        <div className="mt-2">
                            <input value={education} onChange={handleEducationChange} type="text" id="education" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <label htmlFor="picture">Picture</label>
                        <div className="mt-2">
                            <input value={picture} onChange={handlePictureChange} type="text" id="picture" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" checked={isMentor} onChange={handleIsMentorChange} />
                                Sign up as mentor?
                            </label>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="user_stacks" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tech Stacks
                                </label>
                            </div>
                            <div className="mt-2">
                                <Select
                                    isMulti
                                    name="tech_stacks"
                                    options={techStacksOptions.map(tech_stack => ({
                                        value: tech_stack.name,
                                        label: tech_stack.name
                                    }))}
                                    onChange={handleTechStackChange}
                                    value={selectedTechStacks.map(value => ({ value, label: value }))}
                                />
                            </div>
                        </div>
                        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save</button>
                    </form>
                </div>
            </div>

        </>
    );
};

export default EditProfile;
