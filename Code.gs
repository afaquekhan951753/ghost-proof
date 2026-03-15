// ============================================================
// GHOST-PROOF FOLLOW-UP AUTOMATOR
// By: Your Name | Free Forever | Google Sheets + Apps Script
// ============================================================

const SHEET_NAME = "Proposals";
const SETTINGS_SHEET = "Settings";
const LOG_SHEET = "Activity Log";

// Column indices (1-based)
const COL = {
  ID: 1,
  CLIENT: 2,
  PROJECT: 3,
  PLATFORM: 4,
  PROPOSAL_DATE: 5,
  PROPOSAL_AMOUNT: 6,
  STATUS: 7,
  LAST_FOLLOWUP: 8,
  FOLLOWUP_COUNT: 9,
  NEXT_FOLLOWUP: 10,
  HEAT: 11,
  NOTES: 12,
  EMAIL: 13,
  AUTO_DRAFT: 14,
};

// ── SETUP ─────────────────────────────────────────────────────
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("👻 Ghost-Proof")
    .addItem("📋 Open Dashboard", "openDashboard")
    .addSeparator()
    .addItem("⚡ Generate Follow-ups (Run Now)", "generateAllFollowups")
    .addSeparator()
    .addItem("🔄 Refresh Heatmap", "refreshHeatmap")
    .addItem("⚙️ Settings", "openSettings")
    .addSeparator()
    .addItem("🆕 First Time Setup", "firstTimeSetup")
    .addToUi();
}

function firstTimeSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  setupProposalsSheet(ss);
  setupSettingsSheet(ss);
  setupLogSheet(ss);
  setupTriggers();

  SpreadsheetApp.getUi().alert(
    "✅ Ghost-Proof Setup Complete!\n\nYour sheets are ready.\n\n" +
    "1. Go to the 'Proposals' sheet\n" +
    "2. Add your client proposals\n" +
    "3. Open 'Ghost-Proof > Open Dashboard' to manage follow-ups\n\n" +
    "The automator will check for follow-ups daily at 8 AM."
  );
}

function setupProposalsSheet(ss) {
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) sheet.clear();
  else sheet = ss.insertSheet(SHEET_NAME, 0);

  const headers = [
    ["#", "Client Name", "Project Title", "Platform", "Proposal Date",
     "Amount ($)", "Status", "Last Follow-up", "Follow-up #", "Next Follow-up",
     "🔥 Heat", "Notes", "Client Email", "Auto-Draft Message"]
  ];

  sheet.getRange(1, 1, 1, headers[0].length).setValues(headers);

  // Style the header
  const headerRange = sheet.getRange(1, 1, 1, headers[0].length);
  headerRange.setBackground("#1a1a2e")
             .setFontColor("#e94560")
             .setFontWeight("bold")
             .setFontSize(11)
             .setHorizontalAlignment("center");

  // Column widths
  sheet.setColumnWidth(COL.ID, 40);
  sheet.setColumnWidth(COL.CLIENT, 150);
  sheet.setColumnWidth(COL.PROJECT, 200);
  sheet.setColumnWidth(COL.PLATFORM, 110);
  sheet.setColumnWidth(COL.PROPOSAL_DATE, 120);
  sheet.setColumnWidth(COL.PROPOSAL_AMOUNT, 100);
  sheet.setColumnWidth(COL.STATUS, 130);
  sheet.setColumnWidth(COL.LAST_FOLLOWUP, 120);
  sheet.setColumnWidth(COL.FOLLOWUP_COUNT, 100);
  sheet.setColumnWidth(COL.NEXT_FOLLOWUP, 130);
  sheet.setColumnWidth(COL.HEAT, 80);
  sheet.setColumnWidth(COL.NOTES, 200);
  sheet.setColumnWidth(COL.EMAIL, 180);
  sheet.setColumnWidth(COL.AUTO_DRAFT, 350);

  sheet.setFrozenRows(1);

  // Data validation for Status
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["⏳ Waiting", "📨 Followed Up", "🤝 In Talks", "✅ Won", "❌ Lost", "👻 Ghosted"], true)
    .build();
  sheet.getRange(2, COL.STATUS, 100).setDataValidation(statusRule);

  // Data validation for Platform
  const platformRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Upwork", "Fiverr", "LinkedIn", "Email", "Twitter/X", "Referral", "Other"], true)
    .build();
  sheet.getRange(2, COL.PLATFORM, 100).setDataValidation(platformRule);

  // Auto-Draft column text wrap
  sheet.getRange(1, COL.AUTO_DRAFT, 200).setWrap(true);

  // Add sample data
  const today = new Date();
  const sampleData = [
    [1, "Alex Johnson", "E-commerce Website Redesign", "Upwork", today, 2500, "⏳ Waiting", "", 0, "", "", "High-value client, responsive", "alex@example.com", ""],
    [2, "Sarah Chen", "Mobile App MVP", "LinkedIn", new Date(today - 4*86400000), 5000, "⏳ Waiting", new Date(today - 4*86400000), 1, "", "", "Startup founder", "sarah@example.com", ""],
    [3, "Mike Ross", "Logo + Brand Kit", "Fiverr", new Date(today - 8*86400000), 800, "⏳ Waiting", new Date(today - 5*86400000), 2, "", "", "Needs quick turnaround", "mike@example.com", ""],
  ];

  sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
  refreshHeatmap();
}

