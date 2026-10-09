import { RecordItem, DocumentItem, FindingItem, GraphNode, GraphEdge, WorkspaceInfo } from '../types';

export const DEMO_WORKSPACE: WorkspaceInfo = {
  id: 'workspace-demo-company',
  name: 'Company Operations Demo',
  description: 'Enterprise knowledge base across HR, Finance, Procurement, Project Alpha, and IT Helpdesk.',
  totalDocuments: 8,
  totalRecords: 1050,
  lastUpdated: 'Just now',
  isDemo: true,
};

export const DEMO_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'Employee_Directory.xlsx',
    type: 'xlsx',
    size: '1.4 MB',
    recordsCount: 350,
    chunksCount: 350,
    uploadedAt: 'Today at 09:15 AM',
    status: 'indexed',
    summary: 'Master directory of all 350 active enterprise staff across 6 departments with contact info and roles.',
    highlights: ['Detected 7 missing phone numbers', 'Role designations cross-verified']
  },
  {
    id: 'doc-2',
    name: 'Employee_Attendance.xlsx',
    type: 'xlsx',
    size: '890 KB',
    recordsCount: 350,
    chunksCount: 350,
    uploadedAt: 'Today at 09:16 AM',
    status: 'indexed',
    summary: 'Quarterly attendance tracking, biometric logs, leave balance, and calculated percentage attendance.',
    highlights: ['23 CSE employees have attendance below 75%', '3 employees have consecutive decreasing trend']
  },
  {
    id: 'doc-3',
    name: 'Attendance_Report.pdf',
    type: 'pdf',
    size: '2.1 MB',
    recordsCount: 100,
    chunksCount: 24,
    uploadedAt: 'Today at 09:17 AM',
    status: 'indexed',
    summary: 'Executive PDF summary report highlighting academic & operational department biometric thresholds.',
    highlights: ['Page 4 explicitly flags critical CSE attendance deficit (< 75% threshold warning)']
  },
  {
    id: 'doc-4',
    name: 'Vendor_Invoices_Q3.csv',
    type: 'csv',
    size: '640 KB',
    recordsCount: 250,
    chunksCount: 250,
    uploadedAt: 'Today at 09:18 AM',
    status: 'indexed',
    summary: 'Raw payable invoices from suppliers, contractors, and cloud vendors across regional offices.',
    highlights: ['42 invoices above ₹50,000', '17 invoices from Tamil Nadu (5 overdue)', 'INV-8821 amount: ₹118,500']
  },
  {
    id: 'doc-5',
    name: 'Purchase_Orders_Q3.xlsx',
    type: 'xlsx',
    size: '1.1 MB',
    recordsCount: 250,
    chunksCount: 250,
    uploadedAt: 'Today at 09:19 AM',
    status: 'indexed',
    summary: 'Internal approved procurement orders with cost center codes, authorized amounts, and terms.',
    highlights: ['PO-4091 approved for ₹100,000 (Mismatch with Invoice INV-8821 for ₹118,500)', 'PO-4102 missing managerial signoff']
  },
  {
    id: 'doc-6',
    name: 'Project_Alpha_Charter.pdf',
    type: 'pdf',
    size: '3.4 MB',
    recordsCount: 120,
    chunksCount: 32,
    uploadedAt: 'Today at 09:20 AM',
    status: 'indexed',
    summary: 'Project Alpha baseline specifications, architecture deliverables, core team allocation, and milestones.',
    highlights: ['Page 12 sets official Phase 2 delivery deadline as 15 October 2026']
  },
  {
    id: 'doc-7',
    name: 'Project_Alpha_Status_Update.docx',
    type: 'docx',
    size: '780 KB',
    recordsCount: 80,
    chunksCount: 18,
    uploadedAt: 'Today at 09:21 AM',
    status: 'indexed',
    summary: 'Weekly operational engineering sync document discussing sprint progress, blockers, and timelines.',
    highlights: ['Section 3 states revised Phase 2 deadline is 20 October 2026', 'Delayed task Alpha-34: API Gateway Latency']
  },
  {
    id: 'doc-8',
    name: 'Customer_Support_Complaints.csv',
    type: 'csv',
    size: '520 KB',
    recordsCount: 150,
    chunksCount: 150,
    uploadedAt: 'Today at 09:22 AM',
    status: 'indexed',
    ocrApplied: true,
    summary: 'Zendesk and scanned customer dispute tickets regarding payment gateways, hardware, and billing.',
    highlights: ['18 complaints regarding payment gateway timeout and double debits', '3 urgent SLA breaches']
  },
  {
    id: 'doc-9',
    name: 'Microsoft_Company_Profile.pdf',
    type: 'pdf',
    size: '1.8 MB',
    recordsCount: 6,
    chunksCount: 14,
    uploadedAt: 'User Upload',
    status: 'indexed',
    summary: 'Educational corporate profile covering Microsoft history, products, business model, financials, and SWOT analysis.',
    highlights: ['Founded April 4, 1975 by Bill Gates and Paul Allen', 'FY2025 Revenue: US$281.7B, Cloud: US$168.9B', 'Satya Nadella Chairman & CEO']
  }
];

