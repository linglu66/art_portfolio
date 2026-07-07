import type { Metadata } from "next"
import Image from "next/image"
import EmailSignupForm from "@/components/email-signup-form"
import ArtLoader from "@/components/art-loader"

export const metadata: Metadata = {
  title: "email signup",
  description: "get occasional notifications from fishlooker: fairs, shop updates, mail club",
}

const updates = [
  {
    icon: "/icons/home.png",
    title: "fairs + markets",
    description: "where to find my table irl. come say hi.",
  },
  {
    icon: "/icons/shop.png",
    title: "shop updates",
    description: "new prints, kits, and restocks before they sell out.",
  },
  {
    icon: "/icons/in_progress.png",
    title: "mail club launch",
    description: "little letters with art in them, coming to a mailbox near you. soon.",
  },
]

export default function EmailSignupPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div
        className="bg-gray-100 border border-gray-400 w-full max-w-3xl"
        style={{
          fontFamily: 'system-ui, -apple-system',
          filter: 'drop-shadow(8px 8px 0px rgba(0,0,0,0.3))',
          boxShadow: '8px 8px 0px rgba(0,0,0,0.2), 4px 4px 0px rgba(0,0,0,0.1), 2px 2px 0px rgba(0,0,0,0.05)'
        }}
      >
        {/* Title bar */}
        <div className="bg-black text-white px-3 py-1.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 border border-gray-500"></div>
            <span className="font-bold text-sm">fishlooker_mail.exe</span>
          </div>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-gray-300 border border-gray-500"></div>
            <div className="w-4 h-4 bg-gray-300 border border-gray-500"></div>
          </div>
        </div>

        {/* Menu bar */}
        <div className="px-3 py-1 border-b border-gray-300 flex gap-4 text-xs text-gray-600">
          <span>file</span>
          <span>edit</span>
          <span>fish</span>
          <span>help</span>
        </div>

        {/* Split window: image pane | content pane */}
        <div className="flex flex-col sm:flex-row">
          {/* Left pane */}
          <div className="sm:w-[38%] border-b sm:border-b-0 sm:border-r-2 border-gray-300 flex flex-col">
            <ArtLoader />
          </div>

          {/* Right pane */}
          <div className="flex-1 p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="font-bold text-lg sm:text-xl">join the mailing list</h1>
            <p className="text-sm text-gray-600">
              occasional dispatches from ling. unsubscribe anytime.
            </p>
          </div>

          {/* What you'll hear about */}
          <div className="border border-gray-400 bg-white mb-6">
            <div className="px-3 py-1.5 bg-gray-200 border-b border-gray-400 text-xs font-bold text-gray-700">
              you&apos;ll get notifications about:
            </div>
            <ul>
              {updates.map((item, i) => (
                <li
                  key={item.title}
                  className={`flex items-center gap-3 px-3 py-3 ${i < updates.length - 1 ? "border-b border-gray-200" : ""}`}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain shrink-0"
                  />
                  <div>
                    <div className="font-bold text-sm">{item.title}</div>
                    <div className="text-xs text-gray-600">{item.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <EmailSignupForm large />
          </div>
        </div>
      </div>
    </div>
  )
}
