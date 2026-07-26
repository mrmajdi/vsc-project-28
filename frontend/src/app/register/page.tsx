'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<'name' | 'mobile' | 'otp' | 'done'>('name');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleNextName = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    setError('');
    setStep('mobile');
  };

  const handleSendOTP = async () => {
    if (!/^\d{10,15}$/.test(mobile)) {
      setError('Please enter a valid mobile number');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise(res => setTimeout(res, 1500));
      // In real app: await fetch('/api/send-otp', { method: 'POST', body: JSON.stringify({ mobile }) });
      setStep('otp');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!/^\d{6}$/.test(otp)) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Simulate API call to verify OTP and register
      await new Promise(res => setTimeout(res, 1500));
      // In real app: await fetch('/api/register', { method: 'POST', body: JSON.stringify({ name, mobile, otp }) });
      setStep('done');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    // Optionally redirect to login or home
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        {step === 'name' && (
          <>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleNextName}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? 'Saving...' : 'Next'}
            </button>
          </>
        )}
        {step === 'mobile' && (
          <>
            <input
              type="tel"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              placeholder="Mobile Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        )}
        {step === 'otp' && (
          <>
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              placeholder="6‑digit OTP"
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}
        {step === 'done' && (
          <div className="text-center">
            <p className="text-green-600 font-medium">Registration successful!</p>
            <button
              onClick={handleDone}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-blue-500 text-center">{message}</p>}
      </div>
    </div>
  );
}