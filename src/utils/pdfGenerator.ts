import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface DocumentData {
  type: "Quotation" | "Invoice";
  number: string;
  issueDate: string;
  dueDate?: string;
  client: {
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    service: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  grandTotal: number;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    branch: string;
  };
  terms?: string[];
  logo?: string; // base64 string
  signatures?: string[]; // array of base64 strings
  title?: string;
}

export function generatePDF(data: DocumentData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Professional White & Blue Theme Colors
  const bgColor = [255, 255, 255] as [number, number, number]; // White
  const primaryColor = [37, 99, 235] as [number, number, number]; // Blue-600
  const textColor = [15, 23, 42] as [number, number, number]; // Slate-900
  const mutedTextColor = [71, 85, 105] as [number, number, number]; // Slate-600

  // Set Background
  doc.setFillColor(...bgColor);
  doc.rect(0, 0, pageWidth, doc.internal.pageSize.height, 'F');

  // Header Section (Full White)
  // No rectangle needed as bgColor is already white

  // Company Logo & Name
  if (data.logo) {
    try {
      // If logo is provided, add it. Increased width to 40 for prominence
      doc.addImage(data.logo, 'PNG', 14, 10, 70, 25);
    } catch (e) {
      console.error("Failed to add logo:", e);
      // Fallback text logo
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("Duocore", 14, 22);
      doc.setTextColor(...primaryColor);
      doc.text("Softwares", 14, 30);
    }
  } else {
    // Default stylized logo (now in theme colors)
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Duocore", 14, 22);
    doc.setTextColor(...primaryColor);
    doc.text("Softwares", 14, 30);
  }

  // Document Type & Number (Now in theme color on white background)
  doc.setTextColor(...textColor);
  doc.setFontSize(18);
  doc.text(`${data.type} ${data.number}`, pageWidth - 14, 25, { align: "right" });

  // Project Title (Below Number)
  if (data.title) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(data.title, pageWidth - 14, 33, { align: "right" });
  }

  // Blue Divider Line
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(14, 45, pageWidth - 14, 45);

  // Client & Company Info
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // From Section
  doc.setTextColor(...mutedTextColor);
  doc.text("FROM", 14, 55);
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "bold");
  doc.text("Duocore Software LLP.", 14, 62);
  doc.setFont("helvetica", "normal");
  doc.text("Junnar, Pune 410502", 14, 67);
  doc.text("Maharashtra", 14, 72);
  doc.text("duocore0101@gmail.com", 14, 77);

  // To Section
  doc.setTextColor(...mutedTextColor);
  doc.text("TO", pageWidth / 2, 55);
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "bold");
  doc.text(data.client.name, pageWidth / 2, 62);
  doc.setFont("helvetica", "normal");
  doc.text(data.client.phone, pageWidth / 2, 67);
  doc.text(data.client.email, pageWidth / 2, 72);

  // Dates Section
  doc.setTextColor(...mutedTextColor);
  doc.text("DATE", pageWidth - 55, 55); // Moved label further left to avoid overlap
  doc.setTextColor(...textColor);
  doc.text(data.issueDate, pageWidth - 14, 55, { align: "right" });

  // (Removed Due Date Logic)

  // Items Table
  autoTable(doc, {
    startY: 90,
    head: [['SERVICE', 'QTY', 'UNIT PRICE', 'TOTAL']],
    body: data.items.map(item => [
      item.service,
      item.quantity.toString(),
      `INR ${item.unitPrice.toFixed(2)}`,
      `INR ${(item.quantity * item.unitPrice).toFixed(2)}`
    ]),
    theme: 'grid',
    styles: {
      fillColor: [255, 255, 255],
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240], // #E2E8F0
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252], // #F8FAFC
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 35, halign: 'right' },
      3: { cellWidth: 35, halign: 'right' }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalY = (doc as any).lastAutoTable.finalY + 10;

  // Pricing Summary Box
  const summaryX = pageWidth - 80;

  doc.setFontSize(10);
  doc.setTextColor(...mutedTextColor);
  doc.text("Subtotal:", summaryX, finalY);
  doc.setTextColor(...textColor);
  doc.text(`INR ${data.subtotal.toFixed(2)}`, pageWidth - 14, finalY, { align: "right" });

  let grandTotalY = finalY + 12;

  if (data.tax > 0) {
    doc.setTextColor(...mutedTextColor);
    doc.text("Tax (10%):", summaryX, finalY + 8);
    doc.setTextColor(...textColor);
    doc.text(`INR ${data.tax.toFixed(2)}`, pageWidth - 14, finalY + 8, { align: "right" });
    grandTotalY = finalY + 12;
  } else {
    grandTotalY = finalY + 4;
  }

  // Grand Total Line
  doc.setFillColor(...primaryColor);
  doc.rect(summaryX - 5, grandTotalY, 90, 10, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("GRAND TOTAL:", summaryX, grandTotalY + 7);
  doc.text(`INR ${data.grandTotal.toFixed(2)}`, pageWidth - 14, grandTotalY + 7, { align: "right" });

  // Bank Details Section
  const bankY = finalY;
  doc.setTextColor(...mutedTextColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("BANK DETAILS", 14, bankY);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...textColor);
  const bankInfo = data.bankDetails || {
    accountName: "KISHOR MARUTI SHELAR",
    accountNumber: "313402000000009",
    bankName: "Indian Overseas Bank, NEDUMANAGAD",
    ifscCode: "IOBA0003143"
  };

  doc.text(`Bank : ${bankInfo.bankName || "Indian Overseas Bank, NEDUMANAGAD"}`, 14, bankY + 6);
  doc.text(`Account Name : ${bankInfo.accountName}`, 14, bankY + 11);
  doc.text(`Account Number : ${bankInfo.accountNumber}`, 14, bankY + 16);
  doc.text(`IFSC : ${bankInfo.ifscCode}`, 14, bankY + 21);

  // Terms & Conditions
  const tcY = bankY + 40;
  doc.setTextColor(...mutedTextColor);
  doc.setFont("helvetica", "bold");
  doc.text("TERMS & CONDITIONS", 14, tcY);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...textColor);
  const terms = data.terms || [
    "1. This quotation is valid for 30 days from the date of issue.",
    "2. 50% advance payment is required to initiate the project.",
    "3. Remaining 50% payment must be cleared upon project delivery.",
    "4. Any additional requirements will be billed separately."
  ];

  terms.forEach((term, index) => {
    doc.text(term, 14, tcY + 6 + (index * 5));
  });

  // Footer / Signatures Section
  const footerY = doc.internal.pageSize.height - 45;
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(14, footerY - 5, pageWidth - 14, footerY - 5);

  // 3 Co-founder Signatures Grid
  const sigWidth = (pageWidth - 28) / 3;
  const sigY = footerY + 15;

  const founders = [
    { name: "Kishor Shelar", role: "Co-founder & Business managing director" },
    { name: "Saalim Khan", role: "Co-founder" },
    { name: "Aasim Khan", role: "Co-founder" }
  ];

  founders.forEach((founder, i) => {
    const x = 14 + (i * sigWidth);

    // Signature Image or Placeholder Line
    if (data.signatures && data.signatures[i]) {
      try {
        // Reduced height and centered more precisely
        doc.addImage(data.signatures[i], 'PNG', x + 10, sigY - 10, sigWidth - 30, 10);
      } catch (e) {
        console.error("Failed to add signature image:", e);
        doc.setDrawColor(...mutedTextColor);
        doc.line(x + 5, sigY + 10, x + sigWidth - 5, sigY + 10);
      }
    } else {
      doc.setDrawColor(...mutedTextColor);
      doc.line(x + 5, sigY + 10, x + sigWidth - 5, sigY + 10);
    }

    // Name & Role (Decreased gap from signature)
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(founder.name, x + sigWidth / 2, sigY + 8, { align: "center" });

    doc.setTextColor(...mutedTextColor);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(founder.role, x + sigWidth / 2, sigY + 13, { align: "center" });
  });

  // Bottom Note
  doc.setFontSize(8);
  doc.setTextColor(...mutedTextColor);
  doc.text("This is a computer-generated document. No physical signature required for electronic acceptance.", pageWidth / 2, doc.internal.pageSize.height - 5, { align: "center" });

  // Download PDF
  doc.save(`${data.type}_${data.number}.pdf`);
}
