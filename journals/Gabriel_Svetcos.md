At a minimum, you'll need to include the following information in each entry:

    The date of the entry
    A list of features/issues that you worked on and who you worked with, if applicable
    A reflection on any design conversations that you had
    At least one ah-ha! moment that you had during your coding, however small
    Keep your journal in reverse chronological order. Always put new entries at the top.

# Sunday, September 10

Today, I worked on:

- ReadMe

I completed my half of the ReadMe file (Meet the team, Our Objective, Functionality[logged in, logged out]).

# Friday, September 8

Today, I worked on:

- Code Cleanup and Bug Fixes

We got our site deployed. We ran into some bugs in the process that we were able to sort out easily enough. Some members started running into a dependency issue when pulling/merging branches. I had ran into the issue before so I shared that my solution was to delete the docker containers, images and volumes. THEN, delete the node_modules directory from the project before doing a rebuild with the 'docker-compose up' command. Those issues were solved. For the rest of the day we went through code doing clean up of unused imports and code like console.logs. Jaspreet and I split up the ReadMe and I will be taking the first half of it.

# Tuesday September 5 - Thursday September 7, 2023

Today, I worked on:

- Navbar and Dashboard

I finished the navbar and dashboard finally. The biggest hurdle was getting a filtered list to show only the projects that the logged-in user has joined; ultimately I ended up creating a new endpoint to grab all joined projects based on account_id. We also deployed our application and are just waiting for a few more merges.

## August 30 - Sep 1 2023

Out of class to deal with moving; Over the weekend Jaspreet and I worked to add Tailwind to basically all the pages and it looks super good!

## Tuesday - August 29, 2023

Today, I worked on:

- Navbar and Dashboard and Moving

## Monday - August 28, 2023

Today, I worked on:

- Navbar and Dashboard and Moving

## Friday - August 25, 2023

Today, I worked on:

- Individual Front-Ends

We divvied up pages for the front-end to begin working on. I will be taking care of the NavBar and user dashboard (the homepage when logged in).

## Thursday - August 24, 2023

Today, I worked on:

- Getting our first front-end page to work

Since yesterday, we've been trying to debug a problem with a token not posting correctly when making an account. Finally fixed the errors from yesterday. We are now starting to work on the other front-end components. I will begin working on the Navbar component.

After HOURS of troubleshooting... Jaspreet, Libby, and I decided that the issue we couldn't get around was the our front-end kept looking for 'username' field when we were wanting to only use 'email.' I ended up screen-sharing while adding a username field to all account-related data that needed it while they walked through it with me.

## Wednesday - August 23, 2023

Today, I worked on:

- Our first front-end page

We started working on our first front-end react page. We kept running into problems with token creation when making a new account.

I also added a get_token endpoint to the backend and merged it into main after Libby approved it.

## Tuesday - August 22, 2023

Today, I worked on:

- Project_stacks endpoints

I started and finished the GET, GET (All), POST, PUT, and DELETE methods for the 'project_stacks' table endpoints.

## Monday - August 21, 2023

Today, I worked on:

- First Merge Request for Project POST/DELETE methods; Started project_stacks endpoints

I finished my endpoints for the Project POST and DELETE request methods then completed the merge request into main after it was reviewed. I also created a new branch 'project-stacks' to begin working on the endpoints (GET, GET, POST, PUT, DELETE) for the project-stacks table.

After pulling updated merged code from Main before prepping my own merge request, I ran into an issue with our migration file not matching. I was informed by teammates that I needed to Drop the tables and rerun docker compose. I used Beekeeper to drop the tables, which had to be done in a certain order due to dependencies, and was able to successfully get all the containers running again after executing docker-compose up.

## Friday - August 18, 2023

- No Class

## Thursday - August 17, 2023

- Out of Class

## Wednesday - August 16, 2023

Today, I worked on:

- Project POST and DELETE Endpoints.

I followed along with the FastAPI videos in the learn module to implement the POST request method for the project table. I also implemented/completed the DELETE request method for the project table.

I ran into an issue when trying to test my POST endpoint: the 'account' table doesn't have any data yet, so the 'owner_id' property can't be properly connected as a foreign key. After looking around, I figured out how to use PGAdmin to 'inject' data for a new row in the 'account' table to pull an owner_id from.

## Tuesday - August 15, 2023

Today, I worked on:

- Initial project setup & Starting Endpoint Features

I completed the Docker-Compose YAML, Dockerfile.dev, and added the Psycopg line to requirements.txt to help figure out issues we were having with the docker containers. From there, we were able to successfully setup our project and database tables.

After we got the project initialized, we split up the tasks and assigned issues for each of us to begin working on. Brad and I will be working on the back-end endpoints for the 'Projects'. Specifically, I will be handling the POST and DELETE methods.

By starting the project completely over from scratch, I found that part of the reason our FastAPI container kept failing to run was because the GHI needed time to finish its initial compile.
