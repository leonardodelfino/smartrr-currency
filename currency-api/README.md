# Currency API

## Getting Started

### Prerequisites

Before running the Currency API, ensure you have the following prerequisites installed:

- **Node.js**: Version 18.x.x or lower
- **npm** (Node Package Manager)
- **Docker**
- **Docker Compose**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/currency-api.git
   cd currency-api
   ```

2. Install dependencies:
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


#### License
This project is licensed under the MIT License.
