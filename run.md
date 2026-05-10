# WAD Complete Project Run Guide

This file contains all commands needed to run all projects in the WAD (Web Application Development) assignment.

## Prerequisites
- Node.js installed (version 16 or higher)
- npm (Node Package Manager) installed
- Basic understanding of command line

---

# EXP1 - Dashboard and Registration Projects

## Project Structure:
```
exp1/
├── A-dashboard/     # Dashboard project
└── B-registration/   # Registration project
```

### Run Dashboard Project (exp1/A-dashboard)
```bash
# Navigate to dashboard project
cd e:/College/Veda/wad-veda/exp1/A-dashboard

# If package.json exists, install dependencies
npm install

# Start the dashboard application
npm start
```
**Explanation:** Runs the dashboard application. If it's a static HTML project, open the HTML file directly in browser.

### Run Registration Project (exp1/B-registration)
```bash
# Navigate to registration project
cd e:/College/Veda/wad-veda/exp1/B-registration

# Install dependencies if package.json exists
npm install

# Start the registration application
npm start
```
**Explanation:** Runs the user registration application. Check for package.json to determine if it's Node.js or static HTML.

---

# EXP2 - GitHub, Docker, and Angular Projects

## Project Structure:
```
exp2/
├── A-github/         # GitHub integration project
├── B-docker/         # Docker containerization project
└── C-angular-minimal/ # Angular authentication app
```

### Run GitHub Project (exp2/A-github)
```bash
# Navigate to GitHub project
cd e:/College/Veda/wad-veda/exp2/A-github

# Check if it's a script or static files
# If there's a script file:
node script.js

# If it's HTML files:
# Open index.html in browser
start index.html
```
**Explanation:** Runs GitHub integration project. Check project files to determine execution method.

### Run Docker Project (exp2/B-docker)
```bash
# Navigate to Docker project
cd e:/College/Veda/wad-veda/exp2/B-docker

# Build Docker image
docker build -t wad-docker .

# Run Docker container
docker run -p 3000:3000 wad-docker
```
**Explanation:** Builds and runs Docker containerized application. Ensure Docker is installed and running.

### Run Angular Authentication App (exp2/C-angular-minimal)
```bash
# Navigate to Angular project
cd e:/College/Veda/wad-veda/exp2/C-angular-minimal

# Install Angular dependencies
npm install

# Start Angular development server
npm start

# Alternative: Use Angular CLI directly
ng serve

# If port 4200 is busy, use different port
ng serve --port 4300
```
**Explanation:** Starts the Angular authentication application with hot reload. Access at http://localhost:4200

---

# EXP3 - Static Node.js Project

## Project Structure:
```
exp3/
└── A-static-node/   # Static file serving with Node.js
```

### Run Static Node Project (exp3/A-static-node)
```bash
# Navigate to static Node project
cd e:/College/Veda/wad-veda/exp3/A-static-node

# Install dependencies
npm install

# Start static file server
npm start

# Alternative: Start with specific port
node server.js

# If using express-static:
npx serve .
```
**Explanation:** Runs Node.js static file server. Check package.json for the correct start command.

---

# EXP4 - jQuery Mobile Project

## Project Structure:
```
exp4/
└── A-jquery-mobile/  # jQuery mobile application
```

### Run jQuery Mobile Project (exp4/A-jquery-mobile)
```bash
# Navigate to jQuery mobile project
cd e:/College/Veda/wad-veda/exp4/A-jquery-mobile

# If it's static HTML/CSS/JS files:
# Open index.html in browser
start index.html

# If using a simple server:
python -m http.server 8000

# Or using Node.js:
npx serve .
```
**Explanation:** Runs jQuery mobile application. Most likely a static project that opens directly in browser.

---

# Quick Start Commands Summary

## Run All Projects Sequentially

### 1. Angular App (Primary Project)
```bash
# Angular Authentication Application
cd e:/College/Veda/wad-veda/exp2/C-angular-minimal
npm install
npm start
```

### 2. Static Node.js Server
```bash
# Node.js Static Server
cd e:/College/Veda/wad-veda/exp3/A-static-node
npm install
npm start
```

### 3. jQuery Mobile App
```bash
# jQuery Mobile Application
cd e:/College/Veda/wad-veda/exp4/A-jquery-mobile
start index.html
```

### 4. Dashboard Project
```bash
# Dashboard Application
cd e:/College/Veda/wad-veda/exp1/A-dashboard
npm install
npm start
```

### 5. Registration Project
```bash
# Registration Application
cd e:/College/Veda/wad-veda/exp1/B-registration
npm install
npm start
```

---

# Development Workflow Commands

## Check Project Status
```bash
# Check all project directories
ls -la e:/College/Veda/wad-veda/exp*

# Check running Node processes
tasklist | findstr node

# Check running Docker containers
docker ps
```

## Stop All Services
```bash
# Stop all Node.js processes
taskkill /F /IM node.exe

# Stop all Docker containers
docker stop $(docker ps -q)

# Remove all Docker containers
docker rm $(docker ps -aq)
```

## Clean All Projects
```bash
# Clean all node_modules (run from wad-veda root)
find . -name "node_modules" -type d -exec rm -rf {} +

# Clean all build artifacts
find . -name "dist" -type d -exec rm -rf {} +
find . -name "build" -type d -exec rm -rf {} +
```

---

# Port Management

### Default Ports Used:
- Angular App: 4200
- Node.js Server: 3000 or 8000
- Docker Container: 3000
- Static Servers: 8000 or 8080

### Check Port Availability
```bash
# Check if port is in use (Windows)
netstat -an | findstr :4200

# Kill process on specific port
taskkill /PID <PID> /F
```

---

# Troubleshooting Common Issues

## Node.js Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete and reinstall node_modules
rm -rf node_modules package-lock.json
npm install

# Update npm
npm install -g npm@latest
```

## Angular Issues
```bash
# Update Angular CLI
npm install -g @angular/cli@latest

# Check Angular version
ng version

# Create new Angular project (if needed)
ng new project-name
```

## Docker Issues
```bash
# Check Docker installation
docker --version

# Restart Docker service
# On Windows: Restart Docker Desktop

# Clean Docker system
docker system prune -a
```

---

# Project-Specific Notes

## Angular Authentication App Features:
- User Login and Registration
- Route Protection with Guards
- Local Storage Session Management
- Responsive Design

## Expected URLs:
- Angular App: http://localhost:4200
- Login: http://localhost:4200/login
- Register: http://localhost:4200/register
- Profile: http://localhost:4200/profile

## File Types by Project:
- **exp1**: Likely HTML/CSS/JS or simple Node.js
- **exp2**: Angular (TypeScript/JS), Docker, Git
- **exp3**: Node.js with static file serving
- **exp4**: jQuery Mobile (HTML/CSS/JS)

---

# Development Tips

## Multiple Terminals
Open separate terminal windows for each project when running multiple services simultaneously.

## Browser Testing
Use different browsers or incognito mode to test authentication without cache conflicts.

## Environment Variables
Set up environment variables for different environments (development/production).

---

# Quick Reference

| Project | Command | Port | Technology |
|---------|---------|--------|-------------|
| Angular App | `npm start` | 4200 | Angular/TypeScript |
| Node Server | `npm start` | 3000 | Node.js/Express |
| Docker | `docker run` | 3000 | Docker/Container |
| Static Files | `start index.html` | N/A | HTML/CSS/JS |

Use this guide to run any project in the WAD assignment folder structure.
