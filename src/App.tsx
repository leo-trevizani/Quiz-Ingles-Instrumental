import React, { useState, useMemo } from 'react';
import {
  Globe,
  ShieldCheck,
  Database,
  Briefcase,
  RotateCcw,
  Share2,
  Check,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Info,
  CheckCircle2,
  Home,
  X,
  Sparkles,
  Download,
  Loader2,
  Copy,
  MessageSquare
} from 'lucide-react';

export type Language = 'pt' | 'en';
export type ProfileKey = 'correspondente' | 'checador' | 'bigdata' | 'b2b';

interface Option {
  text: string;
  profile: ProfileKey;
  image?: string;
}

interface Question {
  id: number;
  topic: string;
  question: string;
  options: Option[];
}

const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const PROFILE_IMAGES: Record<ProfileKey, string> = {
  correspondente: getAssetUrl('assets/profiles/Foreign_Correspondent_4e2b453c.jpeg'),
  checador: getAssetUrl('assets/profiles/Fact_Checker_f586ccc1.jpeg'),
  bigdata: getAssetUrl('assets/profiles/Big_Data_Analyst_32e6d8b9.jpeg'),
  b2b: getAssetUrl('assets/profiles/Corporate_PR_d25fa1f9.jpeg')
};

export const JOURNALIST_IMAGES = {
  bianca: getAssetUrl('assets/aistudio/Bianca_Rothier_ca3166b2.png'),
  natuza: getAssetUrl('assets/aistudio/Natuza_Nery_d1edb0ad.png'),
  spagnuolo: getAssetUrl('assets/aistudio/Se_rgio_Spagnuolo_90aec12f.png'),
  flavia: getAssetUrl('assets/aistudio/Fla_via_Oliveira_56bf735a.png')
};

interface ProfileInfo {
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ElementType;
  image: string;
  tagText: string;
  quote: string;
  skills: string[];
}

interface GlossaryEntry {
  term: string;
  meaning: string;
  context: string;
}

