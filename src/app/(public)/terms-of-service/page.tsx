import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Duocore Software Company",
  description: "Terms of Service and conditions for using Duocore Software Company products and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-[#020617] font-sans transition-colors">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors">
          
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Last updated: August 28, 2026</p>
          </div>

          <div className="prose prose-slate dark:prose-invert prose-blue max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:font-medium prose-p:leading-relaxed prose-li:font-medium">
            
            <p>
              Welcome to <strong>Duocore Software Company</strong>. By accessing or using our website, products, and services—including our WhatsApp Business Platform automation tools—you agree to be bound by these Terms of Service. Please read them carefully.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing our platform or entering into a contract for our technology services, you accept and agree to comply with these Terms of Service, our Privacy Policy, and any applicable third-party platform terms (such as Meta&apos;s Developer Policies and WhatsApp Business Terms of Service). If you do not agree to these terms, you must not use our services.
            </p>

            <h2>2. Description of Services</h2>
            <p>
              Duocore Software Company acts as a technology provider specializing in intelligent software solutions. This includes, but is not limited to, custom web development, system administration tools, and acting as a Meta WhatsApp Business Platform Tech Provider to facilitate automated messaging and client communication.
            </p>

            <h2>3. User Responsibilities and Acceptable Use</h2>
            <p>As a client or user of our services, you agree to the following:</p>
            <ul>
              <li><strong>Compliance with Laws:</strong> You will use our services only for lawful purposes and in accordance with applicable local, state, national, or international laws.</li>
              <li><strong>Meta/WhatsApp Policies:</strong> When using our WhatsApp automation tools, you agree to abide by all Meta Commerce Policies, WhatsApp Business Policies, and anti-spam regulations.</li>
              <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your login credentials (staff or admin) and for all activities that occur under your account.</li>
              <li><strong>Prohibited Activity:</strong> You will not use our platform to transmit malicious code, spam, or abusive material.</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              All content, features, and functionality on this website (including but not limited to software code, text, graphics, logos, and UI designs) are owned by Duocore Software Company and are protected by international copyright, trademark, and intellectual property laws. You may not reproduce, distribute, or create derivative works from our platform without express written consent.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Duocore Software Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of your use or inability to use our services. Our services are provided &quot;as is&quot; without warranties of any kind, either express or implied.
            </p>

            <h2>6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our services at our sole discretion, without prior notice, if we determine that you have violated these Terms of Service, engaged in fraudulent activity, or breached third-party platform terms (e.g., Meta policies).
            </p>

            <h2>7. Changes to Terms</h2>
            <p>
              We may modify these Terms of Service at any time. If we make material changes, we will notify you by updating the &quot;Last updated&quot; date at the top of this page or by sending an email communication. Your continued use of the services after changes are published constitutes your acceptance of the revised Terms.
            </p>

            <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-slate-800 dark:text-slate-200 mt-0">Contact Information</h3>
              <p className="mb-0 text-slate-600 dark:text-slate-400">
                If you have any questions or concerns regarding these Terms of Service, please contact us at: <br/><br/>
                <strong>Duocore Software Company</strong><br />
                Pune, Maharashtra, India<br />
                Email: <a href="mailto:info@duocoresoftware.com" className="text-blue-600 dark:text-blue-400 no-underline hover:underline">info@duocoresoftware.com</a><br />
                Phone: +91 99703 59386
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
