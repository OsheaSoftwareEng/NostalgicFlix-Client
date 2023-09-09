# NostalgicFlix Movie App

**Link to project:** https://www.nostalgicflix.com <br>
**Link to API:** https://github.com/OsheaSoftwareEng/NostalgicFlix-API <br>
**Test Account:** Username: testcase
Password: legend5000

![alt tag](https://imgur.com/HKGugG2.png)

## How It's Made:

**Tech used:** React, HTML5, SCSS, JavaScript, Bootstrap, Node.js,Express

Used the REST API i built in on backend and connected it for this application and pulled the data to be dynamically displayed through the application. Users are able to login, signup, update their password and username and view a collection of classic movies and save them to their favorites. Users are also able to reset their password if they forgot by providing their email. The application has trailers that are dynamically imported to each specific movie from the backend of mongoDB. It also has a watch now link that takes users to the specific movie they want to watch on youtube. This application is fully responsive and works on all devices.

## Optimizations

planning on refactoring the entire code base with redux to store all the actions performed. I'm also gonna rewrite the components to be more reusable and delete some repeated code that is presented throughout many components. I'm updated the css and creating a better way to maintain the styles in each component. I also wanna add a admin user that can delete users and see all movies and users in their profile settings in the future. I'm also planning on trying to figure out how to get the forget password reset to be on react instead of my backend application. I'm going to figure out how to the forget password to take the user to my react app instead of my backend server using ejs.
