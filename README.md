- **NLP Engine** — weighted keyword classifier covering 37 Indian phishing patterns
- **Sender DB** — cross-references against known fraud sender IDs and suspicious prefixes
- **Risk Scoring** — combines message risk + sender risk into a 0-100% threat score
- **Hindi/Hinglish Support** — detects patterns like "transfer karein", "24 ghante", "digital arrest"

## 🔒 Privacy Architecture

- All analysis runs locally in the browser
- No message content is ever transmitted to any server
- Scan history stored in localStorage — never leaves the device
- Designed to comply with India's DPDP Act 2023

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18 |
| Routing | React Router v6 |
| Storage | localStorage |
| Deployment | Vercel |
| Type | Progressive Web App (PWA) |

## 📱 Installation

**As a PWA on your phone:**
1. Open [kavachsms.vercel.app](https://kavachsms.vercel.app) in Safari (iOS) or Chrome (Android)
2. Tap **Share → Add to Home Screen** (iOS) or **Install App** (Android)
3. KavachSMS appears on your home screen like a native app

**Run locally:**
```bash
git clone https://github.com/RohanGupta214/Kavachsms.git
cd Kavachsms
npm install
npm start
```

## 📊 Impact Potential

- Target users: 500M+ Indian smartphone users on WhatsApp
- If KavachSMS intercepts 0.1% of annual cybercrime cases → prevents ~2,268 frauds
- Estimated savings: ₹22 crore/year at average loss rates
- Aligns with MHA's I4C mandate and India's National Cyber Security Strategy

## 🔬 Research Foundation

Built on published research in transformer-based SMS classification:
- Detecting Smishing Messages Using BERT — Springer SN Computer Science, 2024
- SMS Spam Detection Using BERT and Multi-Graph CNNs — ScienceDirect, 2025
- Hybrid Super Learner Ensemble for Mobile Phishing Detection — Nature Scientific Reports, 2025

## 👨‍💻 Developer

**Rohan Gupta**
- Co-inventor — Indian Patent: *A System and Method for Securing Online Classes Through Video and Audio Analytics*
- Portfolio: [kavachsms.vercel.app](https://kavachsms.vercel.app)

## 🆘 Emergency

If you have been scammed: **Call 1930** or visit [cybercrime.gov.in](https://cybercrime.gov.in)

---

*No government agency — CBI, ED, RBI, Police, or any Court — will ever contact you via SMS or WhatsApp to demand money.*