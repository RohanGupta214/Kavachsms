import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FRAUD_SENDERS = new Set([
  'FK-SBI','FK-HDFC','FK-ICICI','FK-AXIS','FK-KOTAK','FK-AMAZON','FK-PAYTM',
  'FK-FLIPKART','FK-GPAY','FK-PHONEPE','PRIZWIN','LUCKYWN','EARNHOM','CRYPTOW',
  'VM-CBISBI','IM-CBISBI','VM-INCOME','IM-INCOME','PRIZWON','WINLOTT','JACKPOT',
  '9000000000','8000000000','7777777777','9999999999'
]);

const FRAUD_PFX = ['FK-','IM-','PRIZW','LUCKY','EARN','CRYPT','BITCO','WINLO','JACKP'];

const KWS = [
  {w:'digital arrest',s:0.40,l:'Digital arrest threat'},
  {w:'cyber police',s:0.33,l:'Fake cyber police'},
  {w:'cbi notice',s:0.33,l:'Fake CBI notice'},
  {w:'ed notice',s:0.30,l:'Fake ED notice'},
  {w:'video call investigation',s:0.32,l:'Video call coercion'},
  {w:'do not disconnect',s:0.28,l:'Coercion tactic'},
  {w:'stay on call',s:0.26,l:'Coercion tactic'},
  {w:'criminal case',s:0.26,l:'Legal threat'},
  {w:'transfer karein',s:0.28,l:'Payment demand (Hindi)'},
  {w:'paisa transfer',s:0.26,l:'Payment demand (Hindi)'},
  {w:'aadhar blocked',s:0.24,l:'Aadhaar threat'},
  {w:'upi blocked',s:0.24,l:'UPI threat'},
  {w:'kyc update',s:0.20,l:'KYC scam'},
  {w:'kyc verify',s:0.20,l:'KYC scam'},
  {w:'account suspended',s:0.20,l:'Account threat'},
  {w:'account blocked',s:0.20,l:'Account threat'},
  {w:'permanent closure',s:0.18,l:'Account threat'},
  {w:'customs clearance',s:0.24,l:'Parcel scam'},
  {w:'parcel held',s:0.22,l:'Parcel scam'},
  {w:'customs fee',s:0.22,l:'Parcel scam'},
  {w:'won lottery',s:0.28,l:'Lottery scam'},
  {w:'lucky winner',s:0.28,l:'Prize scam'},
  {w:'prize money',s:0.24,l:'Prize scam'},
  {w:'claim within',s:0.18,l:'Urgency tactic'},
  {w:'screen share',s:0.30,l:'Remote access scam'},
  {w:'anydesk',s:0.34,l:'Remote access tool'},
  {w:'teamviewer',s:0.30,l:'Remote access tool'},
  {w:'transfer money',s:0.24,l:'Payment demand'},
  {w:'otp share',s:0.28,l:'OTP theft'},
  {w:'otp batao',s:0.26,l:'OTP theft (Hindi)'},
  {w:'bit.ly',s:0.16,l:'Shortened URL'},
  {w:'tinyurl',s:0.16,l:'Shortened URL'},
  {w:'t.me/',s:0.20,l:'Telegram link'},
  {w:'immediate action',s:0.14,l:'Urgency tactic'},
  {w:'24 ghante',s:0.15,l:'Time pressure (Hindi)'},
  {w:'income tax refund',s:0.22,l:'Tax refund scam'},
  {w:'sim blocked',s:0.22,l:'SIM threat'},
  {w:'work from home',s:0.16,l:'Job scam'},
];

const LEGIT = [
  'do not share this otp','sbi never asks','bank never asks',
  'never share your otp','otp is valid for','do not share with anyone'
];

const TESTS = [
  {msg:"Sir aapko CBI aur Enforcement Directorate ne digital arrest kiya hai. Video call pe rehna zaruri hai. Abhi Rs 50,000 transfer karein.", sender:"VM-CBISBI"},
  {msg:"Dear Customer, your SBI account has been suspended due to incomplete KYC. Verify immediately: bit.ly/sbi-kyc-now", sender:"FK-SBI"},
  {msg:"Congratulations! You are the lucky winner of Rs 25 Lakh in Amazon Mega Prize Draw. Claim within 24 hours: bit.ly/amzn-prize", sender:"PRIZWIN"},
  {msg:"Your OTP for SBI Net Banking is 482910. Valid for 10 minutes. Do not share this OTP with anyone. SBI never asks for OTP.", sender:"SBI"},
  {msg:"Aapka parcel customs mein roka gaya hai. Release ke liye Rs 1,299 customs fee bharna hoga: bit.ly/customs-pay.", sender:"+919988776655"}
];

function checkSender(s) {
  if (!s.trim()) return {text:'Not provided', risk:0, cls:'safe'};
  const up = s.trim().toUpperCase();
  if (FRAUD_SENDERS.has(up)) return {text:'Known fraud sender', risk:0.42, cls:'danger'};
  for (const p of FRAUD_PFX) if (up.startsWith(p)) return {text:'Suspicious pattern', risk:0.20, cls:'warn'};
  const d = s.replace(/\D/g,'');
  if (d.length > 0 && d.length < 10) return {text:'Unusual number format', risk:0.12, cls:'warn'};
  return {text:'Not in fraud database', risk:0, cls:'safe'};
}