function setupSettingsSheet(ss) {
  let sheet = ss.getSheetByName(SETTINGS_SHEET);
  if (sheet) sheet.clear();
  else sheet = ss.insertSheet(SETTINGS_SHEET);

  const settings = [
    ["⚙️ GHOST-PROOF SETTINGS", ""],
    ["", ""],
    ["Your Name", "Your Name Here"],
    ["Your Email", "youremail@gmail.com"],
    ["Follow-up Interval (days)", 3],
    ["Max Follow-ups Before 'Break-up'", 4],
    ["Send Email Alerts?", "YES"],
    ["", ""],
    ["── MESSAGE TEMPLATES ──", ""],
    ["", ""],
    ["[FRIENDLY] Subject", "Quick check-in on our project chat 👋"],
    ["[FRIENDLY] Body",
     "Hey {CLIENT},\n\nHope your week is going great! I wanted to circle back on the {PROJECT} proposal I sent over.\n\nI'm still really excited about the opportunity to work together on this. Do you have 10 minutes this week to chat, or any questions I can answer for you?\n\nNo pressure at all — just want to make sure this doesn't get lost in the inbox chaos 😄\n\nBest,\n{YOUR_NAME}"],
    ["", ""],
    ["[PROFESSIONAL] Subject", "Following up: {PROJECT} Proposal"],
    ["[PROFESSIONAL] Body",
     "Hi {CLIENT},\n\nI'm following up on the proposal I submitted for {PROJECT}.\n\nI've been thinking about your project and have a few additional ideas that could really add value to the outcome. Would you be open to a brief call this week to discuss?\n\nI'm happy to adjust the scope or answer any questions about my approach.\n\nLooking forward to hearing from you.\n\nBest regards,\n{YOUR_NAME}"],
    ["", ""],
    ["[BREAKUP] Subject", "Closing the loop on {PROJECT}"],
    ["[BREAKUP] Body",
     "Hey {CLIENT},\n\nI'll keep this short — I'm going to close out the {PROJECT} proposal file on my end this Friday.\n\nIf this is still something you're interested in, I'd love to make it happen. If the timing isn't right, totally understand!\n\nEither way, best of luck with the project. 🙌\n\n{YOUR_NAME}"],
  ];

  sheet.getRange(1, 1, settings.length, 2).setValues(settings);
  sheet.getRange(1, 1).setFontWeight("bold").setFontSize(14).setFontColor("#e94560");
  sheet.getRange(9, 1).setFontWeight("bold").setFontColor("#555");
  sheet.setColumnWidth(1, 220);
  sheet.setColumnWidth(2, 500);
  sheet.getRange(1, 1, settings.length, 2).setWrap(true);
}

