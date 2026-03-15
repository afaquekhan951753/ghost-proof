<div align="center">

# 👻 Ghost-Proof

### The automated tracker that drafts your follow-up messages so no proposal ever goes cold.

**Free Forever · Google Sheets + Apps Script · No SaaS fees · 5-min setup**

[![Made with Google Apps Script](https://img.shields.io/badge/Made%20with-Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://script.google.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Cost](https://img.shields.io/badge/Cost-%240%20Forever-brightgreen?style=for-the-badge)]()
[![Platform](https://img.shields.io/badge/Platform-Google%20Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)]()

</div>

---

## 🤔 The Problem

You send a killer proposal. Hit send. And then… **nothing**.

The "Proposal Black Hole."

> **70% of deals are won on the 3rd or 4th follow-up** — yet most freelancers stop after the first ghost. 👻

You tell yourself *"I'll follow up in 3 days"* — but life happens. The client gets buried in emails. The deal dies.

**Ghost-Proof fixes this. Automatically.**

---

## ✨ What It Does

| Feature | Description |
|---|---|
| 🔥 **Visual Heatmap** | Color-coded rows (🟢🟡🟠🔴) show urgency at a glance — before you finish your coffee |
| ✉️ **3 Auto-Draft Styles** | Generates Friendly, Professional, and Break-up messages — personalized with the client's name and project |
| 📊 **Live Dashboard** | Sidebar showing stats, due follow-ups, and one-click "Mark Sent" button |
| 📧 **Daily Email Digest** | Arrives at 8 AM with everyone who needs a nudge today |
| 🤖 **Automatic Timer Reset** | Mark a follow-up as sent → it schedules the next one automatically |
| ⚙️ **Fully Customizable** | Edit templates, intervals, and max follow-ups in the Settings sheet |
| 💸 **$0 Forever** | No monthly fees. No SaaS. No API keys. Just Google Sheets. |

---

## 📸 Preview

```
┌─────────────────────────────────────┐
│  👻 Ghost-Proof Dashboard           │
│─────────────────────────────────────│
│  🔥 3 Due Today   📋 8 Total        │
│  ✅ 2 Won         🤝 1 In Talks     │
│─────────────────────────────────────│
│  🔥 Needs Follow-up  [3]            │
│                                     │
│  Alex Johnson          $2,500       │
│  E-commerce Redesign                │
│  ⏰ 7d since contact  #2  Professional│
│  [✅ Mark Sent]  [✨ Generate]      │
│                                     │
│  Sarah Chen            $5,000       │
│  Mobile App MVP                     │
│  ⏰ 10d since contact  #4  Break-up │
│  [✅ Mark Sent]  [✨ Generate]      │
└─────────────────────────────────────┘
```

---

## 🚀 Setup (5 Minutes)

### Step 1 — Create the Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com) → click **Blank**
2. Rename it: `Ghost-Proof`

### Step 2 — Open Apps Script
1. In your sheet: **Extensions → Apps Script**
2. Delete all the default content in `Code.gs`

### Step 3 — Add the Files

**File 1: `Code.gs`**
- Paste the entire contents of [`Code.gs`](Code.gs) from this repo
- Hit `Ctrl+S` to save

**File 2: `Dashboard.html`**
- Click **+** next to "Files" → select **HTML**
- Name it exactly: `Dashboard`
- Paste the entire contents of [`Dashboard.html`](Dashboard.html)
- Hit `Ctrl+S` to save

### Step 4 — First Time Setup
1. In Apps Script, select `firstTimeSetup` from the function dropdown
2. Click ▶ **Run**
3. Authorize when prompted → click **"Review permissions" → "Allow"**
4. Refresh your Google Sheet (`Ctrl+Shift+R`)

### Step 5 — Configure Settings
Go to the **Settings sheet** and update:
- **Your Name** → Your name
- **Your Email** → Your Gmail (for daily digests)
- Edit message templates to match your voice

### Step 6 — Add Your Proposals
Fill in the **Proposals sheet** with your active proposals. Leave the rest blank — Ghost-Proof handles it.

---

## 📋 The 3 Message Styles

### 🟢 Friendly — Follow-up #1
Casual, warm, zero pressure.
```
Hey {Client},

Hope your week is going great! I wanted to circle back on the {Project}
proposal I sent over. I'm still really excited about the opportunity...
```

### 🔵 Professional — Follow-up #2 & #3
Direct, value-adding, clear CTA.
```
Hi {Client},

I'm following up on the {Project} proposal. I've been thinking about
your project and have a few additional ideas that could really add value...
```

### 🔴 Break-up — Final Follow-up
The psychological trigger. Creates urgency without being pushy.
```
Hey {Client},

I'll keep this short — I'm closing out the {Project} proposal file on
Friday. If you're still interested, I'd love to make it happen...
```

---

## 🎨 Heatmap Color Guide

| Color | Meaning |
|---|---|
| 🟢 Green row | Fresh — no action needed yet |
| 🟡 Yellow row | Approaching follow-up date |
| 🟠 Orange row | Follow-up overdue |
| 🔴 Red row | Critical — contact ASAP |
| 👻 Purple row | Marked as Ghosted |
| ✅ Light green row | Won or Lost — archived |

---

## 🔄 Daily Workflow

```
8:00 AM  →  Email digest arrives (X follow-ups due today)
           ↓
Open Dashboard  →  See who needs a nudge
           ↓
Click "Generate"  →  Read the auto-drafted message
           ↓
Copy + Send  →  Email / LinkedIn / DM / Upwork
           ↓
Click "Mark Sent"  →  Timer resets for 3 more days
```

---

## 🛠 Troubleshooting

**"Authorization required" popup?**
→ Normal. Click "Review permissions" → your Google account → "Allow"

**Sheet not appearing after setup?**
→ Refresh the tab (`Ctrl+Shift+R`)

**Email digests not arriving?**
→ Settings sheet → confirm `Send Email Alerts?` = `YES` and email is correct

**Want to change follow-up interval?**
→ Settings sheet → `Follow-up Interval (days)` → change from `3` to any number

---

## 🤝 Contributing

Found a bug? Have a feature idea? Open an issue or PR — contributions welcome!

---

## 📄 License

MIT License — free to use, fork, and share forever.

---

<div align="center">

**Built by [@afaquekhan951753](https://github.com/afaquekhan951753)**

*"Stop letting deals die in the inbox."*

⭐ Star this repo if it saved you a deal!

</div>
