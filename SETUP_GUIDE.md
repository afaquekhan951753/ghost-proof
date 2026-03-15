# 👻 Anti-Ghost Follow-up Automator — Setup Guide

> **Cost: $0 | Time to set up: ~5 minutes**

---

## What You're Getting

| Feature | Status |
|---|---|
| Visual Heatmap (🟢🟡🟠🔴) | ✅ |
| Auto-draft 3 message styles (Friendly / Professional / Break-up) | ✅ |
| Dashboard sidebar with "Mark Sent" button | ✅ |
| Daily email digest at 8 AM | ✅ |
| Auto trigger every 3 days | ✅ |
| 100% Free — No SaaS fees ever | ✅ |

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) → click **Blank**
2. Rename it: `Anti-Ghost Automator`

---

## Step 2 — Open Apps Script

1. In your sheet: **Extensions → Apps Script**
2. You'll see a default `Code.gs` file — **delete all the default content**

---

## Step 3 — Add the Code

### File 1: `Code.gs`
1. Paste the **entire contents of `Code.gs`** from this folder
2. Click 💾 Save (Ctrl+S)

### File 2: `Dashboard.html`
1. Click the **+** icon next to "Files" in the left panel → select **HTML**
2. Name it exactly: `Dashboard` (without .html — Apps Script adds it)
3. Delete the default content, paste the **entire contents of `Dashboard.html`**
4. Click 💾 Save

---

## Step 4 — Run First Time Setup

1. In Apps Script, select the function `firstTimeSetup` from the dropdown
2. Click ▶ **Run**
3. You'll be asked to **authorize** — click "Review permissions" → "Allow"
4. Wait ~10 seconds for setup to complete
5. Go back to your Google Sheet and refresh (Ctrl+Shift+R)

---

## Step 5 — Configure Your Settings

1. Go to the **Settings sheet** that was created
2. Update:
   - **Your Name** → Your actual name
   - **Your Email** → Your Gmail address (for daily digests)
   - **Follow-up Interval** → Default is 3 days (recommended)
   - Edit the message templates → customize them to match your voice

---

## Step 6 — Add Your Proposals

Go to the **Proposals sheet** and fill in:

| Column | What to Put |
|---|---|
| Client Name | Full name of the client |
| Project Title | Brief project description |
| Platform | Upwork / LinkedIn / Email etc. |
| Proposal Date | Date you sent the proposal |
| Amount ($) | Your quoted amount |
| Status | Leave as "⏳ Waiting" |
| Client Email | Their email (optional, for your reference) |

Leave the rest blank — the automator fills them in!

---

## Daily Workflow

1. **Every morning at 8 AM** → You'll get an email digest with follow-ups due
2. **Open the sheet** → Click `Anti-Ghost → Open Dashboard`
3. **See who needs a nudge** → Click "Generate" to get a drafted message
4. **Copy the draft** → Send it manually (email / LinkedIn / DM)
5. **Click "Mark Sent"** → The timer resets for another 3 days

---

## The 3 Message Styles

### 🟢 Friendly (Follow-up #1)
Used for first follow-up. Casual, warm, low-pressure.
> *"Hey Sarah, hope your week's going great! Just circling back on the proposal..."*

### 🔵 Professional (Follow-up #2 & #3)
More direct. Mentions added value and a call to action.
> *"Hi Sarah, following up on the Mobile App proposal. I have a few additional ideas..."*

### 🔴 Break-up (Final Follow-up)
The psychological trigger. Creates urgency without being pushy.
> *"Hey Sarah, I'll close out the proposal file on Friday. If you're still interested..."*

---

## Heatmap Color Guide

| Color | Meaning |
|---|---|
| 🟢 Green | Fresh — no action needed |
| 🟡 Yellow | Approaching follow-up date |
| 🟠 Orange | Follow-up overdue |
| 🔴 Red | Critical — following up ASAP |
| 👻 Ghost | Marked as ghosted |
| ✅ Green row | Won or Lost — archived |

---

## Troubleshooting

**"Authorization required" popup?**
→ Normal! Click "Review permissions" → Choose your Google account → "Allow"

**Sheet not appearing after setup?**
→ Refresh the Google Sheet tab (Ctrl+Shift+R)

**Email digests not arriving?**
→ Check your Settings sheet — make sure "Send Email Alerts?" = YES and your email is correct

**Trigger not firing?**
→ In Apps Script, go to ⏰ **Triggers** (clock icon) → verify `dailyCheck` trigger exists

---

## Share This With Your Audience

Post this link format on X after you set it up:

> "Built the Anti-Ghost Follow-up Automator in Google Sheets (free forever).
> It auto-drafts 3 styles of follow-up messages and sends me a daily email
> of who to contact today. Already recovered $X from 'ghosted' proposals.
> 🧵 Setup guide below 👇"

---

*Built with ❤️ and $0 | Fork it, share it, use it forever.*
