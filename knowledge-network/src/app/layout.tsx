export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold">Knowledge Network</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</a>
                  <a href="/hub" className="text-gray-700 hover:text-gray-900">Hub</a>
                </div>
              </div>
            </div>
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}