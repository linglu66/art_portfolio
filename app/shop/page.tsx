import Image from "next/image"
const base = process.env.NODE_ENV === 'production' ? '/art_portfolio' : '';

export default function ShopPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <Image src={`${base}"/icons/in_progress.png"`} alt="wip" width={150}
                  height={150}
                  className={`size-32 mb-6`}/>

      <h1 className="text-xl mb-4">shop</h1>

      <div className="max-w-md border border-gray-300 rounded-md p-6">
        <p className="mb-4">this section is currently under construction.</p>
        <p className="text-gray-500">check back soon for prints, zines, and other items.</p>
      </div>
    </div>
  )
}
