import Image from "next/image"
import Link from "next/link"

const base = '';

const artSections = [
  {
    title: "abstract & experimental",
    images: [
      { src: "/images/double_blossom_light.png", alt: "double blossom print" },
      { src: "/images/walk02.png", alt: "lakeside walk print" },
      { src: "/images/talisman_combo_2a.png", alt: "talisman prints combo" },
      { src: "/images/walk4.png", alt: "autumn walk print" },
      { src: "/images/double_clover_light.png", alt: "double clover print" },
      { src: "/images/talisman_combo_2b.png", alt: "talisman prints combo" },
    ],
  },
  {
    title: "risograph prints",
    images: [
      { src: "/images/duckstack.png", alt: "duck stack print" },
      { src: "/images/acnl.png", alt: "fish of animal crossing print" },
      { src: "/images/roadside.png", alt: "roadside risograph landscape print" },
      { src: "/images/nishiki.png", alt: "nishiki print" },
      { src: "/images/frogs.png", alt: "frogs illustration" },
      { src: "/images/tiger.jpg", alt: "tiger risograph print" },
      { src: "/images/angel.png", alt: "angel print" },
      { src: "/images/cat.png", alt: "cat brush drawing" },
      { src: "/images/blueberries.png", alt: "blueberries illustration" },
      { src: "/images/duckduckduck.png", alt: "duck duck duck print" },
      { src: "/images/apple_worm.png", alt: "apple worm illustration" },
    ],
  },
  {
    title: "comics",
    images: [
      { src: "/images/p8.jpg", alt: "crossed wires comic spread" },
      { src: "/images/crossed_wires.png", alt: "crossed wires risograph minicomic cover" },
      { src: "/images/comic2.jpg", alt: "comic page" },
      { src: "/images/p6.jpg", alt: "crossed wires comic spread" },
      { src: "/images/comic3.jpg", alt: "comic page" },
      { src: "/images/comic.png", alt: "comic page" },
    ],
  },
]

const marketShots = [
  { src: "/images/markets/tcaf2026.png", alt: "fishlooker booth at toronto comic arts festival 2026" },
  { src: "/images/markets/booth2.jpg", alt: "outdoor market booth" },
  { src: "/images/markets/booth1.jpg", alt: "tabling at an indoor art fair" },
  { src: "/images/markets/table2.jpg", alt: "table spread of prints, zines, and stickers" },
]

export default function Markets() {
  return (
    <div className="p-8 max-w-[2000px] mx-auto">
      {/* intro: text left, art gallery right */}
      <div className="grid md:grid-cols-[1fr_6fr] gap-8">
        <div className="text-lg md:sticky md:top-8 md:self-start">
          <p className="text-3xl font-semibold">markets / vendor info</p>
          <p className="mt-4 mb-4">
            hi! i&apos;m ling lu (fishlooker), an nyc-based illustrator and comic
            artist. my work sits somewhere between coming-of-age, connection, and
            the way technology reshapes who we think we are.
          </p>
          <p className="font-semibold mb-2">merch</p>
          <ul className="mb-6 list-disc list-inside">
            <li>risograph prints</li>
            <li>comics &amp; zines</li>
            <li>stationery</li>
          </ul>
          <ul>
            <li>
              portfolio: <Link href="/" className="underline">fishlooker.com</Link>
            </li>
            <li>
              shop: <Link href="/shop" className="underline">fishlooker.com/shop</Link>
            </li>
            <li>
              email: <a href="mailto:ling.lu916@gmail.com" className="underline">ling.lu916@gmail.com</a>
            </li>
          </ul>
        </div>

        <div>
          {artSections.map((section) => (
            <div key={section.title} className="mb-8">
              <p className="text-3xl font-bold tracking-tight border-b-2 border-dotted border-gray-900 pb-2 mb-5">{section.title}</p>
              <div className="columns-3 gap-4">
                {section.images.map((img) => (
                  <div key={img.src} className="border border-gray-200 rounded-md p-2 mb-4 break-inside-avoid inline-block w-full">
                    <Image
                      src={`${base}${img.src}`}
                      width={400}
                      height={400}
                      alt={img.alt}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* markets: shots left, list right */}
      <div className="grid md:grid-cols-[2fr_1fr] gap-8 mt-12">
        <div className="grid grid-cols-2 gap-4 content-start">
          {marketShots.map((img) => (
            <div key={img.src} className="border border-gray-200 rounded-md p-2">
              <div className="relative aspect-square">
                <Image
                  src={`${base}${img.src}`}
                  fill
                  alt={img.alt}
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-2xl font-semibold">markets i&apos;ve vended at</p>
          <ul className="text-base mt-4">
            <li>2026 toronto comic arts festival</li>
            <li>2026 newark art book fair</li>
            <li>2026 tiny arts market</li>
            <li>2025 newark zine fest</li>
            <li>2025 SVA print slam</li>
            <li>2025 jersey art book fair</li>
            <li>2024 nyc zine fest</li>
          </ul>
        </div>
      </div>

      {/* workshops */}
      <div className="mt-12">
        <p className="text-3xl font-semibold">workshops</p>
        <p className="text-lg mt-2">
          i run workshops on my own and with caffeine.garden, my art collective.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <div>
            <div className="border border-gray-200 rounded-md p-2">
              <Image
                src={`${base}/images/workshops/accordion_zine/cover.png`}
                width={480}
                height={270}
                alt="cut + connected: making your own accordion zine, at jersey art book fair"
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {["/images/workshops/accordion_zine/photo2.jpg", "/images/workshops/accordion_zine/photo3.jpg"].map((src) => (
                <div key={src} className="border border-gray-200 rounded-md p-2">
                  <div className="relative aspect-square">
                    <Image
                      src={`${base}${src}`}
                      fill
                      alt="accordion zines made at the workshop"
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xl font-semibold mt-3">cut + connected: accordion zine making</p>
            <p className="text-lg mt-1">
              a hands-on workshop on folding, cutting, and filling your own
              accordion zine, co-hosted with lucy huo at jersey art book fair —
              no experience needed, everyone leaves with a finished zine.
            </p>
          </div>
          <div>
            <div className="border border-gray-200 rounded-md p-2">
              <Image
                src={`${base}/images/workshops/cyberdeck/cover.png`}
                width={480}
                height={270}
                alt="build your own cyberdeck, presented by aci-d club"
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {["/images/workshops/cyberdeck/photo1.png", "/images/workshops/cyberdeck/recap.png"].map((src) => (
                <div key={src} className="border border-gray-200 rounded-md p-2">
                  <div className="relative aspect-square">
                    <Image
                      src={`${base}${src}`}
                      fill
                      alt="cyberdeck workshop: circuit prototyping with sensors and screens"
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xl font-semibold mt-3">build your own cyberdeck</p>
            <p className="text-lg mt-1">
              a hardware workshop presented with aci-d club — hardware basics,
              circuit prototyping, sensors and screens, and sourcing materials.
              everyone takes home their first cyberdeck.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
