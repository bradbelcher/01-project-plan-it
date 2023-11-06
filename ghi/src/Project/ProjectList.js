import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";

export default function ProjectList() {

    const { token } = useToken();
    const [project_name, setProjectName] = useState("");
    const [projects, setProjects] = useState([]);


    const handleProjectNameChange = (event) => {
        const value = event.target.value;
        setProjectName(value);
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


    const handleFilterSubmit = (event) => {
        event.preventDefault();
        if (project_name) {
            const filteredProjects = projects.filter(
                (project) => project.project_name === project_name
            );
            setProjects(filteredProjects);
        } else {
            fetchProjectData();
        }
    };

    useEffect(() => {
        if (token) {
            fetchProjectData();
        }
    }, [token]); // eslint-disable-line

    return (
        <div className="flex flex-col items-center justify-center text-center p-5 max-w-[1200px] mx-auto">
            <h1 style={{ fontSize: '50px', color: 'white' }} className="p-10">Here Is A List of Projects Currently Being Worked On!</h1>
            <h2 style={{ fontSize: '30px', color: 'white' }}>You can search for a project by name, or browse and find something you may be interested in. If you find something that interests you, on the project details to be taken to the projects page. Once you get all the information, you can join the project if you want!</h2>
            <form style={{ width: '500px', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onSubmit={handleFilterSubmit}>
                <label htmlFor="project_name" style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>Enter Project Name: </label>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="text" id="project_name" value={project_name} onChange={handleProjectNameChange} style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Search</button>
                </div>
            </form>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3" style={{ marginTop: '30px' }}>

                {projects && projects.map((project) => (
                    <li
                        key={project.id}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <div className="flex flex-1 flex-col p-8">
                            <img src={project.project_picture} className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" alt="project_picture" />
                            <h3 className="mt-6 text-sm font-medium text-gray-900">{project.project_name}</h3>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dt className="sr-only">Goal</dt>
                                <dd className="text-sm text-gray-500">{project.goal}</dd>
                                <dd className="mt-3">
                                    <Link to={`/project-details/${project.id}`} className="btn btn-primary">Details</Link>
                                </dd>
                            </dl>
                        </div>
                        <div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
