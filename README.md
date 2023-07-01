# NostalgicFlix Movie App

**Link to project:** www.nostalgicflix.com
**Link to API:** https://github.com/OsheaSoftwareEng/NostalgicFlix-API

![alt tag](https://imgur.com/qMkMAoB.png) 

## How It's Made:

**Tech used:** React, HTML5, CSS3, JavaScript, Bootstrap, node.js,express

Built the API for this application and pulled the data to be dynamically displayed through the application. Users are able to sign up, login, favorite/unfavorite movies and update their settings. I've also added in a forget password in the backend for users to recover it for a page using ejs. 

## Optimizations

planning on refactoring the entire code base with redux to store all the actions performed. I'm also gonna rewrite the components to be more reusuable to delete some repeated code that is presented throughout many components. I'm updated the css and creating a better way to maintain the styles in each component. I also wanna add a admin user that can delete users and see all movies and users in their profile settings in the future. I'm also planning on trying to figure out how to get the forget password reset to be on react instead of my backend application.

## Lessons Learned:

Ths is my first react app so i learned about react state and importing and exporting components and about the reusuablitiy of components. I like the virutual dom as it makes the page load way smoother since the virtual dom and store information and passing it to the regualr dom. I had to go to the backend and setup forget password, it took me awhile to implement as i had to create a token that verifies the user and use the package nodemailer to send emails to users. Then i had to go back to my frontend and use the axios package to send a request to my server for the mail to send out.
