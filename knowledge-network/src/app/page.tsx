export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Knowledge Network</h1>
        <p className="text-xl text-gray-600 mb-8">
          A platform for collaborative learning and knowledge sharing
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/dashboard" 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Go to Dashboard
          </a>
          <a 
            href="/hub" 
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            View Hub
          </a>
        </div>
      </div>
    </div>
  )
}