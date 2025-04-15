import { BrowserRouter } from "react-router-dom";
import { Navbar, Hero, About, Experience } from "./components";

import { default as WrappedWorks } from "./components/Works";
import Tech from "./components/Tech";

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <WrappedWorks />
        {/* <Feedbacks /> */}
        <div className="relative z-0">
          {/* <Contact />
          <StarsCanvas /> */}
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
