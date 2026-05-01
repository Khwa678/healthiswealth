# 🚀 CuraLink — AI Medical Research Assistant

## 🌟 Overview

CuraLink is a full-stack AI-powered medical research assistant designed to help users explore reliable, evidence-based information on diseases, treatments, and clinical trials. It bridges the gap between complex medical research and user-friendly insights by combining real-time data retrieval with modern AI models.

The platform allows users to input a medical condition and ask questions in natural language. It then gathers relevant data from trusted sources like PubMed and ClinicalTrials.gov, processes it, and presents clear, structured responses.

---

## 🌐 Live Demo

🔗 Frontend: https://healthiswealth-7.onrender.com
🔗 Backend API: https://healthiswealth-6.onrender.com/api/health

---

## 🎯 Problem Statement

Accessing reliable medical information is often difficult for general users. Most research papers are highly technical, scattered across multiple platforms, and not easily understandable.

CuraLink aims to:

* Simplify access to medical research
* Provide summarized, AI-generated insights
* Help users explore treatments and clinical trials efficiently

---

## 💡 Key Features

* 🤖 AI-powered conversational interface
* 📄 Retrieval of peer-reviewed publications
* 🧪 Clinical trials discovery
* 🧠 Context-aware responses
* ⚡ Real-time API integration
* 🎨 Clean and responsive UI
* 🔄 Session-based chat system

---

## 🏗️ System Architecture

Frontend (React) → Backend (Node.js) → External APIs + AI Models → MongoDB

1. User sends a query through the frontend
2. Backend processes request and fetches:

   * Publications (PubMed)
   * Clinical trials data
3. Data is ranked and filtered
4. AI model generates structured insights
5. Response is sent back to frontend

---

## ⚙️ Tech Stack

### Frontend

* React (Vite)
* Axios
* CSS

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB Atlas

### AI & APIs

* Hugging Face / Ollama (LLM)
* PubMed API
* ClinicalTrials.gov API

### Deployment

* Render (Frontend & Backend)

---

## 📁 Project Structure

```
healthiswealth/
├── backend/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── server.js
│   └── .env (ignored)
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── App.jsx
│   └── .env
```

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Khwa678/healthiswealth.git
cd healthiswealth
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection
LLM_PROVIDER=huggingface
HF_TOKEN=your_token
HF_MODEL=mistralai/Mistral-7B-Instruct-v0.2
CLIENT_URL=http://localhost:5173
PORT=5000
```

Run backend:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## 🚀 Deployment

The application is deployed using Render:

* Backend deployed as a Web Service
* Frontend deployed as a Static Site

Ensure environment variables are configured in Render dashboard instead of pushing `.env` files.

---

## ⚠️ Challenges Faced

During development, several real-world challenges were encountered:

* Handling CORS issues between frontend and backend
* Debugging “Network Error” during deployment
* Managing environment variables securely
* GitHub push protection blocking secrets
* LLM response delays and timeouts
* Deployment configuration issues (ports, build paths)

Each of these challenges improved understanding of real-world system behavior and debugging techniques.

---

## 🧠 Key Learnings

* Importance of environment variable management
* Differences between local and production environments
* API integration and error handling
* Full-stack deployment workflows
* AI integration in web applications
* Debugging distributed systems

---

## 🔐 Security Practices

* `.env` files are excluded from version control
* Secrets are stored in environment variables (Render)
* API tokens are never exposed publicly

---

## 🌱 Future Improvements

* User authentication system
* Chat history storage
* Improved UI/UX design
* Faster AI response optimization
* Advanced filtering for research results
* Scalable microservices architecture

---

## 🤝 Contribution

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

## 📌 Conclusion

CuraLink represents a step toward making medical research more accessible and understandable. It combines AI with real-world data sources to deliver meaningful insights through a simple interface.

This project reflects continuous learning, problem-solving, and practical implementation of full-stack and AI technologies.

---

## 📬 Contact

If you’d like to connect or collaborate, feel free to reach out!

---

⭐ If you found this project helpful, consider giving it a star!
