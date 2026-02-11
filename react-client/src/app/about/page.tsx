export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about our mission, values, and the team behind our platform.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our mission is to provide powerful, intuitive tools that help businesses and
              individuals achieve their goals. We believe in creating solutions that are not
              only functional but also delightful to use.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are committed to continuous innovation, user-centric design, and building
              products that make a real difference in people's lives.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-700">
                  We constantly push the boundaries of what's possible, embracing new
                  technologies and methodologies.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
                <p className="text-gray-700">
                  We maintain the highest standards in everything we do, from code quality
                  to user experience.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency</h3>
                <p className="text-gray-700">
                  We believe in open communication and being honest with our users and
                  stakeholders.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-700">
                  We foster a strong community where users can learn, share, and grow
                  together.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded with a vision to simplify complex workflows and empower users, we've
              grown from a small startup to a trusted platform serving thousands of users
              worldwide.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our journey has been marked by continuous learning, adaptation, and a relentless
              focus on solving real-world problems. We're excited about what the future holds
              and look forward to continuing to serve our community.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
