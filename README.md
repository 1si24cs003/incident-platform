🚨 Incident Reporting & Response Platform

A real-time incident reporting and management system that enables the public to report incidents 
without login, while authorities manage, verify, assign, and resolve incidents using role-based 
dashboards.

🔴 Built for Development Hackathon
🌍 Live, scalable, and production-deployed

--------------------------------------
🌐 Live Links

  Frontend (Public Website):
  https://incident-platform.netlify.app 
  Backend API:
  https://incident-backend-57n2.onrender.com 
  GitHub Repository:
  https://github.com/1si24cs003/incident-platform

----------------------------------------------------
🧩 Problem Statement

Emergency incidents are often:
  Reported late  
  Poorly verified  
  Disconnected from responders  
  Not visible in real time
This leads to slow response, miscommunication, and lack of transparency.

---------------------------------------------------------
✅ Solution Overview
Our platform provides:
  📢 Public incident reporting (no login required)  
  🧑‍💼 Admin verification & control  
  🧑‍✈️ Agent coordination  
  🚑 Responder assignment  
  🗺️ Live incident map  
  🔐 Login-protected dashboards  
  ⚡ Real-time updates using WebSockets

------------------------------------------------
🛠️ Tech Stack

Frontend
  HTML5  
  CSS3 (Responsive + Dark Mode)  
  JavaScript  
  Leaflet.js (Maps)  
  Socket.IO (Realtime)

Backend
  Node.js  
  Express.js  
  MongoDB Atlas  
  Socket.IO

Deployment
  Frontend: Netlify  
  Backend: Render  
  Database: MongoDB Atlas

-----------------------------------------
👥 User Roles & Permissions

1️⃣ Public User (No Login)
  Report incidents  
  View live incidents  
  See verified status  
  View incident map

2️⃣ Admin
  Login required  
  Verify incidents  
  Assign agents  
  View all incidents  
  Monitor system

3️⃣ Agent
  Login required  
  View assigned incidents  
  Assign responders  
  Mark incidents as completed  
  Delete incidents after resolution

4️⃣ Responder
  Login required  
  View assigned incidents  
  Take action on incidents

-------------------------------------
🔐 Login System
  Role-based authentication  
  Unauthorized users cannot access protected pages  
  Incorrect credentials show error messages  
  Session-based login using browser storage

------------------------------------------------
🔄 Complete Workflow (End-to-End)

1.Public User
  Reports an incident (type, description, location)
2.Admin
  Verifies the incident
  Assigns an agent
3.Agent
  Assigns a responder
  Monitors progress
4.Responder
  Handles the incident
5.Agent
  Marks incident as completed
  Deletes incident from system
6.System
  Updates all users in real time
  Map updates automatically

-------------------------------------------------
🧪 Demo Steps (IMPORTANT FOR JUDGES)
🔹 Step 1: Public Reporting  
    Open main site  
    Submit an incident
    Show it appears instantly in the list and map

🔹 Step 2: Admin Verification
    Login as Admin  
    Verify the incident  
    Assign an agent

🔹 Step 3: Agent Assignment
    Login as Agent  
    Assign a responder  
    Show incident status update

🔹 Step 4: Responder View
    Login as Responder  
    Show assigned incident

🔹 Step 5: Completion
    Agent deletes the resolved incident  
    Show real-time removal from public site

--------------------------------------------------
📊 Key Features
  ✔ Real-time updates (Socket.IO)  
  ✔ Live map visualization  
  ✔ Verified / Unverified badge  
  ✔ Role-based access control  
  ✔ Mobile responsive UI  
  ✔ Dark mode toggle  
  ✔ Secure login & logout  
  ✔ Scalable backend

----------------------------------------------------
🚀 Scalability & Future Enhancements  
  AI-based severity detection  
  Image & video uploads  
  GPS auto-location  
  SMS / Email alerts  
  Mobile application  
  Government emergency API integration

-----------------------------------------------------------
📦 Local Setup (Optional)
  git clone https://github.com/1si24cs003/incident-platform
  cd incident-platform

Backend
  cd backend
  npm install
  node server.js

Frontend
Open index.html using Live Server or deploy to Netlify.

-------------------------------------------------
🏁 Hackathon Submission Checklist
  ✔ Source code uploaded to GitHub  
  ✔ Live deployment completed  
  ✔ PPT prepared  
  ✔ README documented  
  ✔ Demo workflow tested

----------------------------------------------------
👨‍💻 Author

Abdullah Saad Sharief
Development Hackathon Participant
From SIT,Tumkur
---------------------------------------------------------------
⭐ Final Note

This project demonstrates:
  Real-world relevance  
  Clean architecture  
  Full-stack skills  
  Live deployment  
  Professional workflow
--------------------------------------------------------------
🚀 Ready for judging.
