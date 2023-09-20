# Currency Converter Application

## Project Overview

This project is a set of applications utilizing Node.js, TypeScript, and React, developed by **Leonardo Delfino** (<leonardodelfino@gmail.com>). It interacts with the Currency Converter API to continuously fetch and display the currency conversion rates between USD and BRL for the last 24 hours. It is composed of multiple systems, including the front-end, back-end API, a cron job for data updates, and a MongoDB database.

## Prerequisites

- Node.js v16 or later
- Docker
- Docker Compose

## Architecture Overview
![Alt text](docs/architeture-diagram.jpeg)

### Architecture Diagram

Below is a high-level diagram representing the architecture of the Currency Converter Application:




- **currency-front**: This is the front-end of the application, developed in React. It communicates with the `currency-api` to retrieve and display currency conversion rates.

- **currency-api**: The back-end API built with Node.js and TypeScript. It serves as the intermediary between the front-end and the database. It also handles requests from the `currency-cron` for data updates.

- **mongodb**: The database where currency conversion data is stored.

- **currency-cron**: A Node.js application responsible for running scheduled jobs to fetch data from the Currency Converter API and save it to the database. It communicates with the `currency-api`.

## Environment Variables

The environment variables can be found and modified in the `.env` file. You can create this file based on the provided `.env.example` file.

## Building and Running the Application

To build and run the application in different modes, you can use the following commands:

```bash
# Run docker container in development mode
yarn docker:dev

# Run docker container in production mode
yarn docker:prod

# Run all tests in a docker container
yarn docker:test
```

## TODO:


## License

This project is licensed under the [MIT License](LICENSE).
