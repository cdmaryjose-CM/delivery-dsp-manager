'use client';

/**
 * ============================================================================
 * AUTOS MALL LLC - LANDING PAGE
 * ============================================================================
 *
 * Professional landing page for delivery service partner company.
 * Features: i18n (EN/ES), Dark/Light mode, Glass morphism design
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Truck,
  Package,
  MapPin,
  Clock,
  Shield,
  Users,
  Phone,
  CheckCircle2,
  ArrowRight,
  Star,
  Camera,
  Navigation,
  Headphones,
  DollarSign,
  Car,
  Smartphone,
  FileCheck,
  Award
} from 'lucide-react';

// Animations
const animations = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(245, 166, 35, 0.3),
                  0 0 40px rgba(30, 58, 95, 0.2);
    }
    50% {
      box-shadow: 0 0 30px rgba(245, 166, 35, 0.5),
                  0 0 60px rgba(30, 58, 95, 0.3);
    }
  }
`;

export default function LandingPage() {
  const t = useTranslations('landing');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen theme-gradient-bg text-gray-900 dark:text-white">
      <style jsx>{animations}</style>

      {/* Animated background elements */}
      <div className="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-am-orange/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
        <div className="absolute top-60 right-20 w-72 h-72 bg-am-navy/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-am-green/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
      </div>

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text Content */}
            <div className={`space-y-5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Badges */}
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-am-orange/10 dark:bg-am-orange/20 backdrop-blur-sm rounded-full border border-am-orange/30 w-fit">
                  <Truck className="w-3.5 h-3.5 text-am-orange" />
                  <span className="text-xs font-medium text-am-navy dark:text-white">{t('hero.badge1')}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-am-navy/10 dark:bg-white/10 backdrop-blur-sm rounded-full border border-am-navy/20 dark:border-white/20 w-fit">
                  <Package className="w-3.5 h-3.5 text-am-navy dark:text-am-orange" />
                  <span className="text-xs font-medium text-am-navy dark:text-white">{t('hero.badge2')}</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-gray-900 dark:text-white">
                  {t('hero.title1')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-am-navy via-am-orange to-am-green bg-clip-text text-transparent">
                  {t('hero.title2')}
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                {t('hero.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="#drivers"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-am-navy to-am-navy-light rounded-lg font-semibold text-white text-sm hover:from-am-navy-light hover:to-am-navy transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  <Truck className="w-4 h-4" />
                  {t('hero.cta1')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-sm text-gray-700 dark:text-white border border-gray-200 dark:border-white/20 hover:bg-white dark:hover:bg-white/20 transition-all hover:scale-105"
                >
                  <Phone className="w-4 h-4" />
                  {t('hero.cta2')}
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Shield className="w-4 h-4 text-am-green" />
                  <span className="text-xs">{t('hero.trust1')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4 text-am-navy dark:text-am-orange" />
                  <span className="text-xs">{t('hero.trust2')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Headphones className="w-4 h-4 text-am-orange" />
                  <span className="text-xs">{t('hero.trust3')}</span>
                </div>
              </div>
            </div>

            {/* Right: Hero Image/Logo */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative flex items-center justify-center">
                {/* Glow effect */}
                <div
                  className="absolute w-80 h-80 rounded-full opacity-60"
                  style={{
                    background: 'radial-gradient(circle, rgba(245,166,35,0.3) 0%, rgba(30,58,95,0.2) 50%, transparent 70%)',
                    animation: 'pulse-glow 3s ease-in-out infinite',
                  }}
                />

                {/* Logo Container */}
                <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-3xl glass-crystal p-4 flex items-center justify-center" style={{ animation: 'float 4s ease-in-out infinite' }}>
                  <Image
                    src="/am-logo.svg"
                    alt="AUTOS MALL LLC"
                    width={280}
                    height={280}
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 p-3 rounded-xl glass-crystal" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Package className="w-6 h-6 text-am-orange" />
                </div>
                <div className="absolute -bottom-4 -left-4 p-3 rounded-xl glass-crystal" style={{ animation: 'float 3.5s ease-in-out infinite 0.5s' }}>
                  <Truck className="w-6 h-6 text-am-navy dark:text-am-green" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {[
              { icon: Package, label: t('stats.deliveries'), value: '10,000+', color: 'am-orange' },
              { icon: Users, label: t('stats.drivers'), value: '50+', color: 'am-navy' },
              { icon: Star, label: t('stats.satisfaction'), value: '98%', color: 'am-green' },
              { icon: MapPin, label: t('stats.coverage'), value: 'CA', color: 'am-orange' },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl glass-crystal hover:scale-105 transition-all"
              >
                <stat.icon className={`w-6 h-6 text-${stat.color} mb-2`} />
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-0.5">{stat.value}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('problem.title')}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('problem.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="p-6 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-200 dark:border-red-500/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-red-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400">{t('problem.problemTitle')}</h3>
              </div>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-500 text-xs">✕</span>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t(`problem.problem${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="p-6 bg-am-green/10 dark:bg-am-green/10 rounded-2xl border border-am-green/30 dark:border-am-green/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-am-green/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-am-green" />
                </div>
                <h3 className="text-xl font-bold text-am-green">{t('problem.solutionTitle')}</h3>
              </div>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-am-green/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5 text-am-green" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t(`problem.solution${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { step: 1, icon: Package, color: 'am-navy', title: t('howItWorks.step1.title'), desc: t('howItWorks.step1.desc') },
              { step: 2, icon: Navigation, color: 'am-orange', title: t('howItWorks.step2.title'), desc: t('howItWorks.step2.desc') },
              { step: 3, icon: Camera, color: 'am-green', title: t('howItWorks.step3.title'), desc: t('howItWorks.step3.desc') },
            ].map((item, i) => (
              <div key={i} className="relative group">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 dark:from-white/20 to-transparent z-0" />
                )}

                <div className="relative z-10 p-6 rounded-2xl glass-crystal hover:scale-[1.02] transition-all">
                  {/* Step number */}
                  <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg bg-${item.color} text-white`}>
                    {item.step}
                  </div>

                  <div className={`p-3 bg-${item.color}/10 dark:bg-${item.color}/20 rounded-xl w-fit mb-4 mt-2`}>
                    <item.icon className={`w-6 h-6 text-${item.color}`} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: MapPin, title: t('features.tracking.title'), desc: t('features.tracking.desc'), color: 'am-navy' },
              { icon: Clock, title: t('features.speed.title'), desc: t('features.speed.desc'), color: 'am-orange' },
              { icon: Package, title: t('features.care.title'), desc: t('features.care.desc'), color: 'am-green' },
              { icon: Users, title: t('features.drivers.title'), desc: t('features.drivers.desc'), color: 'am-navy' },
              { icon: Headphones, title: t('features.support.title'), desc: t('features.support.desc'), color: 'am-orange' },
              { icon: Navigation, title: t('features.coverage.title'), desc: t('features.coverage.desc'), color: 'am-green' },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-xl glass-crystal hover:scale-105 transition-all"
              >
                <div className={`p-2 bg-${feature.color}/10 dark:bg-${feature.color}/20 rounded-lg w-fit mb-3`}>
                  <feature.icon className={`w-5 h-5 text-${feature.color}`} />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVERS SECTION */}
      <section id="drivers" className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl p-6 lg:p-8 glass-crystal">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-am-orange/10 rounded-full mb-4">
                  <Truck className="w-3.5 h-3.5 text-am-orange" />
                  <span className="text-xs font-medium text-am-orange">{t('drivers.badge')}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('drivers.title')}
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                  {t('drivers.desc')}
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: FileCheck, text: t('drivers.req1') },
                    { icon: Car, text: t('drivers.req2') },
                    { icon: Smartphone, text: t('drivers.req3') },
                    { icon: Shield, text: t('drivers.req4') },
                    { icon: Package, text: t('drivers.req5') },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-white/5 rounded-lg">
                      <item.icon className="w-5 h-5 text-am-green" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-am-navy to-am-navy-light text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-8 h-8 text-am-orange" />
                    <div>
                      <div className="text-sm text-gray-300">{t('drivers.earnings')}</div>
                      <div className="text-2xl font-bold text-am-orange">{t('drivers.earningsValue')}</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-am-green" />
                      <span className="text-sm">Flexible schedule</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-am-green" />
                      <span className="text-sm">Use your own vehicle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-am-green" />
                      <span className="text-sm">Weekly payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-am-green" />
                      <span className="text-sm">Growth opportunities</span>
                    </div>
                  </div>

                  <Link
                    href="#contact"
                    className="block w-full text-center py-3 bg-am-orange text-white rounded-lg font-semibold hover:bg-am-orange-light transition-colors"
                  >
                    {t('drivers.cta')}
                  </Link>
                </div>

                {/* Badge */}
                <div className="absolute -top-3 -right-3 p-2 rounded-full bg-am-green text-white">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section id="contact" className="relative py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="#drivers"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-am-navy to-am-navy-light rounded-lg font-semibold text-white hover:from-am-navy-light hover:to-am-navy transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              <Truck className="w-5 h-5" />
              {t('cta.button1')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="mailto:contact@autosmall.com"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-gray-700 dark:text-white border border-gray-200 dark:border-white/20 hover:bg-white dark:hover:bg-white/20 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              {t('cta.button2')}
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-am-orange" />
              <span className="text-sm">10,000+ {t('cta.deliveries')}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-sm ml-1">4.9/5 {t('cta.rating')}</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
