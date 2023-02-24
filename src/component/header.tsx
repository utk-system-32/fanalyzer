export default function Header() {
    return (
      <div className="flex-wrap md:flex justify-between py-16">
        <a href="/" className="flex pl-14 text-lg font-bold md:pl-20 md:text-3xl">Fanalyzer</a>
        <div className="inline-flex pl-14 md:pr-20 text-sm md:pl-20 md:text-3xl">
          <a href="/" className="lg:mr-4 p-1 rounded-md  hover:bg-[#FF8200]">Home</a>
          <a href="/about" className="lg:mr-4 p-1 rounded-md hover:bg-[#FF8200]">About</a>
          <a href="/contact" className="lg:mr-4 p-1 rounded-md hover:bg-[#FF8200]">Contact</a>
          <a href="/documentation" className="lg:mr-4 p-1 rounded-md hover:bg-[#FF8200]">Documentation</a>
          <a href="/documentation" className="lg:mr-4 p-1 rounded-md bg-[#FF8200]">Get Started</a>
        </div>
      </div>
    )
}