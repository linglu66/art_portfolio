import Image from "next/image"
import { ArrowRight } from "lucide-react"
import FrameAnimation from "@/components/frame-animation"
import portfolioData from "@/content/portfolio.yaml"

interface PortfolioPiece {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  hasArrow: boolean;
  aspectRatio: string;
  backgroundColor: string;
  useFrameAnimation?: boolean;
}

export default function Home() {
  // const nycHeartbreakMap = portfolioData.pieces.find(piece: => piece.id === 'nyc-heartbreak-map')

  return (
    <div>
      <div className="w-full">
        <Image src="/bunnies.png" alt="Bunnies" width={300}
                  height={200}
                  className={`w-full h-auto`}/>
      </div>
    <div className="p-4 columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
      {portfolioData.pieces.map((piece: PortfolioPiece) => (
        <div key={piece.id} className="border border-gray-200 rounded-md p-4 relative inline-block w-full mt-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
            
                <Image
                  src={piece.image}
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
      ))}
    </div>
    </div>
  )
}


      
   
 