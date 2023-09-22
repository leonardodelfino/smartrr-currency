# Currency API

## Getting Started

### Prerequisites

Before running the Currency API, ensure you have the following prerequisites installed:

- **Node.js**: Version 18.x.x or lower
- **npm** (Node Package Manager)
- **Docker**
- **Docker Compose**

### Installation

Install dependencies:
  ```bash
  npm install
  ```

### Set the Environment Variables
Create a .env file in the project root and add the necessary variables by copying from the example:

  ```bash
  cp .env.example .env
  ```

### Run application and tests
You can run the API in a Docker container. Choose one of the following commands:

Run application  container in development mode:

```bash
npm run docker:dev
``````

Run application tests:

```bash
npm run docker:test
```

### Accessing Swagger Documentation

You can access the Swagger documentation for this API by visiting the following URL in your web browser:
[Swagger Documentation](http://localhost:3002/v1/docs/)


### TODO

- [ ] Review the currently included modules and remove any that are not essential for the project to reduce complexity.
- [ ] Investigate and resolve issues related to Swagger schema references to ensure accurate and consistent API documentation.

#### License
This project is licensed under the MIT License.
