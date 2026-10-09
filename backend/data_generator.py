import os
import csv
import json
import sqlite3

def generate_sample_files():
    base_dir = os.path.join(os.path.dirname(__file__), "sample_data")
    os.makedirs(base_dir, exist_ok=True)
    db_path = os.path.join(base_dir, "carrot_records.db")

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS records (
            id TEXT PRIMARY KEY,
            category TEXT,
            title TEXT,
            department TEXT,
            amount REAL,
            attendance_rate REAL,
            status TEXT,
            priority TEXT,
            source_file TEXT,
            source_location TEXT,
            region TEXT,
            fields_json TEXT,
            has_conflict INTEGER,
            has_missing_info INTEGER
        )
    """)
    cur.execute("DELETE FROM records")

    # 1. Employee Directory (350 records)
    departments = ['CSE', 'ECE', 'Mechanical', 'IT', 'Finance', 'Civil', 'Operations']
    missing_phone_ids = {'EMP114', 'EMP138', 'EMP172', 'EMP211', 'EMP263', 'EMP315', 'EMP348'}
    
    emp_dir_rows = []
    for i in range(1, 351):
        emp_id = f"EMP{i:03d}"
        dept = 'CSE' if i <= 80 else departments[i % len(departments)]
        phone = "" if emp_id in missing_phone_ids else f"+91 98{10000000 + i * 231}"[:14]
        desig = "Sr. Software Engineer" if emp_id == "EMP109" else ("Lead Engineer" if i % 5 == 0 else "Staff Specialist")
        
        row = {
            "Employee ID": emp_id,
            "Full Name": f"Staff Member {i:03d}",
            "Department": dept,
            "Designation": desig,
            "Email": f"staff.{emp_id.lower()}@carrot.internal",
            "Phone": phone,
            "Office Location": "Block B, Tech Campus"
        }
        emp_dir_rows.append(row)

    with open(os.path.join(base_dir, "Employee_Directory.csv"), "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(emp_dir_rows[0].keys()))
        writer.writeheader()
        writer.writerows(emp_dir_rows)

    # 2. Employee Attendance (350 records, 23 CSE < 75%)
    cse_low_rates = {
        'EMP102': 72, 'EMP187': 68, 'EMP341': 73, 'EMP108': 71, 'EMP119': 69,
        'EMP125': 74, 'EMP142': 67, 'EMP156': 70, 'EMP163': 73, 'EMP177': 66,
        'EMP192': 74, 'EMP205': 68, 'EMP218': 71, 'EMP231': 73, 'EMP244': 70,
        'EMP257': 65, 'EMP269': 72, 'EMP281': 74, 'EMP295': 69, 'EMP308': 71,
        'EMP320': 67, 'EMP333': 73, 'EMP349': 68
    }

    emp_att_rows = []
    for i in range(1, 351):
        emp_id = f"EMP{i:03d}"
        dept = 'CSE' if i <= 80 or emp_id in cse_low_rates else departments[i % len(departments)]
        att = cse_low_rates.get(emp_id, 82 + ((i * 7) % 17))
        trend = "Continuously Decreasing (Last 3 Mo: 81% -> 74% -> " + str(att) + "%)" if emp_id in {'EMP187', 'EMP142', 'EMP257'} else "Stable"
        desig = "Technical Lead" if emp_id == "EMP109" else ("Lead Engineer" if i % 5 == 0 else "Staff Specialist")
        
        row = {
            "Employee ID": emp_id,
            "Department": dept,
            "Quarterly Attendance %": att,
            "Attendance Trend": trend,
            "Leave Balance Days": 14,
            "Recorded Role": desig,
            "Threshold Status": "At Risk (<75%)" if att < 75 else "Compliant"
        }
        emp_att_rows.append(row)

        # Insert into SQLite
        cur.execute("""
            INSERT INTO records VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            emp_id, 'employee', f"Employee {emp_id} - {dept}", dept, None, att,
            "At Risk" if att < 75 else "Normal",
            "critical" if att < 70 else ("high" if att < 75 else "low"),
            "Employee_Attendance.xlsx", f"Row {i + 1}", None,
            json.dumps(row), 1 if emp_id == 'EMP109' else 0,
            1 if emp_id in missing_phone_ids else 0
        ))

    with open(os.path.join(base_dir, "Employee_Attendance.csv"), "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(emp_att_rows[0].keys()))
        writer.writeheader()
        writer.writerows(emp_att_rows)

    # 3. Vendor Invoices (250 records)
    regions = ['Tamil Nadu', 'Karnataka', 'Maharashtra', 'Delhi NCR', 'Telangana']
    inv_rows = []
    tn_count = 0
    tn_overdue = 0

    for i in range(1, 251):
        inv_id = f"INV-{8800 + i}"
        is_mismatch = (inv_id == 'INV-8821')
        amount = 118500 if is_mismatch else (52000 + ((i * 3470) % 75000) if i <= 42 else 12000 + ((i * 1230) % 36000))
        
        region = regions[i % len(regions)]
        is_overdue = False
        if amount > 50000 and tn_count < 17 and (i % 2 == 0 or tn_count < 10):
            region = 'Tamil Nadu'
            tn_count += 1
            if tn_overdue < 5:
                is_overdue = True
                tn_overdue += 1

        row = {
            "Invoice Number": inv_id,
            "PO Reference": "PO-4091" if is_mismatch else f"PO-{4090 + (i % 80)}",
            "Vendor Name": "Apex Cloud Infrastructure Ltd." if is_mismatch else f"Vendor {chr(65 + (i % 26))} Solutions",
            "Amount (INR)": amount,
            "Region": region,
            "Due Date": "2026-09-15" if is_overdue else "2026-10-30",
            "Payment Status": "OVERDUE" if is_overdue else ("Settled" if i % 3 == 0 else "Pending Verification"),
            "Tax GSTIN": "" if inv_id == 'INV-9042' else f"33AABCT{2000 + i}K1ZZ"
        }
        inv_rows.append(row)

        cur.execute("""
            INSERT INTO records VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            inv_id, 'invoice', f"Invoice {inv_id} (₹{amount:,})", None, amount, None,
            "Overdue" if is_overdue else ("Paid" if i % 3 == 0 else "Pending Verification"),
            "critical" if is_mismatch else ("high" if is_overdue else "medium"),
            "Vendor_Invoices_Q3.csv", f"Row {i + 1}", region,
            json.dumps(row), 1 if is_mismatch else 0,
            1 if inv_id == 'INV-9042' else 0
        ))

    with open(os.path.join(base_dir, "Vendor_Invoices_Q3.csv"), "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(inv_rows[0].keys()))
        writer.writeheader()
        writer.writerows(inv_rows)

    # 4. Purchase Orders (100 records)
    po_rows = []
    for i in range(1, 101):
        po_id = f"PO-{4090 + i}"
        amount = 100000 if po_id == 'PO-4091' else 45000 + ((i * 2100) % 90000)
        approver = "" if po_id == 'PO-4102' else "VP of Engineering"
        row = {
            "PO Number": po_id,
            "Approved Amount (INR)": amount,
            "Vendor": "Apex Cloud Infrastructure Ltd." if po_id == 'PO-4091' else "Vendor Global Corp",
            "Approver Signature": approver,
            "Status": "Awaiting Signature" if approver == "" else "Approved",
            "Cost Center": "CC-IT-INFRA-902",
            "Issue Date": "2026-08-20"
        }
        po_rows.append(row)

        cur.execute("""
            INSERT INTO records VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            po_id, 'purchase_order', f"Purchase Order {po_id}", None, amount, None,
            row["Status"], "critical" if po_id == 'PO-4091' else "medium",
            "Purchase_Orders_Q3.xlsx", f"Row {i + 1}", None,
            json.dumps(row), 1 if po_id == 'PO-4091' else 0,
            1 if po_id == 'PO-4102' else 0
        ))

    with open(os.path.join(base_dir, "Purchase_Orders_Q3.csv"), "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(po_rows[0].keys()))
        writer.writeheader()
        writer.writerows(po_rows)

    # 5. Project Tasks (200 records)
    for i in range(1, 201):
        task_id = f"TSK-{1000 + i}"
        is_delayed = (task_id == 'TSK-1034')
        is_deadline = (task_id == 'TSK-1015')
        title = "Task Alpha-34: API Gateway Latency Optimization" if is_delayed else ("Project Alpha Milestone: Phase 2 Final Delivery" if is_deadline else f"Project Alpha Sprint Item {i}")
        status = "Delayed (+8 Days)" if is_delayed else ("Completed" if i % 4 == 0 else "In Progress")

        task_row = {
            "Task ID": task_id,
            "Project": "Project Alpha",
            "Assignee": "EMP187 (CSE)" if is_delayed else f"EMP{100 + (i % 50):03d}",
            "Deadline": "15 Oct 2026 (Charter) vs 20 Oct 2026 (Update)" if is_deadline else "2026-10-25",
            "Status": status
        }

        cur.execute("""
            INSERT INTO records VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            task_id, 'task', title, "Engineering / CSE", None, None,
            status, "critical" if (is_delayed or is_deadline) else "low",
            "Project_Alpha_Status_Update.docx", f"Section 3.{i % 5}", None,
            json.dumps(task_row), 1 if is_deadline else 0, 0
        ))

    # 6. Customer Complaints (150 records)
    cmp_topics = [
        'Payment gateway timeout and auto-debit failure',
        'Hardware display flicker on workstation',
        'VPN authentication rejected repeatedly',
        'Double invoice debit detected on credit card',
        'Database latency spike during peak checkout'
    ]
    for i in range(1, 151):
        cmp_id = f"CMP-{5000 + i}"
        is_payment = (i <= 24 or i % 5 == 0)
        is_sla = (i <= 3)
        desc = "Card debited ₹54,200 but subscription status not renewed. Payment gateway responded with code 504 timeout." if is_payment else cmp_topics[i % len(cmp_topics)]
        status = "Escalated / SLA Breached" if is_sla else ("Resolved" if i % 2 == 0 else "Investigating")

        cmp_row = {
            "Ticket ID": cmp_id,
            "Category": "Payment & Billing" if is_payment else "IT System",
            "Description": desc,
            "SLA Status": "CRITICAL - SLA 48h Violated" if is_sla else "Within SLA"
        }

        cur.execute("""
            INSERT INTO records VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            cmp_id, 'complaint', f"Dispute {cmp_id}: {desc[:40]}...", "Billing & Support", None, None,
            status, "critical" if is_sla else ("high" if is_payment else "medium"),
            "Customer_Support_Complaints.csv", f"Row {i + 1}", None,
            json.dumps(cmp_row), 0, 0
        ))

    # 6. Microsoft Company Profile records
    msft_records = [
        (
            "MSFT-1001", "company_profile", "Microsoft Corporate Profile", "Executive",
            0.0, 100.0, "Verified", "high", "Microsoft_Company_Profile.pdf", "Page 1, Company Profile Table", "Redmond, WA",
            json.dumps({
                "Company": "Microsoft Corporation",
                "Founded": "April 4, 1975",
                "Founders": "Bill Gates and Paul Allen",
                "Headquarters": "Redmond, Washington, United States",
                "CEO": "Satya Nadella",
                "Ticker": "NASDAQ: MSFT",
                "Mission": "To empower every person and every organization on the planet to achieve more."
            }), 0, 0
        ),
        (
            "MSFT-1002", "milestone", "Microsoft Founding & History (1975)", "Strategy",
            0.0, 100.0, "Active", "high", "Microsoft_Company_Profile.pdf", "Page 2, Section 3 (Milestones)", "Redmond, WA",
            json.dumps({
                "Year": "1975",
                "Event": "Bill Gates and Paul Allen founded Microsoft to develop software for personal computers",
                "Location": "Redmond, WA"
            }), 0, 0
        ),
        (
            "MSFT-1003", "financial", "Microsoft FY2025 Financial Performance", "Finance",
            281700000000.0, 100.0, "Audited", "critical", "Microsoft_Company_Profile.pdf", "Page 5, Section 8 (Financial Snapshot)", "Global",
            json.dumps({
                "Fiscal_Year": "2025",
                "Revenue": "US$281.7 billion",
                "Operating_Income": "US$128.5 billion",
                "Microsoft_Cloud_Revenue": "US$168.9 billion",
                "Period_Ended": "June 30, 2025"
            }), 0, 0
        ),
        (
            "MSFT-1004", "executive", "Satya Nadella — Chairman & CEO", "Executive",
            0.0, 100.0, "Active", "high", "Microsoft_Company_Profile.pdf", "Page 5, Section 10 (Leadership)", "Redmond, WA",
            json.dumps({
                "Name": "Satya Nadella",
                "Role": "Chairman and Chief Executive Officer",
                "Appointment_Year": "2014",
                "Status": "Current CEO as of Oct. 2026"
            }), 0, 0
        ),
        (
            "MSFT-1005", "segment", "Microsoft 3 Business Segments", "Strategy",
            0.0, 100.0, "Active", "medium", "Microsoft_Company_Profile.pdf", "Page 4, Section 6 (Business Segments)", "Global",
            json.dumps({
                "Segment_1": "Productivity and Business Processes (M365, Teams, LinkedIn, Dynamics)",
                "Segment_2": "Intelligent Cloud (Azure, Cloud Infrastructure)",
                "Segment_3": "More Personal Computing (Windows, Xbox, Surface, Search)"
            }), 0, 0
        ),
        (
            "MSFT-1006", "sustainability", "Microsoft 2030 Environmental Goals", "Sustainability",
            0.0, 100.0, "Target", "medium", "Microsoft_Company_Profile.pdf", "Page 6, Section 12 (Sustainability)", "Global",
            json.dumps({
                "Target_Year": "2030",
                "Carbon_Goal": "Carbon Negative",
                "Water_Goal": "Water Positive",
                "Waste_Goal": "Zero Waste"
            }), 0, 0
        )
    ]
    for m in msft_records:
        cur.execute("INSERT OR REPLACE INTO records VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", m)

    # Commit SQLite records
    conn.commit()
    count = cur.execute("SELECT COUNT(*) FROM records").fetchone()[0]
    conn.close()

    # Documentation files
    with open(os.path.join(base_dir, "Project_Alpha_Charter.txt"), "w", encoding="utf-8") as f:
        f.write("""PROJECT ALPHA CHARTER & ARCHITECTURE BASELINE
Document Reference: DOC-ALPHA-2026-V1
Executive Sponsor: VP of Engineering
Section 4.2 - Phase 2 Final Delivery:
Delivery of production-hardened microservices scheduled strictly for 15 October 2026.
""")

    with open(os.path.join(base_dir, "Project_Alpha_Status_Update.txt"), "w", encoding="utf-8") as f:
        f.write("""PROJECT ALPHA WEEKLY ENGINEERING STATUS REPORT
Document Reference: UPDATE-2026-W38
Status: AT RISK
Section 3.4 - Task Alpha-34: API Gateway Latency Optimization
Assignee: EMP187 (Staff Member 187, CSE Department)
Current Status: Delayed (+8 Days)
Section 3.1 - Phase 2 Milestone:
Revised target for Milestone 2.0 has been slid to 20 October 2026 due to backend latency profiling.
""")

    print(f"Successfully generated {count} records in {db_path} and CSVs in {base_dir}")

if __name__ == "__main__":
    generate_sample_files()
