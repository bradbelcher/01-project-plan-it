## Main Page (Not Logged In)

Our landing page, where a user will be taken to when accessing our application either locally or through our deployed website.  On our landping page we have added many css styling technicques to make the page visually appealing to users.  There's a couple of buttons on our page that prompts users to either login in their existing account or signup for an account to fully access our application. As well as showcasing some projects that are being worked on right now by fellow software engineers.

![Img](/docs/images/MainPageNotLoggedIn.png)

## Main Page (Logged In)

Our logged in page, which we refer to as the user dashboard gives access to the user's own created projects, as well as projects they've joined to work on as well.  There's a button to view the project which takes the user to the details page of that project.

![Img](/docs/images/MainPageLoggedIn.png)

## Sign up Page

Here is our sign up page, where a user can enter their first name, last name, a username, their email address, a password, and an optional profile picture. (Keep in mind our design has changed from our previous wireframe designs)

![Img](/docs/images/SignUp.png)

## Log in Page

Our log in page prompts users who already have an account to just enter in their username and password to access the app to it's full capability.  Originally had it as email but due to the jwtdown libary we changed it to username.

![Img](/docs/images/LogIn.png)

## Creating a Project Page

Now onto our creating a project page, here a current user can create a project that they can publish to our website and stores that project into our database so other users can view the project and potenitally join the project if they have any interest in it.  A user must give the project a name, supply a project picture that showcases what the project is about, give a description of the project and finally select tech stacks that require a user to know for fulfilling the project's goals.

![Img](/docs/images/CreateProject.png)

## Projects Page

Here we showcase the projects that users have created and that other teams are working on.  Added a search functionality so users can search a project they might've heard of from a friend or from social media by it's name and potentially join it.  The page itself showcases the image associated with the picture, name of the project and the description of the project.  The details button sends a user to the projects details page where more functionality can be used.

![Img](/docs/images/ProjectList.png)


## Project Details Page

The project details page is a page a user can get to by clicking the details button on the projects list page.  Here we showcase the projects information in a larger format and in it's own card/page.  Once again showing the project's associated image, project name and project description again.  But also showing the project owner who is the one who created the project and the email of the owner so possible members can get in contact with the project owner.  Lastly the join the team button that gets the current logged in users account id and sends both that id and the project id to the attendees endpoint to create that attendee or member for the project team.

![Img](/docs/images/ProjectDetails.png)

## Profile and Edit Profile Page

Our profile page and edit profile page on the front end were created a little different compared to our wireframe design.  We had decided to create a page for the profile, which showcases all of the important fields that might be important to a user, like their name, username, education, email, years of experience, and the associated tech stacks they might know.  But also we created a button where the logged in user can edit their profile and update either their years of experience in the field, education, updating their profile picture, if they want to still be a mentor or not and what other new tech stacks they might know.

![Img](/docs/images/Profile.png)


## Mentors Page

We've also made a mentors page that shows a list of users that have accepted on their edit profile that they are interested in being a mentor.  This page showcases the mentor in it's own card, showcasing the users name, username and their education.

![Img](/docs/images/Mentors.png)

## Stretch Goals

These two components are components we added to stretch goals, which is contacting a mentor and editing a project as either completed or deleting the project from your list of projects if you no longer want to be a part of that team and work on different projects.

![Img](/docs/images/MentorDetails.png)

![Img](/docs/images/EditProject.png)
