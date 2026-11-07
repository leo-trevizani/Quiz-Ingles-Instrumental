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
  Loader2
} from 'lucide-react';

export type Language = 'pt' | 'en';
export type ProfileKey = 'correspondente' | 'checador' | 'bigdata' | 'b2b';

interface Option {
  text: string;
  profile: ProfileKey;
}

interface Question {
  id: number;
  topic: string;
  question: string;
  options: Option[];
}

interface ProfileInfo {
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ElementType;
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
      topic: "Crise Global e Checagem",
      question: "1. Estourou uma crise nas redes sociais de proporções globais envolvendo uma cantora famosa e um político europeu. Qual é o seu primeiro instinto?",
      options: [
        { text: "Entrar em contato com fontes na Europa para compreender o contexto cultural e o idioma antes de publicar qualquer coisa.", profile: "correspondente" },
        { text: "Analisar as métricas: executar uma rotina automatizada para extrair milhares de publicações e identificar padrões de contas automatizadas.", profile: "bigdata" },
        { text: "Conter a equipe: 'Precisamos checar se o vídeo não é uma manipulação por inteligência artificial antes de divulgar!'.", profile: "checador" },
        { text: "Calcular imediatamente o impacto nas ações da gravadora no mercado financeiro e nas diretrizes de sustentabilidade da turnê.", profile: "b2b" }
      ]
    },
    {
      id: 2,
      topic: "Discurso Corporativo e Relações Públicas",
      question: "2. Chega na redação um comunicado institucional estrangeiro: o presidente da empresa anuncia uma 'reestruturação para enxugar operações' e menciona 'dívida estratégica'. O que você lê nas entrelinhas?",
      options: [
        { text: "Trata-se de um malabarismo de relações públicas. Vou transformar isso em um relatório de inteligência de mercado para os investidores.", profile: "b2b" },
        { text: "Vou cruzar esses termos com os demonstrativos contábeis do semestre em uma planilha detalhada.", profile: "bigdata" },
        { text: "Vou traduzir isso para o meu público local mostrando como vai afetar a filial da nossa cidade.", profile: "correspondente" },
        { text: "Mentira descarada repleta de eufemismos. Nosso trabalho é expor a realidade: eles estão demitindo em massa e altamente endividados.", profile: "checador" }
      ]
    },
    {
      id: 3,
      topic: "Rotina de Redação e Hábitos",
      question: "3. Em uma cena de fechamento acelerado na redação: o que não pode faltar na sua mesa ou no navegador?",
      options: [
        { text: "O manual de redação, dois bloqueadores de anúncios e três abas de agências de checagem de fatos.", profile: "checador" },
        { text: "A rede profissional aberta com assinatura executiva, garrafa térmica e a agenda de reuniões do dia.", profile: "b2b" },
        { text: "Passaporte, três adaptadores de tomada internacionais e o aplicativo de idiomas com a rotina de estudos em dia.", profile: "correspondente" },
        { text: "Dois monitores amplos, modo escuro ativado, muito café, planilhas avançadas e editor de código abertos.", profile: "bigdata" }
      ]
    },
    {
      id: 4,
      topic: "Neutralidade versus Falsa Equivalência",
      question: "4. O editor deseja colocar um cientista premiado e alguém que nega o formato esférico da Terra no mesmo debate sobre clima para buscar 'neutralidade'. O que você diz na reunião?",
      options: [
        { text: "'Reuni dados de quatro décadas de pesquisas climáticas aqui. Não faz sentido abrir espaço para opiniões sem respaldo empírico.'", profile: "bigdata" },
        { text: "'Se um lado afirma que chove e o outro diz que faz sol, nosso dever é abrir a janela e verificar! Isso é falsa equivalência!'", profile: "checador" },
        { text: "'Isso vai destruir a credibilidade da nossa instituição perante os anunciantes e parceiros de negócios!'", profile: "b2b" },
        { text: "'A regra da notícia é objetiva: adotar a pirâmide invertida, cortar quem não tem relevância e priorizar o fato comprovado.'", profile: "correspondente" }
      ]
    },
    {
      id: 5,
      topic: "Armadilhas de Significado e Falsos Cognatos",
      question: "5. Alerta de falso cognato! Um informe estrangeiro diz: 'The Mayor realized a comprehensive policy about the police'. Como você redige essa notícia em português?",
      options: [
        { text: "Sintetizo em tópicos executivos com foco no impacto econômico da política pública anunciada.", profile: "b2b" },
        { text: "Aplico a precisão do idioma: 'O prefeito executou uma política pública abrangente sobre segurança', fugindo da armadilha de traduzir 'percebeu' ou 'compreensiva'.", profile: "correspondente" },
        { text: "Desconfio da redação e entro em contato com órgãos oficiais para checar se ele percebeu algo ou se realmente colocou a medida em prática.", profile: "checador" },
        { text: "Ignoro a redação confusa, extraio os dados oficiais de criminalidade do município e construo um painel interativo de estatísticas.", profile: "bigdata" }
      ]
    },
    {
      id: 6,
      topic: "Cinema e Narrativas sobre Comunicação",
      question: "6. Qual obra audiovisual sobre o universo da comunicação mais prende a sua atenção?",
      options: [
        { text: "Tramas sobre grandes impérios corporativos, jogos de poder, negociações bilionárias e manipulação de imagem pública.", profile: "b2b" },
        { text: "Histórias sobre os bastidores dos algoritmos, manipulação por redes sociais e o poder invisível da análise de dados.", profile: "bigdata" },
        { text: "Produções sobre o jornalismo investigativo combativo, a luta contra a falsa neutralidade e as apurações ao vivo sob pressão ética.", profile: "checador" },
        { text: "Grandes investigações clássicas de rua, onde repórteres gastam a sola do sapato atrás de fontes confidenciais.", profile: "correspondente" }
      ]
    },
    {
      id: 7,
      topic: "Regras de Apuração e Sigilo de Fontes",
      question: "7. Uma fonte confidencial repassa uma revelação bombástica sob sigilo total e proibição de citação direta. Como você conduz o trabalho?",
      options: [
        { text: "Utilizo a pista apenas para orientar a apuração, mas busco provas documentais irrefutáveis, já que não posso atribuir nada à fonte.", profile: "checador" },
        { text: "Tento negociar com a assessoria para permitir ao menos uma atribuição genérica, como 'um executivo de alto escalão do setor'.", profile: "b2b" },
        { text: "Embarco imediatamente para cobrir os desdobramentos no local dos acontecimentos, resguardando o sigilo da fonte com rigor.", profile: "correspondente" },
        { text: "Cruzo a informação recebida com bancos de dados vazados e utilizo ferramentas estatísticas para comprovar a hipótese.", profile: "bigdata" }
      ]
    },
    {
      id: 8,
      topic: "Abertura da Notícia e Estrutura Textual",
      question: "8. Um colega entrega um texto sobre um desastre com excesso de adjetivos, narrativa enrolada e voz passiva. Qual orientação você aplica?",
      options: [
        { text: "Transformar as estatísticas escondidas no meio do texto em um infográfico destacado logo no início da reportagem.", profile: "bigdata" },
        { text: "Eliminar sentimentalismos. Precisamos de fatos comprovados com clareza. Não se deve florear uma tragédia.", profile: "checador" },
        { text: "Mostrar em vez de apenas contar: cortar adjetivos, priorizar verbos de ação e colocar as informações principais no lide da matéria.", profile: "correspondente" },
        { text: "Destacar o impacto financeiro e as consequências econômicas na abertura, pois é isso que o mercado quer entender.", profile: "b2b" }
      ]
    },
    {
      id: 9,
      topic: "Prazo Crítico e Gestão de Imprevistos",
      question: "9. Faltam cinco minutos para o encerramento da edição. O sistema de publicação trava, as redes caem e o editor se desespera. Como você reage?",
      options: [
        { text: "Acesso o código-fonte da página, contorno o sistema travado e publico o conteúdo diretamente na estrutura digital.", profile: "bigdata" },
        { text: "Mantenho a calma enquanto tento rotear a internet pelo celular, porque meu voo para a próxima cobertura parte em breve.", profile: "correspondente" },
        { text: "Envio rapidamente uma nota oficial de esclarecimento para os parceiros e partes interessadas a fim de ganhar tempo.", profile: "b2b" },
        { text: "Mantenho a serenidade. Sem uma dupla checagem dos fatos eu não aperto o botão de publicar; a precisão vem antes da pressa.", profile: "checador" }
      ]
    },
    {
      id: 10,
      topic: "Enquadramentos Noticiosos e Abordagens",
      question: "10. Ao noticiar a aprovação de uma nova legislação relevante, qual ângulo da cobertura você prioriza naturalmente?",
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
      topic: "Global Breaking News & Verification",
      question: "1. A global social media scandal erupts involving a pop superstar and a prominent European politician. What is your immediate instinct?",
      options: [
        { text: "Contact sources in Europe to understand cultural nuances and local language before publishing anything.", profile: "correspondente" },
        { text: "Analyze the metrics: execute an automated script to scrape thousands of posts and detect bot patterns in trending hashtags.", profile: "bigdata" },
        { text: "Hold the team back: 'We must verify whether the video is an AI deepfake before publishing!'.", profile: "checador" },
        { text: "Assess the immediate fallout on the record label's market valuation and the tour's corporate sustainability index.", profile: "b2b" }
      ]
    },
    {
      id: 2,
      topic: "Corporate Speak & PR Spin",
      question: "2. A foreign corporate press release arrives: the CEO announces 'downsizing to streamline operations' and cites 'strategic debt'. What do you read between the lines?",
      options: [
        { text: "Classic PR spin. I will turn this into a concise market intelligence briefing for institutional investors.", profile: "b2b" },
        { text: "I will cross-reference these terms with the company's financial balance sheets in a detailed spreadsheet model.", profile: "bigdata" },
        { text: "I will translate this for our local readership, explaining how regional employment and branch offices will be affected.", profile: "correspondente" },
        { text: "Pure corporate euphemisms. Our job is to expose the truth: mass layoffs and severe insolvency.", profile: "checador" }
      ]
    },
    {
      id: 3,
      topic: "Newsroom Habits & Deadline Culture",
      question: "3. Fast-paced deadline scene: What must be on your desk or open in your browser tabs at closing time?",
      options: [
        { text: "The editorial stylebook, two ad blockers, and three tabs open to fact-checking organizations.", profile: "checador" },
        { text: "A premium business network subscription, insulated travel mug, and the daily executive call roster.", profile: "b2b" },
        { text: "Passport, universal plug adapters, and the language app with your study streak intact.", profile: "correspondente" },
        { text: "Dual monitors, dark mode active, fresh coffee, advanced spreadsheets, and code editor open.", profile: "bigdata" }
      ]
    },
    {
      id: 4,
      topic: "Neutrality versus False Balance",
      question: "4. The editor wants to pit an acclaimed climate scientist against a flat-earth conspiracy theorist in the name of 'neutrality'. What do you say in the meeting?",
      options: [
        { text: "'I have four decades of climate datasets organized here. Giving a platform to unverified claims has no empirical basis.'", profile: "bigdata" },
        { text: "'If one person says it is raining and another says it is dry, our job is to look out the window! That is false balance!'", profile: "checador" },
        { text: "'This will destroy our institutional credibility with reputable partners and advertisers!'", profile: "b2b" },
        { text: "'The reporting rule is clear: use the inverted pyramid, drop fringe theories, and lead with verified facts.'", profile: "correspondente" }
      ]
    },
    {
      id: 5,
      topic: "Semantic Traps & False Friends",
      question: "5. False friend alert! A foreign news wire reports: 'The Mayor realized a comprehensive policy about the police'. How do you translate and edit this accurately?",
      options: [
        { text: "Condense it into an executive briefing focusing on the economic and regulatory impact of the announced public guidelines.", profile: "b2b" },
        { text: "Apply precise vocabulary: 'The mayor enacted a broad public security policy', avoiding literal traps for 'perceived' or 'sympathetic'.", profile: "correspondente" },
        { text: "Question the wording and contact official spokespeople to confirm whether the measure was merely acknowledged or actually enacted.", profile: "checador" },
        { text: "Bypass the confusing prose, extract open municipal crime databases, and build an interactive statistics dashboard.", profile: "bigdata" }
      ]
    },
    {
      id: 6,
      topic: "Cinema & Media Narratives",
      question: "6. Which film or series about media and journalism resonates most with you?",
      options: [
        { text: "Narratives about corporate power struggles, boardroom politics, billion-dollar mergers, and public perception.", profile: "b2b" },
        { text: "Stories about algorithmic power, social media engineering, data harvesting, and computational influence.", profile: "bigdata" },
        { text: "Dramas depicting hard-hitting investigative journalism, resisting false neutrality, and live reporting under ethical scrutiny.", profile: "checador" },
        { text: "Classic shoe-leather investigations where reporters hit the streets and cultivate confidential sources.", profile: "correspondente" }
      ]
    },
    {
      id: 7,
      topic: "Sourcing Rules & Confidentiality",
      question: "7. A confidential source shares explosive revelations under 'Deep Background' with total anonymity. How do you proceed?",
      options: [
        { text: "Use the tip strictly as an investigative roadmap, but seek ironclad documentary proof since the source cannot be quoted.", profile: "checador" },
        { text: "Negotiate with their communications officer to allow an attribution such as 'a senior sector executive'.", profile: "b2b" },
        { text: "Depart immediately to report the developments on the ground while safeguarding source confidentiality at all costs.", profile: "correspondente" },
        { text: "Cross-examine the tip against leaked document archives and use statistical validation to substantiate the claim.", profile: "bigdata" }
      ]
    },
    {
      id: 8,
      topic: "Lead Construction & Textual Flow",
      question: "8. A colleague submits a draft about a tragedy loaded with emotional adjectives, passive voice, and meandering prose. What guidance do you give?",
      options: [
        { text: "Take the statistics buried inside the text and convert them into an informative chart right at the top of the story.", profile: "bigdata" },
        { text: "Strip away decorative sentimentalism. We need verified facts delivered cleanly; editorial ethics forbid romanticizing disaster.", profile: "checador" },
        { text: "'Show, don't tell!' Cut unnecessary adjectives, rely on strong active verbs, and structure the essential facts in the lead.", profile: "correspondente" },
        { text: "Lead with the economic repercussions and market consequences, because that is what stakeholders urgently need to understand.", profile: "b2b" }
      ]
    },
    {
      id: 9,
      topic: "Critical Deadline & Crisis Management",
      question: "9. Five minutes to publishing deadline: The content management platform freezes, social platforms go down, and the editor is panicked. How do you react?",
      options: [
        { text: "Inspect page source code, bypass the frozen interface, and deploy the clean article markup directly.", profile: "bigdata" },
        { text: "Maintain focus while tethering mobile internet under high pressure, knowing your departure flight leaves shortly.", profile: "correspondente" },
        { text: "Promptly issue an official holding statement to partners and stakeholders to secure valuable breathing room.", profile: "b2b" },
        { text: "Stay calm and composed. Without independent double-checking I will not hit publish; accuracy always trumps panic.", profile: "checador" }
      ]
    },
    {
      id: 10,
      topic: "News Framing & Story Angles",
      question: "10. When covering the passage of significant new legislation, which angle do your eyes gravitate toward first?",
      options: [
        { text: "Conflict and contradictions: examining whether political rhetoric matches the actual provisions of the legal text.", profile: "checador" },
        { text: "Attribution of responsibility: mapping historical datasets to demonstrate numerically who caused the systemic issue.", profile: "bigdata" },
        { text: "Human interest: telling compelling personal stories about how the law impacts everyday lives through vivid, direct reporting.", profile: "correspondente" },
        { text: "Economic consequences: evaluating regulatory costs, fiscal revenue, business viability, and consumer market shifts.", profile: "b2b" }
      ]
    }
  ]
};

