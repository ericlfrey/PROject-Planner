# Get Shit Done

![logo](https://user-images.githubusercontent.com/107942776/223236457-7dfa7824-1aa7-4609-9841-a8923173329d.png)

[![Netlify Status](https://api.netlify.com/api/v1/badges/321f4006-a257-43b5-a88c-09a10b314499/deploy-status)](https://app.netlify.com/sites/elfrey-project-planner/deploys)

[Go Get Shit Done!](https://elfrey-get-shit-done.netlify.app/) - Link to App

## Topics
- [Overview](#overview)
- [MVP Features](#mvp-features)
- [Try the App Yourself](#try-the-app-yourself)
- [Planning to Get Shit Done](#planning)
- [Code Snippets](#code-snippets)
- [Tech Stacks for Get Shit Done](#tech-stacks)
<!-- - [Stretch Features](#stretch-features) -->

## Overview
Get Shit Done is a Project Planning App that allows a User to Create, Read, Update and Delete a Project, and then maintain full CRUD on  Tasks and Materials associated with the Project. 

Planning is hard. Maintaining details on several projects at once can easily lead to disorganization. GSD was designed to help organize details and maintain the scope of several projects at once, all in one place. Not only can Tasks be easily seen in the Project Details for initial planning and implementation, but also Materials are easliy assigned to Tasks, and also tallied up so the User can see the Estimated Cost of the Project.

## MVP Features 

<em>Projects:</em>
- Sign in via Google Authentication
- Add a new Project to see the project folder visible on the home page with all other open projects.
- Clicking the Project folder takes the User to the Project Details page which has the open Tasks and Materials associated with the Project. Also this page contains the Date Created, and Estimated Cost of the Project.
- The Actions dropdown has options for the User to Edit the Project Name, Delete the Project, Add a Task, or Add a Material.
- Deleting a Project also deletes all associated Tasks and Materials.
<img src="https://user-images.githubusercontent.com/107942776/223227346-583dd132-ffa5-40c7-8076-2e225b9100be.png" width="500"/>
<img src="https://user-images.githubusercontent.com/107942776/223227374-80f9f9b8-a9d6-4a50-9b90-cab5c87903d2.png" width="500"/>

<em>Tasks:</em>
- Task Cards on the Project Details page show the Status (not started, in progress, complete) an the Due Date.
- Clicking the dropdown has options for the User to view the Task Details page, Edit the Task, or Delete the Task.
- Clicking the Task Name also takes the User to the Task Details Page.
- The Task Details Page shows the associated Project, Date Created, Due Date, and the Task Details. 
- The dropdown has options for the User to Edit or Delete the Task.
<img src="https://user-images.githubusercontent.com/107942776/223227439-de198d43-2aa6-415a-a440-8a03bc217682.png" width="500"/>

<em>Materials:</em>
- Material Cards on the Project Details page show the Status (acquired, not acquired) and the associated Task.
- Clicking the dropdown has options for the User to view the Material Details page, Edit the Material, or Delete the Material.
- Clicking the Material Name also takes the User to the Material Details Page.
- The Material Details Page shows the Total Material Cost, associated Project and Task, Status, Price, and Quantity. 
- The dropdown has options for the User to Edit or Delete the Material.
<img src="https://user-images.githubusercontent.com/107942776/223227453-e2c94084-9572-49ae-b670-92d81d434963.png" width="500"/>

<em>Search:</em>
- The Search input in the Navigation Bar allows the User to search for Projects by Project Name, Task Name, or Material Name.
- Any Projects that meet the search criteria are shown in the Search Query page, and can be navigated to by clicking the Project Folder or Name.
<img src="https://user-images.githubusercontent.com/107942776/223229008-780d4ad4-7a31-4143-96cc-ef8166d4ea0c.png" width="500"/>


## Try the app yourself
Get Shit Done has been deployed on Netlify, and can be [viewed here](https://elfrey-get-shit-done.netlify.app/).

## Planning
#### ERD for GSD MVP
<img src="https://user-images.githubusercontent.com/107942776/223234713-6799c67a-a36b-4a39-826d-3f566e0c4473.png" width="500"/>

#### Screenshot of Wireframe with Next JS Routes
<img src="https://user-images.githubusercontent.com/107942776/223234725-01338efd-df14-4573-9305-c3920700d582.png" width="500"/>

[Link to ERD](https://dbdiagram.io/d/63e9238b296d97641d804e15)

[Link to Figma Wireframe](https://www.figma.com/file/BeHEcafD42hi4gObUrpJED/Get-Shit-Done?node-id=0%3A1&t=bTbT54EAw1skWNGO-0)

[Link to Github tickets for Get Shit Done - MVP](https://github.com/users/ericlfrey/projects/7/views/1)


## Code Snippets
#### Dynamic Search Page
<img src="https://user-images.githubusercontent.com/107942776/223238111-dc17142e-a621-4558-8833-34e8411a4f8e.png" width="600"/>

#### Merged Data API Calls
<img src="https://user-images.githubusercontent.com/107942776/223238146-6c5a3576-87b0-4e78-9df0-12331d4b57e6.png" width="600"/>

## Tech Stacks
<div align="center">  
<a href="https://reactjs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" height="50" /></a>  
<a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" alt="nextjs" width="40" height="40"/>
<a href="https://firebase.google.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/firebase.png" alt="Firebase" height="50" /></a> 
<a href="https://www.w3schools.com/css/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" /></a>  
<a href="https://en.wikipedia.org/wiki/HTML5" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" height="50" /></a>  
<a href="https://getbootstrap.com/docs/3.4/javascript/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/bootstrap-plain.svg" alt="Bootstrap" height="50" /></a>  
<a href="https://www.figma.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/figma-icon.svg" alt="Figma" height="50" /></a>  
</div>


## Contributors
- [Eric Frey](https://github.com/ericlfrey)
