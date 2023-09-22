# Currency Front

## Getting Started

### Prerequisites

Before running the Currency Frontend, ensure you have the following prerequisites installed:

- Node.js
- npm (Node Package Manager)

### Installation

Install dependencies:

```bash
npm install
```

Create an environment file:
```bash
cp ./src/config/env.example.ts ./src/config/env.ts
```

###Running the Application
Start the application:
```bash
npm start
```

That's it! You can now access the Currency Frontend in your web browser.

### TODO

- [ ] Review the currently included modules and remove any that are not essential for the project to reduce complexity.
- [ ] Resolve issues that are preventing the successful utilization of Axios request mocking in test scenarios.
- [ ] Implement an authentication mechanism to securely save and manage tokens, preventing the need to generate a new one for each request.
- [ ] Develop a token refresh method to maintain user sessions and ensure seamless access to protected resources.
- [ ] Find and implement a more robust and efficient method for managing environment variables to enhance security and configuration management.

###License
This project is licensed under the MIT License.
