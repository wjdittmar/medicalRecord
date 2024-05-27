# Back End Overview

The backend of this application is built using MongoDB and Express.js, providing a REST API for the frontend to interact with.

## Technology Stack

- MongoDB: A NoSQL database used for storing and retrieving data.
- Express.js: A web application framework for Node.js used to build the backend API.
- JWT (JSON Web Tokens): Used for authentication and authorization of user requests.
- Axios: A promise-based HTTP client used for making API requests from the frontend.

## Architecture

The backend follows a modular architecture, separating concerns into different services and modules:

- `EpicServices`: Handles communication with the EPIC FHIR API.
- `LoggerService`: Provides a centralized logging mechanism for the application, ensuring HIPAA compliance by securely logging relevant information without including sensitive patient data.

## Deployment

The current deployment process involves the following steps:

1. Changes are made on the development server.
2. The frontend is built on the development server by running `npm run build:ui`.
3. The updated files, including the `dist` directory, are pushed to the main repository on GitHub.
4. Render, a cloud platform for hosting web applications, is registered as a GitHub application in the main repository and is notified when a new commit is made.
5. The new commit triggers a build on Render, which deploys the application by building the frontend on the development server, pushing the files to a Git repository, and serving the frontend as a static directory on Render.

Currently, the static directory is fetched from the Git repository. However, it would be more optimal to have the frontend built directly on Render, which would require additional configuration on the Render platform.

## Future Improvements

- Explore the possibility of using AWS with ECS (Elastic Container Service) to gain more experience with AWS and learn about industry standards for deploying scalable consumer-facing web applications.
- Implement a more efficient deployment process by building the frontend directly on the deployment platform (e.g., Render or AWS) instead of relying on the development server.
- Implement additional security measures such as rate limiting, input validation, and protection against common web vulnerabilities (e.g., XSS, CSRF).
- Optimize the database queries and consider implementing caching mechanisms to improve performance and scalability.

## Contributing

If you wish to contribute to the backend development, please follow these steps:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make the necessary changes and ensure that the code follows the project's coding standards and best practices.
3. Write appropriate tests to cover the changes made.
4. Submit a pull request, describing the changes made and the purpose of the contribution.
5. The pull request will be reviewed by the maintainers, and any necessary feedback or changes will be communicated.

Please ensure that your contributions align with the project's goals and maintain the overall code quality and HIPAA compliance.
