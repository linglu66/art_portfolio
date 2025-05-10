import fs from "fs"
import path from "path"
import yaml from "js-yaml"

export interface PortfolioPiece {
  id: string
  title: string
  image: string
  description: string
  category: string
  hasArrow: boolean
  aspectRatio: string
  backgroundColor: string
  useFrameAnimation?: boolean
}

export interface PortfolioSettings {
  columnCount: {
    mobile: number
    tablet: number
    desktop: number
  }
  spacing: number
  borderColor: string
  textSize: string
}

export interface PortfolioContent {
  pieces: PortfolioPiece[]
  settings: PortfolioSettings
}

export function getPortfolioContent(): PortfolioContent {
  try {
    const filePath = path.join(process.cwd(), "content", "portfolio.yaml")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = yaml.load(fileContents) as PortfolioContent
    return data
  } catch (error) {
    console.error("Error loading portfolio content:", error)
    return {
      pieces: [],
      settings: {
        columnCount: {
          mobile: 1,
          tablet: 2,
          desktop: 3,
        },
        spacing: 4,
        borderColor: "gray-200",
        textSize: "sm",
      },
    }
  }
}