// Generate 1,050 Realistic Records
export function generateDemoRecords(): RecordItem[] {
  const records: RecordItem[] = [];

  // 1. Employees: 350 records
  const departments = ['CSE', 'ECE', 'Mechanical', 'IT', 'Finance', 'Civil', 'Operations'];
  const cseLowAttendanceIds = [
    'EMP102', 'EMP187', 'EMP341', 'EMP108', 'EMP119', 'EMP125', 'EMP142', 'EMP156', 
    'EMP163', 'EMP177', 'EMP192', 'EMP205', 'EMP218', 'EMP231', 'EMP244', 'EMP257',
    'EMP269', 'EMP281', 'EMP295', 'EMP308', 'EMP320', 'EMP333', 'EMP349'
  ]; // Exactly 23 CSE employees below 75%

  const cseLowAttendanceRates: Record<string, number> = {
    EMP102: 72,
    EMP187: 68,
    EMP341: 73,
    EMP108: 71,
    EMP119: 69,
    EMP125: 74,
    EMP142: 67,
    EMP156: 70,
    EMP163: 73,
    EMP177: 66,
    EMP192: 74,
    EMP205: 68,
    EMP218: 71,
    EMP231: 73,
    EMP244: 70,
    EMP257: 65,
    EMP269: 72,
    EMP281: 74,
    EMP295: 69,
    EMP308: 71,
    EMP320: 67,
    EMP333: 73,
    EMP349: 68
  };

  const cseDecreasingTrendIds = ['EMP187', 'EMP142', 'EMP257']; // 3 continuously decreasing

  const missingPhoneIds = ['EMP114', 'EMP138', 'EMP172', 'EMP211', 'EMP263', 'EMP315', 'EMP348']; // 7 missing phone numbers

  for (let i = 1; i <= 350; i++) {
    const padded = String(i).padStart(3, '0');
    const id = `EMP${padded}`;
    const dept = (i <= 80 || cseLowAttendanceIds.includes(id)) 
      ? 'CSE' 
      : departments[i % departments.length];
    
    let attendance = 82 + ((i * 7) % 17);
    if (cseLowAttendanceIds.includes(id)) {
      attendance = cseLowAttendanceRates[id] || 71;
    }

    const hasMissingPhone = missingPhoneIds.includes(id);
    const hasTrend = cseDecreasingTrendIds.includes(id);

    records.push({
      id,
      category: 'employee',
      title: `Employee ${id} - ${dept}`,
      department: dept,
      attendanceRate: attendance,
      status: attendance < 75 ? 'At Risk' : 'Normal',
      priority: attendance < 70 ? 'critical' : attendance < 75 ? 'high' : 'low',
      sourceFile: 'Employee_Attendance.xlsx',
      sourceLocation: `Row ${i + 1}`,
      hasConflict: id === 'EMP109', // conflict in designation between HR and Directory
      hasMissingInfo: hasMissingPhone,
      fields: {
        'Employee ID': id,
        'Full Name': `Staff Member ${padded}`,
        'Department': dept,
        'Designation': id === 'EMP109' ? 'Sr. Software Engineer (Dir) / Tech Lead (HR)' : (i % 5 === 0 ? 'Lead Engineer' : 'Specialist'),
        'Attendance %': `${attendance}%`,
        'Email': `staff.${padded.toLowerCase()}@carrot.internal`,
        'Phone': hasMissingPhone ? 'MISSING' : `+91 98${(10000000 + i * 231).toString().slice(0, 8)}`,
        'Attendance Trend': hasTrend ? 'Continuously Decreasing (Last 3 Mo: 81% -> 74% -> ' + attendance + '%)' : 'Stable',
        'Biometric Check-in': '9:15 AM avg',
        'Assigned Projects': dept === 'CSE' ? 'Project Alpha' : 'Operations'
      }
    });
  }

  // 2. Invoices: 250 records
  const regions = ['Tamil Nadu', 'Karnataka', 'Maharashtra', 'Delhi NCR', 'Telangana'];
  let tnCount = 0;
  let tnOverdueCount = 0;

  for (let i = 1; i <= 250; i++) {
    const invId = `INV-${8800 + i}`;
    const poRef = `PO-${4090 + (i % 80)}`;
    const isSpecialMismatch = invId === 'INV-8821';
    const amount = isSpecialMismatch ? 118500 : (i <= 42 ? 52000 + ((i * 3470) % 75000) : 12000 + ((i * 1230) % 36000));
    
    // Assign regions carefully to meet: 42 invoices above ₹50,000, 17 from Tamil Nadu, 5 overdue
    let region = regions[i % regions.length];
    let isOverdue = false;

    if (amount > 50000) {
      if (tnCount < 17 && (i % 2 === 0 || tnCount < 10)) {
        region = 'Tamil Nadu';
        tnCount++;
        if (tnOverdueCount < 5) {
          isOverdue = true;
          tnOverdueCount++;
        }
      }
    }

    records.push({
      id: invId,
      category: 'invoice',
      title: `Invoice ${invId} (${isSpecialMismatch ? '₹118,500' : '₹' + amount.toLocaleString('en-IN')})`,
      amount,
      status: isOverdue ? 'Overdue' : (i % 3 === 0 ? 'Paid' : 'Pending Verification'),
      priority: isSpecialMismatch ? 'critical' : isOverdue ? 'high' : 'medium',
      sourceFile: 'Vendor_Invoices_Q3.csv',
      sourceLocation: `Row ${i + 1}`,
      date: `2026-09-${String((i % 28) + 1).padStart(2, '0')}`,
      region,
      hasConflict: isSpecialMismatch,
      hasMissingInfo: invId === 'INV-9042',
      fields: {
        'Invoice Number': invId,
        'PO Reference': isSpecialMismatch ? 'PO-4091 (PO Amount: ₹100,000)' : poRef,
        'Vendor Name': isSpecialMismatch ? 'Apex Cloud Infrastructure Ltd.' : `Vendor ${String.fromCharCode(65 + (i % 26))} Solutions`,
        'Amount (INR)': `₹${amount.toLocaleString('en-IN')}`,
        'Region': region,
        'Due Date': isOverdue ? '2026-09-15 (OVERDUE)' : '2026-10-30',
        'Payment Status': isOverdue ? 'OVERDUE' : (i % 3 === 0 ? 'Settled' : 'Pending Verification'),
        'Tax GSTIN': invId === 'INV-9042' ? 'MISSING' : `33AABCT${2000 + i}K1ZZ`,
        'Discrepancy': isSpecialMismatch ? '🔴 ₹18,500 higher than Purchase Order PO-4091' : 'None'
      }
    });
  }

  // 3. Purchase Orders: 100 records
  for (let i = 1; i <= 100; i++) {
    const poId = `PO-${4090 + i}`;
    const amount = poId === 'PO-4091' ? 100000 : 45000 + ((i * 2100) % 90000);
    const hasMissingSig = poId === 'PO-4102';

    records.push({
      id: poId,
      category: 'purchase_order',
      title: `Purchase Order ${poId}`,
      amount,
      status: hasMissingSig ? 'Awaiting Signature' : 'Approved',
      priority: poId === 'PO-4091' ? 'critical' : 'medium',
      sourceFile: 'Purchase_Orders_Q3.xlsx',
      sourceLocation: `Row ${i + 1}`,
      date: '2026-08-20',
      hasConflict: poId === 'PO-4091',
      hasMissingInfo: hasMissingSig,
      fields: {
        'PO Number': poId,
        'Approved Amount': `₹${amount.toLocaleString('en-IN')}`,
        'Vendor': poId === 'PO-4091' ? 'Apex Cloud Infrastructure Ltd.' : `Vendor Global Corp`,
        'Approver': hasMissingSig ? 'MISSING' : 'VP of Engineering',
        'Cost Center': 'CC-IT-INFRA-902',
        'Linked Invoice': poId === 'PO-4091' ? 'INV-8821 (Amount billed: ₹118,500)' : 'Matched'
      }
    });
  }

  // 4. Project Tasks: 200 records
  const projects = ['Project Alpha', 'Project Beta', 'Project Gamma'];
  for (let i = 1; i <= 200; i++) {
    const taskId = `TSK-${1000 + i}`;
    const isAlpha = i <= 90;
    const project = isAlpha ? 'Project Alpha' : projects[i % projects.length];
    const isDelayed = taskId === 'TSK-1034'; // Alpha-34
    const isDeadlineTask = taskId === 'TSK-1015';

    records.push({
      id: taskId,
      category: 'task',
      title: isDelayed 
        ? 'Task Alpha-34: API Gateway Latency Optimization' 
        : isDeadlineTask 
        ? 'Project Alpha Milestone: Phase 2 Final Delivery' 
        : `${project} Sprint Item ${i}`,
      department: 'Engineering / CSE',
      status: isDelayed ? 'Delayed (+8 Days)' : (i % 4 === 0 ? 'Completed' : 'In Progress'),
      priority: isDelayed || isDeadlineTask ? 'critical' : 'low',
      sourceFile: isDeadlineTask ? 'Project_Alpha_Charter.pdf' : 'Project_Alpha_Status_Update.docx',
      sourceLocation: isDeadlineTask ? 'Page 12' : `Section 3.4`,
      hasConflict: isDeadlineTask,
      fields: {
        'Task ID': taskId,
        'Project': project,
        'Assignee': isDelayed ? 'EMP187 (Staff Member 187, CSE)' : `EMP${String((i % 50) + 100).padStart(3, '0')}`,
        'Deadline': isDeadlineTask ? '15 Oct 2026 (Charter) vs 20 Oct 2026 (Update doc)' : '2026-10-25',
        'Status': isDelayed ? 'Delayed' : 'Active',
        'Blocker': isDelayed ? 'Downstream caching throughput bottlenecks' : 'None',
        'Source Reference': isDeadlineTask ? 'Project_Alpha_Charter.pdf [Page 12] & Project_Alpha_Status_Update.docx [Sec 3]' : 'Sprint board'
      }
    });
  }

  // 5. Customer & IT Complaints: 150 records
  const complaintTopics = [
    'Payment gateway timeout and auto-debit failure',
    'Hardware display flicker on workstation',
    'VPN authentication rejected repeatedly',
    'Double invoice debit detected on credit card',
    'Database latency spike during peak checkout'
  ];

  for (let i = 1; i <= 150; i++) {
    const cmpId = `CMP-${5000 + i}`;
    const isPaymentIssue = i <= 24 || i % 5 === 0;
    const isSlaBreach = i <= 3;

    records.push({
      id: cmpId,
      category: 'complaint',
      title: `Dispute ${cmpId}: ${isPaymentIssue ? 'Payment issue & transaction failure' : complaintTopics[i % complaintTopics.length]}`,
      department: 'Billing & Support',
      status: isSlaBreach ? 'Escalated / SLA Breached' : (i % 2 === 0 ? 'Resolved' : 'Investigating'),
      priority: isSlaBreach ? 'critical' : isPaymentIssue ? 'high' : 'medium',
      sourceFile: 'Customer_Support_Complaints.csv',
      sourceLocation: `Row ${i + 1}`,
      fields: {
        'Ticket ID': cmpId,
        'Customer / User': `Customer_Acc_${3000 + i}`,
        'Category': isPaymentIssue ? 'Payment & Billing' : 'IT System',
        'Description': isPaymentIssue 
          ? 'Card debited ₹54,200 but subscription status not renewed. Payment gateway responded with code 504 timeout.'
          : complaintTopics[i % complaintTopics.length],
        'SLA Status': isSlaBreach ? 'CRITICAL - SLA 48h Violated' : 'Within SLA',
        'Linked Invoice': isPaymentIssue ? `INV-${8800 + (i % 30)}` : 'N/A'
      }
    });
  }

  // 6. Microsoft Company Profile Records
  records.push(
    {
      id: 'MSFT-1001',
      category: 'company_profile',
      title: 'Microsoft Corporate Profile',
      department: 'Executive',
      status: 'Verified',
      priority: 'high',
      sourceFile: 'Microsoft_Company_Profile.pdf',
      sourceLocation: 'Page 1, Company Profile Table',
      fields: {
        'Company': 'Microsoft Corporation',
        'Founded': 'April 4, 1975',
        'Founders': 'Bill Gates and Paul Allen',
        'Headquarters': 'Redmond, Washington, United States',
        'CEO': 'Satya Nadella',
        'Ticker': 'NASDAQ: MSFT',
        'Mission': 'To empower every person and every organization on the planet to achieve more.'
      }
    },
    {
      id: 'MSFT-1002',
      category: 'milestone',
      title: 'Microsoft Founding & History (1975)',
      department: 'Strategy',
      status: 'Active',
      priority: 'high',
      sourceFile: 'Microsoft_Company_Profile.pdf',
      sourceLocation: 'Page 2, Section 3 (Milestones)',
      fields: {
        'Year': '1975',
        'Event': 'Bill Gates and Paul Allen founded Microsoft to develop software for personal computers',
        'Location': 'Redmond, WA'
      }
    },
    {
      id: 'MSFT-1003',
      category: 'financial',
      title: 'Microsoft FY2025 Financial Performance',
      department: 'Finance',
      amount: 281700000000,
      status: 'Audited',
      priority: 'critical',
      sourceFile: 'Microsoft_Company_Profile.pdf',
      sourceLocation: 'Page 5, Section 8 (Financial Snapshot)',
      fields: {
        'Fiscal_Year': '2025',
        'Revenue': 'US$281.7 billion',
        'Operating_Income': 'US$128.5 billion',
        'Microsoft_Cloud_Revenue': 'US$168.9 billion',
        'Period_Ended': 'June 30, 2025'
      }
    },
    {
      id: 'MSFT-1004',
      category: 'executive',
      title: 'Satya Nadella — Chairman & CEO',
      department: 'Executive',
      status: 'Active',
      priority: 'high',
      sourceFile: 'Microsoft_Company_Profile.pdf',
      sourceLocation: 'Page 5, Section 10 (Leadership)',
      fields: {
        'Name': 'Satya Nadella',
        'Role': 'Chairman and Chief Executive Officer',
        'Appointment_Year': '2014',
        'Status': 'Current CEO as of Oct. 2026'
      }
    },
    {
      id: 'MSFT-1005',
      category: 'segment',
      title: 'Microsoft 3 Business Segments',
      department: 'Strategy',
      status: 'Active',
      priority: 'medium',
      sourceFile: 'Microsoft_Company_Profile.pdf',
      sourceLocation: 'Page 4, Section 6 (Business Segments)',
      fields: {
        'Segment_1': 'Productivity and Business Processes (M365, Teams, LinkedIn, Dynamics)',
        'Segment_2': 'Intelligent Cloud (Azure, Cloud Infrastructure)',
        'Segment_3': 'More Personal Computing (Windows, Xbox, Surface, Search)'
      }
    },
    {
      id: 'MSFT-1006',
      category: 'sustainability',
      title: 'Microsoft 2030 Environmental Goals',
      department: 'Sustainability',
      status: 'Target',
      priority: 'medium',
      sourceFile: 'Microsoft_Company_Profile.pdf',
      sourceLocation: 'Page 6, Section 12 (Sustainability)',
      fields: {
        'Target_Year': '2030',
        'Carbon_Goal': 'Carbon Negative',
        'Water_Goal': 'Water Positive',
        'Waste_Goal': 'Zero Waste'
      }
    }
  );

  return records;
}

