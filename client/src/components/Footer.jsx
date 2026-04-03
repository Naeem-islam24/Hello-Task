import logo from "../assets/images/Logo-Gpt.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LOGO + DESC */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} className="h-8" />
            <h2 className="text-white text-xl font-bold">HelloTask</h2>
          </div>
          <p className="text-sm leading-relaxed">
            HelloTask is your trusted platform for reliable home services.
            Book skilled professionals anytime, anywhere with ease.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-orange-400">Home</a></li>
            <li><a href="/services" className="hover:text-orange-400">Services</a></li>
            <li><a href="/about" className="hover:text-orange-400">About Us</a></li>
            <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><span className="hover:text-orange-400 cursor-pointer">Home Cleaning</span></li>
            <li><span className="hover:text-orange-400 cursor-pointer">AC Repair</span></li>
            <li><span className="hover:text-orange-400 cursor-pointer">Electrician</span></li>
            <li><span className="hover:text-orange-400 cursor-pointer">Plumbing</span></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@hellotask.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-700"></div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-3 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} HelloTask. All rights reserved.
        </p>

        {/* SOCIAL */}
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-orange-400">🌐</a>
          <a href="#" className="hover:text-orange-400">📘</a>
          <a href="#" className="hover:text-orange-400">🐦</a>
          <a href="#" className="hover:text-orange-400">💼</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;