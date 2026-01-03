'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { Menu, X, Truck, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('navigation');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg sticky top-0 z-40 transition-colors duration-300 border-b border-gray-200/50 dark:border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg bg-white">
                <Image
                  src="/am-logo.svg"
                  alt="AUTOS MALL LLC Logo"
                  width={48}
                  height={48}
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div>
                <div className="font-bold text-xl text-am-navy dark:text-white">AUTOS MALL</div>
                <div className="text-xs font-medium -mt-1 text-am-orange">LLC</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-am-navy dark:hover:text-am-orange transition-colors text-sm font-medium"
            >
              {t('home')}
            </Link>
            <Link
              href="#services"
              className="text-gray-600 dark:text-gray-300 hover:text-am-navy dark:hover:text-am-orange transition-colors text-sm font-medium"
            >
              {t('services')}
            </Link>
            <Link
              href="#drivers"
              className="text-gray-600 dark:text-gray-300 hover:text-am-navy dark:hover:text-am-orange transition-colors text-sm font-medium"
            >
              {t('drivers')}
            </Link>
            <Link
              href="#contact"
              className="text-gray-600 dark:text-gray-300 hover:text-am-navy dark:hover:text-am-orange transition-colors text-sm font-medium"
            >
              {t('contact')}
            </Link>
          </div>

          {/* Right Side - Controls */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            {/* CTA Button */}
            <Link
              href="#drivers"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-am-orange text-white rounded-lg font-medium text-sm hover:bg-am-orange-light transition-colors"
            >
              <Truck className="w-4 h-4" />
              Join as Driver
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                href="#services"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('services')}
              </Link>
              <Link
                href="#drivers"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('drivers')}
              </Link>
              <Link
                href="#contact"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>

              <div className="flex items-center space-x-2 px-4 pt-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>

              <Link
                href="#drivers"
                className="mx-4 flex items-center justify-center gap-2 px-4 py-2 bg-am-orange text-white rounded-lg font-medium text-sm hover:bg-am-orange-light transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Truck className="w-4 h-4" />
                Join as Driver
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
