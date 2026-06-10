# 🏏 Cricket Analytics and Match Management System with ML-Based Player Performance Prediction

## 📖 Overview

The Cricket Analytics and Match Management System is a full-stack MERN application designed to simplify cricket tournament management while leveraging Machine Learning to provide intelligent player performance predictions.

The platform enables users to manage teams, players, matches, and statistics through a centralized dashboard. By analyzing historical player data and match records, the system predicts future player performance, helping coaches, captains, and cricket enthusiasts make data-driven decisions.

This project combines modern web development technologies with predictive analytics to create a comprehensive cricket management solution.

---

## 🚀 Features

### 👤 User Management

* Secure user registration and login
* Authentication and authorization
* Role-based access control

### 🏏 Player Management

* Add, edit, and delete players
* Maintain player profiles
* Track batting and bowling statistics
* Store historical performance records

### 👥 Team Management

* Create and manage teams
* Assign players to teams
* View team statistics
* Track team performance

### 📅 Match Management

* Schedule upcoming matches
* Record match details and results
* Update scorecards
* Maintain match history

### 📊 Analytics Dashboard

* Player performance analytics
* Team performance comparison
* Statistical reports
* Interactive data visualizations

### 🤖 ML-Based Performance Prediction

* Predict future player performance
* Analyze player consistency
* Estimate expected runs and wickets
* Generate performance scores

### 📈 Data Visualization

* Performance trends
* Statistical charts and graphs
* Comparative analysis dashboards
* Match and player insights

---

## 🤖 Machine Learning Model

The prediction engine utilizes a Random Forest Regression model trained on historical cricket performance data.

### Model Details

- Algorithm: Random Forest Regressor
- Number of Trees: 100
- Maximum Tree Depth: 10
- Framework: Scikit-Learn
- Model Storage: Pickle (.pkl)

### Input Features

- Average Runs (Last 5 Matches)
- Performance Trend
- Consistency Score
- Maximum Score
- Historical Performance Metrics

### Output

- Predicted Runs for Upcoming Match

The trained model is integrated with a Flask API, enabling real-time player performance prediction within the Cricket Analytics and Match Management System.

### Input Features

* Matches Played
* Runs Scored
* Batting Average
* Strike Rate
* Wickets Taken
* Economy Rate
* Recent Match Form
* Historical Performance Trends

### Prediction Outputs

* Expected Runs
* Expected Wickets
* Performance Rating
* Consistency Score
* Future Performance Estimate

### ML Workflow

1. Data Collection
2. Data Cleaning
3. Feature Engineering
4. Model Training
5. Model Evaluation
6. Prediction Generation
7. Result Visualization

---

## 🏗️ System Architecture

```text
React.js Frontend
        │
        ▼
Express.js REST APIs
        │
        ▼
Node.js Backend
        │
        ▼
MongoDB Database
        │
        ▼
Machine Learning Prediction Engine
```

---

## 💻 Technology Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript
* Bootstrap / Material UI

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Machine Learning

* Python
* Scikit-Learn
* Pandas
* NumPy
* Matplotlib

### Development Tools

* Git
* GitHub
* Postman
* VS Code

---

## 📂 Project Modules

### Authentication Module

* User Registration
* User Login
* Authorization

### Player Module

* Player CRUD Operations
* Statistics Management
* Performance Tracking

### Team Module

* Team Creation
* Squad Management
* Team Statistics

### Match Module

* Match Scheduling
* Match Results
* Score Tracking

### Analytics Module

* Statistical Analysis
* Performance Reports
* Dashboard Insights

### Prediction Module

* ML Model Integration
* Performance Prediction
* Trend Analysis

---

## 📊 Use Cases

### Team Selection

Coaches can use player statistics and prediction results to select the most suitable playing XI.

### Performance Evaluation

Management can evaluate player consistency and identify high-performing individuals.

### Tournament Management

Administrators can efficiently organize teams, players, and matches from a single platform.

### Strategic Planning

Captains and coaches can make informed decisions using analytical insights and performance forecasts.

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/parththakkar06/cricket-analytics-system.git
cd cricket-analytics-system
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Start Backend Server

```bash
npm run server
```

### Start Frontend Application

```bash
npm start
```

---

## 📈 Future Enhancements

* Real-Time Match Scoring
* Live Cricket API Integration
* Match Outcome Prediction
* Fantasy Team Recommendation
* Mobile Application Support
* Advanced Analytics Dashboard
* Cloud Deployment
* AI-Powered Team Selection

---

## 🎓 Academic Learning Outcomes

This project demonstrates practical implementation of:

* Full-Stack MERN Development
* Database Design and Management
* REST API Development
* Machine Learning Integration
* Data Analytics
* Software Engineering Principles
* System Design and Architecture

---

## 👨‍💻 Authors

Final Year Computer Engineering Project

**Cricket Analytics and Match Management System with ML-Based Player Performance Prediction**

Developed as a comprehensive sports analytics platform that combines cricket management functionalities with Machine Learning-based performance forecasting and data-driven insights.
