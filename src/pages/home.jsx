// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { motion } from "motion/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AvaliacoesCarrossel from './componentes/avaliacoes-carrossel';

// Importações de imagens e vídeos
import imgTrans1 from '../assets/violão-1.jpeg'; //abstract_background_technology.jpg //tech-mask.svg
import imgCarrossel1 from '../assets/guitarra-1.jpg';
import imgCarrossel2 from '../assets/piano-3.jpg';
import imgCarrossel3 from '../assets/violão-3.jpg';
import imgLogo from '../assets/Logo-Samuel-texto-SF.png';
import instrument_1 from '../assets/tocando-guitarra-1.png';
import instrument_2 from '../assets/tocando-teclado-2.png';
import instrument_3 from '../assets/tocando-violão-1.png';

// Locomotive Scroll
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';


// =========================================================================================================================================================================================
// Componente para exibir a imagem da plataforma com efeito de fadeIn
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};



// =====================================================================================================================================================================================
const FadeInSection = ({ children, className = '', duration, delay = 0, threshold = 0.5 }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: threshold,
    rootMargin: '0px 0px -50px 0px',
  });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [style, setStyle] = useState({
    opacity: 0,
    transition: `opacity ${duration || 1000}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  useEffect(() => {
    if (isVisible && !hasBeenVisible) {
      setHasBeenVisible(true);
      setTimeout(() => {
        setStyle({
          opacity: 1,
          transition: `opacity ${duration || 1000}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        });
      }, 10); // pequeno delay para garantir transição
    }
  }, [isVisible, hasBeenVisible, duration, delay]);

  return (
    <div
      ref={ref}
      className={`transition-opacity ease-out ${className}`}
      style={hasBeenVisible ? style : {
        opacity: 0,
        transition: `opacity ${duration || 1000}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};


// =====================================================================================================================================================================================
// Componente para fadeIn + scale de acima do 100%% para 100% usando React state
const ScaleFadeInSection = ({ children, className = '', duration = 900, delay = 0, onShow }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px',
  });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [style, setStyle] = useState({
    opacity: 0,
    transform: 'scale(1.2)',
    transition: `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  useEffect(() => {
    if (isVisible && !hasBeenVisible) {
      setHasBeenVisible(true);
      setTimeout(() => {
        setStyle({
          opacity: 1,
          transform: 'scale(1)',
          transition: `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        });
        if (onShow) onShow();
      }, 10 + duration + delay); // chama onShow após a animação
    }
  }, [isVisible, hasBeenVisible, duration, delay, onShow]);

  return (
    <div ref={ref} style={hasBeenVisible ? style : {
      opacity: 0,
      transform: 'scale(1.2)',
      transition: `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
    }} className={className}>
      {children}
    </div>
  );
};


// =========================================================================================================================================================================
// Componente para animar imagem das plataformas em cascata, agora com delay
const PlataformaImg = ({ src, minHeight, maxHeight, visible, delay = 0, scale }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timeout;
    if (visible) {
      timeout = setTimeout(() => setShow(true), delay);
    } else {
      setShow(false);
    }
    return () => clearTimeout(timeout);
  }, [visible, delay]);
  // Se a prop scale for fornecida, usa ela, senão usa o padrão da animação
  const imgScale = typeof scale !== 'undefined' ? scale : (show ? 1 : 1.2);
  return (
    <img
      src={src}
      className="justify-center mx-auto mb-5"
      style={{
        minHeight,
        maxHeight,
        opacity: show ? 1 : 0,
        transform: `scale(${imgScale})`,
        transition: `opacity 900ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 400ms cubic-bezier(0.4,0,0.2,1) 0ms`
      }}
    />
  );
};


// ===================================================================================================================================================================
const App = () => { // React.FC
  // ----------------------------------------------------------------------------------------------------------------------------
  const scrollRef = useRef(null);
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.10,
      multiplier: 1.4,
      class: 'is-inview',
      getDirection: true,
      getSpeed: true,
    });
    return () => {
      scroll.destroy();
    };
  }, []);
  // ---------------------------------------------------------------------------------------------------------------------------
  // Controle de animação para a seção Motion
  const [motionSectionRef, motionSectionVisible] = useIntersectionObserver({ threshold: 0.5 });
  const [motionSectionAnimated, setMotionSectionAnimated] = useState(false);
  useEffect(() => {
    if (motionSectionVisible && !motionSectionAnimated) {
      setMotionSectionAnimated(true);
    }
  }, [motionSectionVisible, motionSectionAnimated]);
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

  // Estado para controlar slide ativo e slide ampliado
  const [activeIndex, setActiveIndex] = useState(0); // Slide atualmente visível
  const [zoomedIndex, setZoomedIndex] = useState(0); // Slide que está ampliado
  const swiperRef = useRef(null);
  const SWIPER_SPEED = 2000; // igual ao speed do Swiper

  // Controle de animação em cascata da div e da imagem das Plataformas 1 e 2
  const [plataforma1DivVisible, setPlataforma1DivVisible] = useState(false);
  const [plataforma1ImgVisible, setPlataforma1ImgVisible] = useState(false);
  const [plataforma2DivVisible, setPlataforma2DivVisible] = useState(false);
  const [plataforma2ImgVisible, setPlataforma2ImgVisible] = useState(false);
  // Estado para hover das Plataformas
  const [plataforma1Hovered, setPlataforma1Hovered] = useState(false);
  const [plataforma2Hovered, setPlataforma2Hovered] = useState(false);

  // Estado para hover do botão do WhatsApp
  const [waBtnHovered, setWaBtnHovered] = useState(false);

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

  // Ao iniciar a transição, mantenha o slide anterior ampliado até o fim da transição
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
    setTimeout(() => {
      setZoomedIndex(newIndex);
    }, SWIPER_SPEED);
  };

  // ----------------------------------------------------------------------------------------------------------------------------------------
  // Hook para detectar se a Modalidade 1 está visível
  const [refModalidade2, isVisibleModalidade2] = useIntersectionObserver({ threshold: 0.5 });
  // Novo estado para garantir que a animação só execute uma vez
  const [modalidadesAnimadas, setModalidadesAnimadas] = useState(false);
  useEffect(() => {
    if (isVisibleModalidade2 && !modalidadesAnimadas) {
      setModalidadesAnimadas(true);
    }
  }, [isVisibleModalidade2, modalidadesAnimadas]);
  // Estado para hover das Modalidades
  const [isHoveredModalidade1, setIsHoveredModalidade1] = useState(false);
  const [isHoveredModalidade2, setIsHoveredModalidade2] = useState(false);
  const [isHoveredModalidade3, setIsHoveredModalidade3] = useState(false);





  {/* ======================================================================================================================================================================================================== */ }
  return (
    <div ref={scrollRef} data-scroll-container className="min-h-screen _bg-gray-500 bg-[#cbcbcb]"> {/* bg-white */}
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/">
                  <img
                    src={imgLogo}
                    //alt="Logo empresa"
                    style={{ maxHeight: '64px' }}
                    className={`h-16 w-auto py-[5px] ${logoAnimated ? 'fadein-scale-logo' : ''}`}
                  />
                </a>
              </div>
              <div className="flex-shrink-0 ml-3 flex flex-col items-start justify-center">

                <div className="flex flex-col">
                  <a href="/">
                    <FadeInSection className="delay-[400ms]" duration={'20s'}>
                      <span className="text-gray-100 font-bold leading-tight block w-max _animate-fadeIn text-1xl md:text-2xl" id="logo-text">ACADEMIA DE MÚSICA</span>
                    </FadeInSection>
                    {/*<FadeInSection className="delay-[600ms]">
                    <span className="text-gray-800 text-base leading-none block _animate-fadeIn" style={{ fontSize: '81%' }}>MUSICAL</span>
                  </FadeInSection>*/}
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a className="text-gray-100 hover:text-blue-300 transition-colors duration-300 cursor-pointer whitespace-nowrap" href="#home" data-scroll-to>Início</a>
                <a className="text-gray-100 hover:text-blue-300 transition-colors duration-300 cursor-pointer whitespace-nowrap" href="#services" data-scroll-to>Modalidades</a>
                <a className="text-gray-100 hover:text-blue-300 transition-colors duration-300 cursor-pointer whitespace-nowrap" href="#about" data-scroll-to>Sobre</a>
                <a className="text-gray-100 hover:text-blue-300 transition-colors duration-300 cursor-pointer whitespace-nowrap" href="#contact" data-scroll-to>Contato</a>
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
              <a className="text-white hover:text-blue-300 block px-3 py-2 text-base font-medium cursor-pointer" href="#home" data-scroll-to onClick={() => setIsMenuOpen(false)}>Início</a>
              <a className="text-white hover:text-blue-300 block px-3 py-2 text-base font-medium cursor-pointer" href="#about" data-scroll-to onClick={() => setIsMenuOpen(false)}>Sobre</a>
              <a className="text-white hover:text-blue-300 block px-3 py-2 text-base font-medium cursor-pointer" href="#services" data-scroll-to onClick={() => setIsMenuOpen(false)}>Modalidades</a>
              <a className="text-white hover:text-blue-300 block px-3 py-2 text-base font-medium cursor-pointer" href="#contact" data-scroll-to onClick={() => setIsMenuOpen(false)}>Contato</a>
              {/*<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 mt-2 w-full !rounded-button cursor-pointer whitespace-nowrap"
                onClick={() => window.location.href = "https://clickfacil.top/auth/sign-in"}>Entrar</button>*/}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Carousel */}
      <section id='home' className="relative pt-16" data-scroll-section>
        <FadeInSection className="delay-[500ms] _mt-16">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 5_000, disableOnInteraction: false }}
            loop={true}
            speed={SWIPER_SPEED}
            className="h-[70vh] w-full "
            onSlideChange={handleSlideChange}
            ref={swiperRef}
          >
            <SwiperSlide>
              <div className="relative h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10 z-10"></div>
                <motion.img
                  src={imgCarrossel1}
                  title="Impulsione seu negócio com nossas soluções tecnológicas personalizadas"
                  className="h-full w-full object-cover object-center"
                  initial={{ scale: 1 }}
                  animate={{ scale: zoomedIndex === 0 ? 1.3 : 1 }}
                  transition={{
                    duration: 25.0,
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 max-w-[700px] md:ml-40">
                  <div className="fadein-slide-right"
                    style={{ animationDelay: '2s' }}
                  >
                    <h1 className="text-3xl md:text-5xl lg:text-4xl font-bold text-white mb-4">
                      O primeiro passo para o <br />palco começa aqui
                    </h1>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/50 z-10"></div>
                <motion.img
                  src={imgCarrossel2}
                  title="Tecnologia que impulsiona seu negócio"
                  className="h-full w-full object-cover object-bottom"
                  initial={{ scale: 1 }}
                  animate={{ scale: zoomedIndex === 1 ? 1.3 : 1 }}
                  transition={{
                    duration: 40.0,
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 max-w-[700px] md:ml-[60rem]">
                    <div className="fadein-slide-right"
                      style={{ animationDelay: '2s' }}
                    >
                      <h1 className="text-3xl md:text-5xl lg:text-4xl font-bold text-white mb-4">
                        Aprender música é dar voz à alma
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
                <motion.img
                  src={imgCarrossel3}
                  title="Inovação e resultados ao seu alcance"
                  className="h-full w-full object-cover object-top"
                  initial={{ scale: 1 }}
                  animate={{ scale: zoomedIndex === 2 ? 1.3 : 1 }}
                  transition={{
                    duration: 40.0,
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 max-w-[700px] md:ml-40">
                    <div className="fadein-slide-right"
                      style={{ animationDelay: '2s' }}
                    >
                      <h1 className="text-3xl md:text-5xl lg:text-4xl font-bold text-white mb-4">
                        Transforme o seu sonho musical em realidade
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </FadeInSection>
      </section>


      {/* ========================================================================================================================================================================= */}
      {/* Nossos Serviços */}
      <section id='services' className="py-20 px-0 mb-[-40px] md:px-4 relative" data-scroll-section
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgb(106 135 201) 0%, rgb(13 32 42) 100%)',
          boxShadow: '0px 10px 20px #000000a2',
          zIndex: 5
        }}
      >
        {/* Imagem de fundo com opacidade */}
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${require('../assets/fundo-1.jpg')})`,
            opacity: 0.15,
            zIndex: 1,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        ></div>
        <div className="max-w-7xl mx-auto _bg-green-300">

          <FadeInSection delay={1000} threshold={1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mb-4">Escolha seu instrumento</h2>
              {/*<p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Oferecemos soluções digitais completas para impulsionar seu negócio no mundo digital
              </p>*/}
            </div>
          </FadeInSection>

          {/* Modalidades */}
          <div className="relative flex flex-col items-center mb-[-100px] min-h-[700px] overflow-hidden">

            {/* Modalidade 1 */}
            <motion.div
              className="relative z-10 mb-[-150px] ml-[-300px] md:ml-[0px]"
              initial={{ opacity: 0, x: 100, scale: 1 }}
              animate={modalidadesAnimadas ? { opacity: 1, x: 0, scale: isHoveredModalidade1 ? 1.03 : 1 } : { opacity: 0, x: 100, scale: 1 }}
              transition={{
                opacity: { duration: 2.0, delay: 0.0, type: "spring", bounce: 0.5 },
                x: { duration: 2.0, delay: 0.0, type: "spring", bounce: 0.5 },
                scale: { duration: 1.0, delay: 0.0, type: "spring", bounce: 0.5 },
              }}
              onMouseEnter={() => setIsHoveredModalidade1(true)}
              onMouseLeave={() => setIsHoveredModalidade1(false)}
            >
              {/* Etiqueta 1 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/80 rounded-[200px] my-auto h-[120px] overflow-hidden"
                style={{ boxShadow: '4px 4px 15px #00000085' }}
                initial={{ opacity: 0, width: 0 }}
                animate={modalidadesAnimadas ? { opacity: 1, width: typeof window !== 'undefined' && window.innerWidth < 768 ? 380 : 500 } : { opacity: 0, width: 0 }}
                transition={{
                  opacity: { duration: 1.0, delay: 0.6 },
                  width: { type: 'spring', stiffness: 90, damping: 10, delay: 0.6 },
                }}
              >
                <div className='flex flex-col items-center justify-center h-full mt-[-9px] ml-[70px] md:ml-[200px]'>
                  <span className="text-white text-[35px] _leading-tight block font-bold ">Guitarra</span>
                  <button className="bg-transparent border-2 border-white text-white hover:bg-gray-500 px-8 py-1 rounded-md text-lg font-medium transition-all duration-300 !rounded-button cursor-pointer whitespace-nowrap"
                    onClick={() => {
                      window.open("https://wa.me/5561984574759?text=Olá!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informações%20sobre%20as%20aulas%20de%20guitarra", '_blank', 'noopener,noreferrer')
                    }}
                    //href="https://wa.me/5561984574759?text=Olá!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informações%20sobre%20as%20aulas%20de%20música"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saiba mais
                  </button>
                </div>
              </motion.div>

              {/* Imagem musico 1 */}
              <img
                src={instrument_1}
                className="h-[180px] md:h-[250px] mx-auto relative"
              />
            </motion.div>

            {/* Modalidade 2 */}
            <motion.div
              ref={refModalidade2}
              className="relative z-20 mb-[-300px] ml-[60px] mt-[3rem] md:mt-0 md:ml-[-410px]"
              initial={{ opacity: 0, x: -100, scale: 1 }}
              animate={modalidadesAnimadas ? { opacity: 1, x: 0, scale: isHoveredModalidade2 ? 1.03 : 1 } : { opacity: 0, x: -100, scale: 1 }}
              transition={{
                opacity: { duration: 2, delay: 1.0, type: "spring", bounce: 0.5 },
                x: { duration: 2, delay: 1.0, type: "spring", bounce: 0.5 },
                scale: { duration: 1, delay: 0.0, type: "spring", bounce: 0.5 },
              }}
              onMouseEnter={() => setIsHoveredModalidade2(true)}
              onMouseLeave={() => setIsHoveredModalidade2(false)}
            >

              {/* Etiqueta 2 */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 rounded-[200px] mt-[100px] h-[120px] _w-[500px] ml-auto overflow-hidden"
                style={{ boxShadow: '4px 4px 15px #00000085' }}
                initial={{ opacity: 0, width: 0 }}
                animate={modalidadesAnimadas ? { opacity: 1, width: 500 } : { opacity: 0, width: 0 }}
                transition={{
                  opacity: { duration: 1.0, delay: 1.6 },
                  width: { type: 'spring', stiffness: 70, damping: 10, delay: 1.6 },
                }}
              >
                <div className='flex flex-col items-center justify-center h-full relative z-10 mt-[-9px] ml-[0px] md:ml-[-200px]'>
                  <span className="text-white text-[35px] _leading-tight block font-bold ">Teclado</span>
                  <button className="bg-transparent border-2 border-white text-white hover:bg-gray-500 px-8 py-1 rounded-md text-lg font-medium transition-all duration-300 !rounded-button cursor-pointer whitespace-nowrap"
                    onClick={() => {
                      window.open("https://wa.me/5561984574759?text=Olá!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informações%20sobre%20as%20aulas%20de%20teclado", '_blank', 'noopener,noreferrer')
                    }}
                  >
                    Saiba mais
                  </button>
                </div>
              </motion.div>

              {/* Imagem musico 2 */}
              <img
                src={instrument_2}
                className="mt-[2rem] h-[300px] md:mt-0 md:h-[400px] mx-auto relative"
              />
            </motion.div>

            {/* Modalidade 3 */}
            <motion.div
              className="relative z-30 ml-[-360px] mt-[4rem] md:ml-[0px] md:mt-0"
              initial={{ opacity: 0, x: 100, scale: 1 }}
              animate={modalidadesAnimadas ? { opacity: 1, x: 0, scale: isHoveredModalidade3 ? 1.03 : 1 } : { opacity: 0, x: 100, scale: 1 }}
              transition={{
                //duration: 2.0, delay: 2.0, type: "spring", bounce: 0.5,
                opacity: { duration: 2, delay: 2.0, type: "spring", bounce: 0.5 },
                x: { duration: 2, delay: 2.0, type: "spring", bounce: 0.5 },
                scale: { duration: 1, delay: 0.0, type: "spring", bounce: 0.5 },
              }}
              onMouseEnter={() => setIsHoveredModalidade3(true)}
              onMouseLeave={() => setIsHoveredModalidade3(false)}
            >

              {/* Etiqueta 3 */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/80 rounded-[200px] ml-[200px] h-[120px] mt-[150px] md:mt-[100px] overflow-hidden"
                style={{ boxShadow: '4px 4px 15px #00000085' }}
                initial={{ opacity: 0, width: 0 }}
                animate={modalidadesAnimadas ? { opacity: 1, width: typeof window !== 'undefined' && window.innerWidth < 768 ? 340 : 500 } : { opacity: 0, width: 0 }}
                transition={{
                  opacity: { duration: 1.0, delay: 2.6 },
                  width: { type: 'spring', stiffness: 70, damping: 10, delay: 2.6 },
                }}
              >
                <div className='flex flex-col items-center justify-center h-full mt-[-9px] ml-[130px] md:ml-[200px]'>
                  <span className="text-white text-[35px] _leading-tight block font-bold ">Violão</span>
                  <button className="bg-transparent border-2 border-white text-white hover:bg-gray-500 px-8 py-1 rounded-md text-lg font-medium transition-all duration-300 !rounded-button cursor-pointer whitespace-nowrap"
                    onClick={() => {
                      window.open("https://wa.me/5561984574759?text=Olá!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informações%20sobre%20as%20aulas%20de%20violão", '_blank', 'noopener,noreferrer')
                    }}
                  >
                    Saiba mais
                  </button>
                </div>
              </motion.div>

              {/* Imagem musico 3 */}
              <img
                src={instrument_3}
                className="h-[180px] mt-[7rem] md:mt-0 md:h-[250px] mx-auto relative ml-[110px]"
              />
            </motion.div>

          </div>
        </div>
      </section>


      {/* ========================================================================================================================================================================= */}
      {/* Sobre o estabelecimento */}
      <section
        id="about"
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden md:h-[850px]"
        data-scroll-section
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Imagem de fundo fixa/parallax */}
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat"
          data-scroll
          data-scroll-speed="-5"
          style={{
            backgroundImage: `url(${imgTrans1})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            zIndex: 1,
            filter: 'brightness(0.7) blur(0.5px)',
          }}
          aria-hidden="true"
        ></div>
        {/* Conteúdo sobreposto */}
        <div className="relative z-10 max-w-3xl mx-auto text-center py-24 px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">Sobre o estabelecimento</h2>
          <p className="text-lg md:text-xl text-gray-100 mb-8 drop-shadow-md">
            Nossa academia de música é referência em ensino musical, oferecendo aulas de diversos instrumentos com professores experientes e apaixonados por música. Venha fazer parte dessa história!
          </p>
        </div>
      </section>



      {/* ========================================================================================================================================================================= */}

      {/* Avaliações */}
      <section id='avaliações' className="py-20 px-4 _mb-[150px] bg-[#cbcbcb] relative" data-scroll-section
        style={{
          boxShadow: '0px -10px 20px #000000a2',
          zIndex: 5
        }}
      >
        <div className="max-w-full  mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-1 text-gray-800">O que dizem sobre nós</h2>
          <a href="https://www.google.com/maps/place/Academia+de+Guitarra+e+Violão+-+Prof:+Samuel+Mendes/@-15.6550892,-47.7930181,17z/data=!4m8!3m7!1s0x935a3f97bf521117:0xc2a8796292aba74b!8m2!3d-15.6550892!4d-47.7930181!9m1!1b1!16s%2Fg%2F11qq3_6d8n?authuser=0&hl=pt-BR&entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className='cursor-pointer'
          >
            <h5 className="text-lg md:text-xl text-gray-600 mb-10">Powered by Google</h5>
          </a>
          <FadeInSection>
            <AvaliacoesCarrossel />
          </FadeInSection>
        </div>
      </section>




      {/* ========================================================================================================================================================================= */}
      {/* Pronto para iniciar sua carreira */}
      <motion.section
        id='contact'
        data-scroll-section
        ref={motionSectionRef}
        className="py-20 px-4 bg-[#e5e7eb] _bg-[#2563eb] text-black relative overflow-hidden rounded-t-[30px] _mt-[-180px]"
        style={{ boxShadow: '0px -10px 20px #00000078', zIndex: 10 }}
        initial={{ top: 180 }}
        animate={motionSectionAnimated ? { top: 0 } : { top: 180 }}
        transition={{
          duration: 1.0,
          top: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        <FadeInSection className="delay-[200ms]">
          <div className="max-w-7xl mx-auto text-center relative mt-[20px] mb-[40px]" style={{ zIndex: 20 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para iniciar sua carreira musical?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Entre em contato hoje mesmo e descubra como impulsionar seus talentos musicais
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 !rounded-button cursor-pointer whitespace-nowrap"
                onClick={() => {
                  window.open("https://wa.me/5561984574759?text=Olá!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informações%20sobre%20as%20aulas%20de%20música", '_blank', 'noopener,noreferrer')
                }}
              >
                Eu quero começar
              </button>
              {/*<button className="bg-transparent border-2 border-black hover:bg-gray-300 px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 !rounded-button cursor-pointer whitespace-nowrap">
                Falar com Consultor
              </button>*/}
            </div>
          </div>
        </FadeInSection>
      </motion.section>


      {/* ========================================================================================================================================================================= */}
      {/* Footer */}

      <footer
        className="bg-gray-900 text-white pt-16 pb-8 px-4"
        data-scroll-section
      >
        <FadeInSection className="delay-[200ms]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-12">
              {/* Coluna 1 - Sobre */}
              <div>
                <h3 className="text-xl font-bold mb-4">Academia de música Samuel Mendes</h3>
                <p className="text-gray-400 mb-4">
                  Impulsionando talentos desde 2020.
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
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Modalidades</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Sobre Nós</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Contato</a></li>
                </ul>
              </div>
              {/* Coluna 3 - Serviços */}
              {/*<div>
                <h3 className="text-xl font-bold mb-4">Nossos Serviços</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Administração Interna e Financeira</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Diagnóstico Tributário, Trabalhista e Financeiro</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Governança Corporativa</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Abertura, Alterações e Encerramento de Empresas</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Modelagem e Avaliações Econômico-financeira</a></li>
                </ul>
              </div>*/}
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
                    <span className="text-gray-400">(61) 98457-4759</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-envelope mt-1 mr-3 text-blue-500"></i>
                    <span className="text-gray-400">Samuel_luefstrike@gmail.com</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-clock mt-1 mr-3 text-blue-500"></i>
                    <span className="text-gray-400">Seg-Sex: 9h às 20h</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  &copy; 2025 Academia de música Samuel Mendes. Todos os direitos reservados.
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
      <a
        href="https://wa.me/5561984574759?text=Olá!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informações%20sobre%20as%20aulas%20de%20música."
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="fixed bottom-8 right-8 flex items-center z-50"
          onMouseEnter={() => setWaBtnHovered(true)}
          onMouseLeave={() => setWaBtnHovered(false)}
        > {/* shadow-lg */}

          <div className="bg-green-600 text-white px-4 py-2 rounded-full _shadow-lg mr-[-25px] pr-[30px]">
            <span className="whitespace-nowrap">Fale agora conosco</span>
          </div>
          <div
            className={`_bg-green-600 text-white p-4 rounded-full _shadow-lg _hover:bg-green-700 transition-colors duration-300 flex items-center justify-center ${waBtnHovered ? 'bg-green-700' : 'bg-green-600'}`}
          >
            <i className="fab fa-whatsapp text-2xl"></i>
          </div>
        </div>
      </a>

    </div >
  );
}
export default App