export const ALL_RECORDS = generateDemoRecords();

// Information Detective Findings (4 Categories: Conflicts, Missing, Duplicates, Important)
export const DETECTIVE_FINDINGS: FindingItem[] = [
  {
    id: 'det-1',
    type: 'conflict',
    priority: 'critical',
    title: 'Financial Discrepancy: PO Amount vs Billed Invoice Mismatch',
    description: 'Purchase Order PO-4091 was approved for ₹100,000, but supplier billed ₹118,500 on Invoice INV-8821, causing an unauthorized ₹18,500 discrepancy.',
    category: 'Finance & Procurement',
    sources: [
      {
        file: 'Purchase_Orders_Q3.xlsx',
        location: 'Row 2 (PO-4091)',
        snippet: 'PO Number: PO-4091 | Vendor: Apex Cloud Infrastructure Ltd. | Approved Amount: ₹100,000 | Status: Approved'
      },
      {
        file: 'Vendor_Invoices_Q3.csv',
        location: 'Row 22 (INV-8821)',
        snippet: 'Invoice: INV-8821 | Ref: PO-4091 | Vendor: Apex Cloud Infrastructure Ltd. | Amount: ₹118,500 | Status: Pending Verification'
      }
    ],
    diff: {
      field: 'Total Payable Amount',
      sourceA: 'Purchase_Orders_Q3.xlsx',
      valueA: '₹100,000',
      sourceB: 'Vendor_Invoices_Q3.csv',
      valueB: '₹118,500',
      discrepancyNote: '₹18,500 unauthorized variance (+18.5% over approved budget)'
    },
    recommendedAction: 'Hold payment on INV-8821 and issue formal vendor dispute note to Apex Cloud requesting credit note or PO amendment.',
    status: 'open'
  },
  {
    id: 'det-2',
    type: 'conflict',
    priority: 'critical',
    title: 'Project Alpha Phase 2 Delivery Deadline Mismatch',
    description: 'The Project Charter defines Phase 2 baseline deadline as 15 October 2026, while the latest Engineering Status Update specifies 20 October 2026.',
    category: 'Project Operations',
    sources: [
      {
        file: 'Project_Alpha_Charter.pdf',
        location: 'Page 12, Section 4.2',
        snippet: 'Milestone 2.0: Delivery of production-hardened microservices scheduled strictly for 15 October 2026.'
      },
      {
        file: 'Project_Alpha_Status_Update.docx',
        location: 'Page 3, Section 3.1',
        snippet: 'Revised target for Milestone 2.0 has been slid to 20 October 2026 due to backend latency profiling.'
      }
    ],
    diff: {
      field: 'Phase 2 Milestone Deadline',
      sourceA: 'Project_Alpha_Charter.pdf [Page 12]',
      valueA: '15 October 2026',
      sourceB: 'Project_Alpha_Status_Update.docx [Section 3]',
      valueB: '20 October 2026',
      discrepancyNote: '5-day delta without formal Steering Committee change request approval'
    },
    recommendedAction: 'Convene Project Alpha steering committee to ratify either 15 Oct or 20 Oct change control record.',
    status: 'open'
  },
  {
    id: 'det-3',
    type: 'conflict',
    priority: 'medium',
    title: 'Staff Title Mismatch for EMP109',
    description: 'Employee EMP109 is listed as "Senior Software Engineer" in the Directory, but listed as "Technical Lead" in the Attendance Management register.',
    category: 'Human Resources',
    sources: [
      {
        file: 'Employee_Directory.xlsx',
        location: 'Row 110',
        snippet: 'EMP109 | Staff Member 109 | Designation: Sr. Software Engineer | Band: L4'
      },
      {
        file: 'Employee_Attendance.xlsx',
        location: 'Row 110',
        snippet: 'EMP109 | Staff Member 109 | Role: Tech Lead | Approval Privileges: Active'
      }
    ],
    diff: {
      field: 'Role Designation',
      sourceA: 'Employee_Directory.xlsx',
      valueA: 'Sr. Software Engineer',
      sourceB: 'Employee_Attendance.xlsx',
      valueB: 'Technical Lead',
      discrepancyNote: 'Designation mismatch causes payroll band & signoff hierarchy divergence'
    },
    recommendedAction: 'Sync HRMS master database to confirm promotion status of EMP109.',
    status: 'open'
  },
  {
    id: 'det-4',
    type: 'missing',
    priority: 'high',
    title: 'Missing Emergency Contact Phone Numbers for 7 Personnel',
    description: 'Seven employee records in Employee_Directory.xlsx are missing phone numbers, violating mandatory contact compliance policy.',
    category: 'HR Compliance',
    sources: [
      {
        file: 'Employee_Directory.xlsx',
        location: 'Rows 115, 139, 173, 212, 264, 316, 349',
        snippet: 'Affected Employee IDs: EMP114, EMP138, EMP172, EMP211, EMP263, EMP315, EMP348. Field [Phone] is NULL.'
      }
    ],
    recommendedAction: 'Trigger automated notification email to the 7 employees to submit phone numbers via employee portal.',
    status: 'open'
  },
  {
    id: 'det-5',
    type: 'missing',
    priority: 'high',
    title: 'Missing Managerial Approval Signature on PO-4102',
    description: 'Purchase Order PO-4102 for ₹87,200 is missing the required VP of Engineering signoff signature in the procurement audit log.',
    category: 'Procurement Compliance',
    sources: [
      {
        file: 'Purchase_Orders_Q3.xlsx',
        location: 'Row 13 (PO-4102)',
        snippet: 'PO Number: PO-4102 | Amount: ₹87,200 | Approver: MISSING | Status: Awaiting Signature'
      }
    ],
    recommendedAction: 'Forward PO-4102 to Engineering Director queue for express signature.',
    status: 'open'
  },
  {
    id: 'det-6',
    type: 'missing',
    priority: 'medium',
    title: 'Missing Tax GSTIN on Invoice INV-9042',
    description: 'Vendor invoice INV-9042 for ₹68,400 does not include a valid GSTIN identification code required for tax credit claim.',
    category: 'Tax & Compliance',
    sources: [
      {
        file: 'Vendor_Invoices_Q3.csv',
        location: 'Row 243 (INV-9042)',
        snippet: 'Invoice: INV-9042 | Vendor: Delta Logistics | GSTIN: MISSING'
      }
    ],
    recommendedAction: 'Request revised tax invoice with valid 15-character GSTIN before processing disbursement.',
    status: 'open'
  },
  {
    id: 'det-7',
    type: 'duplicate',
    priority: 'medium',
    title: 'Duplicate Submission Detected for Invoice INV-8890',
    description: 'Invoice INV-8890 from Vendor Kappa Solutions was ingested twice with identical line items and reference dates.',
    category: 'Accounts Payable',
    sources: [
      {
        file: 'Vendor_Invoices_Q3.csv',
        location: 'Row 91 & Row 92',
        snippet: 'INV-8890 duplicated entries: Amount ₹44,500, Timestamp 2026-09-12.'
      }
    ],
    recommendedAction: 'Cancel duplicate entry Row 92 and merge tracking ID to avoid double payment.',
    status: 'open'
  },
  {
    id: 'det-8',
    type: 'important',
    priority: 'critical',
    title: '23 CSE Employees with Attendance Deficit (< 75% Threshold)',
    description: '23 Computer Science & Engineering staff have quarterly attendance below the 75% required organizational threshold, directly affecting project delivery.',
    category: 'Department Health',
    sources: [
      {
        file: 'Employee_Attendance.xlsx',
        location: 'Multiple rows (CSE Dept)',
        snippet: 'EMP102 (72%), EMP187 (68%), EMP341 (73%), EMP177 (66%), EMP257 (65%)... Total 23 members.'
      },
      {
        file: 'Attendance_Report.pdf',
        location: 'Page 4',
        snippet: 'Departmental Warning: CSE division recorded collective attendance drop below acceptable baseline.'
      }
    ],
    recommendedAction: 'Schedule departmental review meeting with CSE department head and review leave justifications.',
    status: 'open'
  },
  {
    id: 'det-9',
    type: 'important',
    priority: 'high',
    title: '5 High-Value Invoices in Tamil Nadu Overdue (> ₹50,000)',
    description: '5 supplier invoices totaling ₹384,000 in the Tamil Nadu operating cluster are past their contractual due date.',
    category: 'Cash Flow & Vendor Relations',
    sources: [
      {
        file: 'Vendor_Invoices_Q3.csv',
        location: 'Rows 4, 12, 18, 26, 34',
        snippet: 'Overdue invoices: INV-8804, INV-8812, INV-8818, INV-8826, INV-8834. Due Date: 2026-09-15.'
      }
    ],
    recommendedAction: 'Expedite finance release batch for overdue Tamil Nadu vendor accounts to prevent service disruptions.',
    status: 'open'
  },
  {
    id: 'det-10',
    type: 'important',
    priority: 'high',
    title: 'Delayed Core Task Alpha-34 Blocking Project Alpha Delivery',
    description: 'Task Alpha-34 ("API Gateway Latency Optimization") assigned to EMP187 is delayed by 8 days, directly impacting Phase 2 milestone.',
    category: 'Engineering Milestones',
    sources: [
      {
        file: 'Project_Alpha_Status_Update.docx',
        location: 'Section 3.4',
        snippet: 'Alpha-34: API Gateway Latency Optimization | Status: Delayed (+8 Days) | Assignee: EMP187'
      }
    ],
    recommendedAction: 'Reassign senior engineer or pair program with EMP187 to clear downstream caching bottleneck.',
    status: 'open'
  }
];

