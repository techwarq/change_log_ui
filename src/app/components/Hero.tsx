'use client'
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <motion.main 
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <section className="text-white min-h-screen flex flex-col items-center justify-center p-4">
                <div className="container mx-auto text-center max-w-4xl space-y-8">
                    <motion.h1 
                        className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        TRACK: Smart Changelog Evolution
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-gray-300 mb-8"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        Transform your merges and closed PRs into polished, AI-enhanced changelogs. Elevate your release notes with TRACKs intelligent summarization.
                    </motion.p>
                    
                    <motion.form 
                        className="relative h-fit rounded-full w-full max-w-2xl mx-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <input
                            className="w-full bg-white/10 border border-white/25 text-white placeholder-white/50 rounded-full px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            placeholder="Enter a repo URL..."
                        />
                        <motion.button 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Generate <ArrowRight className="ml-2 h-3 w-3" />
                        </motion.button>
                    </motion.form>
                    
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                    >
                        <Link href='/developer'>
                            <motion.button 
                                className="bg-transparent border border-white/20 hover:border-white text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
                                whileHover={{ scale: 1.05, borderColor: "white" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                For Developers
                            </motion.button>
                        </Link>
                        <Link href='/user'>
                            <motion.button 
                                className="bg-transparent border border-white/20 hover:border-white text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
                                whileHover={{ scale: 1.05, borderColor: "white" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                For Users
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.main>
    );
}