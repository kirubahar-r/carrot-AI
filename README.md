# CARROT AI — Intelligent Information Search, Understanding & Decision Engine

> **"Give CARROT thousands of pieces of information. Ask one question. Get the specific information you need, backed by evidence."**

CARROT AI is an enterprise-grade information intelligence and decision platform that bridges unstructured documents (**PDF, DOCX, TXT, OCR Images**) and structured data (**CSV, XLSX**) to solve the **PS01 Smart Automation** problem: **Find → Understand → Organize → Use information**.

---

## 🚀 Quick Start (1-Click Launch)

### Option A: Using the Windows Batch script
Double-click `start.bat` in this folder, or run:
```cmd
start.bat
```

### Option B: Using PowerShell
```powershell
.\start.ps1
```

### Option C: Manual Start

**1. Start Backend:**
```powershell
cd backend
py -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
*Backend runs on: `http://127.0.0.1:8000` (API Docs at `http://127.0.0.1:8000/docs`)*

**2. Start Frontend:**
```powershell
cd frontend
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

---

## 📁 Project Directory Structure

```
carrot-ai/
│
├── start.bat                   # 1-Click Windows batch launcher
├── start.ps1                   # 1-Click PowerShell launcher
├── README.md                   # Complete documentation & demo guide
│
├── frontend/                   # React 19 + TypeScript + Tailwind CSS
│   ├── index.html              # Modern dark SaaS shell with CARROT branding
│   ├── package.json            # Frontend dependencies
│   ├── tailwind.config.js      # Custom theme colors & surfaces
│   ├── src/
│   │   ├── App.tsx             # Root view coordinator & state
│   │   ├── main.tsx            # React bootstrap
│   │   ├── types/index.ts      # TypeScript definitions (Records, Queries, Citations)
│   │   ├── data/demoData.ts    # 1,050 pre-indexed records & graph nodes
│   │   ├── services/
│   │   │   └── queryEngine.ts  # Dual Live-API & instant local query engine
│   │   └── components/
│   │       ├── Navbar.tsx      # CARROT AI Logo, workspace switcher & status pills
│   │       ├── Sidebar.tsx     # Navigation & badge counters
│   │       ├── LandingPage.tsx # Hero landing page & workflow
│   │       ├── SourceInspectorModal.tsx # Grounded evidence viewer
│   │       └── views/
│   │           ├── AskAIView.tsx              # Precision Answer Engine
│   │           ├── InformationDetectiveView.tsx # Conflicts, Missing Info & Diffs
│   │           ├── InformationMapView.tsx     # Interactive SVG entity network
│   │           ├── AttentionCenterView.tsx    # Critical/High/Medium/Low triage
│   │           ├── DashboardView.tsx          # Analytics KPIs & Ingestion status
│   │           ├── DocumentsView.tsx          # Multi-format uploader & chunks
│   │           ├── RecordsView.tsx            # 1,050 records tabular explorer
│   │           └── SettingsView.tsx           # Anti-hallucination & RAG tuning
│
└── backend/                    # Python FastAPI + SQLite Engine
    ├── requirements.txt        # Backend dependencies
    ├── main.py                 # FastAPI REST API endpoints
    ├── data_generator.py       # Physical sample file & SQLite generator
    └── sample_data/            # Physical datasets on disk
        ├── Employee_Directory.csv
        ├── Employee_Attendance.csv
        ├── Vendor_Invoices_Q3.csv
        ├── Purchase_Orders_Q3.csv
        ├── Project_Alpha_Charter.txt
        ├── Project_Alpha_Status_Update.txt
        ├── Customer_Support_Complaints.csv
        └── carrot_records.db   # SQLite database (1,050 indexed records)
