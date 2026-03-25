import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, ShoppingBag } from "lucide-react"
import projectsData from "@/content/projects.yaml"

export async function generateStaticParams() {
  return projectsData.projects.map((project: { id: string }) => ({
    slug: project.id,
  }))
}

interface Project {
  id: string;
  title: string;
  cover: string;
  description: string;
  category: string;
  writeup: string;
  process_images?: string[];
  live_url?: string;
  buy_link?: string;
  status?: string;
  tech_stack?: string[];
}

const base = '';

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const project = projectsData.projects.find((p: Project) => p.id === slug);

  if (!project) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      {/* Project header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{project.description}</p>

        {/* Action buttons */}
        <div className="flex gap-4 flex-wrap">
          {project.live_url && (
            <Link
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <ExternalLink size={16} />
              View live project
            </Link>
          )}

          {project.buy_link && (
            <Link
              href={project.buy_link}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <ShoppingBag size={16} />
              Get one
            </Link>
          )}

          {project.status === 'in_development' && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md">
              In development
            </div>
          )}
        </div>
      </div>

      {/* Main image */}
      <div className="mb-8">
        <Image
          src={`${base}${project.cover}`}
          width={800}
          height={600}
          alt={project.title}
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Project writeup */}
      <div className="prose prose-lg max-w-none mb-8">
        <div className="whitespace-pre-wrap">{project.writeup}</div>
      </div>

      {/* Process images */}
      {project.process_images && project.process_images.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.process_images.map((image, index) => (
              <Image
                key={index}
                src={`${base}${image}`}
                width={400}
                height={300}
                alt={`${project.title} process ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* Tech stack */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Built with</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}