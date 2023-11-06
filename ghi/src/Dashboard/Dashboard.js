import React, { useEffect, useState } from 'react';
import JoinedProjects from "./JoinedProjects";
import MyProjects from "./MyProjects";
import useToken from '@galvanize-inc/jwtdown-for-react';
import jwtDecode from 'jwt-decode';

export default function Dashboard() {
    const [selectedTab, setSelectedTab] = useState('myProjects');
    const [projects, setProjects] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const { token } = useToken();
    const decodedToken = jwtDecode(token);
    const user = decodedToken.account;

    const handleTabClick = (tabKey) => {
        setSelectedTab(tabKey);
    };

    const fetchAccountsData = async () => {
        const accountsUrl = `${process.env.REACT_APP_API_HOST}/api/accounts`;
        const fetchConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        try {
            const response = await fetch(accountsUrl, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setAccounts(data);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchProjectData = async () => {
        const projectsUrl = `${process.env.REACT_APP_API_HOST}/api/projects`;
        const fetchConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        try {
            const response = await fetch(projectsUrl, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchAttendeeData = async () => {
        const attendeesUrl = `${process.env.REACT_APP_API_HOST}/api/attendees/account/${user.id}`;
        const fetchConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        try {
            const response = await fetch(attendeesUrl, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setAttendees(data);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchAccountsData();
        fetchProjectData();
        fetchAttendeeData();
    }, []) // eslint-disable-line


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div>
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        Select a tab
                    </label>
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        value={selectedTab}
                        onChange={(e) => handleTabClick(e.target.value)}
                    >
                        <option value="myProjects">My Projects</option>
                        <option value="joinedProjects">Joined Projects</option>
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
                        <button
                            className={`group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 ${selectedTab === 'myProjects' ? 'text-gray-900' : 'text-gray-900 hover:text-gray-700'} rounded-l-lg`}
                            aria-current={selectedTab === 'myProjects' ? 'page' : undefined}
                            onClick={() => handleTabClick('myProjects')}
                        >
                            <span>My Projects</span>
                            <span
                                aria-hidden="true"
                                className={`${selectedTab === 'myProjects' ? 'bg-indigo-500' : 'bg-transparent'
                                    } absolute inset-x-0 bottom-0 h-0.5`}
                            />
                        </button>
                        <button
                            className={`group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 ${selectedTab === 'joinedProjects' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'} rounded-r-lg`}
                            aria-current={selectedTab === 'joinedProjects' ? 'page' : undefined}
                            onClick={() => handleTabClick('joinedProjects')}
                        >
                            <span>Joined Projects</span>
                            <span
                                aria-hidden="true"
                                className={`${selectedTab === 'joinedProjects' ? 'bg-indigo-500' : 'bg-transparent'
                                    } absolute inset-x-0 bottom-0 h-0.5`}
                            />
                        </button>
                    </nav>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {selectedTab === 'myProjects' ? <MyProjects projects={projects} user={user} accounts={accounts} /> : <JoinedProjects accounts={accounts} attendees={attendees} />}
            </div>

        </div>
    );
}
