import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900/50 to-black/50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4 gradient-text-premium neon-glow">BKPMUN</h4>
            <p className="text-white/60 text-sm">
              Bahçeşehir Koleji Parkorman Model United Nations conference. Join us for an exceptional MUN experience.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/60 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/committees" className="text-white/60 hover:text-white transition-colors text-sm">
                  Committees
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-white/60 hover:text-white transition-colors text-sm">
                  Team
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  UN Documents
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Procedural Rules
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Position Papers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <p className="text-white/60 text-sm mb-2">
              For inquiries and information about BKPMUN
            </p>
            <p className="text-white/60 text-sm">Email: info@bkpmun.org</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">&copy; 2024 BKPMUN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
