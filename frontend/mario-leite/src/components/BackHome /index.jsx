import Link from "next/link";

const BackHome = () => {  
    return (
  <div className="mb-2">
    <nav className="w-full bg-black fixed top-0 left-0 right-0 z-10 ">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <h2 className="text-2xl text-cyan-600 font-bold">
                Professor Mário Leite
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  </div>
);
};

export default BackHome;
