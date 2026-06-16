import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers — Join Flowtaris',
  description: 'Join our team of elite ERP architects. We are hiring NetSuite Developers and ERP Consultants.'
}

export default function CareersPage() {
  const jobs = [
    { title: "Senior ERP Consultant", location: "Remote / London", type: "Full-Time", desc: "Lead complex SAP and Workday implementations for Fortune 500 clients." },
    { title: "NetSuite SuiteScript Developer", location: "Remote / US", type: "Full-Time", desc: "Build highly customized workflows and native RESTlet integrations using SuiteScript 2.1." }
  ]

  const schema = jobs.map(job => ({
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.desc,
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Flowtaris",
      "sameAs": "https://flowtaris.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location.includes("London") ? "London" : "New York",
        "addressCountry": job.location.includes("London") ? "UK" : "US"
      }
    }
  }))

  return (
    <main className="bg-[#FAFAFA] min-h-screen font-sans text-slate-800 pb-20 pt-32 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>Careers at Flowtaris</h1>
        <p className="text-xl text-slate-600 mb-16 font-light max-w-2xl">Join our elite team of former Big 4 ERP architects. We build the financial infrastructure of tomorrow.</p>
        
        <div className="space-y-6">
          {jobs.map((job, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-2">{job.title}</h3>
                <div className="flex gap-4 text-sm font-semibold text-slate-500 mb-4">
                  <span className="bg-slate-100 px-3 py-1 rounded-full">{job.location}</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full">{job.type}</span>
                </div>
                <p className="text-slate-600 font-light">{job.desc}</p>
              </div>
              <button className="px-8 py-3 bg-[#0A1628] text-white font-bold rounded-lg hover:bg-black transition-colors whitespace-nowrap">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
