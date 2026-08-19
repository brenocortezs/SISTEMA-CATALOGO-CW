export const HISTORIA_MARCA: Record<string, string> = {
  "Tag Heuer":
    "Fundada em 1860 na Suíça por Edouard Heuer, a Tag Heuer é referência em precisão e cronógrafos, com forte ligação histórica ao automobilismo e aos esportes de alta performance.",
  Bvlgari:
    "Fundada em 1884 em Roma como joalheria, a Bvlgari expandiu para a relojoaria unindo o design italiano arrojado à tradição da alta relojoaria suíça.",
  Omega:
    "Fundada em 1848 na Suíça, a Omega é marcada pela precisão cronométrica, tendo acompanhado missões espaciais da NASA e diversas edições dos Jogos Olímpicos.",
  Breitling:
    "Fundada em 1884, a Breitling é referência em cronógrafos e instrumentos de precisão voltados à aviação, historicamente ligada a pilotos e à indústria aeronáutica.",
  Cartier:
    "Fundada em 1847 em Paris, a Cartier é uma das joalherias mais tradicionais do mundo, responsável por criar peças icônicas como o Santos e o Tank.",
  Rolex:
    "Fundada em 1905, a Rolex é sinônimo de status e precisão, pioneira em inovações como a caixa impermeável Oyster e o sistema de data automática.",
  Tudor:
    "Fundada em 1926 por Hans Wilsdorf, o mesmo fundador da Rolex, a Tudor une a robustez e a qualidade suíça a uma proposta mais acessível.",
  Hublot:
    "Fundada em 1980 na Suíça, a Hublot revolucionou a relojoaria ao unir ouro e borracha, tornando-se referência em inovação e na filosofia da \"fusão\" de materiais.",
};

export function buscarHistoriaMarca(marca: string): string | null {
  return HISTORIA_MARCA[marca] ?? null;
}