```

---

## 🌟 Core Features & Innovations

### 1. Precision Answer Engine (Ask AI)
- **Central Query Box**: `"Ask anything about your information..."`
- **Zero Data Dumping**: Asking *"Find CSE employees with attendance below 75%"* does NOT return all 1,000 records. It returns **23 matching records found from 1,000 records** in a structured table.
- **Explainability**: Transparent **"Why this answer?"** breakdown of criteria applied.
- **Clickable Source Evidence**: Cites physical files and locations (e.g. `Employee_Attendance.xlsx — Rows 102, 187, 341...`, `Attendance_Report.pdf — Page 4`).
- **Source Inspector Modal**: Click **"View Source"** to inspect exact excerpts and verified match percentages.
- **Multi-Turn Context Refinement**:
  - Turn 1: *"Show invoices above ₹50,000."* → Returns 42 invoices.
  - Turn 2: *"Only from Tamil Nadu."* → Filters the previous subset to 17 matching invoices.
  - Turn 3: *"Which ones are overdue?"* → Filters to 5 overdue invoices.
- **Anti-Hallucination Guardrail**: When queried on out-of-scope topics (e.g. *"What is the NASA rocket budget on Mars?"*), responds:
  > *"I couldn't find sufficient information in the uploaded sources. CARROT AI prioritizes verified facts from your uploaded documents and avoids inventing or hallucinating answers."*

### 2. Information Detective
- 🔴 **Conflicts**: Detects cross-source discrepancies:
  - **Financial**: PO-4091 approved for ₹100,000 vs Invoice INV-8821 billed for ₹118,500 (**₹18,500 unauthorized variance**).
  - **Timeline**: Project Alpha deadline is 15 October in Charter vs 20 October in Status Update.
  - **HR Designation**: EMP109 listed as Senior Engineer in Directory vs Tech Lead in Attendance.
- 🟠 **Missing Information**: Automatically flags 7 missing phone numbers, missing managerial signature on PO-4102, and missing GSTIN on INV-9042.
- 🟡 **Duplicates**: Catches repeated submissions (INV-8890).
- 🔵 **Important / Anomalies**: Detects 3 engineers with continuously declining attendance (EMP187, EMP142, EMP257), high-value overdue invoices, and delayed blockers.
- **Direct Action Triggers**: "Hold Payment on INV-8821", "Convene Steering Committee", "Remind Employees".

### 3. Information Map (Visual Network Graph)
- Interactive SVG network diagram:
  **Project Alpha** → **CSE Department** → **EMP187** → **Task Alpha-34** → **Apex Cloud Infrastructure** → **PO-4091** & **Invoice INV-8821** (with ₹18,500 discrepancy edge).
- Click any node to open the inspector drawer displaying connected edges, attributes, and source files.

### 4. Attention Center (Smart Priority System)
- Priority triage inbox:
  - 🔴 **Critical — 3 items**
  - 🟠 **High — 12 items**
  - 🟡 **Medium — 27 items**
  - 🟢 **Low — 84 items**

### 5. Document Knowledge Base & Records Explorer
- **Documents View**: Ingestion dropzone for PDF, DOCX, XLSX, CSV, TXT & Scanned Images (OCR) with chunk statistics and summaries.
- **Records Explorer**: Paginated, filterable grid over **1,050 records** with zero UI lag.

### 6. Landing Page
- Headline: *"Turn 1,000+ pieces of information into one clear answer."*
- Subheading: *"CARROT AI finds, understands, connects and explains the information that matters."*
- Workflow: **Upload → Understand → Search → Detect → Decide**.

---

## 🏆 Hackathon Demo Script (3-Minute Winning Presentation)

1. **The Hook (Landing Page)**:
   - Open `http://localhost:5173/`.
   - Explain: *"Traditional chatbots either summarize documents vaguely or dump 1,000 records. CARROT AI is an Intelligent Information Search, Understanding & Decision Engine."*
   - Click **"Try Demo"**.

2. **The Knowledge Scale (Dashboard)**:
   - Show the KPI banner: **1,050 records** indexed across **8 mixed formats** (PDF, Excel, Word, CSV, OCR).
   - Point out the active alert: **Financial Discrepancy detected**.

3. **Precision Answer Engine (Ask AI)**:
   - Click preset query: *"Find CSE employees with attendance below 75%"*.
   - Point to the result badge: **23 matching records found from 1,000 records**.
   - Show the table, the **Why this answer?** explanation, and click **"View Source Document"** to reveal the evidence modal.
   - Click follow-up preset: *"Which of these have attendance continuously decreasing?"*.
   - Show how it isolates EMP187, EMP142, and EMP257 with historical monthly trends.

4. **The Detective (Discrepancy & Conflict Detection)**:
   - Click **Information Detective** in the sidebar.
   - Show the 🔴 **Financial Discrepancy** card: PO-4091 approved for ₹100,000 vs Invoice INV-8821 billed for ₹118,500 (**₹18,500 mismatch**).
   - Show the 🔴 **Project Alpha Deadline Mismatch**: 15 October in Charter vs 20 October in Status Update.
   - Click **"Execute Action"** to demonstrate immediate decision-making.

5. **Entity Connection (Information Map)**:
   - Click **Information Map** to show how Project Alpha connects to EMP187, the delayed task Alpha-34, and the disputed invoice.

6. **Anti-Hallucination Proof**:
   - Ask: *"What is the NASA rocket budget on Mars?"*.
   - Show that CARROT strictly refuses to hallucinate: *"I couldn't find sufficient information in the uploaded sources."*

---

## 💻 Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend**: Python 3.11, FastAPI, Uvicorn, SQLite3, Pydantic
- **Data**: Pre-indexed realistic enterprise dataset (1,050 records across HR, Procurement, Finance, IT)
#   c a r r o t A I  
 #   c a r r o t A I  
 