
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// =================== Array de avaliações ===================
const dadosAvaliacoes = [
    {
        nome: "Vanessa Carvalho",
        data: "2025-01-10",
        estrelas: 5,
        texto: "O professor Samuel é um excelente educador, com bastante conhecimento técnico e uma abordagem didática e motivadora. Recomendo suas aulas para quem deseja aprender guitarra com qualidade.",
        linkPerfil: "https://www.google.com/maps/contrib/100280655885816305920/reviews/@-15.6550892,-47.7930181,17z/data=!4m3!8m2!3m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D",
        foto: "https://lh3.googleusercontent.com/a-/ALV-UjWQ0X0yE3bDLXD8ZyPx0yU_a_6eEleJh5r5RuzmLbqf0sNGghlo",
    },
    {
        nome: "Sylvio César",
        data: "2022-04-30",
        estrelas: 5,
        texto: "Grande professor, com um conhecimento absurdo, didático, paciente, aulas excepcionais. Melhorei muito, a evolução é perceptível logo nas primeiras aulas. Meus sinceros agradecimentos para esse excelente profissional. Parabéns pelo seu trabalho Samuel, Deus te abençoe e o faça prosperar cada vez mais.",
        linkPerfil: "https://www.google.com/maps/contrib/112566592578327486767/reviews/@-15.9544202,-47.942901,10z/data=!3m1!4b1!4m3!8m2!3m1!1e1?hl=pt-BR&entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D",
        foto: "https://lh3.googleusercontent.com/a-/ALV-UjXgRF8DIjZUarM3r_GZHnWwRfN7X05YxntuK6Vv1-GSRStX3mjj",
    },
    {
        nome: "Graça Maria Nascimento Da Silva",
        data: "2024-07-15",
        estrelas: 5,
        texto: "Tenho 74 anos e estou aprendendo tocar guitarra com o professor Samuel, eu procurei em vários lugares alguém para ministrar aulas com qualidade e quando encontrei Samuel, eu não tive dúvidas que era ele que iria me  ensinar de maneira gentil e com uma didática rica e fácil de entender.",
        linkPerfil: "https://www.google.com/maps/contrib/104370311606714573646/reviews?hl=pt-BR",
        foto: null,
    },    
    {
        nome: "Gabriel Mello",
        data: "2023-03-18",
        estrelas: 5,
        texto: "Excelente professor! As aulas que o Samuel aplica são bem didáticas, tanto na parte teórica quanto na prática. Oferece tanto a modalidade online via vídeo aula quanto presencial. Já fiz os dois tipos de aula com ele e nenhum deixa a desejar. Qualidade impecável. Pra mim, o melhor professor de guitarra de Brasília.",
        linkPerfil: "https://www.google.com/maps/contrib/106748795030798363812/reviews/@-15.6550892,-47.7930181,17z/data=!3m1!4b1!4m3!8m2!3m1!1e1?hl=pt-BR&entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D",
        foto: "https://lh3.googleusercontent.com/a-/ALV-UjVi09ziAyOjOJCG405iqw3ezPE7duPy2L6GJ8SyB4vWSSKRU7R2",
    },
    {
        nome: "Ricardo",
        data: "2025-02-22",
        estrelas: 5,
        texto: "Aulas excepcionais! Toda aula é preparada cuidadosamente pra sanar quaisquer dúvidas relacionadas. Além do conteúdo ser bem explicativo e de qualidade. Recomendo!",
        linkPerfil: "https://www.google.com/maps/reviews/@-15.6550892,-47.7930181,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1sChZDSUhNMG9nS0VJQ0FnTURnMWUtWlhREAE!2m1!1s0x0:0xc2a8796292aba74b?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D",
        foto: "https://lh3.googleusercontent.com/a-/ALV-UjWt12JCSBbqehr7S4qizmx60JeqH9FZdk53lR7aJtNIJ7do1tWk",
    },
];

function getInitials(nome) {
    if (!nome) return '';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
    return (partes[0][0] + partes[1][0]).toUpperCase();
}

// Card individual de avaliação

function CardAvaliacao({ avaliacao }) {
    const [expandido, setExpandido] = useState(false);
    const limite = 41;
    const texto = avaliacao.texto;
    const precisaTruncar = texto.length > limite;
    const textoExibido = expandido || !precisaTruncar ? texto : texto.slice(0, limite) + '...';
    return (
        <div className="w-full max-w-md bg-white border-gray-100 border-2 rounded-2xl shadow-lg p-6 flex flex-col items-center h-[312px] min-w-[320px]">
            <a href={avaliacao.linkPerfil} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                {avaliacao.foto ? (
                    <img
                        src={avaliacao.foto}
                        alt={avaliacao.nome}
                        className="w-20 h-20 rounded-full object-cover border-0 border-white shadow mb-3"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-3 border-0 border-white shadow">
                        {getInitials(avaliacao.nome)}
                    </div>
                )}
            </a>
            <a href={avaliacao.linkPerfil} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <div className="text-lg font-semibold text-gray-800 mb-1">{avaliacao.nome}</div>
            </a>
            <div className="text-sm text-gray-500 mb-2">{new Date(avaliacao.data).toLocaleDateString('pt-BR')}</div>
            <div className="flex items-center justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-6 h-6 ${i < avaliacao.estrelas ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                ))}
            </div>
            <div className="w-full max-h-[4.5rem] overflow-y-auto bg-white rounded p-3 text-gray-700 text-base scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {textoExibido}
                {precisaTruncar && !expandido && (
                    <button
                        className="ml-2 text-blue-600 hover:underline text-sm"
                        onClick={() => setExpandido(true)}
                    >
                        Mostrar mais
                    </button>
                )}
            </div>
        </div>
    );
}




function AvaliacoesCarrossel() {
    return (
        <div className="relative flex flex-col items-center">
            <div className="w-full max-w-10xl mx-auto flex justify-center items-center overflow-hidden min-h-[340px] md:px-[15rem]">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={40}
                    slidesPerView={3}
                    className="w-full"
                    style={{ paddingBottom: 40 }}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 24 },
                        640: { slidesPerView: 1, spaceBetween: 40 },
                        1130: { slidesPerView: 2, spaceBetween: 40 },
                        1450: { slidesPerView: 3, spaceBetween: 40 },
                    }}
                >
                    {dadosAvaliacoes.map((avaliacao, idx) => (
                        <SwiperSlide key={idx}>
                            <CardAvaliacao avaliacao={avaliacao} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Botão ver todos */}
            <div className="mt-4">
                <a
                    href="https://www.google.com/maps/place/Academia+de+Guitarra+e+Violão+-+Prof:+Samuel+Mendes/@-15.6550892,-47.7930181,17z/data=!4m8!3m7!1s0x935a3f97bf521117:0xc2a8796292aba74b!8m2!3d-15.6550892!4d-47.7930181!9m1!1b1!16s%2Fg%2F11qq3_6d8n?authuser=0&hl=pt-BR&entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                >Ver todas as avaliações</a>
            </div>
        </div>
    );
}


export default AvaliacoesCarrossel;
