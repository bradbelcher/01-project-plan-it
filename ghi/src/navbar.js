import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";
import jwtDecode from 'jwt-decode';


function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Nav() {
	const { logout, token } = useToken();
	const location = useLocation();
	const navigate = useNavigate();
	const decodedToken = jwtDecode(token);
	const user = decodedToken.account;

	if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
		return null;
	}
	if (token) {
		return (
			<Disclosure as="nav" className="bg-gray-800">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="flex h-16 items-center justify-between">
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<img
											className="h-8 w-auto"
											src={process.env.PUBLIC_URL + "/project_logo.png"}
											alt="Your Company"
										/>
									</div>
									<div className="hidden sm:ml-6 sm:block">
										<div className="flex space-x-4">
											<Link
												to="/dashboard"
												className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === '/dashboard' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
													}`}
											>
												Dashboard
											</Link>
											<Link
												to="/mentors"
												className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === '/mentors' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
													}`}
											>
												Mentors
											</Link>
											<Link
												to="/projects"
												className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === '/projects' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
													}`}
											>
												Projects
											</Link>
											<Link
												to="/projects/new"
												className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === '/projects/new' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
													}`}
											>
												Create Project
											</Link>
										</div>
									</div>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex items-center">
										<Menu as="div" className="relative ml-3">
											<div>
												<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
													<span className="absolute -inset-1.5" />
													<span className="sr-only">Open user menu</span>
													<img
														className="h-8 w-8 rounded-full"
														src={process.env.PUBLIC_URL + "/usericon.png"}
														alt=""
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													<Menu.Item>
														{({ active }) => (
															<button
																onClick={() => {
																	navigate('/profile');
																}}
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)}
															>
																Your Profile
															</button>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<button
																onClick={() => {
																	logout();
																	navigate('/');
																}}
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)}
															>
																Sign out
															</button>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								</div>
								<div className="-mr-2 flex sm:hidden">
									<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="space-y-1 px-2 pb-3 pt-2">
								<Disclosure.Button
									as="a"
									href="/dashboard"
									className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
								>
									Dashboard
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									href="/mentors"
									className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
								>
									Mentors
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									href="/projects"
									className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
								>
									Projects
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									href="/projects/new"
									className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
								>
									Create Project
								</Disclosure.Button>
							</div>
							<div className="border-t border-gray-700 pb-3 pt-4">
								<div className="flex items-center px-5">
									<div className="flex-shrink-0">
										<img
											className="h-10 w-10 rounded-full"
											src={process.env.PUBLIC_URL + "/usericon.png"}
											alt=""
										/>
									</div>
									<div className="ml-3">
										<div className="text-base font-medium text-white">{user.first_name} {user.last_name}</div>
										<div className="text-sm font-medium text-gray-400">{user.email}</div>
									</div>
								</div>
								<div className="mt-3 space-y-1 px-2">
									<Disclosure.Button>
										{({ active }) => (
											<button
												onClick={() => {
													navigate(`/profile/${user.id}`);
												}}
												className={classNames(
													active ? 'bg-gray-100' : '',
													'block px-4 py-2 text-sm text-gray-700'
												)}
											>
												Your Profile
											</button>
										)}
									</Disclosure.Button>
									<Disclosure.Button>
										{({ active }) => (
											<button
												onClick={() => {
													logout();
													navigate('/');
												}}
												className={classNames(
													active ? 'bg-gray-100' : '',
													'block px-4 py-2 text-sm text-gray-700'
												)}
											>
												Sign out
											</button>
										)}
									</Disclosure.Button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		)
	}
}