function classifyMsg(msg) {
  const lo = msg.toLowerCase();
  let cut = 0;
  for (const l of LEGIT) if (lo.includes(l)) cut += 0.30;
  let ks = 0; const found = [];
  for (const k of KWS) if (lo.includes(k.w)) { ks += k.s; found.push(k.l); }
  ks = Math.min(ks, 0.92);
  const urls = (msg.match(/https?:\/\/\S+|bit\.ly|tinyurl|t\.me\//gi)||[]).length;
  const urg = (msg.match(/immediately|urgent|abhi|turant|jaldi/gi)||[]).length;
  const struct = Math.min(urls * 0.09 + urg * 0.05, 0.25);
  const ai = Math.max(0, Math.min(ks * 0.72 + struct, 0.95) - cut);
  return {ai: Math.round(ai*100)/100, kCount: found.length, found};
}

function getLevel(score) {
  if (score < 0.20) return {level:'Safe', color:'#1E6B00', bg:'#EAF3DE', badge:'#C0DD97'};
  if (score < 0.45) return {level:'Suspicious', color:'#7A4F00', bg:'#FFF3CD', badge:'#FAC775'};
  if (score < 0.72) return {level:'Phishing', color:'#8B0000', bg:'#FCEBEB', badge:'#F7C1C1'};
  return {level:'Digital Arrest Scam', color:'#6B0000', bg:'#FCEBEB', badge:'#F09595'};
}

function getAdvice(level) {
  if (level === 'Safe') return 'This message appears legitimate. No action needed.';
  if (level === 'Suspicious') return 'Unusual patterns detected. Do NOT click any links. Verify by calling the company on their official number.';
  if (level === 'Phishing') return 'High confidence phishing. Do NOT respond, click links, share OTP, or transfer money.';
  return 'Known Digital Arrest scam. No government agency contacts you via SMS/WhatsApp to demand money. Stay calm. Call 1930.';
}

function Scan() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [sender, setSender] = useState('');
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  function loadTest(i) {
    setMsg(TESTS[i].msg);
    setSender(TESTS[i].sender);
    setResult(null);
  }

  function runScan() {
    if (!msg.trim()) { alert('Please paste a message to scan.'); return; }
    setScanning(true);
    setTimeout(() => {
      const sr = checkSender(sender);
      const mr = classifyMsg(msg);
      const combined = Math.min(mr.ai + sr.risk, 1.0);
      const pct = Math.round(combined * 100);
      const lvl = getLevel(combined);
      const advice = getAdvice(lvl.level);
      const scanResult = {
        level: lvl.level, pct, color: lvl.color, bg: lvl.bg,
        badge: lvl.badge, advice, sender: sender.trim() || 'Not provided',
        senderText: sr.text, senderCls: sr.cls,
        aiScore: Math.round(mr.ai * 100),
        senderRisk: sr.risk > 0 ? `+${Math.round(sr.risk*100)}%` : 'None',
        kCount: mr.kCount, keywords: [...new Set(mr.found)],
        message: msg, time: new Date().toLocaleString('en-IN'),
        helpline: combined >= 0.45
      };
      const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
      history.unshift(scanResult);
      localStorage.setItem('scanHistory', JSON.stringify(history.slice(0, 50)));
      setResult(scanResult);
      setScanning(false);
    }, 800);
  }

  return (
    <div className="scan-screen">
      <div className="scan-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>Scan Message</h1>
      </div>

      <div className="quick-chips">
        {['Digital arrest','Fake bank','Prize scam','Real OTP','Parcel scam'].map((t,i) => (
          <button key={i} className="chip" onClick={() => loadTest(i)}>{t}</button>
        ))}
      </div>

      <div className="input-card">
        <label>Suspicious message</label>
        <textarea
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Paste any SMS or WhatsApp message here..."
          rows={4}
        />
        <div className="sep" />
        <label>Sender (optional)</label>
        <input
          type="text"
          value={sender}
          onChange={e => setSender(e.target.value)}
          placeholder="+91XXXXXXXXXX or VM-SBIBNK or FK-AMAZON"
        />
      </div>

      <button className="scan-btn" onClick={runScan} disabled={scanning}>
        {scanning ? 'Scanning...' : 'Scan Message'}
      </button>

      {result && (
        <div className="result-card" style={{background: result.bg, borderColor: result.color}}>
          <div className="result-top">
            <span className="result-level" style={{color: result.color}}>{result.level}</span>
            <span className="result-badge" style={{background: result.badge, color: result.color}}>{result.pct}% risk</span>
          </div>

          <div className="bar-track">
            <div className="bar-fill" style={{width:`${result.pct}%`, background: result.color}} />
          </div>

          <p className="result-advice">{result.advice}</p>

          {result.helpline && (
            <div className="helpline-box">
              Report: cybercrime.gov.in &nbsp;|&nbsp; Helpline: 1930
            </div>
          )}

          <div className="result-section">Sender Analysis</div>
          <div className="detail-row"><span>Sender ID</span><span>{result.sender}</span></div>
          <div className="detail-row"><span>Status</span><span className={`sender-${result.senderCls}`}>{result.senderText}</span></div>

          <div className="result-section">Signal Breakdown</div>
          <div className="detail-row"><span>Message risk</span><span>{result.aiScore}%</span></div>
          <div className="detail-row"><span>Sender risk</span><span>{result.senderRisk}</span></div>
          <div className="detail-row"><span>Keywords found</span><span>{result.kCount}</span></div>
          <div className="detail-row"><span>Combined score</span><span>{result.pct}%</span></div>

          <div className="result-section">Keywords Detected</div>
          <div className="kw-wrap">
            {result.keywords.length > 0
              ? result.keywords.map((k,i) => <span key={i} className="kw-pill">{k}</span>)
              : <span className="no-kw">None detected</span>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default Scan;