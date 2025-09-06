# ExpensePilot, a pilot to your expenses

ExpensePilot is a full-stack application built with React (frontend) and Spring Boot (backend, using Maven) for managing and tracking expenses efficiently. This project demonstrates modern web development best practices, combining a responsive React user interface with a robust Spring Boot REST API backend.

## Features

- **User Authentication:** Secure login and registration functionality.
- **Expense Management:** Add, edit, delete, and view expenses.
- **Category Tracking:** Organize expenses under custom categories.
- **Dashboard:** Visualize spending trends with charts and summaries.
- **Responsive UI:** Works seamlessly on desktop and mobile devices.

## Technology Stack

### Frontend

- [React](https://reactjs.org/)
- CSS (custom styling)
- [Axios](https://axios-http.com/) (for API requests)

### Backend

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Maven](https://maven.apache.org/)
- Java
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [H2](https://www.h2database.com/) (default dev database, can swap for MySQL/PostgreSQL)

## Project Structure
ExpensePilot/ ├── backend/ # Spring Boot application (Java + Maven) │ ├── src/ │ └── pom.xml ├── frontend/ # React application │ ├── src/ │ └── package.json └── README.md

## Getting Started

### Prerequisites

- Node.js & npm
- Java (JDK 11+ recommended)
- Maven

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Build and run Spring Boot backend:
    ```bash
    mvn spring-boot:run
    ```
3. The API will be available at `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React application:
    ```bash
    npm start
    ```
4. The UI will be available at `http://localhost:3000`.

### Connecting Frontend and Backend

- The React frontend makes API calls to the Spring Boot backend (default: `http://localhost:8080`). Adjust CORS settings in the backend if necessary.

## Customization

- **Database:** Swap the H2 database for MySQL or PostgreSQL by updating `application.properties`.
- **Environment Variables:** Manage secrets and deployment-specific settings using environment files.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.

---

**Enjoy using ExpensePilot to simplify your expense tracking!**
