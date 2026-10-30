import { useReveal } from './hooks/useReveal'
import Header from './components/Header'
import Home from './components/Home'
import Experiences from './components/Experiences'
import Projects from './components/Projects'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useReveal()

  return (
    <>
      <Header />
      <main>
        <Home />
        <Projects />
        <Experiences />        
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
