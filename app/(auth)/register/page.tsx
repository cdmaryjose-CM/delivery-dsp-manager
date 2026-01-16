'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Eye, EyeOff, Loader2, User, Truck, Phone, CheckCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDriverSignup = searchParams.get('role') === 'driver';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Phone verification states
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    // Reset verification if phone changes
    if (phoneVerified) {
      setPhoneVerified(false);
      setCodeSent(false);
      setVerificationCode('');
    }
  };

  const isValidPhone = () => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
  };

  const sendVerificationCode = async () => {
    if (!isValidPhone()) {
      setError(t('register.phoneInvalid'));
      return;
    }

    setSendingCode(true);
    setError('');

    try {
      // Generate a 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);

      // In production, this would send SMS via Twilio or similar service
      // For now, we'll simulate sending and show the code in console for testing
      console.log(`Verification code for ${phone}: ${code}`);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCodeSent(true);
      setCountdown(60); // 60 seconds before can resend

      // Show success message (in production, remove the code display)
      alert(`Código de verificación enviado: ${code}\n(En producción, esto se enviará por SMS)`);
    } catch {
      setError('Error al enviar el código');
    } finally {
      setSendingCode(false);
    }
  };

  const verifyCode = async () => {
    if (verificationCode.length !== 6) {
      setError(t('register.invalidCode'));
      return;
    }

    setVerifyingCode(true);
    setError('');

    try {
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (verificationCode === generatedCode) {
        setPhoneVerified(true);
        setCodeSent(false);
      } else {
        setError(t('register.invalidCode'));
      }
    } catch {
      setError(t('register.invalidCode'));
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate phone verification
    if (!phoneVerified) {
      setError(t('register.phoneRequired'));
      setLoading(false);
      return;
    }

    // Validate passwords
    if (password !== confirmPassword) {
      setError(t('register.passwordMismatch'));
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(t('register.passwordTooShort'));
      setLoading(false);
      return;
    }

    const supabase = createClient();

    // Get only digits for storage
    const phoneDigits = phone.replace(/\D/g, '');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phoneDigits,
          phone_verified: true,
          is_driver_signup: isDriverSignup,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/login?registered=true');
  };

  return (
    <div className="min-h-screen theme-gradient-bg flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-am-green/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-am-navy/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse" />
      </div>

      {/* Theme/Language toggles */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {/* Register Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="glass-crystal rounded-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="block">
              <div className="bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-xl p-3 shadow-lg">
                <Image
                  src="/logo_amall.PNG"
                  alt="AUTOS MALL LLC"
                  width={200}
                  height={110}
                  className="object-contain h-16 w-auto"
                />
              </div>
            </Link>
          </div>

          {/* Driver badge */}
          {isDriverSignup && (
            <div className="mb-4 p-3 bg-am-orange/10 border border-am-orange/30 rounded-lg flex items-center gap-3">
              <Truck className="w-5 h-5 text-am-orange" />
              <p className="text-sm font-medium text-am-orange">{t('register.driverSignup')}</p>
            </div>
          )}

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('register.title')}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('register.subtitle')}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('register.fullName')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('register.fullNamePlaceholder')}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('register.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('register.emailPlaceholder')}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Phone with verification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('register.phone')}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={t('register.phonePlaceholder')}
                  required
                  disabled={phoneVerified}
                  className="w-full pl-10 pr-24 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400 disabled:opacity-60"
                />
                {phoneVerified ? (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-500">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-xs font-medium">{t('register.phoneVerified')}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={sendVerificationCode}
                    disabled={!isValidPhone() || sendingCode || countdown > 0}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-am-navy dark:bg-am-orange text-white text-xs font-medium rounded-md hover:bg-am-navy-light dark:hover:bg-am-orange-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {sendingCode ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : countdown > 0 ? (
                      `${countdown}s`
                    ) : (
                      t('register.sendCode')
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Verification Code Input */}
            {codeSent && !phoneVerified && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg space-y-3">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {t('register.codeSent')}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder={t('register.verificationCodePlaceholder')}
                    maxLength={6}
                    className="flex-1 px-4 py-2 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400 text-center text-lg tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={verifyCode}
                    disabled={verificationCode.length !== 6 || verifyingCode}
                    className="px-4 py-2 bg-am-green text-white font-medium rounded-lg hover:bg-am-green-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {verifyingCode ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      t('register.verifyCode')
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('register.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('register.passwordPlaceholder')}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('register.confirmPassword')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('register.confirmPasswordPlaceholder')}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-am-navy focus:ring-am-navy"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t('register.terms')}{' '}
                <Link href="/terms" className="text-am-navy dark:text-am-orange hover:underline">
                  {t('register.termsLink')}
                </Link>{' '}
                {t('register.and')}{' '}
                <Link href="/privacy" className="text-am-navy dark:text-am-orange hover:underline">
                  {t('register.privacyLink')}
                </Link>
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !phoneVerified}
              className="w-full py-3 bg-gradient-to-r from-am-green to-am-green-light text-white rounded-lg font-semibold hover:from-am-green-light hover:to-am-green transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('register.loading')}
                </>
              ) : (
                t('register.submit')
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/20" />
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">{t('register.or')}</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/20" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t('register.hasAccount')}{' '}
            <Link href="/login" className="text-am-navy dark:text-am-orange font-semibold hover:underline">
              {t('register.loginLink')}
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-am-navy dark:hover:text-am-orange">
            ← {t('register.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
