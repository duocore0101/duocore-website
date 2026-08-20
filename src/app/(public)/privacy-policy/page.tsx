import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Duocore Softwares',
  description: 'Privacy Policy for Duocore Softwares WhatsApp Business Platform Tech Provider services.',
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02] -z-10" />
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto text-center mb-16">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-6">Privacy Policy</h1>
          <div className="inline-block bg-slate-100 rounded-full px-4 py-1.5">
            <p className="text-sm font-medium text-slate-600">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">1</span>
              Introduction
            </h2>
            <div className="text-slate-600 leading-relaxed pl-11">
              <p>
                Welcome to Duocore Softwares (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate as a Meta WhatsApp Business Platform Tech Provider, offering WhatsApp automation and messaging services to our clients. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your data, as well as the data of your customers, when you use our WhatsApp automation services.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">2</span>
              Information We Collect
            </h2>
            <div className="text-slate-600 leading-relaxed pl-11">
              <p className="mb-4">We collect several different types of information for various purposes to provide and improve our service to you:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong className="text-slate-900">Business Account Information:</strong> Your business name, phone number, email address, and WhatsApp Business Account (WABA) details.</li>
                <li><strong className="text-slate-900">Message and Chat Data:</strong> Content, metadata, and logs of messages processed through our WhatsApp automation services on your behalf.</li>
                <li><strong className="text-slate-900">Technical Data:</strong> IP addresses, browser types, device information, and usage logs generated when you access our platform.</li>
                <li><strong className="text-slate-900">Embedded Signup Data:</strong> Any information collected during Meta&apos;s Embedded Signup flow, including business portfolio information, phone number verification data, and your WABA ID.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">3</span>
              How We Use Information
            </h2>
            <div className="text-slate-600 leading-relaxed pl-11">
              <p className="mb-4">We use the collected data for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>To provide and maintain our WhatsApp automation and messaging services.</li>
                <li>To facilitate account setup, management, and authentication.</li>
                <li>To provide customer support and troubleshoot technical issues.</li>
                <li>To monitor usage, analyze trends, and improve the quality of our services.</li>
                <li>To ensure compliance with legal obligations and enforce our agreements.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">4</span>
              How We Share Information
            </h2>
            <div className="text-slate-600 leading-relaxed pl-11">
              <p className="mb-4">We do not sell your personal or business data to third parties. However, we may share your information in the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong className="text-slate-900">Meta Platforms, Inc.:</strong> As a Tech Provider, we are required to share certain data with Meta to operate the WhatsApp Business Platform and ensure compliance with their policies.</li>
                <li><strong className="text-slate-900">Business Solution Providers (BSPs):</strong> If applicable to your setup, we may share data with official BSPs we partner with to deliver connectivity.</li>
                <li><strong className="text-slate-900">Legal Requirements:</strong> If required by law, we may disclose your data to comply with legal processes or legitimate requests from public authorities.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">5</span>
              Data Storage and Security
            </h2>
            <div className="text-slate-600 leading-relaxed pl-11">
              <p>
                We implement reasonable and appropriate technical and organizational security measures to protect your data against unauthorized access, loss, destruction, or alteration. 
                We retain your business information and message logs only for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Once data is no longer needed, it is securely deleted or anonymized.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">6</span>
              User Rights
            </h2>
            <div className="text-slate-600 leading-relaxed pl-11">
              <p>
                You have the right to access, correct, or request the deletion of your personal and business data stored on our platform. 
                If you wish to exercise these rights, please contact us at our support email. We will respond to your request within a reasonable timeframe.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">7</span>
              Third-Party Links and Services
            </h2>
            <div className="text-slate-600 leading-relaxed pl-11">
              <p>
                Our service integrates directly with WhatsApp. Please note that the use of WhatsApp services is also governed by Meta&apos;s own Privacy Policy and Terms of Service. 
                We are not responsible for the privacy practices of Meta or any other third-party websites or services linked to from our platform.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">8</span>
              Children&apos;s Privacy
            </h2>
            <div className="text-slate-600 leading-relaxed pl-11">
              <p>
                Our services are intended for business use and are not directed at children under the age of 13 (or the applicable age of digital consent in your local jurisdiction). 
                We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such data, we will take immediate steps to delete it.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">9</span>
              Changes to This Policy
            </h2>
            <div className="text-slate-600 leading-relaxed pl-11">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. 
                Any updates will be posted on this page with a revised &quot;Last updated&quot; date. We encourage you to review this policy periodically.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">10</span>
              Contact Us
            </h2>
            <div className="text-slate-600 leading-relaxed pl-11">
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact us at:
              </p>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-6">
                <p className="font-bold text-slate-900">
                  Email: <a href="mailto:duocore0101@gmail.com" className="text-primary hover:underline font-medium">duocore0101@gmail.com</a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
