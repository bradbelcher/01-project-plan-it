import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from 'react-router-dom';
import jwtDecode from "jwt-decode";


export default function ProjectDetails() {
    const { token } = useToken()
    const { project_id } = useParams()
    const [project, setProject] = useState([])
    const [techStacks, setTechStacks] = useState([]);
    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [joinedTeam, setJoinedTeam] = useState(false);

    const decodedToken = jwtDecode(token)

    const accountId = decodedToken.account.id

    const fetchProjectDetails = async () => {
        const projectUrl = `${process.env.REACT_APP_API_HOST}/api/projects/${project_id}`
        const fetchConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch(projectUrl, fetchConfig)
            if (response.ok) {
                const project = await response.json()
                setProject(project)
                setTechStacks(project.tech_stacks)

                fetchOwnerInfo(project.owner_id);
            }
        } catch (error) {
            console.error("Error fetching project details:", error)
        }
    }

    const fetchOwnerInfo = async (ownerId) => {
        const ownerUrl = `${process.env.REACT_APP_API_HOST}/api/accounts/${ownerId}`;
        const fetchConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch(ownerUrl, fetchConfig);
            if (response.ok) {
                const ownerInfo = await response.json();
                setOwnerName(`${ownerInfo.first_name} ${ownerInfo.last_name}`);
                setOwnerEmail(ownerInfo.email);
            }
        } catch (error) {
            console.error("Error fetching owner details:", error);
        }
    }

    const handleJoinProject = async () => {
        const joinUrl = `${process.env.REACT_APP_API_HOST}/api/attendees`
        const data = {
            project_id: project_id,
            account_id: accountId
        }

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch(joinUrl, fetchConfig)
            if (response.ok) {
                alert("You have successfully joined the project!")

                setJoinedTeam(true);
            } else {
                alert("Error joining the project.  Please try again later.")
            }
        } catch (error) {
            console.error("Error joining the project:", error)
            alert("An error occurred while attempting to join the project.")
        }
    }

    useEffect(() => {
        if (token) {
            fetchProjectDetails();
        }
    }, [token]); // eslint-disable-line

    if (!project) {
        return <div>Loading...</div>
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto my-10 max-w-4xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-lg rounded-lg">
                    <div className="px-4 sm:px-0 text-center">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Project Information</h3>
                        <img
                            src={project.project_picture}
                            alt="project_picture"
                            className="max-w-md mx-auto"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <div className="mt-6">
                        <dl className="grid grid-cols-1 sm:grid-cols-2">
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Project Name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{project.project_name}</dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Project Description</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{project.goal}</dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Project Owner</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{ownerName}</dd>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{ownerEmail}</dd>
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
                            {!joinedTeam && (
                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <button
                                        onClick={handleJoinProject}
                                        className="btn btn-primary"
                                        style={{ backgroundColor: 'blue', marginRight: '10px' }}
                                    > Join the Team
                                    </button>
                                </div>
                            )}
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
