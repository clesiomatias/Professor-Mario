import { BackHome } from "@/components"
import Image from "next/image";
const About = () => {
  return (
    <div className="flex min-h-screen flex-col items-start justify-between p-14">
      <BackHome />
      <div className="w-full h-auto justify-around flex items-center sm:flex-col sm-md:flex-col sm-md:p-5 md:flex-row ">
        <Image
          className="rounded-full  md:w-48 lg:w-48"
          src="https://avatars.githubusercontent.com/u/42276767"
          width={300}
          height={300}
          alt="logo"
        />
        <h1 className="m-auto font-waterfall text-7x1 text-blue-600 font-bold">
          SOBRE MÁRIO LEITE
        </h1>
      </div>
      
      <p className="font-bold text-cyan-900 text-justify">
        Cristão, é natural de Tombos (MG); estudou física durante dois anos no
        Instituto de Física da UFRJ; foi aluno de Iniciação Científica no Centro
        Brasileiro de Pesquisas Físicas (CBPF) e do CNPq, no Rio de Janeiro. É
        graduado e pós-graduado em engenharia pela Pontifícia Universidade
        Católica do Rio de Janeiro (PUC/RJ), onde foi professor auxiliar de
        ensino e pesquisa no Departamento de Ciências dos Materiais e
        Metalurgia. É especialista em Análise de Sistemas pelo Centro
        Universitário de Maringá (UniCesumar) e mestre em Engenharia de Produção
        pela Universidade Federal de Santa Catarina (UFSC). Trabalhou na
        Indústria e Comércio de Minérios (ICOMI) no estado do Amapá como
        engenheiro de pesquisas, desenvolvendo aplicações para o setor de
        produção. Foi chefe do Setor de Informações Gerenciais da Mineração
        Caraíba S.A (BA), ministrando cursos de técnicas de programação para os
        engenheiros da empresa e desenvolvendo aplicações para os setores de
        produção e manutenção. Nesta empresa participou do projeto “Mecânica das
        Rochas”, com consultores chilenos na implantação do sistema de escavação
        da mina subterrânea na adaptação do software de elementos finitos para
        microcomputadores. Foi professor-tutor de Algoritmos e Linguagens de
        Programação da Universidade de Uberaba. Foi professor de Técnicas de
        Programação do Centro Universitário Maringá (UniCesumar/PR). Foi
        professor de Algoritmos e Linguagens de Programação do CESUFOZ/PR. Foi
        professor de Técnicas de Programação da Universidade União das Américas
        (UNIAMERICA) em Foz do Iguaçu/PR. É autor de vários livros sobre Lógica
        e Técnicas de Programação.
      </p>
    </div>
  );
}
export default About