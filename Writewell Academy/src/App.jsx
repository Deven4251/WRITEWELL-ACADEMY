import Home from "./pages/Home";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";
import Classes from "./pages/Classes";
import Testimonials from "./pages/Testimonials"
// import Navbar from "./components/Navbar"; // Assuming you have a Navbar

function App() {
  return (
    <div className="main-container">
      {/* 1. Navbar stays at the top */}
      {/* <Navbar /> */}

      {/* 2. All pages are now sections on one page */}
      <section id="home">
        <Home />
      </section>

      <section id="classes">
        <Classes />
      </section>

      <section id="insights">
        <Insights />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default App;
