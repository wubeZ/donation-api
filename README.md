# Donation Management API

The Donation Management API is a backend application that allows you to manage and track donations made to your organization. It provides functionality to store donation details in a Google Sheet and send confirmation emails to donors using Nodemailer.

## Prerequisites

Before running the API, ensure you have the following dependencies installed:

- Node.js
- Google Sheets API credentials (client email and private key)
- Nodemailer configured with an email service provider (e.g., Gmail)

## Installation

1. Clone this repository: `git clone <repository_url>`
2. Install dependencies: `npm install`
3. Configure environment variables by creating a `.env` file and adding necessary values (see `.env.example` for reference).
4. Start the server: `npm start`

## Features

- Create a new donation and store the details in a Google Sheet.
- Send confirmation emails to donors using Nodemailer.

## Contributing

We welcome contributions to the Donation Management API! To contribute, please follow these steps:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes in the branch, following the coding guidelines and best practices.
3. Write tests to ensure your code is functioning correctly.
4. Commit your changes and push them to your forked repository.
5. Submit a pull request to the main repository, providing a clear description of the changes you made.

Please ensure that your code adheres to the existing coding style and conventions used in the project. Additionally, include any relevant documentation or updates to the README as part of your pull request.

## License

This project is licensed under the [MIT License](LICENSE).

