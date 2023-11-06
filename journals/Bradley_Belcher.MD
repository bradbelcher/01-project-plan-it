
8 September 2023

still working on styling and a few other items. Added backgrounds to all pages to match the plan-it logo that Gabe designed. I'm getting better and things are moving a lot quicker and smoother than before. 

7 September 2023

Doing mostly work on asthsetics and styling. I've been getting a lot better with css and tailwind. A lot of our pages work perfectly but the styling and formatting needs a lot of work. I'm also going to try to create a navbar that will populate at each page. 

6 September 2023

Today I focused on coding and creating a test function for the attendees API. i decided to create a separate branch for this testing, and chose to create a virtual environment to test. I used the pytest command as written in the learn relating to testing. I spent 2 hours trouble shooting issues. I eventually asked my project mates for help and they had run into similar issues. They first had me run the tests through my docker container instead of the virtual environment. At first I got an identical error message. then they told me to use the cmd python -m pytest rather than just pytest. I got different error codes, but the only thing we had to do was add to my imports. After that the tests passed.

5 September 2023

In an effort for consistency and uniformity I made the width of the cards on the landing page and mentor page the same width as the cards on the project page. in trying to get my mentors page to function, i ended up changing code that impacts everyone. I changed the loginform to redirect to a users dashboard, rather than the projects page, which made no sense and was probably a place holder. I also changed the login function redirect. If a person tries to access a page that wants them to be logged in first, it will redirect them to login, then redirect them back to their original page instead of dashboard. if there is no location data of where they came from it still goes to dashboard.

1-4 September (Labor Day Weekend)

I'm having token issues using the API. currently anyone can login and it does not require correct login information. I believe this may be an issue that another group member has corrected, but its been awhile since I merged with main. This isn't hindering me at the moment, so I put it in the slack in case someone knows more. I made 20 user profiles and added them to do the DB using BeeKeeper Studio to test mentors page.

31 August 2023

I began working on my mentors page. The frame is build and I have all the fetch coding assigned to user cards. I will need to work on css styling and formatting. I used this-person-does-not-exist.com ro randomly generate photos of 20 and uploaded them to flickr to be used in this project. These are not real people and the photos are not copyrighted.

30 August 2023

Finally finished adding the carousel. Still having issues with the API and had to unlock the projects page in order to access and populate it. I will create a different api later, but for now I have confirmed the cards and carousel will work and populate when the API is working. i have been working on formatting issues to make the page look better and all the different aspects of the page have the same ratios etc.
added shuffle array to the carousel component. cards are now randomly generated and different everytime. I have added that the maximum amount of cards is 10, and the projects will shuffle each time page is loaded.

29 August 2023

The day started by finishing my trouble shooting of the tailwindcss and bootstrap. I learned very important lessons about how classes such has or  have different default values and styles assigned to them between bootstrap and tailwind. I have solved the problem but I don't see myself integrating bootstrap and tailwind together in the future. Using tailwind I created a carousel on the landing page that will populate with a random assortment of projects being worked on. I'm currently having issues with the API to pull the information. The GET function is behind a token, but our landing page donse't require one as its the first page prior to login. I attempted to trouble shoot this by trying to add a token directly to the carousel and its fetch request but it didn't work. trouble shooting issues with function being able to access cards via token has taken hours. posted in help me understand. I spoke with Rosheen and she advised that I can't do that, and I needed to find another work around.

29 August 2023

I'm still working on the landing page. I'm really trying to incorporate some more advanced webpage design and concepts. Today I spent a couple hours learning about and writing code to use react webpacks to import all my media that I had spent a lot of time creating from the file folder. I didn't want to have to import over a dozen files individually, so spent time writing a const webpack that import all my media. It worked and I was able to get all imgs on the page working. however, when I tried to do a git push to update everything, including the video file, there was huge wait time and it never seemed to update. I have come to teh conclusion that adding the media, especially the video, directly to the project may be causing the delay and issues due to file sizes. While it's only a couple hundred kb per img and less than 8mb for the video, I can't figure out any other reason. I am now uploading all the data to a file sharing site that i can link with URL's instead. Wasted about 4 hours researching and writing that react code. At least I learned something new. due to tailwind and bootstrap conflicts, i've had to add the !important header to numerous bootstrap classes to make sure it formats correctly. I also made the nav bar at the top scroll with the page.

28 August 2023

I finished removing nearly all inline styling code and changed it all to .css classes. I tried hard to make it easier on myself by reusing containers and grids that I created in .css to have cleaner code. This was the most frustrating and most difficult process of the project so far, and I don't see myself trying to do this anytime in the future until I have learned a better grasp on pre-planning. Inline code would have saved me an entire day or two. I also had issues today using tailwindcss. One of our group project members decided to use tailwind components because they are more visually appealing, but I had been using bootstrap. After installing tailwind I had formatting issues.

25 August 2023

Today I worked on the logo gabe had originally created. He provided very small file sizes that distorted when enlarged. First I ran it through a program to enlarge it for the main page. Then I used photoshop to add a white boarder to make it pop on the landing page. I used the microsoft designer to create an AI generated video that i worked on and input into the background of the landing page and placed on a loop. I reduced the file size to less than 8mb so it would fit into the project folder rather than a url.

24 August 2023

Spent a large portion of the day on aesthetics. Due to issues I was having with sizing. I was able to use the code and flex containers to make them the same size, but due to the initial sizes and shapes when I input them some of the came out oddly shaped and distorted. I used a photoshop program to resize all the icons to the same h & w and reduce file size to better fit into the project folder. everything has been added and functioning properly.

23 August 2023

Today I did tweaks to the css grid. I adjust the two grids on the landing page and created features and sizing for the icons I made. I changed fonts, styling. I also learned a lot about containers-fluid properties and other css type containers and their default

22 August 2023

this morning I got my code functioning and updated my merge request. My partners confirmed the code is working and I merged to main. I then got started on the next job of creating the user_stacks backend API. since i spent so much time creating the other back end I learned a lot and this was much, much easier to code and implement. I've already got most of it working and think I'll be merging before the end of the day.

21 August 2023

I am still trouble shooting code but I believe I finally have it working. I created my first merge request and my partner Libby immediately found the code wasn't functioning properly and found where the issues were. I had some issues with merging with the main and made some mistakes that took a couple hours to correct. I believe I've found the problem and am working on a fix.

17 August 2023

I've overall completed the coding for the FastAPI and necessary functions and now I'm trouble shooting. I realized there are issues with some of my naming conventions and inconsistencies. I also need to add in better trouble shooting and error functioning. I'm also trying to work with Gabe a bit and see if we can align our code more with naming conventions. It is obvious two separate people created the code simply because of how we are naming and a few other differneces in how we've implemented.

16 August 2023

I am still working on the backend API for Projects. As it's my first time using PostgreSQL language I'm having to take additional time learning the various aspects of not using a framework like Django for my API. I had some issues with my docker container but I did some trouble shooting and I have it working now.

15 August 2023

We divided back end duties. Gabe and I are splitting the back end API to develop Projects. I will be doing two GET functions and the PUT function. I have started by creating two files, projects.py under queries and routers folder. I plan on making the quieries first and make models and define functions, then will move on to the routers and create teh FastAPI.