// Homepage — will be fully built in Prompt 5
// Sections: Hero, TrustBar, ServicesGrid, IntegrationDiagram,
// CaseStudyHighlights, PlatformStrip, InsightsPreview, CTASection

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-navy-950 via-navy-800 to-navy-700 section-padding">
        <div className="container-content text-center">
          <span className="section-label">Enterprise ERP &amp; Integration Consulting</span>
          <h1 className="font-display text-display-xl text-white mt-6 mb-6">
            The Science Behind
            <br />
            <span className="text-gold-400">Seamless Business Operations.</span>
          </h1>
          <p className="text-navy-100 text-lg max-w-2xl mx-auto">
            Flowtaris helps finance, procurement and operations teams eliminate
            inefficiency, integrate enterprise systems, and build the process
            infrastructure that scales.
          </p>
        </div>
      </section>
    </div>
  )
}
