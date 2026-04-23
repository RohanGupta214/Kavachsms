# KavachSMS - AI Phishing Shield for India

Real-time AI-powered detection for SMS and WhatsApp scams built for India's 500 million smartphone users.

Live Demo: https://kavachsms.vercel.app

---

## The Problem

India recorded 22.68 lakh cybercrime cases in 2024 with Rs 22,845 crore in financial losses — a 206% increase over 2023. Digital Arrest scams alone caused Rs 1,935 crore in losses. No existing tool warns users before they click a malicious link or fall for a coercion scam.

## What KavachSMS Does

KavachSMS is a cross-platform PWA that intercepts phishing messages before the user acts on them — running entirely on-device with zero data sent to servers.

### Threat Levels
- SAFE — Message appears legitimate
- SUSPICIOUS — Unusual patterns, verify manually
- PHISHING — High confidence phishing attempt
- DIGITAL ARREST SCAM — Known coercion or impersonation pattern

## Features

- AI Message Classification — 37 Indian phishing patterns including Hindi and Hinglish
- Sender Verification — database of known fraud sender IDs and TRAI patterns
- Real-Time Analysis — instant results with risk score and signal breakdown
- Scan History — locally stored history of all previous scans
- Privacy First — zero data leaves your device, fully offline capable
- PWA — installable on Android and iOS directly from browser

## How It Works

Message Input → Keyword NLP Engine → Sender Verification → Risk Scoring → Threat Classification

- NLP Engine — weighted keyword classifier covering 37 Indian phishing patterns
- Sender Database — cross-references against known fraud sender IDs and suspicious prefixes
- Risk Scoring — combines message risk and sender risk into a 0-100% threat score
- Hindi and Hinglish Support — detects patterns like transfer karein, 24 ghante, digital arrest

## Privacy

- All analysis runs locally in the browser
- No message content is ever transmitted to any server
- Scan history stored in localStorage and never leaves the device
- Designed to comply with India's DPDP Act 2023

## Tech Stack

- Frontend: React.js 18
- Routing: React Router v6
- Storage: localStorage
- Deployment: Vercel
- Type: Progressive Web App

## Install on Your Phone

1. Open kavachsms.vercel.app in Safari on iPhone or Chrome on Android
2. Tap Share then Add to Home Screen on iPhone, or Install App on Android
3. KavachSMS appears on your home screen like a native app

## Run Locally

git clone https://github.com/RohanGupta214/Kavachsms.git
cd Kavachsms
npm install
npm start

## Impact

- Target users: 500 million Indian smartphone users on WhatsApp
- If KavachSMS intercepts 0.1% of annual cybercrime cases it prevents around 2,268 frauds per year
- Estimated savings of Rs 22 crore per year at average loss rates
- Aligns with MHA I4C mandate and India's National Cyber Security Strategy

## Developer

Rohan Gupta

Co-inventor — Indian Patent: A System and Method for Securing Online Classes Through Video and Audio Analytics

## Emergency

If you have been scammed call 1930 or visit cybercrime.gov.in

No government agency — CBI, ED, RBI, Police, or any Court — will ever contact you via SMS or WhatsApp to demand money.