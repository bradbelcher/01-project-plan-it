import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';
import jwtDecode from 'jwt-decode';

function Profile() {
    const { token } = useToken();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [picture, setPicture] = useState('');
    const [years, setYears] = useState('');
    const [education, setEducation] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [techStacks, setTechStacks] = useState([]);

    const decodedToken = jwtDecode(token)
    const id = decodedToken.account.id

    const fetchData = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/accounts/${id}`;
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        if (response.ok) {
            const data = await response.json();
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setPicture(data.picture);
            setYears(data.years_of_experience);
            setEducation(data.education);
            setUsername(data.username);
            setEmail(data.email);
            setTechStacks(data.tech_stacks);
        };


    };







    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]); // eslint-disable-line

    return (
        <>
            <div className="container max-w-3xl mx-auto px-4 flex min-h-full flex-1 flex-col sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg m-10">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Profile</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                            <button
                                onClick={() => {
                                    navigate('/profile/edit')
                                }}
                                className="btn btn-primary"
                                style={{ backgroundColor: 'blue', marginRight: '10px' }}
                            > Edit Profile
                            </button>
                        </div>
                        <img src={picture} alt=""
                            style={{ width: '350px', height: 'auto' }} />
                    </div>
                    <div className="mt-6">
                        <dl className="grid grid-cols-1 sm:grid-cols-2">
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{firstName} {lastName}</dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{username}</dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Education</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{education}</dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{email}</dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Years of Experience</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{years}</dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Tech Stacks</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                    <ul>
                                        {techStacks.map(stack => {
                                            return (
                                                <li key={stack}>{stack}</li>
                                            )
                                        })}
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Profile
