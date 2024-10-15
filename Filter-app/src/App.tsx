import './App.css'
import MainComponent from './Components/MainComponent'
import Sidebar from './Components/Sidebar'

function App() {

  return (
    <div className='flex space-x-8'>
      <Sidebar />
      <MainComponent />
    </div>
  )
}

export default App
