import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#14326b] text-white py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - About */}
        <div className="space-y-4 md:order-1">
          <h2 className="text-2xl font-bold text-indigo-00">DevVibe</h2>
          <p className="text-gray-300">
            DevVibe is a platform built for developers to connect, collaborate, and
            build side projects together. Whether you're looking for a co-founder,
            mentor, or teammate — this is your space.
          </p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DevVibe. Built with 💙 for developers.
          </p>
        </div>

        {/* Right Side - Connect With Us */}
        <div className="space-y-4 md:order-2 text-right">
          <h2 className="text-xl font-semibold text-indigo-500">Connect With Us</h2>
          <ul className="space-y-1 text-gray-300">
            <li className="flex justify-end items-center gap-2">
              <FaEnvelope /> 
              <a href="lavaris769@gmail.com" className="hover:text-indigo-400">
                lavaris769@gmail.com
              </a>
            </li>
            <li className="flex justify-end items-center gap-2">
              <FaLinkedin /> 
              <a href="https://linkedin.com/in/shamsttabrez" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                Lavaris
              </a>
            </li>
            <li className="flex justify-end items-center gap-2">
              <FaInstagram /> 
              <span className="text-gray-500">@devVibe (coming soon)</span>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex justify-end gap-4 mt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
