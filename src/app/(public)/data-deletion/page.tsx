import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Deletion Instructions | Duocore Software Company",
  description: "Instructions for requesting data deletion from Duocore Software Company, in compliance with data privacy regulations and Meta's Developer Policies.",
};

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-[#020617] font-sans transition-colors">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors">
          
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Data Deletion Instructions</h1>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Last updated: August 28, 2026</p>
          </div>

          <div className="prose prose-slate dark:prose-invert prose-blue max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:font-medium prose-p:leading-relaxed prose-li:font-medium">
            
            <p>
              At <strong>Duocore Software Company</strong>, we value your privacy and give you full control over your personal and business data. If you wish to have your data permanently deleted from our systems, please follow the instructions outlined below.
            </p>

            <h2>1. How to Submit a Data Deletion Request</h2>
            <p>
              To request the deletion of your data, you must send a formal request to our designated privacy support email address. 
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:info@duocoresoftware.com" className="text-blue-600 dark:text-blue-400 no-underline hover:underline">info@duocoresoftware.com</a><br />
              <strong>Subject Line:</strong> Data Deletion Request - [Your Business Name]
            </p>

            <h2>2. Information Required for Processing</h2>
            <p>To help us identify your account and process your request securely, please include the following information in your email:</p>
            <ul>
              <li>The full name of the authorized representative making the request.</li>
              <li>Your registered Business Name and contact email address.</li>
              <li>Your registered Phone Number or WhatsApp Business Account (WABA) details (if applicable).</li>
              <li>A clear statement indicating that you wish to have all your data deleted from our platform.</li>
            </ul>

            <h2>3. Verification Process</h2>
            <p>
              For security reasons, we cannot delete data without verifying the identity of the requester. Once we receive your email, we will send a confirmation request to the email address or phone number currently on file for your account. You must reply to this confirmation message to authorize the deletion.
            </p>

            <h2>4. Data Deletion and Retention Process</h2>
            <p>
              Upon successful verification of your request, we will initiate the deletion of your personal data, business information, and chat logs from our active databases, servers, and connected third-party integrations (such as the Meta WhatsApp Business Platform). 
            </p>
            <p>
              The deletion process across our live systems is generally completed within <strong>14 to 30 business days</strong>. Data stored in routine system backups will be automatically overwritten and removed over the course of our standard backup cycle (typically up to 90 days).
            </p>

            <h2>5. Exceptions and Retained Data</h2>
            <p>While we strive to honor all deletion requests, please note that we may be legally required to retain certain information under specific circumstances, including:</p>
            <ul>
              <li><strong>Legal & Regulatory Obligations:</strong> Data related to billing, invoices, and financial transactions must be retained for tax and accounting purposes.</li>
              <li><strong>Dispute Resolution:</strong> Information necessary to resolve ongoing disputes, enforce our Terms of Service, or protect our legal rights.</li>
              <li><strong>Anonymized Data:</strong> We may retain aggregated, anonymized usage data that cannot be linked back to you or your business for analytical purposes.</li>
            </ul>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
              <h3 className="text-blue-800 dark:text-blue-300 mt-0">Need Further Assistance?</h3>
              <p className="mb-0 text-blue-700 dark:text-blue-400">
                If you have any questions about this process or our <a href="/privacy-policy" className="text-blue-600 dark:text-blue-300 underline">Privacy Policy</a>, please don&apos;t hesitate to contact our support team at <a href="mailto:info@duocoresoftware.com" className="text-blue-600 dark:text-blue-300 underline">info@duocoresoftware.com</a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
