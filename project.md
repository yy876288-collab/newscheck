Project Title
AI-Based Scam Message & Fake News Detector using Gemini API
1. Overview
The project aims to develop a web-based application that detects scam messages and fake news using Artificial Intelligence.
Users can paste any message, news, or text, and the system will analyze it using the Gemini API and provide a response indicating whether the content is likely to be real or fake.
This system helps prevent financial fraud, misinformation, and cyber scams, which are increasing rapidly in today’s digital world.
2. Problem Statement
People frequently receive fake messages, phishing links, and misleading news through social media, SMS, and emails.
Many users cannot identify whether the information is real or fake, which leads to financial loss, panic, and misinformation spread.
There is a need for a simple tool that can quickly analyze text and warn users before they trust or share it.
3. Objective
To build a simple web application that detects scam or fake messages
To use Gemini API for intelligent text analysis
To provide instant feedback to users
To create a fast prototype without database
To build using frontend + backend only
4. Scope of the Project
The system will:
Accept text input from user
Send the text to Gemini API
Analyze the content
Show result as:
Scam / Fake / Suspicious / Safe
Explanation
The system will not:
Store data
Use database
Require login
This makes it fast, lightweight, and suitable for hackathon.
5. Target Users
Students
General public
Social media users
Elderly people
Online shoppers
Anyone who receives unknown messages
6. Technology Stack
Frontend:
HTML
CSS
JavaScript
Backend:
Python Flask
API:
Gemini API
Other Tools:
VS Code
Browser
Postman (optional)
7. System Architecture
User → Web Page → Flask Server → Gemini API → Flask → Web Page → Result
Steps:
User enters message
Frontend sends to Flask
Flask calls Gemini API
Gemini returns analysis
Flask sends result to frontend
Result shown to user
8. Features
8.1 Text Input
User can paste any message.
8.2 AI Analysis
Gemini checks text for scam / fake patterns.
8.3 Result Display
Shows:
Safe
Scam
Fake
Suspicious
8.4 Explanation
System explains why it is fake or safe.
8.5 Simple UI
Clean interface for fast usage.
9. Functional Requirements
User should enter text
System should send text to backend
Backend should call Gemini API
API response should be shown
Result should appear without reload (optional)
10. Non-Functional Requirements
Fast response
Simple UI
No database
Lightweight
Easy to use
Works on browser
11. Constraints
Time limit: Hackathon (few hours)
No database allowed
Only frontend + backend
Must use Gemini API
12. Future Enhancements
File upload
URL checking
WhatsApp message checker
Voice input
Mobile app
Database history
Multi-language support
13. Expected Outcome
The system will successfully detect fake or scam messages using AI and help users avoid fraud and misinformation.
This project demonstrates:
AI integration
Cybersecurity awareness
Real-world impact
Practical implementation
14. Conclusion
This project provides a simple yet powerful solution to detect scam messages and fake news using Gemini API.
It is lightweight, fast to build, and highly useful in real-world situations, making it suitable for hackathon implementation.