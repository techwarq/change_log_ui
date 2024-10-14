import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <main className="flex-1">
            <section className=" text-white min-h-screen flex flex-col items-center justify-center p-4">
                <div className="container mx-auto text-center max-w-4xl space-y-8">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        Empower Your Objectives
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Dont just ask questions. Let AI break down complex goals into actionable tasks and execute them autonomously.
                    </p>
                    
                    {/* Form */}
                    <form className="relative h-fit rounded-full w-full max-w-2xl mx-auto">
                        <input
                            className="w-full bg-white/10 border border-white/25 text-white placeholder-white/50 rounded-full px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            placeholder="Enter your objective..."
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center justify-center">
                            Start <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </form>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button className="bg-transparent border border-gray-400 hover:border-white text-white font-bold py-3 px-8 rounded-full text-lg transition-all">
                            Dev
                        </button>
                        <Link href='/user'>
                        <button className="bg-transparent border border-gray-400 hover:border-white text-white font-bold py-3 px-8 rounded-full text-lg transition-all">
                            User
                        </button></Link>
                    </div>
                </div>
            </section>
        </main>
    );
}