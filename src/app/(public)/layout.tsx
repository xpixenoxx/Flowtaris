// Public layout — wraps all public-facing pages with navigation and footer
// Will be populated in Prompt 4

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <Navigation /> — Prompt 4 */}
      <main>{children}</main>
      {/* <Footer /> — Prompt 4 */}
    </>
  )
}