// Interactive Graph Nodes and Edges for Information Map
export const GRAPH_NODES: GraphNode[] = [
  {
    id: 'node-proj-alpha',
    label: 'Project Alpha',
    type: 'project',
    categoryColor: '#6366f1',
    x: 400,
    y: 180,
    description: 'Core flagship engineering initiative. 200 tasks, 12 milestones.',
    connectedCount: 5,
    metrics: { 'Status': 'At Risk', 'Milestone 2.0': 'Conflict (15 vs 20 Oct)', 'Team': 'CSE Dept' },
    sourceFile: 'Project_Alpha_Charter.pdf'
  },
  {
    id: 'node-dept-cse',
    label: 'CSE Department',
    type: 'department',
    categoryColor: '#3b82f6',
    x: 220,
    y: 280,
    description: 'Computer Science & Engineering division. 80 staff members.',
    connectedCount: 4,
    metrics: { 'Headcount': '80', 'Deficit Staff (<75%)': '23 Members', 'Attendance Avg': '73.4%' },
    sourceFile: 'Employee_Attendance.xlsx'
  },
  {
    id: 'node-emp-187',
    label: 'EMP187 (Staff 187)',
    type: 'employee',
    categoryColor: '#ec4899',
    x: 120,
    y: 420,
    description: 'Senior backend engineer assigned to API Gateway Latency Optimization.',
    connectedCount: 3,
    metrics: { 'Attendance': '68% (Declining)', 'Task': 'Alpha-34 (Delayed)', 'Dept': 'CSE' },
    sourceFile: 'Employee_Directory.xlsx'
  },
  {
    id: 'node-task-34',
    label: 'Task Alpha-34 (API Latency)',
    type: 'task',
    categoryColor: '#f59e0b',
    x: 320,
    y: 450,
    description: 'Delayed by 8 days due to caching throughput bottleneck.',
    connectedCount: 2,
    metrics: { 'Delay': '+8 Days', 'Assignee': 'EMP187', 'Impact': 'Phase 2 Delivery' },
    sourceFile: 'Project_Alpha_Status_Update.docx'
  },
  {
    id: 'node-vendor-apex',
    label: 'Apex Cloud Infrastructure',
    type: 'invoice',
    categoryColor: '#10b981',
    x: 620,
    y: 180,
    description: 'Primary cloud compute and GPU cluster provider.',
    connectedCount: 3,
    metrics: { 'PO Approved': '₹100,000', 'Billed': '₹118,500', 'Discrepancy': '₹18,500' },
    sourceFile: 'Purchase_Orders_Q3.xlsx'
  },
  {
    id: 'node-inv-8821',
    label: 'Invoice INV-8821',
    type: 'invoice',
    categoryColor: '#ef4444',
    x: 740,
    y: 300,
    description: 'Billed amount ₹118,500 against PO-4091 for ₹100,000.',
    connectedCount: 2,
    metrics: { 'Amount': '₹118,500', 'Status': 'Pending Verification', 'Discrepancy': '🔴 ₹18,500' },
    sourceFile: 'Vendor_Invoices_Q3.csv'
  },
  {
    id: 'node-po-4091',
    label: 'PO-4091',
    type: 'invoice',
    categoryColor: '#8b5cf6',
    x: 580,
    y: 330,
    description: 'Authorized procurement purchase order for cloud capacity.',
    connectedCount: 2,
    metrics: { 'Approved Amount': '₹100,000', 'Status': 'Approved', 'Approver': 'VP Eng' },
    sourceFile: 'Purchase_Orders_Q3.xlsx'
  },
  {
    id: 'node-complaint-sla',
    label: 'Payment Gateway SLA Dispute',
    type: 'issue',
    categoryColor: '#f97316',
    x: 480,
    y: 460,
    description: '18 customer tickets reporting payment gateway timeout and double debits.',
    connectedCount: 2,
    metrics: { 'Critical Breaches': '3 Tickets', 'Root Cause': 'Gateway 504 Timeout', 'Status': 'Investigating' },
    sourceFile: 'Customer_Support_Complaints.csv'
  }
];

export const GRAPH_EDGES: GraphEdge[] = [
  { id: 'edge-1', source: 'node-proj-alpha', target: 'node-dept-cse', label: 'Engineered by' },
  { id: 'edge-2', source: 'node-dept-cse', target: 'node-emp-187', label: 'Staff member' },
  { id: 'edge-3', source: 'node-emp-187', target: 'node-task-34', label: 'Assigned to' },
  { id: 'edge-4', source: 'node-task-34', target: 'node-proj-alpha', label: 'Blocks deliverable' },
  { id: 'edge-5', source: 'node-proj-alpha', target: 'node-vendor-apex', label: 'Cloud infrastructure' },
  { id: 'edge-6', source: 'node-vendor-apex', target: 'node-po-4091', label: 'Contracted via' },
  { id: 'edge-7', source: 'node-vendor-apex', target: 'node-inv-8821', label: 'Submitted invoice' },
  { id: 'edge-8', source: 'node-po-4091', target: 'node-inv-8821', label: '₹18,500 Discrepancy' },
  { id: 'edge-9', source: 'node-proj-alpha', target: 'node-complaint-sla', label: 'System dependency' }
];
