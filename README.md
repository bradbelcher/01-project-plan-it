# Project Plan-it


## Meet the Team -

- [Brad Belcher](https://gitlab.com/bradlis13)
- [Libby Eilbert](https://gitlab.com/libbyeilbert)
- [Jaspreet Sangha](https://gitlab.com/IamYorye)
- [Gabriel Svetcos](https://gitlab.com/Gsvetcos)


## Our Objective -

This application is a community-based platform for software engineers and developers to collaborate together on projects. The focus is to provide a space for learners to be able to start programming projects that target a language/library/framework they want to gain experience on while allowing other users to join them with a learning objective of their own. This application also allows more experienced users to join in on projects as mentors to guide and assist those who are learning. If you're a gamer, this web application is basically a 'LFG' for coding projects you want to tackle, and you can think of mentors as your experienced support role giving you call-outs from the sideline!

## Functionality -
#### Logged Out Users Can -
- View our amazing landing page
- View a preview of the tech stacks user work with on the app
- View a small snippet of some projects currently being worked on
- Login
- Register

#### Logged In Users Can -
- Access their user dashboard
- On their dashboard, they can:
    - View a list of projects they've created
    - Delete projects they've created
    - View a list of projects they've joined
- View a list of mentors
- View a users profile
- View their own profile
- Edit their own profile
- See a list of all projects
- Create a new project
- Edit the details of a project they created
- Join an existing project
- Signout

## Running our Project -

1. For Project Plan-It

2. Clone with HTTPS or SSH to your local machine via the terminal

3. Change your working/current directory to the directory of the cloned project plan-it

4. If you don't have Docker Desktop you can install it [here](https://www.docker.com/products/docker-desktop/)

5. Run Docker Desktop

6. In your terminal, run the following commands (Make sure you are in the root directory of the project)
```
docker volume create postgres-data

docker-compose up --build
```
7. Go to http://localhost:3000

Now you will be able to use Project Plan-It and explore the features we have created for you!


## Wire Frames -

[Wire-Frame Designs](/docs/wireframes.md)

## API endpoints -

[API Docs](/docs/API_Endpoints.md)

## Deployed Project -

[Project Plan-It](https://planiteers.gitlab.io/project-plan-it/)

## Test Endpoints -

[FastAPI - Swagger UI](https://may-11-pt-planiteersapi.mod3projects.com/docs)

## Team Journals

Want a closer look as to what each team members did, here's our journals -

- [Gabe's Journal](/journals/Gabriel_Svetcos.md)
- [Libby's Journal](/journals/libby_eilbert.md)
- [Brad's Journal](/journals/Bradley_Belcher.MD)
- [Jaspreet's Journal](/journals/JASPREET_SANGHA.MD)
