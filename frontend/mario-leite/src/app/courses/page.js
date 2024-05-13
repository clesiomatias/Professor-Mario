import { BackHome } from "@/components";
const Courses = () => {
  return (
    <div className="flex min-h-screen flex-col items-start justify-between p-14">
      <BackHome />
      <div className="w-full h-auto justify-center flex items-start flex-col">
        <h1 className="w-full h-1/4 mt-5 text-center p-5 font-sans rounded font-bold text-sky-50 bg-cyan-950 ">
          Conheça meus minicursos
        </h1>
        <div className="flex min-h-screen  items-start justify-between p-14">
          <h2 className="w-full mt-5 text-center p-5 font-sans rounded font-bold h-1/4 bg-sky-200  text-cyan-950">Criptografia</h2>
          <h2 className="w-full mt-5 text-center p-5 font-sans rounded font-bold h-1/4 bg-sky-200 text-cyan-950">Lógica de Programação</h2>
        </div>
      </div>
    </div>
  );
};
export default Courses;
