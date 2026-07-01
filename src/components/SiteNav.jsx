import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Crown } from 'lucide-react';
import UserMenu from './UserMenu';

const toolsLinks = [
  { to: '/tools/install', label: 'Install the Workflow' },
  { to: '/tools/claude-code-guide', label: 'Quick Reference' },
  { to: '/tools/prompt-flows', label: 'Prompt Flows' },
  { to: '/tools/mission-control', label: 'Mission Control' },
  { to: '/tools/session-monitor', label: 'Session Monitor' },
  { to: '/tools/coop', label: 'Co-Op Mode' },
  { to: '/tools/premium', label: 'Premium Toolkit', premium: true },
];

const allMobileLinks = [
  { to: '/course', label: 'Course' },
  { to: '/explore', label: 'Explore' },
  { to: '/guides', label: 'Guides' },
  { to: '/tools/install', label: 'Install' },
  { to: '/tools/claude-code-guide', label: 'Quick Reference' },
  { to: '/tools/prompt-flows', label: 'Prompt Flows' },
  { to: '/tools/mission-control', label: 'Mission Control' },
  { to: '/tools/session-monitor', label: 'Session Monitor' },
  { to: '/setup/openclaw', label: 'OpenClaw Setup' },
  { to: '/tools/coop', label: 'Co-Op Mode' },
  { to: '/tools/premium', label: 'Premium Toolkit', premium: true },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { pathname } = useLocation();
  const dropdownRef = useRef(null);

  const isActive = (to) => pathname === to || pathname.startsWith(to + '/');

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="h-12 bg-gray-950 border-b border-gray-800 fixed top-0 left-0 right-0 z-50 flex items-center px-4">
      <Link to="/" className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Operators Academy
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 ml-auto">
        <Link
          to="/course"
          className={`text-sm transition-colors ${
            isActive('/course') ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Course
        </Link>

        <Link
          to="/explore"
          className={`text-sm transition-colors ${
            isActive('/explore') ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Explore
        </Link>

        <Link
          to="/guides"
          className={`text-sm transition-colors ${
            isActive('/guides') ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Guides
        </Link>

        {/* Tools dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setToolsOpen(!toolsOpen)}
            className={`text-sm transition-colors flex items-center gap-1 ${
              pathname.startsWith('/tools') ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Tools
            <ChevronDown size={14} className={`transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
          </button>
          {toolsOpen && (
            <div className="absolute top-8 right-0 bg-gray-950 border border-gray-800 rounded-lg py-1 min-w-[200px] shadow-xl">
              {toolsLinks.map(({ to, label, premium }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setToolsOpen(false)}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    premium
                      ? isActive(to) ? 'text-amber-300 bg-gray-900' : 'text-amber-400/80 hover:text-amber-300 hover:bg-gray-900'
                      : isActive(to) ? 'text-white bg-gray-900' : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  }`}
                >
                  {premium && <Crown size={12} className="inline mr-1.5 -mt-0.5" />}
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <UserMenu />
      </div>

      {/* Mobile auth + hamburger */}
      <div className="md:hidden ml-auto flex items-center gap-2">
        <UserMenu />
        <button
          onClick={() => setOpen(!open)}
          className="p-1 text-gray-400 hover:text-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-12 left-0 right-0 bg-gray-950 border-b border-gray-800 md:hidden">
          {allMobileLinks.map(({ to, label, premium }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-sm transition-colors ${
                premium
                  ? isActive(to) ? 'text-amber-300 bg-gray-900' : 'text-amber-400/80 hover:text-amber-300 hover:bg-gray-900'
                  : isActive(to) ? 'text-white bg-gray-900' : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`}
            >
              {premium && <Crown size={12} className="inline mr-1.5 -mt-0.5" />}
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
