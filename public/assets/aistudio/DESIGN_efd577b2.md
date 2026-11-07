# Premium Brand — Style Reference
> Uma direção de arte sofisticada, priorizando amplo respiro, alinhamento estruturado e uma paleta de verdes elegantes.

**Theme:** light / premium

A marca se comunica com uma voz elegante, limpa e estruturada. O canvas principal é um branco com um levíssimo toque de verde (#F5FFF8), criando uma atmosfera premium que foge da esterilidade do branco puro. O verde escuro e sóbrio (#202923) atua como a base de ancoragem para elementos pesados, navegação e botões secundários, enquanto o verde vibrante (#34A853) é reservado para os pontos focais de ação (CTAs). 

A tipografia **Instrument Sans** assume o controle total. Ao invés de "gritar" com pesos extremos, ela estabelece uma hierarquia clara através de pesos equilibrados (Regular a Bold) e espaçamentos neutros. O sistema visual respira: o uso generoso de espaços em branco (whitespace) previne a poluição visual, e a geometria contrasta botões em formato de pílula (fluidez de ação) com cards estruturados de cantos suavemente arredondados (16px).

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Dark Green Base | `#202923` | `--color-dark-green` | A âncora da marca. Usado para fundos escuros, navegação, botões secundários e áreas de grande peso visual. Substitui o preto puro em grandes blocos. |
| Vibrant Green | `#34A853` | `--color-vibrant-green` | Cor de destaque primária. Usada exclusivamente para CTAs, estados ativos e tags. Sempre pareada com Absolute White (#FFFFFF) para textos e elementos internos. |
| Pure Black | `#0D0D0D` | `--color-pure-black` | Títulos (Display/Headlines) e momentos de leitura de altíssimo contraste. O contraste máximo para a tipografia premium. |
| Dark Gray | `#282D29` | `--color-dark-gray` | Textos principais, body copy e rótulos (UI). |
| Mid Gray | `#808080` | `--color-mid-gray` | Textos de apoio, placeholders e ícones secundários. |
| Soft Green Border | `#D6EEDD` | `--color-soft-green` | Usado para bordas estruturais finas, divisores e sombras sutis no modo claro. Evita o aspecto "sujo" de cinzas puros sobre o fundo esverdeado. |
| Canvas White | `#F5FFF8` | `--color-canvas-white` | Superfície principal. O fundo premium para a maioria das páginas e cards invertidos. |
| Absolute White | `#FFFFFF` | `--color-absolute-white` | Cor padrão para textos e elementos sobrepostos ao Vibrant Green (#34A853), garantindo um visual premium. |

## Tokens — Typography

### Instrument Sans — Família Tipográfica Única · `--font-instrument-sans`
- **Substitute:** Inter ou Helvetica Neue (fallback)
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Sizes:** 12px, 14px, 16px, 18px, 20px, 24px, 32px, 40px, 48px, 64px, 80px
- **Line height:** 1.20 (Display), 1.30 (Headlines), 1.50 (Subheadings), 1.60 (Body)
- **Letter spacing:** 0em a -0.01em (Neutro a levemente negativo, mantendo a elegância).
- **Role:** A espinha dorsal de toda a comunicação. Pesos 600/700 lidam com títulos de forma sóbria. Pesos 400/500 garantem legibilidade e respiro no corpo de texto e UI.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| micro | 12px | 1.60 | 0em | `--text-micro` |
| caption | 14px | 1.60 | 0em | `--text-caption` |
| body-sm | 16px | 1.60 | 0em | `--text-body-sm` |
| body | 18px | 1.60 | -0.005em | `--text-body` |
| subheading | 24px | 1.50 | -0.01em | `--text-subheading` |
| heading-sm | 32px | 1.30 | -0.01em | `--text-heading-sm` |
| heading | 48px | 1.20 | -0.01em | `--text-heading` |
| display | 64px | 1.20 | -0.015em | `--text-display` |
| display-lg | 80px | 1.10 | -0.02em | `--text-display-lg` |

## Tokens — Spacing & Shapes

**Base unit:** 4px
**Density:** Premium (Amplo respiro)

### Spacing Scale
Foco em saltos maiores nas escalas superiores para garantir os espaços em branco e o layout Grid-First.
*4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120.*

### Border Radius
| Element | Value |
|---------|-------|
| tags | 9999px |
| cards | 16px |
| inputs | 12px |
| buttons | 9999px |
| imageMasks | 16px |

### Shadows & Borders
- **Bordas Estruturais Claras:** `1px solid var(--color-soft-green)`
- **Bordas Estruturais Escuras:** `1px solid var(--color-dark-green)`
- **Shadow Elevada (Light):** `0px 8px 24px rgba(214, 238, 221, 0.4)` (Usa o Soft Green para não "sujar" o Canvas White)
- **Shadow Elevada (Dark):** `0px 8px 24px rgba(32, 41, 35, 0.4)`

## 6. Layout Principles
- **Generous Whitespace:** Amplo uso de espaços em branco para criar um visual que respira e evita poluição. O espaço é tratado como um elemento de design ativo.
- **Structured Alignment:** Os layouts são baseados em colunas (ex: web timeline) ou centralizados para promover simetria e previsibilidade.
- **Grid-First:** CSS Grid é priorizado sobre cálculos complexos de flexbox. Nunca usar hacks de `calc()` com porcentagens.
- **Section Gaps:** O padrão de distância entre grandes seções é de **64px**, criando o ritmo necessário para a leitura.

## 4. Component Stylings

### Primary CTA Pill Button
**Role:** Ação principal.
Formato de pílula (9999px radius). Fundo em Vibrant Green (#34A853). Para garantir o visual premium, o texto interno e elementos sobrepostos devem ser sempre Absolute White (#FFFFFF). Fonte Instrument Sans Medium (500). Sem bordas.

### Outlined Secondary Button
**Role:** Ação secundária.
Fundo transparente ou Canvas White, borda de 1px em Dark Green Base (#202923), raio de 9999px. Texto em Dark Green Base.

### Cards & Containers
**Role:** Estruturação de conteúdo.
Os layouts são baseados em cards com cantos suavemente arredondados (16px). Apresentam bordas estruturais finas em Soft Green (#D6EEDD) no modo claro, e "light drop shadows" tonais para criar elevação sem sujeira visual. O padding interno deve ser generoso (ex: 32px ou 40px).

### Loaders
**Role:** Estado de carregamento.
Skeletal shimmer que corresponde exatamente às dimensões do layout. O fundo do shimmer deve usar o Soft Green (#D6EEDD). Nunca utilize spinners circulares.

### Display Headline
**Role:** Voz da marca.
Instrument Sans em peso 600 ou 700. Pure Black (#0D0D0D). O espaçamento de letras é neutro a levemente negativo (-0.01em). Elegante, claro, nunca esmagador.

## CSS Custom Properties (Quick Start)

```css
:root {
  /* Colors */
  --color-dark-green: #202923;
  --color-vibrant-green: #34A853;
  --color-pure-black: #0D0D0D;
  --color-dark-gray: #282D29;
  --color-mid-gray: #808080;
  --color-soft-green: #D6EEDD;
  --color-canvas-white: #F5FFF8;
  --color-absolute-white: #FFFFFF;

  /* Typography */
  --font-instrument-sans: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;

  /* Border Radius */
  --radius-cards: 16px;
  --radius-inputs: 12px;
  --radius-buttons: 9999px;
  --radius-tags: 9999px;

  /* Spacing */
  --spacing-section-gap: 64px;
}
```
