# ContentAura

ContentAura is a powerful and flexible content management system designed to help developers and businesses manage structured data efficiently. With ContentAura, you can create dynamic schemas, manage content, and generate APIs for seamless data access.

## Key Features
- **Dynamic Schema Management:** Define custom schemas with various field types for versatile data handling.
- **Project Management:** Organize your data into multiple projects with dedicated schemas.
- **API Generation:** Instantly generate dynamic API endpoints for content retrieval.
- **Analytics Dashboard:** Visualize content usage, API requests, and user activity through interactive charts.
- **Project Hierarchy Visualization:** Visualize your project's structure with nodes representing Projects, Schemas, and Fields using React Flow.
- **Secure Access:** API keys are used for secure content access, enhancing data protection.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Axios, React Flow
- **Backend:** Spring Boot (Vecna for CMS, Will for API fetching)
- **Database:** PostgreSQL with JSONB for flexible data storage
- **Analytics:** Spring Boot Interceptors with PostgreSQL for tracking data changes

## Installation Guide
### Prerequisites
- Node.js & npm
- Java (for Spring Boot)
- PostgreSQL database setup

### Steps to Install
1. **Clone the Repository**
   ```bash
   git clone https://github.com/diyaprajapati/ContentAura.git
   cd ContentAura
   ```
2. **Backend Setup**
   - Navigate to `cms-backend` folder.
   - Run the following commands in Intellij Idea:
     ```bash
     ./mvnw spring-boot:run
     ```
3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. **Database Setup**
   - Create a PostgreSQL database named `contentaura`.
   - Update database credentials in `application.properties`.

## Usage Guide
1. **Create a Project:**
   - Navigate to the **Projects** tab and click **Add Project**.
2. **Add Schemas:**
   - Within the project, go to **Schemas** and define fields like `string`, `number`, `boolean`, etc.
3. **Insert Data:**
   - Add content entries directly or via the generated API.
4. **Access Content via API:**
   - Copy the API endpoint from the **API** tab.
   - Example API request:
     ```bash
     GET http://localhost:8080/api/{userId}/{projectId}/{schemaId}/data
     ```

## API Documentation
### Sample Endpoints
- **Create a Project:** `POST /api/projects`
- **Add Schema Fields:** `POST /api/schema/{projectId}`
- **Insert Content:** `POST /api/{userId}/{projectId}/{schemaId}`
- **Fetch Content:** `GET /api/{userId}/{projectId}/{schemaId}`

## Project Hierarchy Visualization
- Select a project from the dropdown in the **Hierarchy** tab to visualize your structure.
- Nodes represent **Projects**, **Schemas**, and **Fields**, making data organization intuitive.

## Analytics Dashboard
- Track total projects, schemas, API requests, and user interactions.
- Visualized via **ShadCN's Bar Chart** with real-time data updates.

## Testing Instructions
- **Unit Tests:** Run JUnit tests for repository and service layers in Spring Boot.
- **Frontend Tests:** Cypress is used for testing React components and flows.

## Future Plans
- Introduce role-based access control for enhanced security.
- Implement caching strategies for improved performance.
- Enhance the analytics dashboard with detailed insights.

## Contact Information
For questions, support, or collaboration:
- **Email:** diyabprajapati2005@gmail.com
- **LinkedIn:** [Diya Prajapati](www.linkedin.com/in/diya-prajapati-453858267)

---
Made with ❤️ by **Diya Prajapati**

