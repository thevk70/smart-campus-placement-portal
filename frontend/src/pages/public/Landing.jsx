import { Link } from "react-router-dom";
import {
  FaBars, FaTimes,
  FaGraduationCap,
  FaUserGraduate,
  FaUserTie,
  FaBriefcase,
  FaUserCircle,
  FaCogs,
  FaBell,
  FaShieldAlt,
  FaChartBar,
  FaNodeJs,
  FaReact,
  FaServer,
  FaDatabase,
  FaLock,
  FaGithub,
  FaLinkedin,
  FaArrowUp,
  FaEnvelope
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Landing() {
  const [showScroll, setShowScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* ================= NAVBAR ================= */}
<header className="bg-white shadow-sm sticky top-0 z-50">
  <nav className="container mx-auto px-6 py-4">
    <div className="flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
          <FaGraduationCap className="text-white text-xl" />
        </div>
        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Smart Campus
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg"
        >
          Register
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-blue-600"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="md:hidden mt-4 flex flex-col gap-3 bg-white rounded-xl shadow-lg p-4">
        <Link
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="px-4 py-2 text-center text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          onClick={() => setMenuOpen(false)}
          className="px-4 py-2 text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg"
        >
          Register
        </Link>
      </div>
    )}
  </nav>
</header>


      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Smart Campus
              </span>
              <br />
              <span className="text-gray-800">Placement Portal</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Revolutionize campus recruitment with an intelligent placement
              management system for students and administrators.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/login"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:scale-105 transition"
              >
                <FaUserGraduate /> Student Login
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 bg-white text-blue-500 border-2 border-blue-500 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition"
              >
                <FaUserTie /> Admin Login
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl p-8 shadow-2xl rotate-3">
              <div className="bg-white rounded-2xl p-8 -rotate-3 text-center">
                <img src="https://cdn.ailandingpage.ai/landingpage_io/user-generate/67bc20cf-4634-47d6-b471-bc3f7c0c50e9/67bc20cf-4634-47d6-b471-bc3f7c0c50e9/hero/hero-main-c9ba135231b04787a15888fe03f664ee.png" alt="" srcset="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature icon={<FaBriefcase />} title="Job Postings & Applications" />
            <Feature icon={<FaUserCircle />} title="Student Dashboard" />
            <Feature icon={<FaCogs />} title="Admin Management" />
            <Feature icon={<FaBell />} title="Email Notifications" />
            <Feature icon={<FaShieldAlt />} title="Secure Authentication" />
            <Feature icon={<FaChartBar />} title="Analytics & Reports" />
          </div>
        </div>
      </section>

      {/* ================= TECH STACK ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">
            Built with MERN Stack
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <Tech icon={<FaNodeJs />} name="Node.js" />
            <Tech icon={<FaReact />} name="React" />
            <Tech icon={<FaServer />} name="Express" />
            <Tech icon={<FaDatabase />} name="MongoDB" />
          </div>

          <div className="mt-12 inline-flex items-center gap-3 bg-yellow-50 px-6 py-3 rounded-xl">
            <FaLock className="text-orange-500 text-2xl" />
            <span className="font-semibold">
              Secured with JWT Authentication
            </span>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FaGraduationCap />
              <span className="font-bold">
                Smart Campus Placement Portal
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="mailto:thevk70@gmail.com">
            <FaEnvelope className="text-xl hover:text-white cursor-pointer"/>
            </a>
            <a href="http://github.com/thevk70">
            <FaGithub className="text-xl hover:text-white cursor-pointer" /> 
            </a>  
            <a href="https://www.linkedin.com/in/vishwajeet-kumar-b91594238/">
            <FaLinkedin className="text-xl hover:text-white cursor-pointer" />
            </a>
          </div>
        </div>
      </footer>

      {/* ================= SCROLL TO TOP ================= */}
      {showScroll && (
        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-full shadow-lg"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

/* ---------- Reusable Components ---------- */
function Feature({ icon, title }) {
  return (
    <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition">
      <div className="text-3xl text-blue-500 mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  );
}

function Tech({ icon, name }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-4xl text-blue-500">{icon}</div>
      <p className="font-semibold">{name}</p>
    </div>
  );
}
