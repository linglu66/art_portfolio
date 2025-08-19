// Detail page for a portfolio piece
// TODO: Support multiple images/gallery in the future
import Image from "next/image";
import portfolioData from "@/content/portfolio.yaml";
import { notFound } from "next/navigation";

interface PortfolioPiece {
  id: string;
  title: string;
  images: string[];
  description: string;
  category: string;
  hasArrow: boolean;
  aspectRatio: string;
  backgroundColor: string;
  useFrameAnimation?: boolean;
  hasDetailPage: boolean;
}

export function generateStaticParams() {
  return portfolioData.pieces.map((piece: PortfolioPiece) => ({ id: piece.id }));
}

export default function PieceDetail({ params }: { params: { id: string } }) {
  const piece = portfolioData.pieces.find((p: PortfolioPiece) => p.id === params.id);
  if (!piece) return notFound();
  const base = process.env.NODE_ENV === 'production' ? '/art_portfolio' : '';

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Images column */}
      <div className="flex-1 min-w-0 flex flex-col items-center justify-center gap-24">
        {piece.images.map((img: string, idx: number) => (
          <Image
            key={idx}
            src={`${base}${img}`}
            width={600}
            height={400}
            alt={`${piece.title} image ${idx + 1}`}
            className={`w-full h-auto bg-${piece.backgroundColor} rounded-md`}
          />
        ))}
      </div>
      {/* Description column */}
      <div className="w-full md:w-1/3 max-w-md flex flex-col pt-8 pr-24">
        <h1 className="text-2xl mb-8">{piece.title}</h1>
        <p className="mb-4 text-sm" dangerouslySetInnerHTML={{ 
          __html: piece.description.replace(/\n/g, '<br>') 
        }}></p>
      </div>
    </div>
  );
} 