export default function About() {
  return (
    <div className="p-8">
      <div className="max-w-2xl">
        {/* <h1 className="text-2xl mb-6">about me</h1> */}
        <div className="prose">
        <p className="text-xl font-semibold"> about</p>

          <p className="mb-4">
          i am an nyc-based creator extrapolating things that feel tender, curious, and hard to look at

          <br></br><br></br>

i work across illustration, comics, and interactive media. <br></br>
i used to build machine learning systems; now i build stories.<br></br>
most of my work lives somewhere between coming-of-age, connection, and the way technology reshapes who we think we are.
</p>
          <p>
          </p>
          
        </div>
      </div>
      <div>
        <p className="text-xl font-semibold mt-8"> exhibitions</p>
        <ul className="text sm">
            <li>2025 SVA print slam</li>
            <li>2025 jersey art book fair</li>
            <li>2024 zine fest NYC</li>
        </ul>
      </div>


      <p className="mb-4 mt-16 text-sm">
          you do not have to be good. <br/>
you only have to let the soft animal of your body<br/>
love what it loves
          </p>
    </div>
  )
}
