export const metadata = {
  title: "Home",
  description: "Home page",
};

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Welcome to the home page.
      </p>
    </div>
  );
}

