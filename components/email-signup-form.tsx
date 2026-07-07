// A real form POST (not fetch): Buttondown requires subscribers to land on
// its hosted page and pass a bot check, so background submissions get dropped.
const BUTTONDOWN_USERNAME = "fishlooker"

export default function EmailSignupForm({ large = false }: { large?: boolean }) {
  return (
    <form
      action={`https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`}
      method="post"
      className="space-y-3"
    >
      {large && (
        <label htmlFor="signup-email" className="block text-xs font-bold text-gray-700">
          enter your email:
        </label>
      )}
      <input
        id="signup-email"
        name="email"
        type="email"
        placeholder="your@email.com"
        required
        className={`w-full font-mono ${large ? "px-4 py-3 text-base border-2 border-black !mt-1" : "px-2 py-1 text-xs border border-gray-400"}`}
      />

      <div className="flex gap-2 justify-end items-center">
        <a
          href="https://buttondown.com/refer/fishlooker"
          target="_blank"
          rel="noreferrer"
          className={`mr-auto ${large ? "text-xs" : "text-[10px]"} text-gray-500 hover:underline`}
        >
          Powered by Buttondown
        </a>
        <button
          type="submit"
          className={
            large
              ? "px-8 py-3 text-base font-bold bg-black text-white border-2 border-black hover:bg-white hover:text-black"
              : "px-4 py-1 text-xs border border-gray-400 bg-gray-200 hover:bg-gray-300"
          }
        >
          {large ? "Subscribe" : "Allow"}
        </button>
      </div>
    </form>
  )
}