function setupLogSheet(ss) {
  let sheet = ss.getSheetByName(LOG_SHEET);
  if (sheet) sheet.clear();
  else sheet = ss.insertSheet(LOG_SHEET);

  const headers = [["Timestamp", "Client", "Project", "Action", "Follow-up #", "Message Type"]];
  sheet.getRange(1, 1, 1, 6).setValues(headers);
  sheet.getRange(1, 1, 1, 6)
    .setBackground("#1a1a2e")
    .setFontColor("#e94560")
    .setFontWeight("bold");
  sheet.setFrozenRows(1);
  [120, 150, 200, 200, 100, 130].forEach((w, i) => sheet.setColumnWidth(i + 1, w));
}

// ── CORE LOGIC ────────────────────────────────────────────────
// silent=true when called from a time-based trigger (no UI allowed in triggers)
function generateAllFollowups(silent) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const settingsSheet = ss.getSheetByName(SETTINGS_SHEET);

  if (!sheet || !settingsSheet) {
    if (!silent) SpreadsheetApp.getUi().alert("Please run First Time Setup first!");
    return;
  }

  const settings = getSettings(settingsSheet);
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let updatedCount = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[COL.CLIENT - 1]) continue;

    const status = row[COL.STATUS - 1];
    if (["✅ Won", "❌ Lost", "👻 Ghosted"].includes(status)) continue;

    const proposalDate = row[COL.PROPOSAL_DATE - 1];
    if (!proposalDate) continue;

    const lastFollowup = row[COL.LAST_FOLLOWUP - 1] ? new Date(row[COL.LAST_FOLLOWUP - 1]) : new Date(proposalDate);
    lastFollowup.setHours(0, 0, 0, 0);

    const followupCount = parseInt(row[COL.FOLLOWUP_COUNT - 1]) || 0;
    const daysSinceLastContact = Math.round((today - lastFollowup) / 86400000);
    const nextFollowupDate = new Date(lastFollowup);
    nextFollowupDate.setDate(nextFollowupDate.getDate() + settings.interval);

    // Update Next Follow-up date
    sheet.getRange(i + 1, COL.NEXT_FOLLOWUP).setValue(nextFollowupDate);

    // Generate draft if it's time
    if (daysSinceLastContact >= settings.interval) {
      const clientName = row[COL.CLIENT - 1];
      const projectTitle = row[COL.PROJECT - 1];
      const msgType = followupCount >= settings.maxFollowups - 1 ? "BREAKUP"
                    : followupCount === 0 ? "FRIENDLY"
                    : "PROFESSIONAL";

      const draft = generateDraftMessage(clientName, projectTitle, settings, msgType);
      sheet.getRange(i + 1, COL.AUTO_DRAFT).setValue(`[${msgType}]\n${draft}`);
      
      // Do not overwrite manual In Talks pipeline status
      if (status !== "🤝 In Talks") {
        sheet.getRange(i + 1, COL.STATUS).setValue("⏳ Waiting");
      }

      updatedCount++;
    }
  }

  refreshHeatmap();

  // Only show alert when run manually from the menu (not from the daily trigger)
  if (!silent) {
    const msg = updatedCount > 0
      ? `✅ Done! Generated follow-up drafts for ${updatedCount} proposal(s).\n\nCheck the "Auto-Draft Message" column to review and send.`
      : `✅ All good! No follow-ups due today. Check back in a couple of days.`;
    SpreadsheetApp.getUi().alert(msg);
  }

  return { updated: updatedCount };
}

function generateDraftMessage(clientName, project, settings, type) {
  const firstName = clientName.split(" ")[0];
  let subject, body;

  switch (type) {
    case "FRIENDLY":
      subject = settings.friendlySubject.replace("{PROJECT}", project);
      body = settings.friendlyBody;
      break;
    case "PROFESSIONAL":
      subject = settings.professionalSubject.replace("{PROJECT}", project);
      body = settings.professionalBody;
      break;
    case "BREAKUP":
      subject = settings.breakupSubject.replace("{PROJECT}", project);
      body = settings.breakupBody;
      break;
  }

  body = body
    .replace(/\{CLIENT\}/g, firstName)
    .replace(/\{PROJECT\}/g, project)
    .replace(/\{YOUR_NAME\}/g, settings.yourName);

  return `SUBJECT: ${subject}\n\n${body}`;
}

