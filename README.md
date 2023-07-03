# NostalgicFlix Movie App

**Link to project:** https://www.nostalgicflix.com <br>
**Link to API:** https://github.com/OsheaSoftwareEng/NostalgicFlix-API

![alt tag](https://imgur.com/qMkMAoB.png)

## How It's Made:

**Tech used:** React, HTML5, SCSS, JavaScript, Bootstrap, Node.js,Express

Used the REST API i built in on backend and connected it for this application and pulled the data to be dynamically displayed through the application. Users are able to sign up, login, favorite/unfavorite movies and update their settings. I've also added in a forget password in the backend for users to recover it from a page using ejs. I designed the UI based off of many popular movie sites and added smooth navigation for users experience.

## Optimizations

planning on refactoring the entire code base with redux to store all the actions performed. I'm also gonna rewrite the components to be more reusable and delete some repeated code that is presented throughout many components. I'm updated the css and creating a better way to maintain the styles in each component. I also wanna add a admin user that can delete users and see all movies and users in their profile settings in the future. I'm also planning on trying to figure out how to get the forget password reset to be on react instead of my backend application. I'm going to figure out how to the forget password to take the user to my react app instead of my backend server using ejs.

## Lessons Learned:

Ths is my first react app so i learned about react state and importing and exporting components and about the re-usablitiy of components. I like the virtual dom as it makes the page load way smoother since the virtual dom stores information and passes it to the regular dom. I had to go to the backend and setup forget password, it took me awhile to implement as i had to create a token that verifies the user and use the package nodemailer to send emails to users. Then i had to go back to my frontend and use the axios package to send a request to my server for the mail to send out.
