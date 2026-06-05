// Admin layout — wraps all admin panel pages with sidebar navigation
// Will be fully built in Prompt 12

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* <AdminSidebar /> — Prompt 12 */}
      <main className="p-8">{children}</main>
    </div>
  )
}
