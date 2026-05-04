# CIS2336 Spring 2026 Individual Project
**Author: Claire Johnson**

## Project Description
The project goal was to create a new website for the UH Sugar Land Student Center. The final project deliverables include the HTML for 10 different webpages with CSS styling and multiple interactive Javascript elements. Additionally, the project includes the backend code to run a Node.js server to handle all relevant form data.

## Project organization
All the html, javascript, and css files necessary for hosting the website frontend are located in [:file_folder: frontend](frontend/).

The javascript file containing the backend server is named ['app.js'](backend/app.js), and is located in [:file_folder: backend](backend/).

All the locally hosted media elements used by the website are located in [:file_folder: media](media/).

## Server requirements
The server backend is designed to be run using Node.js

- [Node.js installation instructions](https://nodejs.org/en/download)

**Required Node.js Dependencies:**
- Express
- Cors

## Quickstart
1. Download and install [Node.js](https://nodejs.org/en/download)
2. Download and install [git](https://git-scm.com/install/)
3. Clone the git repository to your local machine
```
git clone https://github.com/CIS-UH/semester-project-ClaireJohnsonUH
```
4. Enter the repository directory
```
cd ./semester-project-ClaireJohnsonUH
```
5. Download the required Node.js dependencies using npm
```
npm install express
npm install cors
```
6. Start the backend server
```
node ./backend/app.js
```
7. Use npx to host a basic local server
```
npx http-server -y
```
8. Visit http://127.0.0.1:8080/frontend/index.html in your webrowser