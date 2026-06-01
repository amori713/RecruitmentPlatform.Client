> IMPORTANT:
> Start the API project first in Visual Studio before running the React frontend.
> # Recruitment Platform

## Overview

Recruitment Platform is a full-stack web application built with React, ASP.NET Core Web API and SQL Server.

The application allows users to register, log in, browse job listings, create job advertisements and apply for jobs. All data is stored in a SQL Server database and accessed through a REST API.

This project was developed as a final examination project in the .NET System Development course.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected API Endpoints

### Jobs

- Create New Jobs
- View Available Jobs
- Search Jobs by Title or Location

### Applications

- Apply for Jobs
- View Submitted Applications
- Store Applications in SQL Server Database

### User Interface

- Responsive Design
- Bootstrap Styling
- Search Functionality
- Modern Card Layout

---

## Technologies Used

### Frontend

- React
- Axios
- Bootstrap
- JavaScript

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- JWT Authentication
- C#

### Database

- SQL Server
- Entity Framework Core Migrations

---

## Project Structure

### Backend

```text
RecruitmentPlatform.API
│
├── Controllers
├── Models
├── DTOs
├── Data
├── Migrations
├── Program.cs
└── appsettings.json
```

### Frontend

```text
RecruitmentPlatform.Client
│
├── public
├── src
│   ├── components
│   ├── App.js
│   └── App.css
│
├── package.json
└── package-lock.json
```

---

# How To Run The Project

## Backend

1. Clone the API repository.
2. Open the solution in Visual Studio 2022.
3. Open Package Manager Console.
4. Run:

```powershell
Update-Database
```

5. Press:

```text
F5
```

or

```text
Ctrl + F5
```

Swagger should open automatically.

The API will run on:

```text
https://localhost:7059
```

---

## Frontend

1. Clone the Client repository.
2. Open the project in Visual Studio Code.
3. Open a terminal in the client folder.

Install dependencies:

```powershell
npm install
```

Start React:

```powershell
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

## Database

The project uses SQL Server and Entity Framework Core.

Stored data includes:

- Users
- Jobs
- Job Applications

The database is automatically created through Entity Framework migrations.

---

## Future Improvements

Possible future improvements include:

- CV Upload Support
- Company Profiles
- Email Notifications
- Role-Based Authorization
- AI-Based Candidate Matching

---

## Author

**Omer Cheway**

Final Examination Project

.NET System Development

2026
