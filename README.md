# NestJS Enterprise Course Projects 🚀

This repository contains all the code projects and hands-on exercises from [Stephen Grider](https://www.udemy.com/user/sgslo/)’s **Complete NestJS Course**. This course focuses on building scalable, production-ready backend applications using NestJS.

> 🔐 Authentication | 🧪 Automated Testing | 🏗️ Clean Architecture | 📦 TypeORM | 🚀 Deployment

---

## 📚 Course Highlights

- Build a **feature-complete app** and deploy it to production
- Implement full **Authentication** & **Authorization** systems from scratch
- Write both **Unit Tests** and **Integration Tests** with best practices
- Use **Guards**, **Interceptors**, **DTOs**, and **Decorators** effectively
- Master **TypeORM** relationships and advanced queries
- Apply clean architecture principles using **Dependency Injection**
- Validate and transform data using Pipes and DTOs
- Learn how NestJS works **under the hood**
- Structure your app for **scalability** and **maintainability**

---

## 🛠️ Technologies Used

- **NestJS** – Framework for building efficient Node.js apps
- **TypeScript** – Strongly-typed JavaScript
- **TypeORM** – ORM for PostgreSQL integration
- **PostgreSQL** – Relational database for production-grade persistence
- **Jest** – Testing framework for unit and integration tests
- **Docker** *(in advanced sections)* – For containerized deployment
- **Class Validator & Transformer** – For data validation and transformation

---

## 📁 Project Structure

Each folder corresponds to a different section or app built in the course:

```bash
nestjs-enterprise-course-projects/
│
├── first-project/ # Creating my first project
├── messages_App/ # Simple messages app (Create & Read)
├── Di_App/ # PowerSupply calls CPU & Disk, both call Power
├── Authentication/ # Authentication (using guards and sessions)

```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nestjs-enterprise-course-projects.git
cd nestjs-enterprise-course-projects

# Navigate into any project
cd auth-app

# Install dependencies
npm install

# Run the app (development)
npm run start:dev
🧪 Running Tests
bash
Copy
Edit
# Run unit and integration tests
npm run test
🚀 Deployment (Sample with Docker)
Detailed deployment steps are included in the /deployment/ folder.

bash
Copy
Edit
# Example: Docker build and run
docker build -t nestjs-app .
docker run -p 3000:3000 nestjs-app
🙋‍♂️ About the Course
This repository is based on Stephen Grider's NestJS course on Udemy. It covers everything from the fundamentals to advanced production-ready features. Highly recommended for backend developers looking to master NestJS and scalable API architecture.

📩 Questions or Feedback?
Feel free to open an issue or fork this repository if you find something useful or want to expand on it.

⭐️ Star this repo if you found it helpful!
yaml
Copy
Edit

---

Let me know if you also want to add a badge for license, build status, or course completion.

