import { Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold">AI Logo</h3>
            <p className="text-sm text-gray-600 max-w-md">
              Create unique and professional logos for your brand using artificial intelligence. 
              Fast, easy, and customizable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/templates" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="/history" className="text-sm text-gray-600 hover:text-black transition-colors">
                  My Logos
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername/ai-logo-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} AI Logo Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}