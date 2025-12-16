
import { UserStats, User, AdminUserView } from './types';

// Helper to trigger download
const downloadFile = (filename: string, content: string, contentType: string) => {
  const element = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const formatDate = (timestamp: number) => new Date(timestamp).toLocaleDateString() + ' ' + new Date(timestamp).toLocaleTimeString();

// --- CSV GENERATORS ---

export const generateUserCSV = (stats: UserStats, user: User) => {
  const headers = ['Date', 'Problem Title', 'Difficulty', 'Topic', 'Status', 'Score', 'Language'];
  const rows = stats.history.map(h => [
    formatDate(h.timestamp),
    `"${h.questionTitle.replace(/"/g, '""')}"`, // Escape quotes
    h.difficulty,
    h.topic,
    h.passed ? 'Passed' : 'Failed',
    h.score,
    h.language
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  downloadFile(`InfiJobs_Report_${user.name || user.email || user.id}_${Date.now()}.csv`, csvContent, 'text/csv');
};

export const generateAdminCSV = (users: AdminUserView[]) => {
  const headers = ['User ID', 'Name', 'Role', 'Total Attempts', 'Passed Count', 'Average Score', 'Joined Date'];
  const rows = users.map(u => [
    u.id,
    u.name,
    u.isAdmin ? 'Admin' : 'Student',
    u.stats.totalAttempts,
    u.stats.passedCount,
    u.stats.averageScore,
    formatDate(u.createdAt || 0)
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  downloadFile(`InfiJobs_System_Report_${Date.now()}.csv`, csvContent, 'text/csv');
};

// --- TEXT GENERATOR ---

export const generateUserTextReport = (stats: UserStats, user: User) => {
  let content = `INFIJOBS PERFORMANCE REPORT\n`;
  content += `===========================\n`;
  content += `User: ${user.name || user.email || user.id}\n`;
  content += `Generated: ${new Date().toLocaleString()}\n\n`;

  content += `SUMMARY\n`;
  content += `-------\n`;
  content += `Total Attempts: ${stats.totalAttempts}\n`;
  content += `Problems Solved: ${stats.passedCount}\n`;
  content += `Average Score: ${stats.averageScore}/100\n`;

  const passRate = stats.totalAttempts > 0 ? Math.round((stats.passedCount / stats.totalAttempts) * 100) : 0;
  content += `Pass Rate: ${passRate}%\n\n`;

  content += `PRACTICE HISTORY\n`;
  content += `----------------\n`;

  if (stats.history.length === 0) {
    content += `No practice history found.\n`;
  } else {
    stats.history.forEach((h, index) => {
      content += `${index + 1}. ${h.questionTitle} (${h.difficulty}) - ${h.topic}\n`;
      content += `   Date: ${formatDate(h.timestamp)}\n`;
      content += `   Result: ${h.passed ? 'PASS' : 'FAIL'} | Score: ${h.score} | Lang: ${h.language}\n\n`;
    });
  }

  downloadFile(`InfiJobs_Report_${user.name || user.email || user.id}.txt`, content, 'text/plain');
};

// --- PDF GENERATOR ---

export const generateUserPDF = async (stats: UserStats, user: User) => {
  // Ensure jsPDF is loaded from CDN
  const { jsPDF } = (window as any).jspdf;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Header
  doc.setFillColor(79, 70, 229); // Indigo 600
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('InfiJobs Performance Report', 14, 20);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated for: ${user.name || user.email || user.id}`, 14, 30);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 14, 30, { align: 'right' });

  // Stats Section
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Performance Summary', 14, 55);

  const passRate = stats.totalAttempts > 0 ? Math.round((stats.passedCount / stats.totalAttempts) * 100) : 0;

  const summaryData = [
    ['Total Attempts', `${stats.totalAttempts}`],
    ['Problems Passed', `${stats.passedCount}`],
    ['Success Rate', `${passRate}%`],
    ['Average Score', `${stats.averageScore}`]
  ];

  (doc as any).autoTable({
    startY: 60,
    head: [],
    body: summaryData,
    theme: 'plain',
    styles: { fontSize: 12, cellPadding: 3 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } }
  });

  // History Table
  doc.text('Detailed Activity Log', 14, (doc as any).lastAutoTable.finalY + 15);

  const historyData = stats.history.map(h => [
    new Date(h.timestamp).toLocaleDateString(),
    h.questionTitle,
    h.difficulty,
    h.topic,
    h.passed ? 'Pass' : 'Fail',
    h.score.toString()
  ]);

  (doc as any).autoTable({
    startY: (doc as any).lastAutoTable.finalY + 20,
    head: [['Date', 'Problem', 'Difficulty', 'Topic', 'Result', 'Score']],
    body: historyData,
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229] },
    styles: { fontSize: 10 },
    alternateRowStyles: { fillColor: [245, 247, 255] }
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(10);
  doc.setTextColor(150);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text('Generated by InfiJobs AI Prep', 14, doc.internal.pageSize.height - 10);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 14, doc.internal.pageSize.height - 10, { align: 'right' });
  }

  doc.save(`InfiJobs_Report_${user.name || user.email || user.id}.pdf`);
};
