import Image from "next/image"
import { ArrowRight } from "lucide-react"
import FrameAnimation from "@/components/frame-animation"
import portfolioData from "@/content/portfolio.yaml"
import Link from "next/link"

interface PortfolioPiece {
  id: string;
  title: string;
  cover: string;
  images: string[];
  description: string;
  category: string;
  hasArrow: boolean;
  aspectRatio: string;
  backgroundColor: string;
  hasDetailPage: boolean;
}

const base = process.env.NODE_ENV === 'production' ? '/art_portfolio' : '';

export default function Home() {
  // const nycHeartbreakMap = portfolioData.pieces.find(piece: => piece.id === 'nyc-heartbreak-map')

  return (
    <div>
      {/* <div className="h-[90px] md:h-full ">
        <Image src={`${base}/bunnies.png`} alt="Bunnies" width={300}
                  height={200}
                  className={`w-full h-full object-cover`}/>
      </div> */}
    <div className="p-4 columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
      {portfolioData.pieces.map((piece: PortfolioPiece) => (
        piece.hasDetailPage ? (
          <Link key={piece.id} href={`/piece/${piece.id}`} className="border border-gray-200 rounded-md p-2 relative inline-block w-full mt-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                  <Image
                    src={`${base}${piece.cover}`}
                    width={300}
                    height={200}
                    alt={piece.description}
                    className={`w-full h-auto bg-${piece.backgroundColor} rounded-md`}
                  />
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <div>{piece.title}</div>
              {piece.hasArrow && <ArrowRight size={18} />}
            </div>
          </Link>
        ) : (
          <div key={piece.id} className="border border-gray-200 rounded-md p-2 relative inline-block w-full mt-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                  <Image
                    src={`${base}${piece.cover}`}
                    width={300}
                    height={200}
                    alt={piece.description}
                    className={`w-full h-auto bg-${piece.backgroundColor} rounded-md`}
                  />
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <div>{piece.title}</div>
              {piece.hasArrow && <ArrowRight size={18} />}
            </div>
          </div>
        )
      ))}
    </div>
    </div>
  )
}


      
   
 