import Navbar from "@/components/navbar/Navbar";
import { DMSans } from "@/fonts/font";
import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div
      className={`${DMSans.className} min-h-screen bg-gray-50 text-gray-800`}
    >
      <Navbar />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="relative w-40 h-12">
                <Image
                  src="/logo.png"
                  alt="NovaNectar"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </div>
            <div className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 w-full sm:w-auto">
              <div className="flex items-center space-x-2">
                <MailIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <a
                  href="mailto:info@novanectar.com"
                  className="hover:text-gray-900 transition-colors truncate"
                >
                  info@novanectar.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <a
                  href="tel:+918979891705"
                  className="hover:text-gray-900 transition-colors"
                >
                  +91 8979891705
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <GlobeIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <a
                  href="https://www.novanectar.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors truncate"
                >
                  www.novanectar.co.in
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="truncate">
                  GMS Road Dehradun Uttarakhand India
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Existing content starts here */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 transition-all duration-300">
            Company Policy Norms
          </h2>
          <p className="text-sm font-medium bg-gray-100 p-2 rounded-md shadow-sm hover:shadow-md transition-all duration-300">
            CIN No: U47410UT2024PTC017142
          </p>
        </div>

        {/* Welcome Text */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
          <p className="text-justify text-base md:text-lg leading-relaxed text-gray-700">
            Welcome to{" "}
            <span className="text-red-600 font-medium">NovaNectar</span>{" "}
            Services Private Limited! As a growing IT Company, we are committed
            to fostering an innovative, inclusive, professional and secure work
            environment. This document outlines our key policies, expectations,
            and best practices to guide our employees and stakeholders. The
            following policies define the terms that govern our relationship
            with employees, clients and partners. By engaging with us, you
            acknowledge and agree to abide by these policies.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {/* Company Values Section */}
          <PolicySection title="1. Company Values">
            <ul className="list-disc pl-5 space-y-3">
              <PolicyItem
                title="Innovation"
                description="Encouraging creativity and forward-thinking solutions."
              />
              <PolicyItem
                title="Integrity"
                description="Upholding honesty and ethical behavior in all our dealings."
              />
              <PolicyItem
                title="Collaboration"
                description="Promoting teamwork and open communication."
              />
              <PolicyItem
                title="Customer-Centricity"
                description="Prioritizing customer satisfaction and experience."
              />
              <PolicyItem
                title="Growth & Learning"
                description="Supporting continuous personal and professional development."
              />
            </ul>
          </PolicySection>

          {/* Employment Policies Section */}
          <PolicySection title="2. Employment Policies">
            <SubSection title="2.1 Recruitment & Onboarding">
              <ul className="list-disc pl-5 space-y-3">
                <li className="policy-item">
                  <span className="text-red-600 font-medium">NovaNectar</span>{" "}
                  hires based on merit, skills, and cultural fit.
                </li>
                <li className="policy-item">
                  Equal opportunity employer, ensuring no discrimination based
                  on race, gender, religion, or other factors.
                </li>
                <li className="policy-item">
                  New employees undergo an onboarding process covering company
                  policies, job roles, and expectations.
                </li>
                <li className="policy-item">
                  All intellectual property created during employment or
                  contractual work with{" "}
                  <span className="text-red-600 font-medium">NovaNectar</span>{" "}
                  is the sole property of the company.
                </li>
              </ul>
            </SubSection>

            <SubSection title="2.2 Work Hours">
              <ul className="list-disc pl-5 space-y-3">
                <li className="policy-item">
                  Standard work hours: 9:00 AM – 6:00 PM, Monday to Saturday
                  (8:00hrs Working, 1hr Lunch)
                </li>
                <li className="policy-item">
                  Flexible working arrangements may be available based on role
                  and performance.
                </li>
              </ul>
            </SubSection>

            <SubSection title="2.3 Payment & Compensation Policy">
              <ul className="list-disc pl-5 space-y-3">
                <PolicyItem
                  title="Employee Payments"
                  description={
                    <>
                      Salaries are credited on the 10<sup>th</sup> of every
                      month or the next working day in case of public holidays.
                    </>
                  }
                />
                <PolicyItem
                  title="Client Payments"
                  description="Payments must align with contract terms and be cleared within 30 days of invoice issuance."
                />
                <PolicyItem
                  title="Late Payments"
                  description="A penalty of 1.5% per month is applicable for overdue client payments."
                />
                <PolicyItem
                  title="Refund Policy"
                  description="Our refund policy allows you to switch between previous services in different IT domains for the same service amount. It will be processed within 15 business days in accordance with our service agreement terms and based on your analysis."
                />
              </ul>
            </SubSection>

            <SubSection title="2.4 Leave & Attendance Policy">
              <ul className="list-disc pl-5 space-y-3">
                <PolicyItem
                  title="Casual Leave"
                  description="Employees are entitled to 1 paid monthly leave, accrued proportionally."
                />
                <PolicyItem
                  title="Sick Leave"
                  description="Up to 6 days are allowed per year with proper medical certificates required for absences exceeding 2 days."
                />
                <PolicyItem
                  title="Unpaid Leave"
                  description="Employees are entitled to make sure that without prior information to concerned person will lead to unpaid leave"
                />
                <PolicyItem
                  title="Maternity Leave"
                  description="Maternity and paternity leave as per labor laws."
                />
                <PolicyItem
                  title="Emergency Leave"
                  description="Considered on a case-by-case basis & prior information by the employee must be provided."
                />
                <PolicyItem
                  title="Attendance"
                  description="Regular attendance is essential. Consecutive absence of more than 3 working days may lead to legal action by the company."
                />
              </ul>
            </SubSection>
          </PolicySection>

          {/* Code of Conduct Section */}
          <PolicySection title="3. Code of Conduct">
            <SubSection title="3.1 Workplace Ethics">
              <ul className="list-disc pl-5 space-y-3">
                <li className="policy-item">
                  Respect for colleagues, clients, and company assets.
                </li>
                <li className="policy-item">
                  Zero tolerance for harassment, discrimination, or bullying.
                  Anti-harassment laws the Indian Penal Code (IPC) and the
                  Sexual Harassment of Women at Workplace (Prevention,
                  Prohibition, and Redressal) Act, 2013
                </li>
                <li className="policy-item">
                  Ethical handling of company and client data. Adherence to
                  safety protocols, including ergonomic workspace practice, is
                  mandatory.
                </li>
                <li className="policy-item">
                  Business casual attire is required during office hours, with
                  formal attire expected for client interactions.
                </li>
              </ul>
            </SubSection>

            <SubSection title="3.2 Confidentiality & Data Security">
              <ul className="list-disc pl-5 space-y-3">
                <li className="policy-item">
                  Employees must maintain confidentiality regarding company
                  trade secrets and sensitive client information.
                </li>
                <li className="policy-item">
                  Unauthorized sharing of data is strictly prohibited and may
                  result in legal action.
                </li>
                <li className="policy-item">
                  We comply with global data protection regulations India&apos;s
                  IT Act, of 2000, and provide training to employees to ensure
                  compliance.
                </li>
                <li className="policy-item">
                  All intellectual property created during employment or
                  contractual work with{" "}
                  <span className="text-red-600 font-medium">NovaNectar</span>{" "}
                  is the sole property of the company.
                </li>
                <li className="policy-item">
                  Unauthorized use, duplication, or sharing of proprietary
                  information is prohibited and may result in legal action.
                </li>
                <li className="policy-item">
                  Employees and contractors must sign a Non-Disclosure Agreement
                  (NDA) to access sensitive information
                </li>
              </ul>
            </SubSection>

            <SubSection title="3.3 Conflict of Interest">
              <ul className="list-disc pl-5 space-y-3">
                <li className="policy-item">
                  Employees must disclose any personal or financial interest
                  that could impact their professional responsibilities.
                </li>
              </ul>
            </SubSection>
          </PolicySection>

          {/* Remote Work & Hybrid Policy Section */}
          <PolicySection title="4. Remote Work & Hybrid Policy">
            <ul className="list-disc pl-5 space-y-3">
              <li className="policy-item">
                Expected to maintain productivity and communicate effectively
                while working remotely.
              </li>
              <li className="policy-item">
                We support a hybrid work mode, enabling employees to balance
                productivity and flexibility.
              </li>
              <li className="policy-item">
                Employees must remain accessible during core hours and use
                designated communication tools.
              </li>
              <li className="policy-item">
                The use of secure, company-provided VPNs and tools is mandatory
                to maintain cybersecurity.
              </li>
            </ul>
          </PolicySection>

          {/* Performance & Growth Section */}
          <PolicySection title="5. Performance & Growth">
            <ul className="list-disc pl-5 space-y-3">
              <li className="policy-item">
                Regular performance reviews to assess achievements and areas of
                improvement.
              </li>
              <li className="policy-item">
                Learning and development programs available for employees to
                upskill.
              </li>
              <li className="policy-item">
                Career advancement opportunities based on merit and
                contribution.
              </li>
            </ul>
          </PolicySection>

          {/* IT & Internet Usage Section */}
          <PolicySection title="6. IT & Internet Usage">
            <ul className="list-disc pl-5 space-y-3">
              <li className="policy-item">
                Company-provided devices and internet resources should be used
                responsibly.
              </li>
              <li className="policy-item">
                Unauthorized software downloads or accessing inappropriate
                websites is prohibited.
              </li>
            </ul>
          </PolicySection>

          {/* Dispute Resolution Policies Section */}
          <PolicySection title="7. Dispute Resolution Policies">
            <ul className="list-disc pl-5 space-y-3">
              <li className="policy-item">
                Employees must adhere to all local and national labour laws.
              </li>
              <li className="policy-item">
                Disputes should first be resolved through open communication
                with HR or management
              </li>
              <li className="policy-item">
                If unresolved, disputes will be referred to arbitration under
                the Arbitration and Conciliation Act, of 199, with decisions
                being final and binding.
              </li>
              <li className="policy-item">
                <span className="text-red-600 font-medium">NovaNectar</span>{" "}
                follows all tax and legal compliance guidelines as per
                jurisdiction laws.
              </li>
            </ul>
          </PolicySection>

          {/* Anti-Bribery and Corruption Policy Section */}
          <PolicySection title="8. Anti-Bribery and Corruption Policy">
            <ul className="list-disc pl-5 space-y-3">
              <li className="policy-item">
                Employees must not engage in offering, accepting, or soliciting
                bribes.
              </li>
              <li className="policy-item">
                Violations will lead to dismissal and legal actions.
              </li>
              <li className="policy-item">
                Regular training ensures awareness and prevention of corrupt
                practices.
              </li>
            </ul>
          </PolicySection>

          {/* Health & Safety Section */}
          <PolicySection title="9. Health & Safety">
            <ul className="list-disc pl-5 space-y-3">
              <li className="policy-item">
                Employees are expected to follow workplace safety protocols.
              </li>
              <li className="policy-item">
                Emergency procedures and health guidelines must be adhered to at
                all times.
              </li>
            </ul>
          </PolicySection>

          {/* Termination & Exit Policy Section */}
          <PolicySection title="10. Termination & Exit Policy">
            <ul className="list-disc pl-5 space-y-3">
              <PolicyItem
                title="Voluntary Termination"
                description="Employees must serve 30-day notice period for resignation to facilitate smooth transitions"
              />
              <PolicyItem
                title="Involuntary Termination"
                description={
                  <>
                    <span className="text-red-600 font-medium">NovaNectar</span>{" "}
                    may terminate employment due to misconduct, policy
                    violations or under performance. Written notice will be
                    provided when applicable.
                  </>
                }
              />
              <li className="policy-item">
                Exit interviews will be conducted for feedback and process
                improvements.
              </li>
              <li className="policy-item">
                Company assets must be returned before the final settlement is
                processed.
              </li>
            </ul>
          </PolicySection>

          {/* Policy Updates & Amendments Section */}
          <PolicySection title="11. Policy Updates & Amendments">
            <ul className="list-disc pl-5 space-y-3">
              <li className="policy-item">
                By engaging with{" "}
                <span className="text-red-600 font-medium">NovaNectar</span>{" "}
                services Private Limited, you agree to comply with these
                policies. We reserve the right to update these terms as required
                by evolving business or legal needs.
              </li>
              <li className="policy-item">
                Employees will be notified of any changes in a timely manner.
              </li>
            </ul>
          </PolicySection>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500 bg-white p-4 rounded-lg shadow-sm">
          <p>
            © {new Date().getFullYear()} NovaNectar Services Private Limited.
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

// Reusable components for policy sections
function PolicySection({ title, children }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <h2 className="font-bold text-xl md:text-2xl mb-4 pb-2 border-b text-gray-900">
        {title}
      </h2>
      <div className="space-y-4 text-gray-700">{children}</div>
    </div>
  );
}

function SubSection({ title, children }: any) {
  return (
    <div className="mt-4 mb-6">
      <h3 className="font-bold text-lg mb-3 text-gray-800">{title}</h3>
      {children}
    </div>
  );
}

function PolicyItem({ title, description }: any) {
  return (
    <li className="policy-item">
      {title && <span className="font-bold text-gray-800">{title}:</span>}{" "}
      {description}
    </li>
  );
}
