import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import jwtDecode from "jwt-decode";

export default function ProjectForm() {
  const { token } = useToken();
  const [project_name, setProjectName] = useState('')
  const [project_picture, setProjectPicture] = useState('')
  const [goal, setGoal] = useState('')
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [tech_stacks, setTechStacks] = useState([])
  const navigate = useNavigate()
  const decodedToken = jwtDecode(token)
  const owner_id = decodedToken.account.id

  const handleProjectNameChange = (event) => {
    const value = event.target.value
    setProjectName(value)
  }

  const handleProjectPictureChange = (event) => {
    const value = event.target.value
    setProjectPicture(value)
  }

  const handleGoalChange = (event) => {
    const value = event.target.value
    setGoal(value)
  }

  const handleTechStackChange = (selectedOptions) => {
    const selectedTechStackValues = selectedOptions.map(option => option.value);
    setSelectedTechStacks(selectedTechStackValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    const projectData = {}
    projectData.project_name = project_name
    projectData.project_picture = project_picture
    projectData.goal = goal
    projectData.owner_id = owner_id
    projectData.tech_stacks = selectedTechStacks

    const projectUrl = `${process.env.REACT_APP_API_HOST}/api/projects`
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(projectData),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }

    try {
      const projectResponse = await fetch(projectUrl, fetchConfig);
      if (projectResponse.ok) {
        const newProject = await projectResponse.json();

        setProjectName("");
        setProjectPicture("");
        setGoal("");

        const projectStacksUrl = `${process.env.REACT_APP_API_HOST}/api/project-stacks`;
        const projectStacksData = {
          project_id: newProject.id,
          tech_stacks: selectedTechStacks,
        };
        const projectStacksFetchConfig = {
          method: "post",
          body: JSON.stringify(projectStacksData),
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const projectStacksResponse = await fetch(projectStacksUrl, projectStacksFetchConfig);
        if (projectStacksResponse.ok) {
          console.log("Tech stacks and project ID saved on the backend.");
        } else {
          console.error("Failed to save tech stacks and project ID.");
        }

        event.target.reset();
        navigate("/projects");
      } else {
        console.error("Failed to create a new project.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchTechStackData = async () => {
    const techStacksUrl = `${process.env.REACT_APP_API_HOST}/api/tech-stacks/`
    const fetchConfig = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(techStacksUrl, fetchConfig)
      if (response.ok) {
        const techStacksData = await response.json()
        setTechStacks(techStacksData)
      }
    } catch (error) {
      console.error("Error fetching tech stacks:", error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchTechStackData()
    }
  }, [token]); // eslint-disable-line
  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="container mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg max-w-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center font-bold leading-9 tracking-tight">
              Create A New Project!
            </h2>
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="project_name" className="block text-sm font-medium leading-6 text-gray-900">
                  Project Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleProjectNameChange}
                    value={project_name}
                    id="project_name"
                    name="project_name"
                    type="text"
                    required
                    className="block w-full rounded-md bg-gray-50 border border-gray py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="project_picture" className="block text-sm font-medium leading-6 text-gray-900">
                    Project Display (URL)
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handleProjectPictureChange}
                    value={project_picture}
                    id="project_picture"
                    name="project_picture"
                    type="text"
                    required
                    className="block w-full rounded-md bg-gray-50 border border-gray py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="goal" className="block text-sm font-medium leading-6 text-gray-900">
                    Project Description
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handleGoalChange}
                    value={goal}
                    id="goal"
                    name="goal"
                    type="text"
                    required
                    className="block w-full rounded-md bg-gray-50 border border-gray py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="project_picture" className="block text-sm  font-medium leading-6 text-gray-900">
                    Tech Stacks
                  </label>
                </div>
                <div className="mt-2 bg-gray-50 border border-gray">
                  <Select
                    isMulti
                    name="tech_stacks"
                    options={tech_stacks.map(tech_stack => ({
                      value: tech_stack.name,
                      label: tech_stack.name
                    }))}
                    onChange={handleTechStackChange}
                    value={selectedTechStacks.map(value => ({ value, label: value }))}
                  />
                </div>
              </div>


              <div className="p-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
