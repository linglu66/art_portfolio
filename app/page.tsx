"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import projectsData from "@/content/projects.yaml"

interface Project {
  id: string;
  title: string;
  cover: string;
  description: string;
  category: string;
  status?: string;
}

const base = '';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row md:h-full overflow-auto md:overflow-hidden">
      {/* Left content */}
      <div className="flex-none md:flex-1 p-6 md:p-8 flex flex-col justify-start pt-8 md:pt-24 overflow-visible md:overflow-hidden">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">ling lu</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            I'm a creative technologist and artist based in New York. I make interactive experiences, hardware devices, and printed matter — things that use the language of technology to talk about something softer. Formerly a product designer at Stripe and Cash App.
          </p>
        </div>
      </div>

      {/* Right scrollable projects column - full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 bg-gray-50 flex flex-col">
        <div className="bg-gray-50 p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="font-semibold text-gray-900">Projects</h2>
        </div>
        <div className="overflow-y-auto flex-1">
          <div className="p-4 space-y-4">
            {projectsData.projects.map((project: Project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group block border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                {project.id === 'breakup-map-nyc' ? (
                  <div className="w-full relative">
                    <Image
                      src={`${base}${project.cover}`}
                      width={400}
                      height={0}
                      alt={project.title}
                      className="w-full h-auto"
                      style={{ height: 'auto' }}
                    />
                    {project.status === 'in_development' && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        In development
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`relative ${project.id === 'anxious-websites' ? 'h-[400px]' : 'aspect-[4/3]'}`}>
                    <Image
                      src={`${base}${project.cover}`}
                      fill
                      alt={project.title}
                      className="object-cover"
                    />
                    {project.status === 'in_development' && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        In development
                      </div>
                    )}
                  </div>
                )}

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-semibold group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                  </div>

                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {project.category}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


      
   
 