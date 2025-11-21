
import React, { useEffect } from 'react';
import { LogoIcon } from '../constants';

interface LegalPageProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<LegalPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
              <LogoIcon />
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Stitch AI</h1>
           </div>
           <button onClick={onBack} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
             Back to Home
           </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p className="text-sm text-gray-500">Last updated: May 20, 2024</p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>Welcome to Stitch AI. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website, products and services, including the prompts you enter to generate UI designs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>To provide the AI generation service you have requested.</li>
              <li>To improve our AI models and service quality.</li>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third-Party AI Models</h2>
            <p>Stitch AI utilizes third-party AI models (such as Google Gemini) to process your prompts and generate code. When you submit a prompt, the text of that prompt is sent to these third-party providers for processing. We do not control how these third-party providers store or use data sent to their APIs, though we select providers with strong privacy commitments.</p>
          </section>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Stitch AI. All rights reserved.
      </footer>
    </div>
  );
};

export const TermsOfService: React.FC<LegalPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
              <LogoIcon />
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Stitch AI</h1>
           </div>
           <button onClick={onBack} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
             Back to Home
           </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-blue max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p className="text-sm text-gray-500">Last updated: May 20, 2024</p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using Stitch AI, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
            <p>Stitch AI provides users with an AI-powered tool to generate User Interface (UI) code (HTML/CSS) based on text prompts. You understand and agree that the Service is provided "AS-IS" and that Stitch AI assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. AI Generated Content</h2>
            <p>Output generated by Stitch AI is created by artificial intelligence. While we strive for quality:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>We do not guarantee the accuracy, functionality, or security of the generated code.</li>
              <li>You are responsible for reviewing and testing any code before using it in a production environment.</li>
              <li>The AI may occasionally produce content that is incorrect or offensive.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
            <p>You retain ownership of the prompts you input and the specific code generated for you, subject to the terms of the underlying AI models used. Stitch AI retains rights to the application platform, design, and methodology used to provide the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p>In no event shall Stitch AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </section>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Stitch AI. All rights reserved.
      </footer>
    </div>
  );
};
