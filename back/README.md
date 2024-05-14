# Overview of Back End

The backend is written in Mongo DB / Express.js with a REST API.

## Deployment

Currently the deployment process is as follows:

- Changes are made on the development server
- The front end is built on the development serving by running npm run build:ui
- The updated files (including the dist directory) are then pushed to the main repository on Git
- Render is registered as a GitHub application in the main repository and is notified when there is a new commit
- The new commit triggers a build on Render is deployed by building the frontend on the development server, pushing the files to a git Repository, and serving the frontend as a static directory on Render

The static directory is currently being fetched from the Git respository -- would be better to have this be built on Render, but will require additional configuration on Render.
Exploring the possibility of using AWS with ECS to learn more about AWS and the industry standard for deployment of a scalable consumer-facing web application.
