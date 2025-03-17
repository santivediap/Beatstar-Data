import { useState, useContext } from 'react'
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import { BrowserRouter } from 'react-router-dom';
import { LoadingContext } from "./context/loadingContext"

function App() {

  const [loading, setLoading] = useState(false)

  const loadingData = {
    loading,
    setLoading
  }

  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, }}>
      <Header />
      <LoadingContext.Provider value={ loadingData } >
        <Main />
      </LoadingContext.Provider>
      <Footer />
    </BrowserRouter>
  )
}

export default App
