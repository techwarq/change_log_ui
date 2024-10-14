import { ArrowRight } from "lucide-react";
import { Compare } from "./ui/compare";

export default function Text() {
  return (
    <section className=" text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Empower Your Objectives
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Dont just ask questions. Let AI break down complex goals into actionable tasks and execute them autonomously.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="bg-transparent border border-gray-400 hover:border-white text-white font-bold py-3 px-6 rounded-full transition duration-300">
            Learn More
          </button>
        </div>
      </div>
       
      <div className="w-full max-w-4xl h-[60vh] px-1 md:px-8 flex items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
        <div
          style={{
            transform: "rotateX(15deg) translateZ(100px)",
          }}
          className="p-1 md:p-4 border rounded-3xl bg-neutral-900 border-neutral-800 w-full h-full shadow-2xl"
        >
          <Compare
            firstImage="https://assets.aceternity.com/notes-dark.png"
            secondImage="https://assets.aceternity.com/linear-dark.png"
            firstImageClassName="object-cover object-left-top w-full h-full"
            secondImageClassname="object-cover object-left-top w-full h-full"
            className="w-full h-full rounded-2xl"
            slideMode="hover"
            autoplay={true}
          />
        </div>
      </div>
    </section>
  )
}