const QUESTIONS_DATA: Record<Language, Question[]> = {
  pt: [
    {
      id: 1,
      topic: "Escândalo Global e Redes Sociais",
      question: "Estourou um escândalo no Twitter de proporções globais envolvendo Taylor Swift e um político europeu. Qual é o seu primeiro instinto?",
      options: [
        { text: "Ligar para fontes na Europa para entender o contexto e buscar outras fontes jornalísticas internacionais.", profile: "correspondente" },
        { text: "Analisar os trend topics para entender o que está sendo dito nos principais tweets (quem sabe rodar um script?).", profile: "bigdata" },
        { text: "Checar se não é fake news antes de publicar qualquer coisa (e atualizar a cada 5 segundos o perfil da Taylor).", profile: "checador" },
        { text: "Será que isso vai afetar a próxima turnê dela?.", profile: "b2b" }
      ]
    },
    {
      id: 2,
      topic: "Discurso Corporativo e Relações Públicas",
      question: "Chega na redação um press release gringo de um CEO que anuncia uma 'reestruturação para enxugar a operação'. Qual a sua reação?",
      options: [
        { text: "Transformar isso em um relatório de inteligência de mercado financeiro.", profile: "b2b" },
        { text: "Vou cruzar com os dados financeiros da empresa com os números anunciados.", profile: "bigdata" },
        { text: "Vou traduzir isso para o meu público local mostrando como vai afetar a filial da nossa cidade.", profile: "correspondente" },
        { text: "Mentira descarada com eufemismos! Eles estão demitindo em massa e devendo até a alma.", profile: "checador" }
      ]
    },
    {
      id: 3,
      topic: "Navegador e Rotina de Trabalho",
      question: "O que não pode faltar no seu navegador?",
      options: [
        { text: "Extensão de bloqueador de anúncios", profile: "checador" },
        { text: "Aba com o feed do LinkedIn", profile: "b2b" },
        { text: "Aba com o Duolingo cobrando a ofensiva", profile: "correspondente" },
        { text: "Usar o “Inspecionar Elemento” do Dev Tools", profile: "bigdata" }
      ]
    },
    {
      id: 4,
      topic: "Neutralidade e Falsa Equivalência",
      question: "O editor quer chamar 2 convidados para um painel climático alegando “neutralidade”. Qual é sua principal preocupação?",
      options: [
        { text: "Buscar dados de aquecimento global para alimentar o roteiro dessa conversa", profile: "bigdata" },
        { text: "Checar o histórico dos 2 convidados para entender qual a autoridade deles no assunto", profile: "checador" },
        { text: "Linkar a conversa com os canais de mídia que os convidados já dominam", profile: "b2b" },
        { text: "Entender a influência desses convidados em seus respectivos mercados e regiões (se eles foram de regiões diferentes)", profile: "correspondente" }
      ]
    },
    {
      id: 5,
      topic: "Ícones do Jornalismo Global",
      question: "Qual seu ícone favorito do jornalismo global?",
      options: [
        { text: "Bianca Rothier: Entrando ao vivo direto de Genebra, debaixo de neve.", profile: "correspondente", image: JOURNALIST_IMAGES.bianca },
        { text: "Natuza Nery: Desmentindo fatos ao vivo com dados no ponto eletrônico.", profile: "checador", image: JOURNALIST_IMAGES.natuza },
        { text: "Sérgio Spagnuolo: rodando uma análise de dados para saber como o mercado internacional vai reagir.", profile: "bigdata", image: JOURNALIST_IMAGES.spagnuolo },
        { text: "Flávia Oliveira: Explicando o impacto financeiro e estrutural da crise.", profile: "b2b", image: JOURNALIST_IMAGES.flavia }
      ]
    },
    {
      id: 6,
      topic: "Cinema e Narrativas sobre Comunicação",
      question: "Hora da pipoca. Qual filme/série sobre comunicação mais acelera seu coração?",
      options: [
        { text: "Succession / Mad Men", profile: "b2b" },
        { text: "A Rede Social / O Dilema das Redes", profile: "bigdata" },
        { text: "The Newsroom / Não Olhe Para Cima", profile: "checador" },
        { text: "Guerra Civil / The Post", profile: "correspondente" }
      ]
    },
    {
      id: 7,
      topic: "Desinformação e Redes Familiares",
      question: "Chega no grupo da família uma teoria da conspiração bizarra (com direito a áudio encaminhado com voz de robô). Como você reage?",
      options: [
        { text: "Silencia o grupo. Você já cobre treta e caos o suficiente o dia todo para mediar conflito no almoço de domingo.", profile: "correspondente" },
        { text: "Envia 3 links de agências de checagem, um print grifado e escreve um textão passivo-agressivo desmentindo o áudio.", profile: "checador" },
        { text: "Fica quieto, mas usa o áudio como dado para documentar a propagação de desinformação em redes hiperconectadas.", profile: "bigdata" },
        { text: "Avalia a possibilidade de debater com a pessoa, o retorno emocional e político dessa atitude, correndo o risco de apenas reagir com um emoji.", profile: "b2b" }
      ]
    },
    {
      id: 8,
      topic: "Estrutura do Texto e Pirâmide Invertida",
      question: "Um colega entrega um texto sobre um desastre com excesso de adjetivos, narrativa enrolada e voz passiva. O que você sugere ao seu colega?",
      options: [
        { text: "Transformar as informações mais importantes em um gráfico interativo ou informação visual para facilitar o entendimento.", profile: "bigdata" },
        { text: "Tirar os eufemismos e a enrolação. Focar em fatos verificados e sem enfeitar o desastre para diminuir o impacto da realidade.", profile: "checador" },
        { text: "Mostrar em vez de contar: cortar os adjetivos, priorizar verbos de ação e inverter a pirâmide para o público entender de cara.", profile: "correspondente" },
        { text: "Focar no frame de \"Consequências Econômicas\" na matéria, para ela ser mais factual explicando como o mercado e a sociedade serão afetados.", profile: "b2b" }
      ]
    },
    {
      id: 9,
      topic: "Cultura de Redação e Press Kits",
      question: "Chega comida de graça na copa da redação do jornal como parte de um press kit enviado. O que você faz?",
      options: [
        { text: "Passa correndo na copa, joga dois salgados na mochila e volta ao trabalho, porque sua pauta não espera ninguém.", profile: "correspondente" },
        { text: "Checa qual a empresa que enviou o press kit para pesquisar as últimas notícias relacionadas à marca e desconfia que pode ter algo por trás.", profile: "checador" },
        { text: "Calcula o melhor momento de passar na copa considerando seu próprio horário de almoço, as pautas que precisam entregar, e o horário dos demais colegas.", profile: "bigdata" },
        { text: "Checa qual a empresa que enviou o press kit para conhecer mais sobre a marca e entender se esse envio de press kit tem a ver com alguma ação recente.", profile: "b2b" }
      ]
    },
    {
      id: 10,
      topic: "Enquadramentos Noticiosos e Abordagens",
      question: "Ao noticiar a aprovação de uma nova legislação relevante, qual ângulo da cobertura você prioriza naturalmente?",
      options: [
        { text: "Contradições e conflitos: confrontar as declarações dos parlamentares com a realidade factual do texto legal.", profile: "checador" },
        { text: "Atribuição de responsabilidade: mapear grandes séries históricas para demonstrar numericamente quem causou o problema.", profile: "bigdata" },
        { text: "Interesse humano: relatar casos reais e histórias de vida impactadas pela medida, com linguagem viva e visual.", profile: "correspondente" },
        { text: "Consequências econômicas: analisar custos, tributos, perdas e ganhos para o setor produtivo e financeiro.", profile: "b2b" }
      ]
    }
  ],
  en: [
    {
      id: 1,
      topic: "Global Scandal & Social Media",
      question: "A global Twitter scandal erupts involving Taylor Swift and a European politician. What is your first instinct?",
      options: [
        { text: "Call sources in Europe to understand the context and search for other international news outlets.", profile: "correspondente" },
        { text: "Analyze the trending topics to see what the top tweets are saying (maybe even run a script?).", profile: "bigdata" },
        { text: "Check if it isn't fake news before publishing anything (and refresh Taylor's profile every 5 seconds).", profile: "checador" },
        { text: "Will this affect her upcoming tour?.", profile: "b2b" }
      ]
    },
    {
      id: 2,
      topic: "Corporate Speak & PR Spin",
      question: "A foreign press release arrives in the newsroom from a CEO announcing a 'restructuring to streamline operations'. What is your reaction?",
      options: [
        { text: "Turn this into a financial market intelligence briefing.", profile: "b2b" },
        { text: "Cross-reference the company's financial data with the announced figures.", profile: "bigdata" },
        { text: "Translate this for my local audience showing how it will affect our city's branch.", profile: "correspondente" },
        { text: "Blatant lie wrapped in euphemisms! They are conducting mass layoffs and are drowning in debt.", profile: "checador" }
      ]
    },
    {
      id: 3,
      topic: "Browser Essentials & Newsroom Habits",
      question: "What must always be open in your browser?",
      options: [
        { text: "An ad blocker extension", profile: "checador" },
        { text: "A tab with your LinkedIn feed", profile: "b2b" },
        { text: "A tab with Duolingo demanding you keep your streak", profile: "correspondente" },
        { text: "Using 'Inspect Element' in DevTools", profile: "bigdata" }
      ]
    },
    {
      id: 4,
      topic: "Neutrality & False Balance",
      question: "The editor wants to invite 2 guests to a climate panel claiming 'neutrality'. What is your primary concern?",
      options: [
        { text: "Search for global warming data to fuel the discussion outline", profile: "bigdata" },
        { text: "Check the background of both guests to understand their authority on the topic", profile: "checador" },
        { text: "Link the discussion to the media channels the guests already dominate", profile: "b2b" },
        { text: "Understand the influence of these guests in their respective markets and regions (if they are from different regions)", profile: "correspondente" }
      ]
    },
    {
      id: 5,
      topic: "Global Journalism Icons",
      question: "Who is your favorite global journalism icon?",
      options: [
        { text: "Bianca Rothier: Going live directly from Geneva, in the freezing snow.", profile: "correspondente", image: JOURNALIST_IMAGES.bianca },
        { text: "Natuza Nery: Fact-checking claims live on air with verified data in her earpiece.", profile: "checador", image: JOURNALIST_IMAGES.natuza },
        { text: "Sérgio Spagnuolo: Running data analysis to see how international markets will react.", profile: "bigdata", image: JOURNALIST_IMAGES.spagnuolo },
        { text: "Flávia Oliveira: Explaining the financial and structural impact of the crisis.", profile: "b2b", image: JOURNALIST_IMAGES.flavia }
      ]
    },
    {
      id: 6,
      topic: "Cinema & Media Narratives",
      question: "Popcorn time! Which film or TV series about media gets your heart racing?",
      options: [
        { text: "Succession / Mad Men", profile: "b2b" },
        { text: "The Social Network / The Social Dilemma", profile: "bigdata" },
        { text: "The Newsroom / Don't Look Up", profile: "checador" },
        { text: "Civil War / The Post", profile: "correspondente" }
      ]
    },
    {
      id: 7,
      topic: "Disinformation & Family Chat Groups",
      question: "A bizarre conspiracy theory arrives in the family chat group (complete with a forwarded audio in a robot voice). How do you react?",
      options: [
        { text: "Mute the group. You already cover enough conflict and chaos all day to mediate arguments at Sunday lunch.", profile: "correspondente" },
        { text: "Send 3 links from fact-checking agencies, a highlighted screenshot, and write a passive-aggressive essay debunking the audio.", profile: "checador" },
        { text: "Stay quiet, but use the audio as raw data to document the spread of disinformation in hyperconnected networks.", profile: "bigdata" },
        { text: "Weigh whether it's worth arguing, the emotional and political return of engaging, and risk simply replying with an emoji.", profile: "b2b" }
      ]
    },
    {
      id: 8,
      topic: "Textual Structure & Inverted Pyramid",
      question: "A colleague submits a story about a disaster loaded with excessive adjectives, meandering prose, and passive voice. What do you suggest to them?",
      options: [
        { text: "Transform the most crucial information into an interactive graphic or visual data to make it easier to understand.", profile: "bigdata" },
        { text: "Strip away euphemisms and stalling. Focus on verified facts without sugarcoating the disaster to diminish reality's impact.", profile: "checador" },
        { text: "Show, don't tell: cut the adjectives, prioritize action verbs, and invert the pyramid so readers grasp it immediately.", profile: "correspondente" },
        { text: "Focus on the 'Economic Consequences' frame to make the story more factual, explaining how markets and society will be affected.", profile: "b2b" }
      ]
    },
    {
      id: 9,
      topic: "Newsroom Culture & Press Kits",
      question: "Free food arrives in the newsroom pantry as part of a promotional press kit. What do you do?",
      options: [
        { text: "Sprint through the pantry, stuff two snacks into your backpack, and dash back to work because your beat waits for no one.", profile: "correspondente" },
        { text: "Check which company sent the press kit to investigate recent news about the brand, suspecting there might be hidden motives.", profile: "checador" },
        { text: "Calculate the optimal time to visit the pantry, factoring in your own lunch break, pending deadlines, and colleagues' schedules.", profile: "bigdata" },
        { text: "Check which company sent the press kit to learn more about the brand and analyze whether this gift ties into any recent corporate campaign.", profile: "b2b" }
      ]
    },
    {
      id: 10,
      topic: "News Framing & Story Angles",
      question: "When covering the passage of significant new legislation, which angle do you naturally prioritize?",
      options: [
        { text: "Conflict and contradictions: confronting lawmakers' statements with the factual reality of the legal text.", profile: "checador" },
        { text: "Attribution of responsibility: mapping historical time-series data to demonstrate numerically who caused the issue.", profile: "bigdata" },
        { text: "Human interest: telling compelling stories of real people whose lives are impacted, using vivid and visual storytelling.", profile: "correspondente" },
        { text: "Economic consequences: analyzing costs, taxes, gains, and losses for businesses and financial markets.", profile: "b2b" }
      ]
    }
  ]
};

