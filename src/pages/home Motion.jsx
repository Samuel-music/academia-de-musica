// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { motion, useAnimation, useInView } from "motion/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import imgTrans1 from '../assets/abstract_background_technology.jpg'; //abstract_background_technology.jpg //tech-mask.svg
import imgCarrossel1 from '../assets/man-accountan.jpg';
import imgCarrossel2 from '../assets/contabil-2-1618x1080.jpg';
import imgCarrossel3 from '../assets/contabil-3.webp';
import imgLogo from '../assets/logo-icon-contabilidade.png';
import imgFundo1 from '../assets/fundo1_contabil.png';
import imgLogoEcontador from '../assets/pack_web_2013.png';
import imgLogoNfStock from '../assets/nf-stock_color_rgb.svg';
import gifFoguete from '../assets/rocket.gif';
import webmFoguete from '../assets/rocket.webm';
import webmFinance from '../assets/Finance2.webm';
import webmChat from '../assets/Chat.webm';
import webmRefresh from '../assets/Refresh.webm';


// =========================================================================================================================================================================================
// Componente FadeInSection usando Motion
const FadeInSection = ({ children, className = '', duration = 1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, margin: "0px 0px -50px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: typeof duration === 'string' ? parseFloat(duration) : duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};


// ...existing code...


// Componente ScaleFadeInSection usando Motion
const ScaleFadeInSection = ({ children, className = '', duration = 0.9, delay = 0, onShow }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, margin: "0px 0px -50px 0px" });
  useEffect(() => {
    if (isInView && onShow) onShow();
  }, [isInView, onShow]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 1.2 }}
      transition={{ duration, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};


// Componente PlataformaImg usando Motion
const PlataformaImg = ({ src, minHeight, maxHeight, visible, delay = 0 }) => {
  return (
    <motion.img
      src={src}
      className="justify-center mx-auto mb-5"
      style={{ minHeight, maxHeight }}
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 1.2 }}
      transition={{ duration: 0.9, delay: delay / 1000 }}
    />
  );
};


