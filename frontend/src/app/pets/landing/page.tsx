import Link from 'next/link';
import Image from 'next/image';

export default function PetsLandingPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Discover Your Pet's QR ID
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Keep your furry friend safe with a scannable QR code that stores
            essential information and helps reunite lost pets with their owners.
          </p>
          <Link href="/pets/qr-generator" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-shadow duration-200 hover:shadow-lg">
            Create Your Pet's QR ID
          </Link>
        </div>
      </section>

      {/* How It Works - Steps */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl">1</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Scan the QR Code</h3>
              <p className="text-gray-600">
                Anyone who finds your pet can scan the QR code with a smartphone
                to instantly.
              </p>
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl">2</span>
              </div>
              <h3 className="text-xl font-medium mb-3">View Pet Profile</h3>
              <p className="text-gray-600">
                The scanner sees your pet's name, your contact info, medical
                notes, and any special instructions you've added.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl">3</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Reunite Quickly</h3>
              <p className="text-gray-600">
                Get notified when your pet's QR code is scanned and chat
                directly with the finder to bring your pet home safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Why Choose QR Pet ID?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Benefit 1 */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Instant Access</h3>
                <p className="text-gray-600 mt-1">
                  No apps needed – any smartphone camera can read the QR code
                  and display your pet's vital information instantly.
                </p>
              </div>
            </div>
            {/* Benefit 2 */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 10c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Privacy Controlled</h3>
                <p className="text-gray-600 mt-1">
                  You decide what information to share. Update details anytime
                  without needing to replace a physical tag.
                </p>
              </div>
            </div>
            {/* Benefit 3 */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w