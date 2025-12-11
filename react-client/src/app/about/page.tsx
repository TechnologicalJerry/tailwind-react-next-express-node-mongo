export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-20">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>

                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                    Welcome to our application! We focus on building clean, modern, and fast
                    web experiences using the latest technologies. Our goal is to create
                    products that are simple, intuitive, and efficient.
                </p>

                {/* Tech Stack */}
                <div className="bg-white shadow rounded-xl p-8">
                    <h2 className="text-2xl font-semibold mb-4">Our Tech Stack</h2>

                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                        <li className="p-2 bg-gray-100 rounded">Next.js</li>
                        <li className="p-2 bg-gray-100 rounded">React</li>
                        <li className="p-2 bg-gray-100 rounded">Tailwind CSS 4</li>
                        <li className="p-2 bg-gray-100 rounded">Node.js</li>
                        <li className="p-2 bg-gray-100 rounded">TypeScript</li>
                        <li className="p-2 bg-gray-100 rounded">MongoDB / PostgreSQL</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
