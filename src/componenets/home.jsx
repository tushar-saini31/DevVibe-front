import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const tags = [
  "Frontend Developer",
  "Backend Engineer",
  "Full-Stack Dev",
  "Open Source Lover",
  "ReactJS",
  "Node.js",
  "MongoDB",
  "Machine Learning",
  "Python",
  "TypeScript",
];

const carouselItems = [
  "👨‍💻 Find your perfect dev match!",
  "🤝 Collaborate on exciting projects.",
  "🚀 Launch your next startup idea.",
  "💬 Network with like-minded devs.",
];

const features = [
  {
    icon: "👥",
    title: "Match with Developers",
    description: "Find developers who share your tech stack and interests",
  },
  {
    icon: "💼",
    title: "Project Collaboration",
    description: "Start or join exciting projects that match your skills",
  },
  {
    icon: "🌟",
    title: "Skill Growth",
    description: "Learn from peers and enhance your coding abilities",
  },
  {
    icon: "🤝",
    title: "Network Building",
    description: "Build meaningful connections in the tech community",
  },
];

const Home = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Welcome to DevVibe ❤️";
  const speed = 100;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();

  // Typing animation
  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;
    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeText, speed);
      }
    };
    typeText();
    return () => clearTimeout(timeoutId);
  }, []);

  // Carousel rotation
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
    }, 2000);
    return () => clearInterval(rotationInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.15),transparent)]"></div>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 flex flex-col items-center justify-center gap-10 text-center relative z-10">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            {displayText}
          </h1>

          <p className="text-gray-400 italic text-sm mb-6">
            Built by developers, for developers. 🌐
          </p>

          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-white/80 font-medium mb-6"
          >
            {carouselItems[carouselIndex]}
          </motion.div>

          <motion.div
            className="flex whitespace-nowrap mb-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }} // faster
          >
            {[...tags, ...tags].map((tag, idx) => (
              <span
                key={idx}
                className="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.section
        className="py-16 px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Why Choose DevTinder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-gray-800/30 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-indigo-400 mb-2">5000+</h3>
              <p className="text-gray-400">Active Developers</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-indigo-400 mb-2">1000+</h3>
              <p className="text-gray-400">Successful Matches</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-indigo-400 mb-2">50+</h3>
              <p className="text-gray-400">Projects Launched</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to find your perfect dev match?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of developers who have already found their ideal
            collaborators.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary btn-wide text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            🚀 Get Started Now
          </button>
        </div>
      </section>

    
    </div>
  );
};

export default Home;
