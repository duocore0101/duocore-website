import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Duocore Softwares",
  description: "Privacy policy for Duocore Softwares, a Meta WhatsApp Business Platform Tech Provider.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-[#020617] font-sans transition-colors">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors">
          
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Last updated: August 26, 2026</p>
          </div>

          <div className="prose prose-slate dark:prose-invert prose-blue max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:font-medium prose-p:leading-relaxed prose-li:font-medium">
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to <strong>Duocore Software Company</strong>. We are a technology company specializing in intelligent software solutions and operate as a <strong>Meta WhatsApp Business Platform Tech Provider</strong>, offering WhatsApp automation and messaging services to our clients. 
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, services, and WhatsApp automation tools. We are committed to protecting your personal and business data and ensuring compliance with Meta&apos;s Developer Policies and applicable data protection laws.
            </p>

            <h2>2. Information We Collect</h2>
            <p>To provide our services, we may collect the following types of information:</p>
            <ul>
              <li><strong>Business Account Information:</strong> Your business name, contact phone number, email address, and WhatsApp Business Account (WABA) details.</li>
              <li><strong>Message and Chat Data:</strong> Content, metadata, and interaction logs processed through our WhatsApp automation services on your behalf.</li>
              <li><strong>Technical Data:</strong> IP addresses, device information, browser type, and usage logs when interacting with our platform.</li>
              <li><strong>Embedded Signup Data:</strong> Any information collected during the Meta Embedded Signup flow, including business portfolio information, phone number verification details, and WABA IDs.</li>
            </ul>

            <h2>3. How We Use Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To provide, operate, and maintain our WhatsApp automation and messaging services.</li>
              <li>To facilitate account setup, management, and Meta Business verification.</li>
              <li>To provide customer support and troubleshoot technical issues.</li>
              <li>To analyze usage patterns and improve the quality of our services.</li>
              <li>To comply with legal obligations and enforce our terms of service.</li>
            </ul>

            <h2>4. How We Share Information</h2>
            <p>We handle your data with strict confidentiality. We may share your information only in the following circumstances:</p>
            <ul>
              <li><strong>Meta Platforms, Inc.:</strong> Data is shared with Meta as strictly required to operate the WhatsApp Business Platform and comply with their technical and policy requirements.</li>
              <li><strong>Business Solution Providers (BSPs):</strong> We may share data with verified BSP partners if applicable to the delivery of your messaging services.</li>
              <li><strong>Legal Compliance:</strong> We may disclose information if required by law or in response to valid requests by public authorities.</li>
            </ul>
            <p><strong>We do not sell, rent, or trade your personal or business data to third parties.</strong></p>

            <h2>5. Data Storage and Security</h2>
            <p>
              We implement reasonable and robust technical and organizational security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. Data is stored on secure servers with encrypted transit protocols. We retain your information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.
            </p>

            <h2>6. User Rights</h2>
            <p>
              You have the right to access, correct, update, or request the deletion of your personal and business data stored on our platform. To exercise these rights or to request a data export, please contact us using the information provided in the &quot;Contact Us&quot; section below. We will respond to your request within a reasonable timeframe.
            </p>

            <h2>7. Third-Party Links and Services</h2>
            <p>
              Our services interact with the WhatsApp Business Platform. Please note that WhatsApp and Meta services are governed by Meta&apos;s own Privacy Policy and Terms of Service. We encourage you to review their policies to understand how they handle data independently of our services.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Our services are designed for businesses and are not directed at children under the age of 13 (or the applicable local age of consent). We do not knowingly collect personal information from children. If we become aware that we have collected such data, we will take steps to delete it immediately.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make significant changes, we will notify you by email or through a prominent notice on our platform prior to the changes taking effect. The &quot;Last updated&quot; date at the top of this policy will reflect the most recent revisions.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              <strong>Duocore Software Company</strong><br />
              Pune, Maharashtra, India<br />
              Email: <a href="mailto:info@duocoresoftware.com" className="text-blue-600 dark:text-blue-400 no-underline hover:underline">info@duocoresoftware.com</a><br />
              Phone: +91 99703 59386
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
