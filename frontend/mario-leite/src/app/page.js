import {Navbar} from "@/components";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <section
        id="about"
        className="text-white h-screen w-screen bg-sky-300 text-center flex"
      >
        <h1 className="m-auto font-waterfall text-7x1 text-cyan-600 font-bold">
          <Link href="/about">Sobre</Link>
        </h1>
      </section>
      <section
        id="codes"
        className="text-white h-screen w-screen bg-sky-500 text-center flex"
      >
        <h1 className="m-auto font-waterfall text-7x1 text-cyan-100 font-bold">
          {" "}
          <Link href="/codes">Códigos e Textos</Link>
        </h1>
      </section>
      <section
        id="courses"
        className="text-white h-screen w-screen bg-sky-300 text-center flex"
      >
        <h1 className="m-auto font-waterfall text-7x1 text-cyan-600 font-bold">
          {" "}
          <Link href="/courses">Minicursos</Link>
        </h1>
      </section>
      <section
        id="books"
        className="text-white h-screen w-screen bg-sky-500 text-center flex"
      >
        <h1 className="m-auto font-waterfall text-7x1 text-cyan-100 font-bold">
          <Link href="/books">Livros Publicados</Link>
        </h1>
      </section>
      <section
        id="download-files"
        className="text-white h-screen w-screen bg-sky-300 text-center flex"
      >
        <h1 className="m-auto font-waterfall text-7x1 text-cyan-600 font-bold">
          <Link href="/download_items">Arquivos para baixar</Link>
        </h1>
      </section>
    </main>
  );
}
