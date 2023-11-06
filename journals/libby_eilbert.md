8/16/23

Today I worked on:

auth:   - generated signing key
        - created authenticator.py file, queries.accounts.py, routers.accounts.py
        - edited main.py
        - had to change account table to make the password character limit longer

Struggled with the create and get functions in AccountRepo class, spent a lot of time debugging before finally finding the answer in the lecture on backend auth (I hadn't configured the get function and had missed that it was getting called in authenticator.py)


8/17/23

Today I worked with Jaspreet on:

- merging our branches with main

Took a while to resolve merge conflicts because we'd both been working in the same files, but now all the accounts endpoints are finished.


8/21/23

Today I worked on an endpoint to create an 'attendee,' which is just a way to link an account to a project, for when a user wants to join a project.

8/22/23

Today I worked on an endpoint to list all the attendees of a given project. Spent a long time debugging because it wasn't working and the error I was getting in Docker was not very descriptive, but as soon as I showed it to my team I was able to see that I had an inconsistency in my response model in the router and in the query.

8/23/23, 8/24/23

On these 2 days I worked with the whole group on implementing front end authentication. We ran into a lot of bugs and I had to fix an issue I've had for a while with starting the React container through Docker, but everything is working as of end of day Thursday. There is still a problem with my computer not being able to properly run out docker-compose.yml so I had to make some changes to it that I'll have to leave out of all my future commits.

8/25/23

Today I worked on:

an edit profile React component:

- created EditProfile.js in ghi/src
- added route to App.js

Ran into an issue here the edit account endpoint was returning a 500 internal servor error and couldn't trouble shoot it on my own so I'll have to bring it to the team on Monday.

8/28/23

Today I worked on the edit profile React component:

- fixed the problem with the get account endpoint by editing queries/accounts.py
- got most of the form to work but still have to finish adding tech stacks
- had to change the tech stacks table in the database so that it has a string property called "name" instead of an array property called "stacks"

8/29/23

Today I worked on the edit profile React component:

- had to create a new endpoint to get a specific user's tech stacks so that I can list them as the user adds them to their profile
- created a placeholder Profile.js so that Edit Profile would have a page to redirect to

8/30/23, 8/31/23

On these 2 days I worked on the edit profile React component:

-finished the page, but would like to go back and redo adding tech stacks so that a user can select multiple and they can be included in the form with all the other information

9/4/23

Today I worked with the team on merging the front end pages we've been working on, and I worked independently on finishing the Edit Profile page:

-implemented Tailwind
-implemented select multiple for the tech stacks. Had to make some changes to the endpoints to get this to work and now the backend endpoints aren't working, so when I want to display a user's tech stacks on their profile I won't be able to fetch them

9/5/23

Today I worked on fixing the bug with the user stacks endpoints. The project stacks endpoints are having the same issue, and even though we can create user stacks and project stacks entries using the frontend, we won't be able to fetch any of that data until we fix the GET methods.

9/6/23

Today I worked with the group on:

-merging the frontend pages we've created so far
-started deployment
-still trying to solve the bug with the user stacks and projects stacks endpoints

9/7/23

Today I worked with the group on finishing deployment.

I also worked on the Account profile page:
- created Profile.js in the src/Account directory
- most of the profile information is on there but I still have to figure out how to list the tech stacks

9/8/23

Today I worked on finishing up my front end pages:

- Finally figured out how to display tech stacks for accounts and projects. Had to make them a property of the account and project tables instead of their own separate database tables.
- Also created a link from the mentors list that goes to a different version of the profile page (one without an Edit Profile button) so that users can click on View Profile to contact a mentor
