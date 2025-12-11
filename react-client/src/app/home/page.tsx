export const metadata = {
  title: "Home",
  description: "Home page",
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Welcome to My Next.js App
        </h1>

        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          This is a simple home section using Tailwind CSS.
          Modify this template as you like!
        </p>

        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>
    </main>
  );
}

