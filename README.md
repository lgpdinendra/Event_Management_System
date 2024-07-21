
# Event Management Application

This is an event management application that allows users to create a event, that event edit delete and view and register, log in, and mark attendance for events. The application is built with a Spring Boot backend , React frontend and MYSQL database.



## Table of Content
1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
## Overview
The Event Management Application is designed to create Event, Edit Event, Delete Event and facilitate event attendance management. Users can register for an account, log in, and mark their attendance for various events. The application consists of a backend service built with Spring Boot and a frontend application developed using React, Mysql database used.


## Features
- Event Create
- Event View
- Event Edit
- Event Delete 
- User Registration
- User Login
- Event Attendance Marking
## Prerequisites
Before you begin, ensure you have met the following requirements:

- Java 11 or higher
- Node.js and npm 
- MySQL database
- Postman (for API testing)
## Installation
Follow these steps to set up the project locally:

### Backend (Spring Boot)

1. Clone the repository:
   
   git clone https://github.com/your-usernameevent-management-app. git
   cd event-management-app

2. Update the application.properties file with your database configuration:
    spring.datasource.url=jdbc:mysql://localhost:3306/event_management
    spring.datasource.username=your-username
    spring.datasource.password=your-password
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true

3. Build and run the backend application:

### Frontend (React)

1. Clone the repository:
   
   git clone https://github.com/your-username/event-management-app.git
   cd event-management-app

2. Install the dependencies:
    npm install
3. Start the React development server:
    npm start

## Running the Application

To run the entire application:

1. Ensure the backend server is running.
2. Ensure the frontend server is running.
3. Open your browser and navigate to http://localhost:3000
## Usage

### Home Screen

    1. The home screen contains a button labeled "Create Event", "View Event", "Add Attendee".
    2. Clicking this button will navigate you to the Create Event, View Event, login/register page.

### Create Event,View Event
    1. The Create Event Used a Create a Event
    2. View Event Used a all Event display in page. It can Edit and Delete.

### Event Attendance
    1. After registering in successfully, you will be redirected to the event attendance page.
    2. You can mark your attendance for available events on this page.
## API Reference

#### Create a Event

```http
  POST /api/v1/event/add
```

#### Get all Event

```http
  GET /api/v1/event/get
```

#### Update a Event

```http
  PUT /api/v1/event/update/{eventid}
```
#### Update a Event

```http
  DELETE /api/v1/event/{eventid}
```

#### Add Attendee

```http
  POST /api/v1/attendee/add
```

#### login

```http
  POST /api/v1/attendee/login
```

### Get Attendee

```http
  GET /api/v1/attendee/recent
```



