import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react'

const statuses = {
    true: 'text-green-700 bg-green-50 ring-green-600/20',
    false: 'text-gray-600 bg-gray-50 ring-gray-500/10',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MyProjects({ projects, user }) {
    const { token } = useToken();

    const handleDelete = async (projectsId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/projects/${projectsId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)
            if (!response.ok) {
                console.error('Error deleting hat:', response.status);
            }
        } catch (error) {
            console.error('Network Error', error);
        }
    }

    const userProjects = projects.filter(project => project.owner_id === user.id);

    return (
        <div className="m-10">
            <ul className="divide-y divide-gray-50 pt-2 m-10">
                {userProjects.map((project) => (
                    <li key={project.id} className="flex items-center justify-between p-3 bg-white m-4 rounded-lg shadow-lg overflow-hidden">
                        <div className="min-w-0">
                            <div className="flex items-start gap-x-5 pb-3">
                                <h1 className="text-2xl font-semibold text-gray-900">{project.project_name}</h1>
                                <p
                                    className={classNames(
                                        statuses[project.is_completed],
                                        'rounded-md mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                                    )}
                                >
                                    {project.is_completed ? 'Complete' : 'In Progress'}
                                </p>
                            </div>
                            <div className="flex-grow flex items-center text-lg text-gray-600">

                                <p className="pr-2">
                                    Goal: {project.goal}
                                </p>
                                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                    <circle cx={1} cy={1} r={1} />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-none items-center gap-x-4">
                            <NavLink to={`/project-details/${project.id}`}
                                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                            >
                                View project<span className="sr-only">, {project.project_name}</span>
                            </NavLink>
                            <Menu as="div" className="relative flex-none">
                                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                    <span className="sr-only">Open options</span>
                                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        {/* <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href=""
                                                className={classNames(
                                                    active ? 'bg-gray-50' : '',
                                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                )}
                                            >
                                                Edit<span className="sr-only">, {project.project_name}</span>
                                            </a>
                                        )}
                                    </Menu.Item> */}
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => {
                                                        handleDelete(project.id);
                                                    }}
                                                    className={classNames(
                                                        active ? 'bg-gray-50' : '',
                                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                    )}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