const PROFILES_DATA: Record<Language, Record<ProfileKey, ProfileInfo>> = {
  pt: {
    correspondente: {
      title: "O Correspondente Internacional",
      subtitle: "Cobertura Global e Reportagem Cultural",
      desc: "Você é movido pela apuração de campo, pela cultura e pelos fatos em tempo real. Domina a técnica da pirâmide invertida e sabe que no jornalismo direto 'menos é mais'. Falsos cognatos e armadilhas de linguagem não enganam você, pois compreende a comunicação como uma ferramenta viva de conexão cultural. Seu passaporte está em dia?",
      icon: Globe,
      tagText: "Mundo e Sociedade",
      quote: "“Mostre os fatos em vez de usar adjetivos. Na pirâmide invertida, quem enrola perde o leitor.”",
      skills: ["Domínio da Pirâmide Invertida", "Comunicação Internacional Direta", "Enquadramento de Interesse Humano", "Precisão sem Falsos Cognatos"]
    },
    checador: {
      title: "O Checador de Fatos",
      subtitle: "Especialista em Verificação e Ética Jornalística",
      desc: "Nada escapa do seu olhar crítico. Você segue a regra de ouro da verificação: se alguém diz que chove e outro diz que faz sol, o papel do jornalista é abrir a janela e checar. Você combate a falsa equivalência e a falsa neutralidade com firmeza. Sabe lidar com apurações sigilosas e desmascara manobras de comunicação institucional com facilidade.",
      icon: ShieldCheck,
      tagText: "Ética e Verificação",
      quote: "“Se um lado afirma que chove e o outro diz que faz sol, abra a janela antes de publicar.”",
      skills: ["Apuração Rigorosa de Fontes", "Combate à Falsa Equivalência", "Desmonte de Discursos Institucionais", "Dupla Checagem Factual"]
    },
    bigdata: {
      title: "O Jornalista de Dados",
      subtitle: "Investigação Quantitativa e Computacional",
      desc: "Para você, relatos podem ser tendenciosos, mas os números revelam a verdade quando bem tratados. Você não depende de comunicados prontos: extrai e cruza bases estatísticas completas. Suas planilhas, códigos de automação e infográficos encontram padrões onde a maioria só enxerga confusão. Informação estruturada é o seu maior trunfo.",
      icon: Database,
      tagText: "Estatística e Análise",
      quote: "“Em Deus nós confiamos. Para todos os outros casos, tragam dados e planilhas consistentes.”",
      skills: ["Extração Automatizada de Dados", "Infografia e Visualização", "Mapeamento de Responsabilidade", "Evidência Empírica"]
    },
    b2b: {
      title: "O Estrategista Corporativo",
      subtitle: "Inteligência de Mercado e Análise de Negócios",
      desc: "Você compreende perfeitamente o tabuleiro dos grandes negócios. É especialista em traduzir o jargão corporativo e os eufemismos de relações públicas em diagnósticos transparentes para investidores e tomadores de decisão. Sabe analisar custos, prever impactos econômicos e dialogar com clareza com o mercado.",
      icon: Briefcase,
      tagText: "Estratégia e Mercado",
      quote: "“Eufemismo empresarial é uma oportunidade para quem sabe decifrar as entrelinhas do mercado.”",
      skills: ["Decodificação de Jargões", "Análise de Consequências Econômicas", "Comunicação com Investidores", "Diagnóstico de Tendências"]
    }
  },
  en: {
    correspondente: {
      title: "The Foreign Correspondent",
      subtitle: "Global Beat & Cultural Reporting",
      desc: "You thrive on field reporting, cultural immersion, and real-time storytelling. You command the inverted pyramid and understand that direct journalism values clarity over fluff. False cognates never mislead you, because you treat language as a living medium of global connection. Is your passport ready?",
      icon: Globe,
      tagText: "World & Culture",
      quote: "“Show, don't tell. In the inverted pyramid, burying the lead loses the audience.”",
      skills: ["Inverted Pyramid Mastery", "Global Communication", "Human Interest Framing", "Semantic Accuracy"]
    },
    checador: {
      title: "The Fact-Checker",
      subtitle: "Verification & Media Ethics Specialist",
      desc: "Nothing slips past your scrutiny. You live by the golden rule of investigative reporting: if someone says it is raining and another says it is dry, your duty is to open the window and verify. You challenge false balance and performative neutrality head-on, handle confidential sourcing with rigor, and dismantle corporate spin.",
      icon: ShieldCheck,
      tagText: "Truth & Ethics",
      quote: "“If one side says it is raining and the other says it is sunny, open the window before publishing.”",
      skills: ["Rigorous Sourcing Protocols", "Challenging False Balance", "Debunking PR Spin", "Double-Check Verification"]
    },
    bigdata: {
      title: "The Data Journalist",
      subtitle: "Computational & Quantitative Investigation",
      desc: "To you, opinions can deceive, but clean numbers reveal reality. You do not wait for official handouts: you scrape, sanitize, and correlate vast datasets. Your spreadsheets, automated scripts, and interactive graphics locate actionable patterns where others see only noise. Structured data is your greatest edge.",
      icon: Database,
      tagText: "Algorithms & Analytics",
      quote: "“In God we trust. All others must bring clean datasets and verified spreadsheets.”",
      skills: ["Automated Data Scraping", "Interactive Data Visualization", "Attribution of Responsibility", "Empirical Evidence"]
    },
    b2b: {
      title: "The Corporate Strategist",
      subtitle: "Market Intelligence & Business Analysis",
      desc: "You master the chess game of global commerce. You excel at translating corporate speak and public relations euphemisms into transparent market intelligence for decision-makers. You quantify fiscal consequences, anticipate regulatory shifts, and articulate clear insights for executive stakeholders.",
      icon: Briefcase,
      tagText: "Strategy & Markets",
      quote: "“Corporate euphemisms are invitations for those who know how to read between the lines.”",
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

function createResultCardBlob(
  winningProfileData: ProfileInfo,
  scoreSummary: { counts: Record<ProfileKey, number>; percentages: Record<ProfileKey, number>; winningProfile: ProfileKey },
  profiles: Record<ProfileKey, ProfileInfo>,
  lang: Language
): Promise<Blob | null> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1440;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(null);
      return;
    }

    // 1. Overall Background
    ctx.fillStyle = '#F5FFF8';
    ctx.fillRect(0, 0, 1080, 1440);

    // Subtle corner background accents
    ctx.fillStyle = 'rgba(52, 168, 83, 0.05)';
    ctx.beginPath();
    ctx.arc(100, 100, 160, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(980, 1340, 200, 0, Math.PI * 2);
    ctx.fill();

    // 2. White Card Container
    drawRoundRect(ctx, 44, 44, 992, 1352, 36);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#D6EEDD';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 3. Header Top Pill
    const pillText = lang === 'pt' ? 'TESTE DE PERSONALIDADE' : 'PERSONALITY QUIZ';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const pillTextWidth = ctx.measureText(pillText).width;
    const pillWidth = pillTextWidth + 48;
    drawRoundRect(ctx, 84, 84, pillWidth, 38, 19);
    ctx.fillStyle = '#202923';
    ctx.fill();

    // Green dot in pill
    ctx.beginPath();
    ctx.arc(104, 103, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#34A853';
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(pillText, 120, 108);

    // 4. Header Titles
    ctx.fillStyle = '#0D0D0D';
    ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(lang === 'pt' ? 'Inglês Instrumental' : 'Instrumental English', 84, 164);

    ctx.fillStyle = '#808080';
    ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(lang === 'pt' ? 'Jornalismo & Bastidores • Prof. Leo Trevizani' : 'Journalism & Beat • Prof. Leo Trevizani', 84, 196);

    // Separator line
    ctx.strokeStyle = '#EAF5EE';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(84, 222);
    ctx.lineTo(996, 222);
    ctx.stroke();

    // 5. Eyebrow: Diagnóstico Editorial
    drawRoundRect(ctx, 84, 246, 220, 32, 16);
    ctx.fillStyle = '#F5FFF8';
    ctx.fill();
    ctx.strokeStyle = '#D6EEDD';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#202923';
    ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(lang === 'pt' ? '✓ DIAGNÓSTICO EDITORIAL' : '✓ EDITORIAL DIAGNOSIS', 98, 267);

    // 6. Dominant Title
    ctx.fillStyle = '#0D0D0D';
    ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(winningProfileData.title, 84, 324);

    // 7. Quote Statement Box
    drawRoundRect(ctx, 84, 350, 912, 160, 16);
    ctx.fillStyle = '#F5FFF8';
    ctx.fill();
    ctx.strokeStyle = '#D6EEDD';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Left green accent border
    drawRoundRect(ctx, 84, 350, 8, 160, 4);
    ctx.fillStyle = '#34A853';
    ctx.fill();

    // Quote text
    ctx.fillStyle = '#282D29';
    ctx.font = 'italic 21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    wrapText(ctx, `"${winningProfileData.quote}"`, 114, 395, 840, 32);

    // 8. Highlighted Competencies
    ctx.fillStyle = '#808080';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(lang === 'pt' ? 'COMPETÊNCIAS EM DESTAQUE:' : 'HIGHLIGHTED COMPETENCIES:', 84, 550);

    let skillX = 84;
    const skillY = 566;
    ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    winningProfileData.skills.forEach((skill) => {
      const sw = ctx.measureText(skill).width;
      const pillW = sw + 28;
      if (skillX + pillW > 996) return;
      drawRoundRect(ctx, skillX, skillY, pillW, 34, 17);
      ctx.fillStyle = '#F5FFF8';
      ctx.fill();
      ctx.strokeStyle = '#D6EEDD';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#202923';
      ctx.fillText(skill, skillX + 14, skillY + 23);
      skillX += pillW + 10;
    });

    // 9. Affinity Breakdown Section
    ctx.fillStyle = '#808080';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(lang === 'pt' ? 'DISTRIBUIÇÃO DAS SUAS AFINIDADES:' : 'AFFINITY DISTRIBUTION:', 84, 650);

    const profileKeys = Object.keys(profiles) as ProfileKey[];
    let barStartY = 680;
    profileKeys.forEach((key) => {
      const prof = profiles[key];
      const isWinner = key === scoreSummary.winningProfile;
      const percent = scoreSummary.percentages[key];
      const count = scoreSummary.counts[key];
      const voteLabel = count === 1 ? (lang === 'pt' ? 'voto' : 'vote') : (lang === 'pt' ? 'votos' : 'votes');

      // Title
      ctx.fillStyle = isWinner ? '#34A853' : '#282D29';
      ctx.font = isWinner ? 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' : '500 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(prof.title, 84, barStartY);

      // Score
      const scoreText = `${count} ${voteLabel} (${percent}%)`;
      ctx.fillStyle = isWinner ? '#34A853' : '#808080';
      ctx.font = isWinner ? 'bold 18px monospace' : '500 18px monospace';
      const scoreWidth = ctx.measureText(scoreText).width;
      ctx.fillText(scoreText, 996 - scoreWidth, barStartY);

      // Track
      drawRoundRect(ctx, 84, barStartY + 12, 912, 12, 6);
      ctx.fillStyle = '#EAF5EE';
      ctx.fill();

      // Bar
      const barWidth = Math.max(12, (percent / 100) * 912);
      drawRoundRect(ctx, 84, barStartY + 12, barWidth, 12, 6);
      ctx.fillStyle = isWinner ? '#34A853' : '#808080';
      ctx.fill();

      barStartY += 72;
    });

    // 10. Card Footer
    ctx.strokeStyle = '#EAF5EE';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(84, 1210);
    ctx.lineTo(996, 1210);
    ctx.stroke();

    ctx.fillStyle = '#0D0D0D';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      lang === 'pt' ? 'Quem é você na fila do pão do Jornalismo Global?' : 'Who Are You in the Global Journalism Pecking Order?',
      540,
      1252
    );

    ctx.fillStyle = '#808080';
    ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('© 2026 Leo Trevizani • Nenhum estagiário foi explorado na criação deste quiz.', 540, 1286);
    ctx.fillText(
      lang === 'pt' ? 'Inglês Instrumental aplicado ao Jornalismo' : 'Instrumental English applied to Journalism',
      540,
      1314
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
  const WinnerIcon = winningProfileData.icon;

  const currentQ = questions[currentQuestionIndex] || questions[0];
  const currentOptionIndices = shuffledOptionsOrder[currentQuestionIndex] || currentQ.options.map((_, i) => i);
  const currentOptions = currentOptionIndices.map(i => currentQ.options[i]);

  const totalQuestionsCount = questions.length;
  const progressPercent = Math.min(
    100,
    Math.round(((currentQuestionIndex + 1) / totalQuestionsCount) * 100)
  );

  const handleShareResultAsImage = async (mode: 'share' | 'download' = 'share') => {
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

      if (mode === 'download') {
        triggerDownload();
        setShareToast(lang === 'pt' ? 'Imagem baixada no seu dispositivo!' : 'Image downloaded to your device!');
        return;
      }

      const shareTitle = lang === 'pt'
        ? `Quiz de Jornalismo Moderno: Meu perfil é ${winningProfileData.title}`
        : `Modern Journalism Quiz: My role is ${winningProfileData.title}`;
      const shareText = lang === 'pt'
        ? `Fiz o quiz de Inglês Instrumental do Prof. Leo Trevizani e meu perfil dominante foi ${winningProfileData.title}! Confira:`
        : `I took Prof. Leo Trevizani's Instrumental English quiz and my profile is ${winningProfileData.title}! Check it out:`;

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: shareTitle,
          text: shareText
        });
        setShareToast(lang === 'pt' ? 'Card compartilhado com sucesso!' : 'Card shared successfully!');
      } else {
        // Fallback for browsers without file sharing
        triggerDownload();
        try {
          if (navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            setShareToast(
              lang === 'pt'
                ? 'Imagem baixada e copiada! Pronta para colar no WhatsApp ou postar no Instagram.'
                : 'Image downloaded and copied! Ready to paste into WhatsApp or share on Instagram.'
            );
          } else {
            setShareToast(
              lang === 'pt'
                ? 'Imagem baixada no seu celular! Pronta para postar no WhatsApp ou Instagram.'
                : 'Image downloaded to your device! Ready to share on WhatsApp or Instagram.'
            );
          }
        } catch {
          setShareToast(
            lang === 'pt'
              ? 'Imagem baixada no seu celular! Pronta para postar no WhatsApp ou Instagram.'
              : 'Image downloaded to your device! Ready to share on WhatsApp or Instagram.'
          );
        }
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
                ? 'Imagem baixada no seu celular! Pronta para postar no WhatsApp ou Instagram.'
                : 'Image downloaded to your device! Ready to share on WhatsApp or Instagram.'
            );
          }
        } catch {
          setShareToast(lang === 'pt' ? 'Erro ao gerar imagem.' : 'Error generating image.');
        }
      }
    } finally {
      setIsGeneratingImage(false);
      setTimeout(() => setShareToast(null), 4500);
    }
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
    downloadImageBtn: lang === 'pt' ? "Baixar Imagem" : "Download Image",
    generatingImage: lang === 'pt' ? "Gerando card..." : "Generating card...",
    shareHint: lang === 'pt'
      ? "Gera um card em imagem pronto para o WhatsApp, Instagram Stories e Feed"
      : "Generates an image card ready for WhatsApp, Instagram Stories, and Feed",
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

                {/* Options Stack (Haptic Feedback & concentric curves) */}
                <div className="space-y-2.5 pt-1">
                  {currentOptions.map((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    const isSelectedFeedback = selectedFeedbackIndex === idx;

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

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-12 h-12 rounded-full bg-[#F5FFF8] border border-[#D6EEDD] flex items-center justify-center shrink-0 shadow-xs">
                      <WinnerIcon className="w-6 h-6 text-[#34A853]" />
                    </div>
                    <div>
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
                      onClick={() => handleShareResultAsImage('download')}
                      disabled={isGeneratingImage}
                      className="bg-transparent hover:bg-[#F5FFF8] active:scale-[0.98] text-[#202923] border border-[#202923] font-medium py-2.5 px-4 rounded-full transition-all duration-300 ease-fluid text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
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