function getSettings(settingsSheet) {
  const data = settingsSheet.getDataRange().getValues();
  const map = {};
  data.forEach(row => { if (row[0] && row[1]) map[row[0]] = row[1]; });

  return {
    yourName: map["Your Name"] || "Your Name",
    yourEmail: map["Your Email"] || "",
    interval: parseInt(map["Follow-up Interval (days)"]) || 3,
    maxFollowups: parseInt(map["Max Follow-ups Before 'Break-up'"]) || 4,
    // safe check for Yes, YES, yes, etc.
    sendEmailAlerts: String(map["Send Email Alerts?"] || "").toUpperCase() === "YES",
    friendlySubject: map["[FRIENDLY] Subject"] || "",
    friendlyBody: map["[FRIENDLY] Body"] || "",
    professionalSubject: map["[PROFESSIONAL] Subject"] || "",
    professionalBody: map["[PROFESSIONAL] Body"] || "",
    breakupSubject: map["[BREAKUP] Subject"] || "",
    breakupBody: map["[BREAKUP] Body"] || "",
  };
}

// ── HEATMAP ───────────────────────────────────────────────────
function refreshHeatmap() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const settingsSheet = ss.getSheetByName(SETTINGS_SHEET);
  const settings = settingsSheet ? getSettings(settingsSheet) : { interval: 3 };

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[COL.CLIENT - 1]) continue;

    const status = row[COL.STATUS - 1];
    const rowRange = sheet.getRange(i + 1, 1, 1, data[0].length);

    if (["✅ Won", "❌ Lost"].includes(status)) {
      rowRange.setBackground("#e8f5e9");
      sheet.getRange(i + 1, COL.HEAT).setValue("✅");
      continue;
    }

    const lastContact = row[COL.LAST_FOLLOWUP - 1]
      ? new Date(row[COL.LAST_FOLLOWUP - 1])
      : (row[COL.PROPOSAL_DATE - 1] ? new Date(row[COL.PROPOSAL_DATE - 1]) : null);

    if (!lastContact) continue;
    lastContact.setHours(0, 0, 0, 0);

    const daysSince = Math.round((today - lastContact) / 86400000);
    const urgency = daysSince / settings.interval;

    let heat, bg;
    if (urgency < 0.5) { heat = "🟢"; bg = "#f1f8e9"; }        // Fresh
    else if (urgency < 1) { heat = "🟡"; bg = "#fff9c4"; }     // Approaching
    else if (urgency < 1.5) { heat = "🟠"; bg = "#ffe0b2"; }   // Overdue
    else { heat = "🔴"; bg = "#ffebee"; }                       // Critical

    if (status === "👻 Ghosted") { heat = "👻"; bg = "#f3e5f5"; }

    rowRange.setBackground(bg);
    sheet.getRange(i + 1, COL.HEAT).setValue(heat);
  }
}

// ── MARK FOLLOWED UP ──────────────────────────────────────────
function markAsFollowedUp() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const settingsSheet = ss.getSheetByName(SETTINGS_SHEET);
  const settings = settingsSheet ? getSettings(settingsSheet) : { interval: 3 };
  
  const selection = sheet.getActiveRange();
  const row = selection.getRow();

  if (row <= 1) { SpreadsheetApp.getUi().alert("Please select a proposal row."); return; }

  const today = new Date();
  const currentCount = parseInt(sheet.getRange(row, COL.FOLLOWUP_COUNT).getValue()) || 0;

  sheet.getRange(row, COL.LAST_FOLLOWUP).setValue(today);
  sheet.getRange(row, COL.FOLLOWUP_COUNT).setValue(currentCount + 1);
  sheet.getRange(row, COL.STATUS).setValue("📨 Followed Up");
  sheet.getRange(row, COL.AUTO_DRAFT).setValue(""); // Clear old draft

  const nextDate = new Date(today);
  nextDate.setDate(nextDate.getDate() + settings.interval);
  sheet.getRange(row, COL.NEXT_FOLLOWUP).setValue(nextDate);

  // Log it
  logActivity(ss, sheet.getRange(row, COL.CLIENT).getValue(),
    sheet.getRange(row, COL.PROJECT).getValue(), "Followed Up", currentCount + 1, "Manual");

  refreshHeatmap();
  SpreadsheetApp.getUi().alert(`✅ Marked as followed up! Next reminder scheduled in ${settings.interval} days.`);
}

