export type Scale = "frequencia" | "intensidade";

export interface Question {
  id: number;
  text: string;
  scale: Scale;
  dimension: string;
}

export const SCALES: Record<Scale, { value: number; label: string }[]> = {
  frequencia: [
    { value: 1, label: "Nunca / Quase nunca" },
    { value: 2, label: "Raramente" },
    { value: 3, label: "Às vezes" },
    { value: 4, label: "Frequentemente" },
    { value: 5, label: "Sempre" },
  ],
  intensidade: [
    { value: 1, label: "Muito pouco" },
    { value: 2, label: "Pouco" },
    { value: 3, label: "Moderadamente" },
    { value: 4, label: "Muito" },
    { value: 5, label: "Extremamente" },
  ],
};

export const QUESTIONS: Question[] = [
  // Exigências quantitativas
  { id: 1, dimension: "Exigências quantitativas", scale: "frequencia", text: "A sua carga de trabalho acumula-se por ser mal distribuída?" },
  { id: 2, dimension: "Exigências quantitativas", scale: "frequencia", text: "Com que frequência não tem tempo para completar todas as tarefas do seu trabalho?" },
  // Ritmo de trabalho
  { id: 3, dimension: "Ritmo de trabalho", scale: "frequencia", text: "Precisa de trabalhar muito rapidamente?" },
  // Exigências cognitivas
  { id: 4, dimension: "Exigências cognitivas", scale: "frequencia", text: "O seu trabalho exige a sua atenção constante?" },
  { id: 5, dimension: "Exigências cognitivas", scale: "frequencia", text: "O seu trabalho exige que tome decisões difíceis?" },
  // Exigências emocionais
  { id: 6, dimension: "Exigências emocionais", scale: "frequencia", text: "O seu trabalho exige emocionalmente de si?" },
  // Influência no trabalho
  { id: 7, dimension: "Influência no trabalho", scale: "frequencia", text: "Tem um elevado grau de influência no seu trabalho?" },
  { id: 8, dimension: "Influência no trabalho", scale: "frequencia", text: "Pode influenciar a quantidade de trabalho que lhe compete?" },
  // Possibilidades de desenvolvimento
  { id: 9, dimension: "Possibilidades de desenvolvimento", scale: "frequencia", text: "O seu trabalho exige que tenha iniciativa?" },
  { id: 10, dimension: "Possibilidades de desenvolvimento", scale: "frequencia", text: "O seu trabalho permite-lhe aprender coisas novas?" },
  // Significado do trabalho
  { id: 11, dimension: "Significado do trabalho", scale: "frequencia", text: "O seu trabalho tem significado para si?" },
  { id: 12, dimension: "Significado do trabalho", scale: "frequencia", text: "Sente que o trabalho que faz é importante?" },
  // Compromisso com o local de trabalho
  { id: 13, dimension: "Compromisso", scale: "intensidade", text: "Em que medida gosta de falar com outros sobre o seu local de trabalho?" },
  // Previsibilidade
  { id: 14, dimension: "Previsibilidade", scale: "frequencia", text: "No seu local de trabalho é informado(a) com antecedência sobre decisões importantes, mudanças ou planos para o futuro?" },
  { id: 15, dimension: "Previsibilidade", scale: "frequencia", text: "Recebe toda a informação de que necessita para fazer bem o seu trabalho?" },
  // Recompensas
  { id: 16, dimension: "Recompensas", scale: "frequencia", text: "O seu trabalho é reconhecido e apreciado pela gerência?" },
  { id: 17, dimension: "Recompensas", scale: "frequencia", text: "É tratado(a) de forma justa no seu local de trabalho?" },
  // Clareza do papel
  { id: 18, dimension: "Clareza do papel", scale: "frequencia", text: "O seu trabalho tem objetivos claros?" },
  { id: 19, dimension: "Clareza do papel", scale: "frequencia", text: "Sabe exactamente quais as suas responsabilidades?" },
  // Conflitos de papel
  { id: 20, dimension: "Conflitos de papel", scale: "frequencia", text: "Faz coisas no seu trabalho que uns aceitam e outros não?" },
  // Qualidade da liderança
  { id: 21, dimension: "Qualidade da liderança", scale: "intensidade", text: "Em que medida o seu superior imediato dá prioridade à satisfação no trabalho?" },
  { id: 22, dimension: "Qualidade da liderança", scale: "intensidade", text: "Em que medida o seu superior imediato é bom no planeamento do trabalho?" },
  // Apoio social de colegas
  { id: 23, dimension: "Apoio social de colegas", scale: "frequencia", text: "Com que frequência tem ajuda e apoio dos seus colegas de trabalho?" },
  // Apoio social de superiores
  { id: 24, dimension: "Apoio social de superiores", scale: "frequencia", text: "Com que frequência o seu superior imediato fala consigo sobre como está a decorrer o seu trabalho?" },
  // Comunidade social
  { id: 25, dimension: "Comunidade social no trabalho", scale: "frequencia", text: "Existe um bom ambiente entre si e os seus colegas de trabalho?" },
  { id: 26, dimension: "Comunidade social no trabalho", scale: "frequencia", text: "Existe uma boa cooperação entre os colegas de trabalho?" },
  // Insegurança laboral
  { id: 27, dimension: "Insegurança laboral", scale: "intensidade", text: "Em que medida está preocupado(a) em ficar desempregado(a)?" },
  { id: 28, dimension: "Insegurança laboral", scale: "intensidade", text: "Em que medida está preocupado(a) com a possibilidade de ser transferido(a) para outro local de trabalho contra a sua vontade?" },
  // Satisfação no trabalho
  { id: 29, dimension: "Satisfação no trabalho", scale: "intensidade", text: "Em relação ao seu trabalho em geral, quão satisfeito(a) está com as suas perspectivas de trabalho?" },
  { id: 30, dimension: "Satisfação no trabalho", scale: "intensidade", text: "Em relação ao seu trabalho em geral, quão satisfeito(a) está com o ambiente físico do seu local de trabalho?" },
  // Conflito trabalho-família
  { id: 31, dimension: "Conflito trabalho-família", scale: "frequencia", text: "Sente que o seu trabalho lhe consome tanta energia que afecta negativamente a sua vida privada?" },
  { id: 32, dimension: "Conflito trabalho-família", scale: "frequencia", text: "Sente que o seu trabalho lhe ocupa tanto tempo que afecta negativamente a sua vida privada?" },
  // Confiança
  { id: 33, dimension: "Confiança", scale: "frequencia", text: "A direcção confia que os trabalhadores fazem um bom trabalho?" },
  { id: 34, dimension: "Confiança", scale: "frequencia", text: "Os trabalhadores podem expressar as suas opiniões e sentimentos?" },
  // Justiça e respeito
  { id: 35, dimension: "Justiça e respeito", scale: "frequencia", text: "Os conflitos são resolvidos de forma justa?" },
  { id: 36, dimension: "Justiça e respeito", scale: "frequencia", text: "As sugestões dos trabalhadores são tratadas com seriedade pela direcção?" },
  // Saúde geral
  { id: 37, dimension: "Saúde geral", scale: "intensidade", text: "Em geral, sente que a sua saúde é boa?" },
  // Burnout / stress
  { id: 38, dimension: "Burnout", scale: "frequencia", text: "Com que frequência se sentiu fisicamente exausto(a) nas últimas 4 semanas?" },
  { id: 39, dimension: "Stress", scale: "frequencia", text: "Com que frequência se sentiu stressado(a) nas últimas 4 semanas?" },
  { id: 40, dimension: "Sintomas depressivos", scale: "frequencia", text: "Com que frequência se sentiu triste nas últimas 4 semanas?" },
  // Comportamentos ofensivos
  { id: 41, dimension: "Comportamentos ofensivos", scale: "frequencia", text: "Foi alvo de comportamentos ofensivos, ameaças ou bullying no seu local de trabalho nos últimos 12 meses?" },
];
