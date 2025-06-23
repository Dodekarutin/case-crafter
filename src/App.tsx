import { TestCaseList } from './components/TestCaseList'
import { TestCaseDetail } from './components/TestCaseDetail'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 flex">
          <div className="w-1/3 border-r bg-white">
            <TestCaseList />
          </div>
          <div className="flex-1 bg-white">
            <TestCaseDetail />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App