import { Carousel, Image } from 'antd';
import folder1 from './undraw_Add_notes_re_ln36.svg';
import folder2 from './undraw_engineering_team_a7n2.svg';
import folder3 from './undraw_writer_q06d.svg';
import folder4 from './undraw_projections_re_ulc6.svg';

export default function IntroSlider() {
  return (
    <>
      <Carousel autoplay>
        <div>
          <h3>Facilidade</h3>
          <p>
            Plataforma de trabalho colaborativo em documentos, feito pensando em
            equipes de auto desenpenho com visão na organização de processos. A
            plataforma serve para empresas ou particulares que desenjam
            documentar fluxos organizaçionais internos. Com uma extrura simples
            temos algumas ferramentas internas distribuidas de uma forma que a
            experiência do usuario seja única.
          </p>
          <img src={folder1} alt="" width="200" />
        </div>
        <div>
          <h3>Colaborariva</h3>
          <p>
            Trabalhe de forma calolaborativa com menbros da sua equipe de
            trabalho, para adinamizar seus processos documental. o SimpleDoc,
            foi desenvolvido para que trabalhos colaborativo em documentos seja
            um procedimento fácil e de facil acompanhamento para equipes de
            trabalho.
          </p>
          <img src={folder2} alt="" width="200" />
        </div>
        <div>
          <h3>Facilidade</h3>
          <p>
            Temos uma ferramenta de edição de texto bastante fácil de usar e com
            alguns plugins prontos a usar para que se tenha uma experiência de
            escria bem intuitiva. Os plugins disponibilidados são gratuitoe
            poderá criar gráficos e modelos de dados na plataforma.
          </p>
          <img src={folder3} alt="" width="200" />
        </div>
        <div>
          <h3>Produtividade</h3>
          <p>
            Acreditamos documentar é uma actividade essencial para qualquer tipo
            de negócio, um bom processo documental pode melhorar a produtividade
            de uma equipe de forma expoenencial por isso a Plataforma traz para
            ti esta facilidade.
          </p>
          <img src={folder4} alt="" width="200" />
        </div>
      </Carousel>
    </>
  );
}
