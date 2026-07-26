import { Link } from 'next/link';

export default function AboutPage() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-10">About Us</h1>

        <div className="space-y-12">
          {/* History */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our History</h2>
            <p className="text-gray-700">
              Founded in 2020, our company started as a small team of passionate developers with a vision to create impactful software solutions. Over the years, we have grown into a trusted partner for businesses seeking innovative technology.
            </p>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Team member cards */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-medium">Alice Smith</h3>
                <p className="text-gray-500 mt-2">CEO & Founder</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-medium">Bob Jones</h3>
                <p className="text-gray-500 mt-2">CTO</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-medium">Carol Lee</h3>
                <p className="text-gray-500 mt-2">Head of Design</p>
              </div>
            </div>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              To empower businesses through innovative technology solutions that drive growth, efficiency, and success. We are committed to delivering excellence, fostering collaboration, and making a positive impact on our clients and the community.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}