const PROFILES_DATA: Record<Language, Record<ProfileKey, ProfileInfo>> = {
  pt: {
    correspondente: {
      title: "Correspondente Internacional",
      subtitle: "Cobertura Global e Reportagem Cultural",
      desc: "Você é movido pela apuração de campo, pela cultura e pelos fatos em tempo real. Domina a técnica da pirâmide invertida e sabe que no jornalismo direto 'menos é mais'. Falsos cognatos e armadilhas de linguagem não enganam você, pois compreende a comunicação como uma ferramenta viva de conexão cultural. Seu passaporte está em dia?",
      icon: Globe,
      image: PROFILE_IMAGES.correspondente,
      tagText: "Mundo e Sociedade",
      quote: "“Mostre os fatos em vez de usar adjetivos. Na pirâmide invertida, quem enrola perde o leitor.”",
      skills: ["Domínio da Pirâmide Invertida", "Comunicação Internacional Direta", "Frame de Interesse Humano", "Precisão sem Falsos Cognatos"]
    },
    checador: {
      title: "Especialista em Checar Fatos",
      subtitle: "Mestre em Verificação e Ética Jornalística",
      desc: "Nada escapa do seu olhar crítico. Você segue a regra de ouro da verificação: se alguém diz que chove e outro diz que está seco, o seu trabalho é abrir a janela e checar. Você combate a falsa equivalência e a falsa neutralidade com firmeza. Sabe lidar com apurações sigilosas e desmascara manobras de comunicação institucional com facilidade.",
      icon: ShieldCheck,
      image: PROFILE_IMAGES.checador,
      tagText: "Ética e Verificação",
      quote: "“Se um lado afirma que chove e o outro diz que está seco, seu trabalho é abrir a janela antes de publicar.”",
      skills: ["Combate à Falsa Equivalência", "Apuração Rigorosa de Fontes", "Dupla Checagem Factual", "Desmonte de Discursos Institucionais"]
    },
    bigdata: {
      title: "Jornalista de Dados",
      subtitle: "Investigação Quantitativa e Computacional",
      desc: "Para você, relatos podem ser tendenciosos, mas os números revelam a verdade quando bem tratados. Você não depende de comunicados prontos: extrai e cruza bases estatísticas completas. Suas planilhas, códigos de automação e infográficos encontram padrões onde a maioria só enxerga confusão. Informação estruturada é o seu maior trunfo.",
      icon: Database,
      image: PROFILE_IMAGES.bigdata,
      tagText: "Estatística e Análise",
      quote: "“Em Deus nós confiamos. Para todos os outros casos, tragam dados e planilhas consistentes.”",
      skills: ["Extração Automatizada de Dados", "Infografia e Visualização", "Mapeamento de Responsabilidade", "Evidência Empírica"]
    },
    b2b: {
      title: "Chefe de Estratégia Corporativa",
      subtitle: "Inteligência de Mercado e Análise de Negócios",
      desc: "Você compreende perfeitamente o tabuleiro dos grandes negócios. É especialista em traduzir o jargão corporativo e os eufemismos de relações públicas em diagnósticos transparentes para investidores e tomadores de decisão. Sabe analisar custos, prever impactos econômicos e dialogar com clareza com o mercado.",
      icon: Briefcase,
      image: PROFILE_IMAGES.b2b,
      tagText: "Estratégia e Mercado",
      quote: "“Eufemismo empresarial é uma oportunidade para quem sabe decifrar as entrelinhas do mercado.”",
      skills: ["Decodificação de Jargões", "Análise de Consequências Econômicas", "Comunicação com Investidores", "Diagnóstico de Tendências"]
    }
  },
  en: {
    correspondente: {
      title: "Foreign Correspondent",
      subtitle: "Global Beat & Cultural Reporting",
      desc: "You thrive on field reporting, cultural immersion, and real-time storytelling. You command the inverted pyramid and understand that direct journalism values clarity over fluff. False cognates never mislead you, because you treat language as a living medium of global connection. Is your passport ready?",
      icon: Globe,
      image: PROFILE_IMAGES.correspondente,
      tagText: "World & Culture",
      quote: "“Show the facts instead of using adjectives. In the inverted pyramid, burying the lead loses the audience.”",
      skills: ["Inverted Pyramid Mastery", "Direct Global Communication", "Human Interest Framing", "Semantic Accuracy"]
    },
    checador: {
      title: "Fact-Checking Specialist",
      subtitle: "Master in Verification & Media Ethics",
      desc: "Nothing slips past your scrutiny. You live by the golden rule of investigative reporting: if someone says it is raining and another says it is dry, your duty is to open the window and verify. You challenge false balance and performative neutrality head-on, handle confidential sourcing with rigor, and dismantle corporate spin.",
      icon: ShieldCheck,
      image: PROFILE_IMAGES.checador,
      tagText: "Truth & Ethics",
      quote: "“If one side says it is raining and the other says it is dry, your job is to open the window before publishing.”",
      skills: ["Challenging False Balance", "Rigorous Sourcing Protocols", "Double-Check Verification", "Debunking PR Spin"]
    },
    bigdata: {
      title: "Data Journalist",
      subtitle: "Quantitative & Computational Investigation",
      desc: "To you, opinions can deceive, but clean numbers reveal reality. You do not wait for official handouts: you scrape, sanitize, and correlate vast datasets. Your spreadsheets, automated scripts, and interactive graphics locate actionable patterns where others see only noise. Structured data is your greatest edge.",
      icon: Database,
      image: PROFILE_IMAGES.bigdata,
      tagText: "Algorithms & Analytics",
      quote: "“In God we trust. For all other cases, bring consistent datasets and spreadsheets.”",
      skills: ["Automated Data Scraping", "Infographics & Visualization", "Attribution of Responsibility", "Empirical Evidence"]
    },
    b2b: {
      title: "Corporate Strategy Lead",
      subtitle: "Market Intelligence & Business Analysis",
      desc: "You master the chess game of global commerce. You excel at translating corporate speak and public relations euphemisms into transparent market intelligence for decision-makers. You quantify fiscal consequences, anticipate regulatory shifts, and articulate clear insights for executive stakeholders.",
      icon: Briefcase,
      image: PROFILE_IMAGES.b2b,
      tagText: "Strategy & Markets",
      quote: "“Corporate euphemisms are opportunities for those who know how to read between the lines.”",
      skills: ["Corporate Speak Decoding", "Economic Consequences Framing", "Stakeholder Briefings", "Market Trend Forecasting"]
    }
  }
};

const GLOSSARY_DATA: Record<Language, GlossaryEntry[]> = {
  pt: [
    {
      term: "Falsos Cognatos (Palavras Ilusórias)",
      meaning: "Palavras que se parecem na escrita com termos em português, mas possuem significado distinto. Exemplos: 'realize' significa perceber ou dar-se conta (e não realizar), 'comprehensive' quer dizer abrangente ou amplo (e não compreensivo), e 'policy' refere-se a políticas públicas ou diretrizes (e não à corporação policial).",
      context: "Fundamental no jornalismo internacional para não publicar distorções graves em despachos e reportagens estrangeiras."
    },
    {
      term: "Pirâmide Invertida",
      meaning: "A estrutura clássica de redação da notícia: as informações mais cruciais (quem, o que, quando, onde, por que e como) abrem o texto logo no primeiro parágrafo (lide), seguidas por detalhes e contexto em ordem decrescente de relevância.",
      context: "Garante clareza imediata, dinamismo de leitura e facilita cortes na diagramação sem prejudicar o entendimento."
    },
    {
      term: "Falsa Equivalência e Falsa Neutralidade",
      meaning: "O equívoco ético de dar o mesmo peso e espaço a consensos científicos comprovados e a discursos sem respaldo empírico sob o argumento de ser neutro. Conforme resumiu o jornalista Jonathan Foster: se um lado afirma que chove e outro diz que faz sol, o papel da imprensa é olhar pela janela e apurar.",
      context: "Pilar ético moderno indispensável no combate à desinformação."
    },
    {
      term: "Discurso Corporativo e Eufemismos de Relações Públicas",
      meaning: "Linguagem corporativa desenhada para atenuar o impacto de más notícias. Por exemplo: termos que anunciam 'reestruturações de processos' para encobrir demissões coletivas, ou 'dívidas estratégicas' para suavizar crises de insolvência.",
      context: "O jornalista econômico traduz essas cortinas de fumaça em números objetivos para a sociedade e investidores."
    },
    {
      term: "Regras de Apuração e Sigilo de Fontes",
      meaning: "Níveis de compromisso na apuração internacional: declaração oficial identificada (nome e cargo públicos); informação com descrição genérica (fonte protegida citada de forma anônima); e sigilo total da informação (utilizada apenas como bússola investigativa, sem citação ou atribuição direta).",
      context: "Prática indispensável para segurança de fontes e rigor na checagem de fatos."
    },
    {
      term: "Enquadramentos Noticiosos",
      meaning: "Modelo analítico que sistematiza as perspectivas narrativas da cobertura da imprensa: consequências econômicas, interesse humano, conflito, moralidade e atribuição de responsabilidade.",
      context: "Auxilia na leitura crítica da intenção editorial e na compreensão de como o público interpreta os acontecimentos."
    }
  ],
  en: [
    {
      term: "False Friends (Deceptive Cognates)",
      meaning: "Words in different languages that look or sound similar but carry different meanings. For instance: 'realize' means to become aware of (not to perform), 'comprehensive' means thorough or wide-ranging (not sympathetic), and 'policy' refers to public guidelines or rules (not the police force).",
      context: "Crucial in international reporting to prevent misinterpretations and translation errors in breaking news."
    },
    {
      term: "Inverted Pyramid",
      meaning: "The foundational journalistic storytelling framework: the most essential information (Who, What, When, Where, Why, How) leads the article in the opening paragraph (the lead), followed by supporting details in descending order of significance.",
      context: "Ensures immediate narrative clarity and allows seamless editing without losing core facts."
    },
    {
      term: "False Balance & Mechanical Neutrality",
      meaning: "The editorial failure of giving equal weight to scientific consensus and groundless misinformation in the name of balance. As Jonathan Foster famously framed it: if one party says it is raining and another says it is dry, the journalist's job is to open the window and verify.",
      context: "A central ethical standard in modern fact-checking and newsroom integrity."
    },
    {
      term: "Corporate Speak & PR Spin",
      meaning: "Carefully calibrated institutional euphemisms designed to soften negative headlines. For example: using 'streamlining operations' to disguise mass layoffs, or 'strategic debt' to mask balance sheet distress.",
      context: "Business journalists decode these smoke screens into accurate, quantifiable financial reporting."
    },
    {
      term: "Sourcing Rules & Attribution Levels",
      meaning: "Standard international reporting protocols: On the Record (name and title published); On Background (information attributed to a generic descriptor); and Deep Background (information used strictly to guide reporting with zero attribution or quoting).",
      context: "Essential tradecraft for whistleblower protection and uncompromising verification."
    },
    {
      term: "News Frames (Semetko & Valkenburg)",
      meaning: "A classic communication framework categorizing how stories are framed: Economic Consequences, Human Interest, Conflict, Morality, and Attribution of Responsibility.",
      context: "Key to evaluating editorial intent and understanding how audiences process major public affairs."
    }
  ]
};

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let curY = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
  return curY + lineHeight;
}

