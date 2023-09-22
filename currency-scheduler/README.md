# Currency Scheduler

## Getting Started

### Prerequisites

Before running the Currency Scheduler, ensure you have the following prerequisites installed:

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
You can run the Scheduler in a Docker container. Choose one of the following commands:

Run application container in development mode:

```bash
npm run docker:dev
```

Run application tests:

```bash
npm run docker:test
```

  ### TODO

- [ ] Implement token caching for the Currency API to avoid generating a new token for each request.
- [ ] Review the currently included modules and remove any that are not essential for the project to reduce complexity.


#### License
This project is licensed under the MIT License.
