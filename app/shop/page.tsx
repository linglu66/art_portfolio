import { Construction } from "lucide-react"

export default function ShopPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <Construction size={64} className="mb-6 text-gray-400" />

      <h1 className="text-xl mb-4">shop</h1>

      <div className="max-w-md border border-gray-300 rounded-md p-6">
        <p className="mb-4">this section is currently under construction.</p>
        <p className="text-gray-500">check back soon for prints, zines, and other items.</p>
      </div>
    </div>
  )
}