async function loadImage(src: string): Promise<HTMLImageElement | null> {
  // Strategy 1: Fetch as blob to guarantee non-tainted canvas on GitHub Pages
  try {
    const res = await fetch(src);
    if (res.ok) {
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      return await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(null);
        };
        img.src = objectUrl;
      });
    }
  } catch (err) {
    console.warn('Blob fetch failed, falling back to direct load', err);
  }

  // Strategy 2: Pre-rendered DOM element
  try {
    const domImg = document.getElementById('winner-profile-img') as HTMLImageElement | null;
    if (domImg && domImg.complete && domImg.naturalWidth > 0) {
      return domImg;
    }
  } catch {
    // proceed to strategy 3
  }

  // Strategy 3: Standard Image loading
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawQuoteText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  boxY: number,
  boxH: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = currentLine ? `${currentLine} ${words[n]}` : words[n];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      lines.push(currentLine);
      currentLine = words[n];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  const totalTextHeight = lines.length * lineHeight;
  const startY = boxY + (boxH - totalTextHeight) / 2 + lineHeight * 0.74;

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, startY + i * lineHeight);
  }
}

async function createResultCardBlob(
  winningProfileData: ProfileInfo,
  _scoreSummary: { counts: Record<ProfileKey, number>; percentages: Record<ProfileKey, number>; winningProfile: ProfileKey },
  _profiles: Record<ProfileKey, ProfileInfo>,
  lang: Language
): Promise<Blob | null> {
  // Preload Instrument Sans web font to ensure canvas doesn't render fallback Arial
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await Promise.all([
        document.fonts.load('bold 60px "Instrument Sans"'),
        document.fonts.load('bold 54px "Instrument Sans"'),
        document.fonts.load('600 20px "Instrument Sans"'),
        document.fonts.load('italic 27px "Instrument Sans"'),
        document.fonts.load('600 22px "Instrument Sans"'),
        document.fonts.load('bold 18px "Instrument Sans"'),
        document.fonts.load('bold 16px "Instrument Sans"'),
        document.fonts.load('500 18px "Instrument Sans"'),
        document.fonts.ready
      ]);
    } catch (fontErr) {
      console.warn('Font preload check failed', fontErr);
    }
  }

  // Preload profile image
  const profileImg = await loadImage(winningProfileData.image);

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(null);
      return;
    }

    // 1. Overall Background (Soft mint tone from reference)
    ctx.fillStyle = '#EFF9F3';
    ctx.fillRect(0, 0, 1080, 1350);

    // 2. White Card Container with subtle ambient floating shadow
    const cardX = 50;
    const cardY = 42;
    const cardW = 980;
    const cardH = 1266;
    const cardR = 42;

    ctx.save();
    ctx.shadowColor = 'rgba(25, 45, 30, 0.08)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 12;
    drawRoundRect(ctx, cardX, cardY, cardW, cardH, cardR);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    drawRoundRect(ctx, cardX, cardY, cardW, cardH, cardR);
    ctx.strokeStyle = '#D6EEDD';
    ctx.lineWidth = 2;
    ctx.stroke();

    const contentX = 96;
    const contentW = 888;

    // 3. Header Top Pill: • TESTE DE PERSONALIDADE (scaled up to 16px)
    const pillText = lang === 'pt' ? 'TESTE DE PERSONALIDADE' : 'PERSONALITY TEST';
    ctx.font = 'bold 16px "Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const pillTextWidth = ctx.measureText(pillText).width;
    const pillWidth = pillTextWidth + 52;
    const pillHeight = 44;
    const pillY = 82;

    drawRoundRect(ctx, contentX, pillY, pillWidth, pillHeight, 22);
    ctx.fillStyle = '#F0FAF3';
    ctx.fill();
    ctx.strokeStyle = '#D6EEDD';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Green dot inside pill
    ctx.beginPath();
    ctx.arc(contentX + 18, pillY + 22, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = '#34A853';
    ctx.fill();

    // Pill text
    ctx.fillStyle = '#202923';
    ctx.fillText(pillText, contentX + 34, pillY + 28);

    // 4. Profile 3D Illustration Container (contentW x 420)
    const imgX = contentX;
    const imgY = 142;
    const imgW = contentW;
    const imgH = 420;

    drawRoundRect(ctx, imgX, imgY, imgW, imgH, 26);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#E2F1E6';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (profileImg) {
      ctx.save();
      drawRoundRect(ctx, imgX, imgY, imgW, imgH, 26);
      ctx.clip();

      const imgAspect = profileImg.width / profileImg.height;
      const targetAspect = imgW / imgH;
      let sx = 0, sy = 0, sw = profileImg.width, sh = profileImg.height;

      if (imgAspect > targetAspect) {
        sw = profileImg.height * targetAspect;
        sx = (profileImg.width - sw) / 2;
      } else {
        sh = profileImg.width / targetAspect;
        sy = (profileImg.height - sh) / 2;
      }

      ctx.drawImage(profileImg, sx, sy, sw, sh, imgX, imgY, imgW, imgH);
      ctx.restore();

      // Border outline
      drawRoundRect(ctx, imgX, imgY, imgW, imgH, 26);
      ctx.strokeStyle = '#E2F1E6';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 5. Dominant Profile Title & Subtitle (Scaled up to 60px with auto-fit)
    const titleY = 636;
    let titleFontSize = 60;
    ctx.font = `bold ${titleFontSize}px "Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    while (ctx.measureText(winningProfileData.title).width > contentW && titleFontSize > 44) {
      titleFontSize -= 2;
      ctx.font = `bold ${titleFontSize}px "Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    }
    ctx.fillStyle = '#0D0D0D';
    ctx.fillText(winningProfileData.title, contentX, titleY);

    const subtitleY = 684;
    ctx.fillStyle = '#738279';
    ctx.font = '600 20px "Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(winningProfileData.subtitle.toUpperCase(), contentX, subtitleY);

    // 6. Quote Statement Box (Spacious, scaled up to 27px italic, vertically centered)
    const quoteY = 724;
    const quoteH = 134;
    drawRoundRect(ctx, contentX, quoteY, contentW, quoteH, 18);
    ctx.fillStyle = '#F2FAF5';
    ctx.fill();
    ctx.strokeStyle = '#D6EEDD';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Left green accent border
    drawRoundRect(ctx, contentX, quoteY, 10, quoteH, 5);
    ctx.fillStyle = '#34A853';
    ctx.fill();

    // Quote text (scaled to 27px)
    ctx.fillStyle = '#202923';
    ctx.font = 'italic 27px "Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    drawQuoteText(ctx, winningProfileData.quote, contentX + 32, quoteY, quoteH, contentW - 54, 42);

    // 7. Highlighted Competencies Section Header (scaled to 18px)
    const compY = 896;
    ctx.fillStyle = '#738279';
    ctx.font = 'bold 18px "Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(lang === 'pt' ? 'COMPETÊNCIAS EM DESTAQUE:' : 'HIGHLIGHTED COMPETENCIES:', contentX, compY);

    // 8. 4 Skill Pills (Organized into 2 rows of 2 pills with soft mint background & scaled up 22px font)
    const skills = winningProfileData.skills || [];
    const pillH = 66;
    const pillRadius = 33;
    const pillGap = 18;
    const pillColW = (contentW - pillGap) / 2;

    const row1Y = 924;
    const row2Y = 1004;

    ctx.font = '600 22px "Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';

    // Skill 1 (Row 1, Col 1)
    if (skills[0]) {
      drawRoundRect(ctx, contentX, row1Y, pillColW, pillH, pillRadius);
      ctx.fillStyle = '#F2FAF5';
      ctx.fill();
      ctx.strokeStyle = '#D6EEDD';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#1D2620';
      ctx.fillText(skills[0], contentX + pillColW / 2, row1Y + 41);
    }

    // Skill 2 (Row 1, Col 2)
    if (skills[1]) {
      const col2X = contentX + pillColW + pillGap;
      drawRoundRect(ctx, col2X, row1Y, pillColW, pillH, pillRadius);
      ctx.fillStyle = '#F2FAF5';
      ctx.fill();
      ctx.strokeStyle = '#D6EEDD';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#1D2620';
      ctx.fillText(skills[1], col2X + pillColW / 2, row1Y + 41);
    }

    // Skill 3 (Row 2, Col 1)
    if (skills[2]) {
      drawRoundRect(ctx, contentX, row2Y, pillColW, pillH, pillRadius);
      ctx.fillStyle = '#F2FAF5';
      ctx.fill();
      ctx.strokeStyle = '#D6EEDD';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#1D2620';
      ctx.fillText(skills[2], contentX + pillColW / 2, row2Y + 41);
    }

    // Skill 4 (Row 2, Col 2)
    if (skills[3]) {
      const col2X = contentX + pillColW + pillGap;
      drawRoundRect(ctx, col2X, row2Y, pillColW, pillH, pillRadius);
      ctx.fillStyle = '#F2FAF5';
      ctx.fill();
      ctx.strokeStyle = '#D6EEDD';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#1D2620';
      ctx.fillText(skills[3], col2X + pillColW / 2, row2Y + 41);
    }

    // 9. Card Footer (Scaled up to 18px, centered at bottom)
    const footerY = 1242;
    ctx.fillStyle = '#738279';
    ctx.font = '500 18px "Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(
      lang === 'pt'
        ? '© 2026 Leo Trevizani • Inglês Instrumental aplicado ao Jornalismo'
        : '© 2026 Leo Trevizani • Instrumental English applied to Journalism',
      540,
      footerY
    );

    ctx.textAlign = 'start'; // reset

    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/png');
  });
}

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [screen, setScreen] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<ProfileKey[]>([]);
  const [shuffledOptionsOrder, setShuffledOptionsOrder] = useState<number[][]>([]);
  const [copied, setCopied] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [selectedGlossary, setSelectedGlossary] = useState<number | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [selectedFeedbackIndex, setSelectedFeedbackIndex] = useState<number | null>(null);
  const [showAffinityAccordion, setShowAffinityAccordion] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const questions = QUESTIONS_DATA[lang];
  const profiles = PROFILES_DATA[lang];
  const glossaryItems = GLOSSARY_DATA[lang];

  const handleStartQuiz = () => {
    const orders = questions.map(q => {
      const idxs = q.options.map((_, i) => i);
      return shuffle(idxs);
    });
    setShuffledOptionsOrder(orders);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setSelectedFeedbackIndex(null);
    setShowAffinityAccordion(false);
    setScreen('quiz');
  };

  const handleGoHomeClick = () => {
    if (screen === 'quiz' && userAnswers.length > 0) {
      setShowExitConfirm(true);
    } else {
      setScreen('start');
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setSelectedFeedbackIndex(null);
    }
  };

  const handleConfirmExit = () => {
    setShowExitConfirm(false);
    setScreen('start');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedFeedbackIndex(null);
  };

  const handleSelectOption = (profile: ProfileKey, optIndex: number) => {
    if (selectedFeedbackIndex !== null) return; // Prevent double taps during animation
    setSelectedFeedbackIndex(optIndex);

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = profile;
    setUserAnswers(updatedAnswers);

    // Haptic transition delay
    setTimeout(() => {
      setSelectedFeedbackIndex(null);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setScreen('result');
      }
    }, 220);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setSelectedFeedbackIndex(null);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    handleStartQuiz();
  };

  const toggleLanguage = (newLang: Language) => {
    if (newLang === lang) return;
    setLang(newLang);
  };

  const scoreSummary = useMemo(() => {
    const counts: Record<ProfileKey, number> = {
      correspondente: 0,
      checador: 0,
      bigdata: 0,
      b2b: 0
    };

    userAnswers.forEach(profile => {
      if (profile && counts[profile] !== undefined) {
        counts[profile]++;
      }
    });

    const total = userAnswers.length || 1;
    let winningProfile: ProfileKey = 'correspondente';
    let maxScore = -1;

    (Object.keys(counts) as ProfileKey[]).forEach(key => {
      if (counts[key] > maxScore) {
        maxScore = counts[key];
        winningProfile = key;
      }
    });

    const percentages: Record<ProfileKey, number> = {
      correspondente: Math.round((counts.correspondente / total) * 100),
      checador: Math.round((counts.checador / total) * 100),
      bigdata: Math.round((counts.bigdata / total) * 100),
      b2b: Math.round((counts.b2b / total) * 100)
    };

    return { counts, percentages, winningProfile, total };
  }, [userAnswers]);

  const winningProfileData = profiles[scoreSummary.winningProfile];

  const currentQ = questions[currentQuestionIndex] || questions[0];
  const currentOptionIndices = shuffledOptionsOrder[currentQuestionIndex] || currentQ.options.map((_, i) => i);
  const currentOptions = currentOptionIndices.map(i => currentQ.options[i]);

  const totalQuestionsCount = questions.length;
  const progressPercent = Math.min(
    100,
    Math.round(((currentQuestionIndex + 1) / totalQuestionsCount) * 100)
  );

  const handleShareResultAsImage = async (mode: 'share' | 'download' | 'copy' = 'share') => {
    if (isGeneratingImage) return;
    setIsGeneratingImage(true);
    setShareToast(null);

    try {
      const blob = await createResultCardBlob(winningProfileData, scoreSummary, profiles, lang);
      if (!blob) throw new Error("Could not generate image");

      const fileName = lang === 'pt' ? 'meu-papel-no-jornalismo.png' : 'my-journalism-role.png';
      const file = new File([blob], fileName, { type: 'image/png' });

      const triggerDownload = () => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 4000);
      };

      const shareTitle = lang === 'pt'
        ? `Quiz de Inglês Instrumental: Meu perfil é ${winningProfileData.title}`
        : `Instrumental English Quiz: My role is ${winningProfileData.title}`;
      const shareText = lang === 'pt'
        ? `Fiz o quiz de personalidade de Inglês Instrumental do Prof. Leo Trevizani e meu perfil dominante foi ${winningProfileData.title}. Confira e acesse: leo-trevizani.github.io/Quiz-Ingles-Instrumental`
        : `I took the Instrumental English personality quiz by Prof. Leo Trevizani and my dominant profile was ${winningProfileData.title}. Check it out at: leo-trevizani.github.io/Quiz-Ingles-Instrumental`;

      if (mode === 'download') {
        triggerDownload();
        setShareToast(lang === 'pt' ? 'Imagem baixada no seu dispositivo!' : 'Image downloaded to your device!');
        return;
      }

      if (mode === 'copy') {
        let copied = false;
        if (navigator.clipboard && window.ClipboardItem) {
          try {
            // Provide BOTH image and accompanying text in the clipboard item
            const textBlob = new Blob([shareText], { type: 'text/plain' });
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob,
                'text/plain': textBlob
              })
            ]);
            copied = true;
          } catch (clipErr) {
            console.warn('Multi-MIME clipboard write failed, trying image-only fallback', clipErr);
            try {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ]);
              copied = true;
            } catch (fallbackErr) {
              console.warn('Clipboard write fallback error', fallbackErr);
            }
          }
        }

        if (copied) {
          setShareToast(
            lang === 'pt'
              ? '✓ Imagem e mensagem copiadas! Cole no WhatsApp (Ctrl+V) — o card e o texto irão juntos.'
              : '✓ Image and message copied! Paste into WhatsApp (Ctrl+V) — the card and text will go together.'
          );
        } else {
          triggerDownload();
          setShareToast(
            lang === 'pt'
              ? 'Imagem baixada! No seu dispositivo, selecione a imagem salva para colar/enviar no WhatsApp.'
              : 'Image downloaded! On your device, attach the downloaded image in WhatsApp.'
          );
        }
        return;
      }

      // mode === 'share'
      // Try to also copy to clipboard in parallel with both image and text
      if (navigator.clipboard && window.ClipboardItem) {
        const textBlob = new Blob([shareText], { type: 'text/plain' });
        navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
            'text/plain': textBlob
          })
        ]).catch(() => {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]).catch(() => {});
        });
      }

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: shareTitle,
          text: shareText
        });
        setShareToast(lang === 'pt' ? 'Card compartilhado com sucesso!' : 'Card shared successfully!');
      } else {
        triggerDownload();
        setShareToast(
          lang === 'pt'
            ? '✓ Imagem copiada e baixada! Pronta para colar no WhatsApp ou postar no Instagram.'
            : '✓ Image copied and downloaded! Ready to paste into WhatsApp or share on Instagram.'
        );
      }
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        try {
          const blob = await createResultCardBlob(winningProfileData, scoreSummary, profiles, lang);
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = lang === 'pt' ? 'meu-papel-no-jornalismo.png' : 'my-journalism-role.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 4000);
            setShareToast(
              lang === 'pt'
                ? 'Imagem baixada no seu celular!'
                : 'Image downloaded to your device!'
            );
          }
        } catch {
          setShareToast(lang === 'pt' ? 'Erro ao gerar imagem.' : 'Error generating image.');
        }
      }
    } finally {
      setIsGeneratingImage(false);
      setTimeout(() => setShareToast(null), 5000);
    }
  };

  const handleCopyShareText = async () => {
    const text = lang === 'pt'
      ? `Fiz o quiz de personalidade de Inglês Instrumental do Prof. Leo Trevizani e meu perfil dominante foi ${winningProfileData.title}. Confira e acesse: leo-trevizani.github.io/Quiz-Ingles-Instrumental`
      : `I took the Instrumental English personality quiz by Prof. Leo Trevizani and my dominant profile was ${winningProfileData.title}. Check it out at: leo-trevizani.github.io/Quiz-Ingles-Instrumental`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setShareToast(
        lang === 'pt'
          ? '✓ Mensagem copiada! Cole no WhatsApp junto com o card.'
          : '✓ Message copied! Paste into WhatsApp along with the card.'
      );
    } catch {
      setShareToast(lang === 'pt' ? 'Erro ao copiar mensagem.' : 'Error copying message.');
    }
    setTimeout(() => setShareToast(null), 4500);
  };

  const t = {
    brandSubtitle: "Prof. Leo Trevizani",
    brandTitle: lang === 'pt' ? "Inglês Instrumental" : "Instrumental English",
    home: lang === 'pt' ? "Início" : "Home",
    glossary: lang === 'pt' ? "Glossário" : "Glossary",
    kicker: lang === 'pt' ? "Teste de Personalidade" : "Personality Quiz",
    mainTitle: lang === 'pt'
      ? "Quem é você na fila do pão do Jornalismo Global?"
      : "Who Are You in the Global Journalism Pecking Order?",
    mainDesc: lang === 'pt'
      ? "Entre falsos cognatos, crises virais e eufemismos corporativos, descubra qual área da comunicação te aguarda no mercado contemporâneo."
      : "Between false cognates, viral crises, and corporate euphemisms, discover which field of communication awaits you in today's media landscape.",
    evaluatedAreas: lang === 'pt' ? "Áreas avaliadas no teste:" : "Areas evaluated in this quiz:",
    startBtn: lang === 'pt' ? "Iniciar Quiz" : "Start Quiz",
    metaQuestions: lang === 'pt' ? "10 questões rápidas" : "10 quick questions",
    metaDynamic: lang === 'pt' ? "Alternativas dinâmicas" : "Dynamic choices",
    metaInstrumental: lang === 'pt' ? "Inglês Instrumental" : "Instrumental English",
    questionCounter: (current: number, total: number) =>
      lang === 'pt' ? `Questão ${current} de ${total}` : `Question ${current} of ${total}`,
    backPrev: lang === 'pt' ? "Voltar à anterior" : "Previous question",
    backHome: lang === 'pt' ? "Voltar ao início" : "Back to start",
    diagnosticKicker: lang === 'pt' ? "Diagnóstico Editorial" : "Editorial Diagnosis",
    competenciesTitle: lang === 'pt' ? "Competências em Destaque:" : "Highlighted Competencies:",
    distributionTitle: lang === 'pt' ? "Distribuição das suas afinidades" : "Affinity Distribution",
    vote: lang === 'pt' ? "voto" : "vote",
    votes: lang === 'pt' ? "votos" : "votes",
    shareImageBtn: lang === 'pt' ? "Compartilhar Imagem" : "Share Image",
    copyImageBtn: lang === 'pt' ? "Copiar Imagem" : "Copy Image",
    downloadImageBtn: lang === 'pt' ? "Baixar Imagem" : "Download Image",
    generatingImage: lang === 'pt' ? "Gerando card..." : "Generating card...",
    shareHint: lang === 'pt'
      ? "Gera um card em imagem (1080x1350) pronto para o WhatsApp, Instagram Stories e Feed"
      : "Generates an image card (1080x1350) ready for WhatsApp, Instagram Stories, and Feed",
    retakeBtn: lang === 'pt' ? "Refazer Quiz" : "Retake Quiz",
    footerCourse: lang === 'pt'
      ? "Inglês Instrumental aplicado ao Jornalismo"
      : "Instrumental English applied to Journalism",
    exitModalTitle: lang === 'pt' ? "Voltar à página inicial?" : "Return to the home screen?",
    exitModalDesc: lang === 'pt'
      ? "O seu progresso atual no quiz será reiniciado. Tem certeza de que deseja voltar para o início?"
      : "Your current quiz progress will be reset. Are you sure you want to return to the start?",
    continueQuiz: lang === 'pt' ? "Continuar Quiz" : "Continue Quiz",
    confirmExit: lang === 'pt' ? "Sim, Voltar ao Início" : "Yes, Return Home",
    glossarySheetTitle: lang === 'pt' ? "Glossário Didático Instrumental" : "Instrumental Media Glossary",
    glossarySheetIntro: lang === 'pt'
      ? "Conceitos autênticos da imprensa em língua inglesa trabalhados no quiz:"
      : "Authentic international journalism concepts featured in this quiz:",
    conceptLabel: lang === 'pt' ? "Conceito:" : "Concept:",
    practiceLabel: lang === 'pt' ? "Aplicação na Prática:" : "Practical Application:",
    closeGlossary: lang === 'pt' ? "Voltar ao Quiz" : "Return to Quiz"
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F5FFF8] text-[#282D29] font-instrument antialiased selection:bg-[#34A853] selection:text-white relative">
      
      {/* Fixed Sticky Header (Solid & Grounded across the top) */}
      <header className="sticky top-0 z-30 bg-[#202923] text-white border-b border-[#282D29]/80 shadow-xs">
        <div className="max-w-2xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
          
          {/* Logo / Home Brand Button (Only icon button responds to hover, no bg change behind text) */}
          <button
            onClick={handleGoHomeClick}
            className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer p-0.5 active:scale-[0.98] transition-transform duration-200"
            title={t.home}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center text-[#34A853] group-hover:bg-[#34A853] group-hover:text-white transition-all duration-300 shadow-xs">
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="leading-tight">
              <span className="block text-[11px] sm:text-xs font-bold tracking-tight text-white uppercase whitespace-nowrap">
                {t.brandTitle}
              </span>
            </div>
          </button>

          {/* Right Action Island: Language Segmented Pill & Glossary Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Segmented Language Selector Pill */}
            <div className="inline-flex items-center bg-white/10 p-0.5 rounded-full border border-white/15 text-[11px] font-semibold">
              <button
                onClick={() => toggleLanguage('pt')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer active:scale-95 ${
                  lang === 'pt'
                    ? 'bg-[#34A853] text-white shadow-xs'
                    : 'text-[#D6EEDD] hover:text-white'
                }`}
                title="Português Brasileiro"
                aria-label="Mudar para Português"
              >
                PT
              </button>
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer active:scale-95 ${
                  lang === 'en'
                    ? 'bg-[#34A853] text-white shadow-xs'
                    : 'text-[#D6EEDD] hover:text-white'
                }`}
                title="English"
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Glossary Button */}
            <button
              onClick={() => setShowGlossary(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 active:scale-[0.98] px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer border border-white/10"
              title={t.glossary}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#34A853]" />
              <span className="hidden sm:inline">{t.glossary}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Reading & Interaction Stage */}
      <main className="flex-grow flex items-center justify-center px-3.5 py-4 sm:py-8">
        <div className="w-full max-w-2xl mx-auto">
          
          {/* START SCREEN (Double-Bezel Architecture) */}
          {screen === 'start' && (
            <div className="bg-[#202923]/[0.02] p-1.5 sm:p-2.5 rounded-[1.75rem] border border-[#D6EEDD]/90 shadow-double-bezel transition-all duration-500 ease-fluid animate-fadeIn">
              <div className="bg-white p-5 sm:p-9 rounded-[calc(1.75rem-0.375rem)] shadow-inner-highlight border border-[#D6EEDD]/50 space-y-6 sm:space-y-8 text-left">
                
                {/* Microscopic Eyebrow Badge */}
                <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-[#F5FFF8] border border-[#D6EEDD] text-[10px] sm:text-[11px] font-semibold text-[#202923] uppercase tracking-[0.15em]">
                  <Sparkles className="w-3 h-3 text-[#34A853]" />
                  <span className="text-balance">{t.kicker}</span>
                </div>

                {/* Display Headline with text-balance to avoid orphaned words */}
                <div className="space-y-2.5">
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#0D0D0D] tracking-tight leading-[1.2] text-balance">
                    {t.mainTitle}
                  </h2>
                  <p className="text-[#282D29] text-sm sm:text-base leading-[1.65] text-pretty">
                    {t.mainDesc}
                  </p>
                </div>

                {/* 4 Pillars Grid (Responsive with concentric curves) */}
                <div className="space-y-2.5 pt-1">
                  <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#808080]">
                    {t.evaluatedAreas}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(Object.keys(profiles) as ProfileKey[]).map(key => {
                      const prof = profiles[key];
                      const IconComp = prof.icon;
                      return (
                        <div
                          key={key}
                          className="p-3.5 sm:p-4 rounded-[14px] bg-[#F5FFF8] border border-[#D6EEDD] hover:border-[#34A853]/60 transition-all duration-300 ease-fluid flex items-start gap-3 group"
                        >
                          <div className="w-7 h-7 rounded-full bg-white border border-[#D6EEDD] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#34A853] transition-colors">
                            <IconComp className="w-3.5 h-3.5 text-[#34A853]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-semibold text-[#0D0D0D] tracking-tight truncate">
                              {prof.title}
                            </h4>
                            <p className="text-[11px] text-[#808080] leading-snug text-pretty mt-0.5">
                              {prof.subtitle}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Primary CTA with Nested "Button-in-Button" Architecture */}
                <div className="pt-2">
                  <button
                    onClick={handleStartQuiz}
                    className="w-full sm:w-auto bg-[#34A853] hover:bg-[#2d9449] active:scale-[0.98] text-white font-medium py-3 px-6 sm:px-7 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-fluid text-sm sm:text-base flex items-center justify-center gap-3 cursor-pointer group"
                  >
                    <span>{t.startBtn}</span>
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform duration-300 ease-fluid">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* QUIZ SCREEN (Double-Bezel & Haptic Option Cards) */}
          {screen === 'quiz' && (
            <div
              key={currentQuestionIndex}
              className="bg-[#202923]/[0.02] p-1.5 sm:p-2.5 rounded-[1.75rem] border border-[#D6EEDD]/90 shadow-double-bezel transition-all duration-500 ease-fluid animate-fadeIn"
            >
              <div className="bg-white p-5 sm:p-8 rounded-[calc(1.75rem-0.375rem)] shadow-inner-highlight border border-[#D6EEDD]/50 space-y-5 text-left">
                
                {/* Question Header: Questão X de 10 on top line, category/topic always on the next line */}
                <div className="border-b border-[#D6EEDD]/60 pb-3 space-y-1">
                  <div className="text-[#0D0D0D] font-bold tracking-tight text-xs sm:text-sm uppercase">
                    {t.questionCounter(currentQuestionIndex + 1, totalQuestionsCount)}
                  </div>
                  {currentQ.topic && (
                    <div className="text-[#808080] text-xs font-normal tracking-wide">
                      {currentQ.topic}
                    </div>
                  )}
                </div>

                {/* Question Headline (text-balance prevents awkward line wrap) */}
                <div className="py-0.5">
                  <h2 className="text-base sm:text-xl font-bold text-[#0D0D0D] leading-[1.35] tracking-tight text-balance">
                    {currentQ.question}
                  </h2>
                </div>

                {/* Options Layout (2x2 Grid for Question 5; Vertical Stack for all other questions) */}
                <div className={currentQ.id === 5 ? "grid grid-cols-2 gap-2.5 sm:gap-4 pt-1" : "space-y-2.5 pt-1"}>
                  {currentOptions.map((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    const isSelectedFeedback = selectedFeedbackIndex === idx;

                    // Question 5: 2x2 grid card with large photo, text below, no A/B/C/D badge
                    if (currentQ.id === 5) {
                      const colonIdx = opt.text.indexOf(':');
                      const name = colonIdx !== -1 ? opt.text.slice(0, colonIdx) : opt.text;
                      const description = colonIdx !== -1 ? opt.text.slice(colonIdx + 1).trim() : '';

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(opt.profile, idx)}
                          className={`w-full text-center p-2 sm:p-3 rounded-[16px] sm:rounded-[20px] border transition-all duration-200 ease-fluid flex flex-col items-center group cursor-pointer active:scale-[0.98] ${
                            isSelectedFeedback
                              ? 'bg-[#34A853]/10 border-[#34A853] shadow-premium-light ring-2 ring-[#34A853]/50'
                              : 'bg-[#F5FFF8] hover:bg-white border-[#D6EEDD] hover:border-[#34A853] hover:shadow-premium-light'
                          }`}
                        >
                          {/* Large Portrait Image Container */}
                          <div className="relative w-full aspect-square overflow-hidden rounded-[12px] sm:rounded-[15px] border border-[#D6EEDD] bg-white shadow-xs">
                            {opt.image && (
                              <img
                                src={opt.image}
                                alt={name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            )}
                            {isSelectedFeedback && (
                              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#34A853] text-white flex items-center justify-center shadow-md animate-scaleUp">
                                <Check className="w-3.5 h-3.5 text-white" />
                              </div>
                            )}
                          </div>

                          {/* Text below photo */}
                          <div className="mt-2 sm:mt-2.5 text-center w-full space-y-0.5 sm:space-y-1">
                            <p className="font-bold text-xs sm:text-sm text-[#0D0D0D] group-hover:text-[#34A853] transition-colors leading-tight">
                              {name}
                            </p>
                            {description && (
                              <p className="text-[11px] sm:text-xs text-[#808080] group-hover:text-[#282D29] leading-snug text-pretty">
                                {description}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    }

                    // Standard vertical list with A/B/C/D letters for all other questions
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(opt.profile, idx)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-[14px] border transition-all duration-200 ease-fluid flex items-start gap-3.5 group cursor-pointer active:scale-[0.985] min-h-[54px] ${
                          isSelectedFeedback
                            ? 'bg-[#34A853]/10 border-[#34A853] shadow-premium-light'
                            : 'bg-[#F5FFF8] hover:bg-white border-[#D6EEDD] hover:border-[#34A853] hover:shadow-premium-light'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full border text-xs font-semibold flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5 ${
                            isSelectedFeedback
                              ? 'bg-[#34A853] border-[#34A853] text-white scale-110'
                              : 'bg-white border-[#D6EEDD] group-hover:border-[#34A853] group-hover:bg-[#34A853] group-hover:text-white text-[#202923]'
                          }`}
                        >
                          {isSelectedFeedback ? <Check className="w-3.5 h-3.5 text-white" /> : letter}
                        </span>

                        <span className="flex-1 text-xs sm:text-sm leading-relaxed text-[#282D29] group-hover:text-[#0D0D0D] text-pretty">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Footer Controls: Back & Reset (Centered Back-Home on Mobile) */}
                <div className="pt-3 border-t border-[#D6EEDD]/60 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                  {currentQuestionIndex > 0 ? (
                    <button
                      onClick={handlePrevQuestion}
                      className="inline-flex items-center gap-1.5 text-[#808080] hover:text-[#202923] active:scale-95 py-2 px-3 rounded-full hover:bg-[#F5FFF8] transition-all duration-200 cursor-pointer order-2 sm:order-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{t.backPrev}</span>
                    </button>
                  ) : (
                    <div className="hidden sm:block order-1" />
                  )}

                  <div className="w-full sm:w-auto flex justify-center order-1 sm:order-2">
                    <button
                      onClick={handleGoHomeClick}
                      className="text-[#808080] hover:text-[#202923] active:scale-95 py-2 px-4 rounded-full hover:bg-[#F5FFF8] transition-all duration-200 cursor-pointer text-center"
                    >
                      {t.backHome}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RESULT SCREEN (Double-Bezel & Celebratory Diagnosis) */}
          {screen === 'result' && (
            <div className="bg-[#202923]/[0.02] p-1.5 sm:p-2.5 rounded-[1.75rem] border border-[#D6EEDD]/90 shadow-double-bezel transition-all duration-500 ease-fluid animate-fadeIn">
              <div className="bg-white p-5 sm:p-9 rounded-[calc(1.75rem-0.375rem)] shadow-inner-highlight border border-[#D6EEDD]/50 space-y-6 sm:space-y-8 text-left">
                
                {/* Result Eyebrow */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#F5FFF8] border border-[#D6EEDD] text-[10px] sm:text-[11px] font-semibold text-[#202923] uppercase tracking-[0.15em]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853]" />
                    <span>{t.diagnosticKicker}</span>
                  </div>

                  <div className="space-y-3.5 pt-1">
                    {/* Profile Character Image */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#D6EEDD] bg-[#F5FFF8] shadow-xs aspect-[16/9] w-full">
                      <img
                        src={winningProfileData.image}
                        alt={winningProfileData.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.01]"
                        loading="eager"
                      />
                    </div>

                    {/* Profile Title & Subtitle */}
                    <div className="space-y-1">
                      <h2 className="text-xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight text-balance">
                        {winningProfileData.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-[#808080] uppercase tracking-wider">
                        {winningProfileData.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Description & Editorial Pull-Quote */}
                <div className="space-y-3.5">
                  <p className="text-[#282D29] text-xs sm:text-sm leading-relaxed text-pretty">
                    {winningProfileData.desc}
                  </p>

                  <div className="border-l-2 border-[#34A853] pl-3.5 py-2 bg-[#F5FFF8] rounded-r-[8px] text-xs sm:text-sm italic text-[#282D29] text-pretty">
                    {winningProfileData.quote}
                  </div>
                </div>

                {/* Highlighted Competencies */}
                <div className="space-y-2">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#808080] block">
                    {t.competenciesTitle}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {winningProfileData.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-[11px] sm:text-xs bg-[#F5FFF8] text-[#202923] font-medium px-2.5 py-1 rounded-full border border-[#D6EEDD]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Affinity Breakdown Accordion */}
                <div className="pt-2 border-t border-[#D6EEDD]/60">
                  <button
                    type="button"
                    onClick={() => setShowAffinityAccordion(prev => !prev)}
                    className="w-full flex justify-between items-center py-2 text-left group cursor-pointer focus:outline-none"
                    aria-expanded={showAffinityAccordion}
                  >
                    <span className="font-semibold uppercase tracking-[0.1em] text-[10.5px] text-[#808080] group-hover:text-[#202923] transition-colors">
                      {t.distributionTitle}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-[#F5FFF8] border border-[#D6EEDD] flex items-center justify-center text-[#808080] group-hover:text-[#202923] transition-colors">
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ease-fluid ${
                          showAffinityAccordion ? 'rotate-180 text-[#34A853]' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {showAffinityAccordion && (
                    <div className="pt-2 pb-1 space-y-2.5 animate-fadeIn">
                      {(Object.keys(profiles) as ProfileKey[]).map(key => {
                        const prof = profiles[key];
                        const percent = scoreSummary.percentages[key];
                        const count = scoreSummary.counts[key];
                        const isWinner = key === scoreSummary.winningProfile;

                        return (
                          <div key={key} className="space-y-1">
                            <div className="flex justify-between items-center text-[11px] sm:text-xs">
                              <span className={`font-medium ${isWinner ? 'text-[#34A853] font-bold' : 'text-[#282D29]'}`}>
                                {prof.title}
                              </span>
                              <span className={`font-mono ${isWinner ? 'text-[#34A853] font-semibold' : 'text-[#808080]'}`}>
                                {count} {count === 1 ? t.vote : t.votes} ({percent}%)
                              </span>
                            </div>
                            <div className="w-full bg-[#D6EEDD]/70 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-1.5 rounded-full transition-all duration-700 ease-fluid ${
                                  isWinner ? 'bg-[#34A853]' : 'bg-[#808080]'
                                }`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Action Buttons: Compartilhar Imagem (WhatsApp / Instagram), Baixar Imagem, Refazer */}
                <div className="pt-3 border-t border-[#D6EEDD]/60 space-y-2.5">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
                    <button
                      onClick={() => handleShareResultAsImage('share')}
                      disabled={isGeneratingImage}
                      className="bg-[#34A853] hover:bg-[#2d9449] active:scale-[0.98] disabled:opacity-75 text-white font-medium py-2.5 px-5 sm:px-6 rounded-full transition-all duration-300 ease-fluid text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer shadow-md group"
                      title={lang === 'pt' ? "Compartilhar imagem no WhatsApp, Instagram e outros apps" : "Share image on WhatsApp, Instagram and other apps"}
                    >
                      <span>{isGeneratingImage ? t.generatingImage : t.shareImageBtn}</span>
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {isGeneratingImage ? (
                          <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5 text-white" />
                        )}
                      </span>
                    </button>

                    <button
                      onClick={() => handleShareResultAsImage('copy')}
                      disabled={isGeneratingImage}
                      className="bg-transparent hover:bg-[#F5FFF8] active:scale-[0.98] text-[#202923] border border-[#202923] font-medium py-2.5 px-4 rounded-full transition-all duration-300 ease-fluid text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                      title={lang === 'pt' ? "Copiar imagem para colar diretamente no WhatsApp com Ctrl+V" : "Copy image to paste into WhatsApp with Ctrl+V"}
                    >
                      <Copy className="w-3.5 h-3.5 text-[#202923]" />
                      <span>{t.copyImageBtn}</span>
                    </button>

                    <button
                      onClick={() => handleShareResultAsImage('download')}
                      disabled={isGeneratingImage}
                      className="bg-transparent hover:bg-[#F5FFF8] active:scale-[0.98] text-[#202923] border border-[#D6EEDD] hover:border-[#202923] font-medium py-2.5 px-4 rounded-full transition-all duration-300 ease-fluid text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                      title={lang === 'pt' ? "Baixar imagem no dispositivo" : "Download image to device"}
                    >
                      <Download className="w-3.5 h-3.5 text-[#202923]" />
                      <span>{t.downloadImageBtn}</span>
                    </button>

                    <button
                      onClick={handleRestart}
                      className="bg-transparent hover:bg-[#F5FFF8] active:scale-[0.98] text-[#808080] hover:text-[#202923] font-medium py-2 px-3.5 rounded-full transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.retakeBtn}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#808080] text-center leading-relaxed">
                    {t.shareHint}
                  </p>

                  {shareToast && (
                    <div className="p-2.5 rounded-[12px] bg-[#F5FFF8] border border-[#34A853]/40 text-[#202923] text-xs text-center font-medium animate-fadeIn">
                      {shareToast}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 px-4 text-[#808080] text-xs border-t border-[#D6EEDD]/60 bg-[#F5FFF8]">
        <div className="max-w-2xl mx-auto space-y-2 text-center">
          <p className="text-center leading-relaxed">
            &copy; 2026 Leo Trevizani<br />
            {lang === 'pt' ? "Nenhum estagiário foi explorado na criação deste quiz." : "No interns were harmed in the making of this quiz."}
          </p>
          <p className="text-[11px] text-[#808080]/80 text-center">
            {t.footerCourse}
          </p>
        </div>
      </footer>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#202923]/60 p-4 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-[20px] max-w-sm w-full p-6 space-y-4 border border-[#D6EEDD] shadow-premium-dark text-left">
            <h3 className="text-base font-bold text-[#0D0D0D] tracking-tight">
              {t.exitModalTitle}
            </h3>
            <p className="text-xs text-[#808080] leading-relaxed text-pretty">
              {t.exitModalDesc}
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="text-xs font-medium text-[#202923] hover:bg-[#F5FFF8] active:scale-95 px-4 py-2 rounded-full border border-[#D6EEDD] cursor-pointer transition-all duration-200"
              >
                {t.continueQuiz}
              </button>
              <button
                onClick={handleConfirmExit}
                className="text-xs font-medium text-white bg-[#202923] hover:bg-[#282D29] active:scale-95 px-4 py-2 rounded-full cursor-pointer transition-all duration-200"
              >
                {t.confirmExit}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Glossário Slide-over / Sheet */}
      {showGlossary && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#202923]/60 p-0 sm:p-4 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-t-[24px] sm:rounded-[24px] max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] flex flex-col shadow-premium-dark overflow-hidden border border-[#D6EEDD]">
            {/* Sheet Header */}
            <div className="bg-[#202923] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#282D29]">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#34A853]" />
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {t.glossarySheetTitle}
                </h3>
              </div>
              <button
                onClick={() => setShowGlossary(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sheet Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3 bg-white">
              <p className="text-xs text-[#808080] leading-relaxed mb-2 text-pretty">
                {t.glossarySheetIntro}
              </p>

              <div className="space-y-2">
                {glossaryItems.map((item, index) => {
                  const isOpen = selectedGlossary === index;
                  return (
                    <div
                      key={index}
                      className="border border-[#D6EEDD] rounded-[14px] overflow-hidden transition-all duration-300 ease-fluid bg-[#F5FFF8]"
                    >
                      <button
                        onClick={() => setSelectedGlossary(isOpen ? null : index)}
                        className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 font-medium text-[#202923] hover:bg-white active:bg-[#F5FFF8] transition-colors cursor-pointer"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-[#0D0D0D] flex items-center gap-2">
                          <Info className="w-3.5 h-3.5 text-[#34A853] shrink-0" />
                          <span className="text-pretty">{item.term}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#808080] shrink-0 transition-transform duration-300 ease-fluid ${
                            isOpen ? 'rotate-180 text-[#34A853]' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="p-3.5 sm:p-4 pt-1 text-xs sm:text-sm text-[#282D29] space-y-2 border-t border-[#D6EEDD] bg-white animate-fadeIn">
                          <p className="leading-relaxed text-pretty">
                            <strong className="text-[#0D0D0D] font-semibold">{t.conceptLabel} </strong>
                            {item.meaning}
                          </p>
                          <div className="p-2.5 rounded-[10px] bg-[#F5FFF8] border border-[#D6EEDD] text-xs text-[#282D29] text-pretty">
                            <strong className="text-[#34A853] font-semibold">{t.practiceLabel} </strong>
                            {item.context}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="p-3.5 sm:p-4 bg-[#F5FFF8] border-t border-[#D6EEDD] flex justify-end">
              <button
                onClick={() => setShowGlossary(false)}
                className="w-full sm:w-auto bg-[#202923] hover:bg-[#282D29] active:scale-[0.98] text-white font-medium text-xs py-2.5 px-6 rounded-full transition-all duration-200 cursor-pointer text-center shadow-xs"
              >
                {t.closeGlossary}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