// ===================================================================================================================================================================
const App = () => { // React.FC
  // ---------------------------------------------------------------------------------------------------------------------------
  // Estado para disparar animação do logo
  const [logoAnimated, setLogoAnimated] = useState(false);
  useEffect(() => {
    setLogoAnimated(true);
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Estado para forçar remount da animação
  const [slideKey, setSlideKey] = useState(0);
  const swiperRef = useRef(null);

  // Controle de animação em cascata da div e da imagem das Plataformas 1 e 2
  const [plataforma1DivVisible, setPlataforma1DivVisible] = useState(false);
  const [plataforma1ImgVisible, setPlataforma1ImgVisible] = useState(false);
  const [plataforma2DivVisible, setPlataforma2DivVisible] = useState(false);
  const [plataforma2ImgVisible, setPlataforma2ImgVisible] = useState(false);
  useEffect(() => {
    if (plataforma1DivVisible) {
      const timeout = setTimeout(() => setPlataforma1ImgVisible(true), 200); // 200ms após a div
      return () => clearTimeout(timeout);
    }
  }, [plataforma1DivVisible]);
  useEffect(() => {
    if (plataforma2DivVisible) {
      const timeout = setTimeout(() => setPlataforma2ImgVisible(true), 200); // 200ms após a div
      return () => clearTimeout(timeout);
    }
  }, [plataforma2DivVisible]);

  // Função para atualizar a key ao trocar slide
  const handleSlideChange = () => {
    setSlideKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  src={imgLogo}
                  //alt="Logo empresa"
                  style={{ maxHeight: '64px' }}
                  className={`h-16 w-auto py-[5px] ${logoAnimated ? 'fadein-scale-logo' : ''}`}
                />
              </div>
              <div className="flex-shrink-0 ml-3 flex flex-col items-start justify-center">

                <div className="flex flex-col">
                  <FadeInSection className="delay-[400ms]" duration={'20s'}>
                    <span className="text-gray-800 font-bold text-2xl leading-tight block w-max _animate-fadeIn" id="renove-text">RENOVE</span>
                  </FadeInSection>
                  <FadeInSection className="delay-[600ms]">
                    <span className="text-gray-800 text-base leading-none block _animate-fadeIn" style={{ fontSize: '81%' }}>CONTABILIDADE</span>
                  </FadeInSection>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#home_" className="text-gray-800 hover:text-blue-300 transition-colors duration-300 cursor-pointer whitespace-nowrap">Início</a>
                <a href="#about_" className="text-gray-800 hover:text-blue-300 transition-colors duration-300 cursor-pointer whitespace-nowrap">Empresa</a>
                <a href="#services_" className="text-gray-800 hover:text-blue-300 transition-colors duration-300 cursor-pointer whitespace-nowrap">Serviços</a>
                <a href="#contact_" className="text-gray-800 hover:text-blue-300 transition-colors duration-300 cursor-pointer whitespace-nowrap">Contato</a>
                {/*<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 !rounded-button cursor-pointer whitespace-nowrap"
                  onClick={() => window.location.href = "https://clickfacil.top/auth/sign-in"}>Entrar</button>*/}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-800 hover:text-gray-600 cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="text-white hover:text-blue-300 block px-3 py-2 text-base font-medium cursor-pointer">Início</a>
              <a href="#" className="text-white hover:text-blue-300 block px-3 py-2 text-base font-medium cursor-pointer">Empresa</a>
              <a href="#" className="text-white hover:text-blue-300 block px-3 py-2 text-base font-medium cursor-pointer">Serviços</a>
              <a href="#" className="text-white hover:text-blue-300 block px-3 py-2 text-base font-medium cursor-pointer">Contato</a>
              {/*<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 mt-2 w-full !rounded-button cursor-pointer whitespace-nowrap"
                onClick={() => window.location.href = "https://clickfacil.top/auth/sign-in"}>Entrar</button>*/}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Carousel */}
      <div id='home' className="relative">
        <FadeInSection className="delay-[500ms]">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 5_000, disableOnInteraction: false }}
            loop={true}
            speed={1000}
            className="h-[70vh] w-full mt-16"
            onSlideChange={handleSlideChange}
            onNavigationPrev={handleSlideChange}
            onNavigationNext={handleSlideChange}
            ref={swiperRef}
          >
            <SwiperSlide>
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
                <img
                  src={imgCarrossel1}
                  title="Impulsione seu negócio com nossas soluções tecnológicas personalizadas"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 max-w-[700px] md:ml-40">
                  <div className="fadein-slide-right" key={slideKey}>
                    <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-white mb-4">
                      Você foca no seu negócio, a gente cuida do resto
                    </h1>
                    <p className="text-xl md:text-1xl text-gray-200 mb-8 max-w-3xl">
                      Contabilidade especializada em gerar valor para sua empresa
                    </p>
                    <button className="bg-[#296b89] hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105 !rounded-button cursor-pointer whitespace-nowrap">
                      Conheça Nossos Serviços
                    </button>
                  </div>
                </div>

              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
                <img
                  src={imgCarrossel2}
                  title="Tecnologia que impulsiona seu negócio"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 max-w-[700px] md:ml-40">
                    <div className="fadein-slide-right" key={slideKey}>
                      <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-white mb-4">
                        Traga a contabilidade de sua empresa
                      </h1>
                      <p className="text-xl md:text-1xl text-gray-200 mb-8 max-w-3xl">
                        E tenha a melhor assessoria tributária e consultoria empresarial do DF
                      </p>
                      <button className="bg-[#296b89] hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105 !rounded-button cursor-pointer whitespace-nowrap">
                        Saiba mais
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
                <img
                  src={imgCarrossel3}
                  title="Inovação e resultados ao seu alcance"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 max-w-[700px] md:ml-40">
                    <div className="fadein-slide-right" key={slideKey}>
                      <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-white mb-4">
                        Conte conosco
                      </h1>
                      <p className="text-xl md:text-1xl text-gray-200 mb-8 max-w-3xl">
                        Para cuidar das finanças, administração e contabilidade da sua empresa
                      </p>
                      <button className="bg-[#296b89] hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105 !rounded-button cursor-pointer whitespace-nowrap">
                        Sobre nós
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </FadeInSection>
      </div>


      {/* ========================================================================================================================================================================= */}
      {/* Nossos Serviços */}
      <FadeInSection>
        <section id='services' className="py-20 px-4 bg-gray-200">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Alguns dos nossos serviços</h2>
              {/*<p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Oferecemos soluções digitais completas para impulsionar seu negócio no mundo digital
              </p>*/}
            </div>

            {/* Cards serviços com efeito FadeIn em cascata */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Serviço 1 */}
              <ScaleFadeInSection delay={0} duration={800}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 flex flex-col h-full hover:scale-105">
                  <div className="h-48 overflow-hidden">
                    <img
                      src="https://escolanexus.com.br/wp-content/uploads/2024/02/Consultoria-Empresarial-Basico.jpg"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Consultoria Empresarial</h3>
                    <p className="text-gray-600 mb-4">
                      Tenha controle internos e financeiros adequados, faça a recuperação financeira de sua empresa ou recupere impostos.
                    </p>
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center cursor-pointer whitespace-nowrap">
                      Saiba mais <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              </ScaleFadeInSection>
              {/* Serviço 2 */}
              <ScaleFadeInSection delay={100} duration={800}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 flex flex-col h-full hover:scale-105">
                  <div className="h-48 overflow-hidden">
                    <img
                      src="https://www.daexe.com.br/wp-content/uploads/2023/09/Uso-da-tecnologia-na-gestao-da-empresa.jpg"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Assessoria</h3>
                    <p className="text-gray-600 mb-4">
                      Tenha um completo departamento pessoal, assessoria trabalhista e minimize os riscos de sua empresa.
                    </p>
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center cursor-pointer whitespace-nowrap">
                      Saiba mais <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              </ScaleFadeInSection>
              {/* Serviço 3 */}
              <ScaleFadeInSection delay={200} duration={800}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 flex flex-col h-full hover:scale-105">
                  <div className="h-48 overflow-hidden">
                    <img
                      src="https://imagens.ebc.com.br/1WR6HAq5gbIitvLG2tFYVEIpwb4=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/imposto-de-renda_mcamgo_abr_030320221818-2.jpg"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pessoa Física</h3>
                    <p className="text-gray-600 mb-4">
                      Imposto de renda do profissional liberal (médicos, dentistas, engenheiros, etc) aplicando legislação vigente. Trabalhadores domésticos.
                    </p>
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center cursor-pointer whitespace-nowrap">
                      Saiba mais <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              </ScaleFadeInSection>
              {/* Serviço 4 */}
              <ScaleFadeInSection delay={400} duration={800}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 flex flex-col h-full hover:scale-105">
                  <div className="h-48 overflow-hidden">
                    <img
                      src="https://wmartinscontabilidade.com.br/wp-content/uploads/2018/07/post-a-importancia-gestao-contabil-e-fiscal-wmartins-contabilidade.jpg"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Contábil e Fiscal</h3>
                    <p className="text-gray-600 mb-4">
                      Terceirize com qualidade e customização sua contabilidade, fiscal e departamento financeiro.
                    </p>
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center cursor-pointer whitespace-nowrap">
                      Saiba mais <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              </ScaleFadeInSection>
            </div>
          </div>
        </section>
      </FadeInSection>


      {/* ========================================================================================================================================================================= */}
      {/* Por que escolher a Renove */}


      {/* Seção Por que escolher a Renove com cards sobrepondo a imagem */}
      <section id="about" className="relative z-10 pb-0 _bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 _mb-5">
          <div
            className="text-center mb-[11.5rem] pt-20"
            //animate={{ rotate: 360 }}
            //transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por que escolher a Renove?</h2>
            <p className="text-lg text-gray-900 max-w-2xl mx-auto">
              Nossos serviços vão além de apenas cumprir as exigências legais e do fisco e sim um conjunto de ferramentas e oportunidades para a gestão da sua empresa
            </p>
          </div>

          <div className="relative flex justify-center">
            <div
              className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-white/90 rounded-lg _shadow-2xl p-8 w-full _max-w-15xl z-20"
              style={{ background: 'none', position: 'absolute', left: '50%', top: '0', transform: 'translate(-50%, -50%)', minWidth: '320px' }}
            >
              {/* Diferencial 1 */}
              <FadeInSection className="delay-[200ms]">
                <div className="bg-gray-50 rounded-lg p-8 text-center transition-all duration-300 shadow-2xl hover:shadow-lg flex flex-col h-full">
                  <ScaleFadeInSection>
                    <div className="text-blue-600 mb-4 inline-block p-4 bg-blue-100 rounded-full w-max mx-auto">
                      <video src={webmFoguete} autoPlay loop muted playsInline className="w-12 h-12 mx-auto" style={{ display: 'block' }} />
                    </div>
                  </ScaleFadeInSection>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Experiência Comprovada</h3>
                  {/*<p className="text-gray-600">
                    Desenvolvemos soluções sob medida para atender às necessidades específicas do seu negócio.
                  </p>*/}
                </div>
              </FadeInSection>

              {/* Diferencial 2 */}
              <FadeInSection className="delay-[400ms]">
                <div className="bg-gray-50 rounded-lg p-8 text-center transition-all duration-300 shadow-2xl hover:shadow-lg flex flex-col h-full">
                  <ScaleFadeInSection delay={100}>
                    <div className="text-blue-600 mb-4 inline-block p-4 bg-blue-100 rounded-full w-max mx-auto">
                      <video src={webmFinance} autoPlay loop muted playsInline className="w-12 h-12 mx-auto" style={{ display: 'block' }} />
                    </div>
                  </ScaleFadeInSection>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Compreensão de negócios</h3>
                  {/*<p className="text-gray-600">
                    Equipe técnica disponível para resolver qualquer problema e garantir o funcionamento contínuo.
                  </p>*/}
                </div>
              </FadeInSection>

              {/* Diferencial 3 */}
              <FadeInSection className="delay-[600ms]">
                <div className="bg-gray-50 rounded-lg p-8 text-center transition-all duration-300 shadow-2xl hover:shadow-lg flex flex-col h-full">
                  <ScaleFadeInSection delay={200}>
                    <div className="text-blue-600 mb-4 inline-block p-4 bg-blue-100 rounded-full w-max mx-auto">
                      <video src={webmChat} autoPlay loop muted playsInline className="w-12 h-12 mx-auto" style={{ display: 'block' }} />
                    </div>
                  </ScaleFadeInSection>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Excelência na comunicação</h3>
                  {/*<p className="text-gray-600">
                    Nossos clientes experimentam crescimento real e mensurável após implementar nossas soluções.
                  </p>*/}
                </div>
              </FadeInSection>

              {/* Diferencial 4 */}
              <FadeInSection className="delay-[600ms]">
                <div className="bg-gray-50 rounded-lg p-8 text-center transition-all duration-300 shadow-2xl hover:shadow-lg flex flex-col h-full">
                  <ScaleFadeInSection delay={300}>
                    <div className="text-blue-600 mb-4 inline-block p-4 bg-blue-100 rounded-full w-max mx-auto">
                      <video src={webmRefresh} autoPlay loop muted playsInline className="w-12 h-12 mx-auto" style={{ display: 'block' }} />
                    </div>
                  </ScaleFadeInSection>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Em constantemente atualização</h3>
                  {/*<p className="text-gray-600">
                    Nossos clientes experimentam crescimento real e mensurável após implementar nossas soluções.
                  </p>*/}
                </div>
              </FadeInSection>

            </div>
            {/* Espaço para garantir altura da seção antes da imagem */}
            <div className="h-[180px] w-full"></div>
          </div>
        </div>
      </section>


      {/* ========================================================================================================================================================================= */}
      {/* Imagem de transição com degradê azul escuro para transparente (de baixo para cima) */}
      <div className="relative z-0" style={{ marginTop: '-600px' }}>
        <img
          src={imgFundo1}
          //title="Transição"
          className="w-full object-cover object-top"
          style={{ minHeight: '200px', maxHeight: '920px' }}
        />
        {/* Degradê azul escuro para transparente, de baixo para cima */}
        <div
          className="absolute left-0 bottom-0 w-full h-full pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, #105f8a 0%, rgba(16,95,138,0.85) 20%, rgba(16,95,138,0.3) 60%, rgb(229 231 235 / var(--tw-bg-opacity, 1)) 100%)', // linear-gradient(0deg, #105f8a 0%, rgba(16,95,138,0.85) 20%, rgba(16,95,138,0.3) 60%, transparent 100%)
            zIndex: 2,
          }}
        ></div>
      </div>



      {/* ========================================================================================================================================================================= */}
      {/* Plataformas seção */}
      <div className="bg-[#105f8a]">
        <section id="contact" className="py-20 px-4 _bg-white mt-[-200px] relative">
          <div className="max-w-7xl mx-auto ">

            <ScaleFadeInSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Conheça nossas plataformas</h2>
                {/*<p className="text-lg text-gray-200 max-w-2xl mx-auto">
                  Estamos prontos para ajudar você a transformar seu negócio através da tecnologia
                </p>*/}
              </div>
            </ScaleFadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-[3]">

              {/* --------------------------------------------------------------------- */}
              {/* Plataforma 1 */}
              <ScaleFadeInSection duration={800} delay={0} onShow={() => setPlataforma1DivVisible(true)}>
                <div 
                  className="bg-gray-50 p-8 rounded-lg"
                  style={{boxShadow: '4px 4px 15px #00000085'}}
                >
                  <PlataformaImg src={imgLogoEcontador} minHeight="20px" maxHeight="80px" visible={plataforma1ImgVisible} delay={200} />
                  <ul className="space-y-1 mb-10 list-disc pl-6">
                    <li><span className="text-gray-800">Agilizar a contratação de funcionários e o envio de informações ao eSocial</span></li>
                    <li><span className="text-gray-800">Prestar atendimento qualificado para os clientes mesmo de outras localidades</span></li>
                    <li><span className="text-gray-800">Atendem a sua empresa com mais rapidez</span></li>
                    <li><span className="text-gray-800">Reduzem o seu custo de impressões de documentos</span></li>
                    <li><span className="text-gray-800">Enviam e recebe dados da sua empresa por um canal seguro</span></li>
                    <li><span className="text-gray-800">Definem quais abas de serviços podem ser acessadas por seus funcionários</span></li>
                    <li><span className="text-gray-800">Simplificam o controle das CNDs e aumente a produtividade de sua equipe</span></li>
                  </ul>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 w-full !rounded-button">
                    Acessar
                  </button>
                </div>
              </ScaleFadeInSection>

              {/* --------------------------------------------------------------------- */}
              {/* Plataforma 2 */}
              <ScaleFadeInSection duration={800} delay={200} onShow={() => setPlataforma2DivVisible(true)}>
                <div 
                  className="bg-gray-50 p-8 rounded-lg h-full flex flex-col justify-between"
                  style={{boxShadow: '4px 4px 15px #00000085'}}
                >
                  <PlataformaImg src={imgLogoNfStock} minHeight="20px" maxHeight="70px" visible={plataforma2ImgVisible} delay={300} />
                  <ul className="space-y-1 mb-10 list-disc pl-6">
                    <li><span className="text-gray-800">O nosso sistema do Escrita Fiscal dispensa a importação manual dos arquivos</span></li>
                    <li><span className="text-gray-800">Importa do site da Receita Federal as notas fiscais eletrônicas emitidas contra sua empresa</span></li>
                    <li><span className="text-gray-800">Armazena as suas notas fiscais eletrônicas por 6 (seis) anos, com total segurança</span></li>
                    <li><span className="text-gray-800">Permite a consulta de todas as notas fiscais emitidas nos ultimos 6 anos</span></li>
                  </ul>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 w-full !rounded-button">
                    Acessar
                  </button>
                </div>
              </ScaleFadeInSection>
            </div>
            {/*<FadeInSection className="delay-[600ms]">
                <div className="bg-gray-50 p-8 rounded-lg h-full flex flex-col justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Redes sociais</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </FadeInSection>*/}
          </div>
          {/* -------------------------------------------------------------------------------------------------------------------------- */}
          {/* Borda inferior com degradê transparente para a cor da próxima seção */}
          {/*<div className="absolute bottom-0 left-0 w-full" style={{ height: '400px', zIndex: 1 }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, #e5e7eb 0%, transparent 100%)' }}></div>
          </div>*/}

        </section>
      </div>



      {/* Pronto para transformar seu negócio */}

      <section 
        className="py-20 px-4 bg-[#e5e7eb] _bg-[#2563eb] text-black relative overflow-hidden rounded-t-[30px] mt-[-180px]"
        style={{boxShadow: '0px -10px 20px #00000078'}}
      > {/* bg-gradient-to-r from-blue-600 to-blue-600 */}
        <FadeInSection className="delay-[200ms]">
          <div className="max-w-7xl mx-auto text-center relative mt-[200px]" style={{ zIndex: 2 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar seu negócio?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Entre em contato hoje mesmo e descubra como nossos serviços podem impulsionar seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 !rounded-button cursor-pointer whitespace-nowrap">
                Sobre a Renove
              </button>
              <button className="bg-transparent border-2 border-black hover:bg-gray-300 px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 !rounded-button cursor-pointer whitespace-nowrap">
                Falar com Consultor
              </button>
            </div>
          </div>
        </FadeInSection>
      </section>



      {/* Footer */}

      <footer className="bg-gray-900 text-white pt-16 pb-8 px-4">
        <FadeInSection className="delay-[200ms]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Coluna 1 - Sobre */}
              <div>
                <h3 className="text-xl font-bold mb-4">Click Digital</h3>
                <p className="text-gray-400 mb-4">
                  Transformando negócios através de soluções digitais inovadoras desde 2015.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                    <i className="fab fa-facebook-f text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                    <i className="fab fa-linkedin-in text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                    <i className="fab fa-youtube text-xl"></i>
                  </a>
                </div>
              </div>
              {/* Coluna 2 - Links Rápidos */}
              <div>
                <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Início</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Serviços</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Sobre Nós</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Contato</a></li>
                </ul>
              </div>
              {/* Coluna 3 - Serviços */}
              <div>
                <h3 className="text-xl font-bold mb-4">Nossos Serviços</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Criação de Sites</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Marketing Digital</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Gestão de Clientes</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Gerenciador de Filas</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Consultoria Tecnológica</a></li>
                </ul>
              </div>
              {/* Coluna 4 - Contato */}
              <div>
                <h3 className="text-xl font-bold mb-4">Contato</h3>
                <ul className="space-y-2">
                  {/*<li className="flex items-start">
                    <i className="fas fa-map-marker-alt mt-1 mr-3 text-blue-500"></i>
                    <span className="text-gray-400">Av. Paulista, 1000, São Paulo - SP</span>
                  </li>*/}
                  <li className="flex items-start">
                    <i className="fas fa-phone-alt mt-1 mr-3 text-blue-500"></i>
                    <span className="text-gray-400">(79) 99996-6618</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-envelope mt-1 mr-3 text-blue-500"></i>
                    <span className="text-gray-400">contato@clickdigital.com.br</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-clock mt-1 mr-3 text-blue-500"></i>
                    <span className="text-gray-400">Seg-Sex: 9h às 18h</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  &copy; 2025 Click Digital. Todos os direitos reservados.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 cursor-pointer">Política de Privacidade</a>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 cursor-pointer">Termos de Uso</a>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

      </footer>

      {/* WhatsApp Button */}
      <div className="fixed bottom-8 right-8 flex items-center z-50">
        <div className="bg-green-600 text-white px-4 py-2 rounded-l-full shadow-lg">
          <span className="whitespace-nowrap">Fale agora conosco</span>
        </div>
        <a
          href="https://wa.me/5579999966618"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </a>
      </div>
    </div >
  );
}
export default App