function logActivity(ss, client, project, action, count, type) {
  const logSheet = ss.getSheetByName(LOG_SHEET);
  if (!logSheet) return;
  logSheet.appendRow([new Date(), client, project, action, count, type]);
}

// ── TRIGGERS ─────────────────────────────────────────────────
function setupTriggers() {
  // Remove existing triggers
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));

  // Daily 8 AM trigger
  ScriptApp.newTrigger("dailyCheck")
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
}

function dailyCheck() {
  generateAllFollowups(true); // silent=true: skip UI alerts, safe for triggers
  sendEmailDigest();
}

// ── EMAIL DIGEST ─────────────────────────────────────────────
function sendEmailDigest() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingsSheet = ss.getSheetByName(SETTINGS_SHEET);
  if (!settingsSheet) return;

  const settings = getSettings(settingsSheet);
  if (!settings.sendEmailAlerts || !settings.yourEmail) return;

  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueToday = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[COL.CLIENT - 1]) continue;
    // Safely skip any leads that are closed out
    if (["✅ Won", "❌ Lost", "👻 Ghosted"].includes(row[COL.STATUS - 1])) continue;

    const lastContact = row[COL.LAST_FOLLOWUP - 1]
      ? new Date(row[COL.LAST_FOLLOWUP - 1])
      : (row[COL.PROPOSAL_DATE - 1] ? new Date(row[COL.PROPOSAL_DATE - 1]) : null);

    if (!lastContact) continue;
    lastContact.setHours(0, 0, 0, 0);

    const daysSince = Math.round((today - lastContact) / 86400000);
    if (daysSince >= settings.interval) {
      dueToday.push({ client: row[COL.CLIENT - 1], project: row[COL.PROJECT - 1], days: daysSince });
    }
  }

  if (dueToday.length === 0) return;

  const sheetUrl = ss.getUrl();
  let html = `<h2>👻 Ghost-Proof Daily Digest</h2>
    <p>You have <strong>${dueToday.length} follow-up(s)</strong> due today!</p>
    <table border="1" cellpadding="8" style="border-collapse:collapse; font-family:Arial;">
    <tr style="background:#1a1a2e; color:#e94560;">
      <th>Client</th><th>Project</th><th>Days Since Contact</th>
    </tr>`;

  dueToday.forEach(item => {
    html += `<tr><td>${item.client}</td><td>${item.project}</td><td style="text-align:center;">${item.days} days</td></tr>`;
  });

  html += `</table><br/>
    <a href="${sheetUrl}" style="background:#e94560; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">
      Open Ghost-Proof Sheet →
    </a>`;

  GmailApp.sendEmail(settings.yourEmail, `👻 ${dueToday.length} Follow-up(s) Due Today – Ghost-Proof`, "", { htmlBody: html });
}

// ── DASHBOARD SIDEBAR ─────────────────────────────────────────
function openDashboard() {
  const html = HtmlService.createHtmlOutputFromFile("Dashboard")
    .setTitle("🚀 Ghost-Proof Dashboard")
    .setWidth(400);
  SpreadsheetApp.getUi().showSidebar(html);
}

function openSettings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setActiveSheet(ss.getSheetByName(SETTINGS_SHEET));
}

// ── DATA FOR SIDEBAR ──────────────────────────────────────────
function getDashboardData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const settingsSheet = ss.getSheetByName(SETTINGS_SHEET);
  if (!sheet) return { error: "Run First Time Setup first!" };

  const settings = settingsSheet ? getSettings(settingsSheet) : { interval: 3 };
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let stats = { total: 0, dueToday: 0, won: 0, ghosted: 0, inTalks: 0 };
  const dueList = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[COL.CLIENT - 1]) continue;
    stats.total++;

    const status = row[COL.STATUS - 1];
    if (status === "✅ Won") { stats.won++; continue; }
    if (status === "❌ Lost") { continue; } // Exclude lost proposals from active counting
    if (status === "👻 Ghosted") { stats.ghosted++; continue; }
    if (status === "🤝 In Talks") stats.inTalks++;

    const lastContact = row[COL.LAST_FOLLOWUP - 1]
      ? new Date(row[COL.LAST_FOLLOWUP - 1])
      : (row[COL.PROPOSAL_DATE - 1] ? new Date(row[COL.PROPOSAL_DATE - 1]) : null);

    if (!lastContact) continue;
    lastContact.setHours(0, 0, 0, 0);
    const daysSince = Math.round((today - lastContact) / 86400000);

    const isDue = daysSince >= settings.interval;
    const followupCount = parseInt(row[COL.FOLLOWUP_COUNT - 1]) || 0;
    const msgType = followupCount >= settings.maxFollowups - 1 ? "Break-up"
                  : followupCount === 0 ? "Friendly"
                  : "Professional";

    if (isDue) {
      stats.dueToday++;
      dueList.push({
        row: i + 1,
        client: row[COL.CLIENT - 1],
        project: row[COL.PROJECT - 1],
        days: daysSince,
        followupCount,
        msgType,
        amount: row[COL.PROPOSAL_AMOUNT - 1],
        draft: row[COL.AUTO_DRAFT - 1] || "",
      });
    }
  }

  return { stats, dueList, settings };
}

function markRowFollowedUp(rowIndex) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const settingsSheet = ss.getSheetByName(SETTINGS_SHEET);
  const settings = settingsSheet ? getSettings(settingsSheet) : { interval: 3 };
  
  const today = new Date();
  const currentCount = parseInt(sheet.getRange(rowIndex, COL.FOLLOWUP_COUNT).getValue()) || 0;

  sheet.getRange(rowIndex, COL.LAST_FOLLOWUP).setValue(today);
  sheet.getRange(rowIndex, COL.FOLLOWUP_COUNT).setValue(currentCount + 1);
  sheet.getRange(rowIndex, COL.STATUS).setValue("📨 Followed Up");
  sheet.getRange(rowIndex, COL.AUTO_DRAFT).setValue("");

  const nextDate = new Date(today);
  nextDate.setDate(nextDate.getDate() + settings.interval);
  sheet.getRange(rowIndex, COL.NEXT_FOLLOWUP).setValue(nextDate);

  logActivity(ss, sheet.getRange(rowIndex, COL.CLIENT).getValue(),
    sheet.getRange(rowIndex, COL.PROJECT).getValue(), "Followed Up", currentCount + 1, "Dashboard");

  refreshHeatmap();
  return getDashboardData();
}

function generateDraftForRow(rowIndex) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const settingsSheet = ss.getSheetByName(SETTINGS_SHEET);
  const settings = getSettings(settingsSheet);

  const clientName = sheet.getRange(rowIndex, COL.CLIENT).getValue();
  const project = sheet.getRange(rowIndex, COL.PROJECT).getValue();
  const followupCount = parseInt(sheet.getRange(rowIndex, COL.FOLLOWUP_COUNT).getValue()) || 0;

  const msgType = followupCount >= settings.maxFollowups - 1 ? "BREAKUP"
                : followupCount === 0 ? "FRIENDLY"
                : "PROFESSIONAL";

  const draft = generateDraftMessage(clientName, project, settings, msgType);
  const fullText = `[${msgType}]\n${draft}`;
  
  sheet.getRange(rowIndex, COL.AUTO_DRAFT).setValue(fullText);
  return fullText;
}
