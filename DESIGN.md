---
name: Nexolution
description: "Mesa de projetos — software, automação e IA"
colors:
  blue: "#06213d"
  blue-hover: "#0b3460"
  cyan: "#078fc6"
  paper: "#ffffff"
  ink: "#081f39"
  muted: "#526578"
  line: "#d4dfe7"
  white: "#fff"
  app: "#fbfcfd"
  app-line: "#dfe8ee"
  soft-blue: "#e5f2f9"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(52px, 6.95vw, 112px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(36px, 4.25vw, 68px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "25px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  control:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 700
rounded:
  control: "8px"
  filter: "5px"
  app-item: "6px"
spacing:
  gutter: "clamp(22px, 3.75vw, 72px)"
  compact: "8px"
  control: "16px"
  panel: "24px"
  grid-column: "32px"
  grid-row: "48px"
components:
  button-blue:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
    width: "100%"
  button-blue-hover:
    backgroundColor: "{colors.blue-hover}"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.blue}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.filter}"
    padding: "11px 16px"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  demo-panel:
    backgroundColor: "{colors.app}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "24px 16px"
---

# Design System: Nexolution

## Overview

**Creative North Star: "Mesa de projetos"**

A Mesa de projetos apresenta software com clareza e presença: tipografia Manrope pesada, fundo branco, azul-marinho profundo do print da marca e divisórias precisas. A densidade maior fica dentro das demonstrações; o restante da página preserva espaço para leitura e exploração.

A identidade usa contraste de escala e cor, sem sombras decorativas. Exemplos conceituais permanecem identificados; imagens de trabalhos reais dependem das mídias fornecidas ou autorizadas pelo usuário.

**Key Characteristics:**
- Manrope pesada e títulos compactos.
- Azul-marinho sobre branco, com ciano reservado à marca e a sinais de seleção.
- Divisórias finas, controles precisos e superfícies planas.
- Demonstrações interativas com contexto explícito.

## Colors

O azul-marinho e o branco sustentam o contraste principal; o ciano identifica a marca e pequenos estados de seleção. Os outros tons dos projetos são variações locais da família azul.

### Primary

- **Azul-marinho** (`blue`): ações principais, faixa de demonstração e contato.
- **Azul-marinho claro** (`blue-hover`): resposta de hover da ação principal.
- **Ciano da marca** (`cyan`): símbolo N, linhas de seleção e revelações discretas.

### Neutral

- **Branco** (`paper`): fundo global.
- **Tinta** (`ink`): títulos, texto principal e filtros selecionados.
- **Cinza de leitura** (`muted`): apoio textual.
- **Linha** (`line`): regras estruturais.
- **Branco de contraste** (`white`): texto sobre azul-marinho e botão de contato.
- **Superfície de aplicativo** (`app`), **linha de aplicativo** (`app-line`) e **azul suave** (`soft-blue`): demonstrações, separação interna e seleção contextual.

Os painéis conceituais variam entre azul-marinho e azuis claros conforme a aplicação. São tratamentos editoriais locais, não novas cores de ação.

## Typography

Manrope é auto-hospedada em três arquivos TTF, com pesos reais 400, 700 e 800; fallback `sans-serif`, sem síntese de fonte. A hierarquia normativa está no frontmatter. Texto de apoio usa peso 400; controles e nomes usam 700; títulos usam 800.

O display ocupa duas linhas compactas. Títulos de seção mantêm entrelinha curta e espaçamento negativo. Parágrafos usam entrelinha 1.65, salvo o apoio do hero, mais compacto. Texto de serviços limita-se a 56ch, e introduções de projetos a 60ch. A interface demonstrativa usa texto contextual de 11–13px; essa densidade não define o corpo editorial.

## Layout

Container fluido com largura máxima de 1680px e gutter normativo. O hero divide título e apoio; a demonstração combina seletor, aplicativo e explicação. Projetos usam duas colunas, com intervalo de 32px horizontal e 48px vertical. O processo começa em quatro colunas.

Em 1300px, a composição comprime colunas e espaços. Em 1000px, hero e faixa demonstrativa se reorganizam; tabs ficam horizontais e processo passa a duas colunas. Em 760px, projetos e conteúdo demonstrativo usam uma coluna, sidebar e lista lateral da conversa são ocultadas, e a explicação fica abaixo da tela. Navegação principal continua visível. Em 360px, gutter reduz para 18px. Em telas a partir de 1680px, o display fixa em 112px.

## Elevation & Depth

Não há sombras. Separação vem de superfícies, linhas de 1px e contraste de cor. O foco usa contorno de 3px com afastamento de 5px; é branco em superfícies azul-marinho e azul-marinho nas claras.

**The Flat Surface Rule.** Use superfícies e divisórias para separar conteúdo, preservando a ausência de sombras da implementação.

## Shapes

Botões principais e painel demonstrativo têm cantos suaves; filtros têm raio menor. Visuais editoriais de projetos são retangulares, sem moldura arredondada. Itens internos de aplicativo usam raios discretos; avatares são circulares. Ícones são SVG de traço, normalmente 22px com stroke 1.5, e setas orientam a exploração.

## Components

### Buttons

Ações sólidas, precisas e legíveis. O botão azul ocupa a largura disponível no apoio desktop; o claro fecha a área de contato. Ambos têm altura mínima de 56px e espaçamento interno normativo. Hover escurece o azul ou suaviza o branco; a seta avança 4px. Foco mantém contorno explícito. A versão móvel ajusta tamanho e largura conforme o contexto.

### Filters

Botões contornados com texto de 13px, raio discreto e estado `aria-pressed`. Seleção usa tinta sobre branco invertidos: fundo tinta e texto branco. Hover não selecionado usa preenchimento suave. Em mobile, texto de 11px e altura mínima de 42px.

### Navigation

Wordmark pesado com tracking amplo. Links de navegação usam 15px e underline no hover; em mobile passam a 12px e ficam abaixo da marca. A navegação demonstrativa é um tablist com seleção, foco itinerante, setas e Home/End; a orientação ARIA acompanha a mudança de layout.

### Cards / Containers

Projetos são artigos abertos, sem sombra ou borda de cartão. Visual primeiro; categoria, segmento e identificação de exemplo abaixo; depois título, descrição e detalhes expansíveis. As mídias reais, quando disponíveis, usam área 16:10 com `object-fit: contain`.

### Disclosure

Detalhes nativos usam uma linha inferior, resumo clicável e ícone de adição que gira 45° quando aberto. Hover do resumo usa azul-marinho. Em mobile, o resumo tem altura mínima de 48px.

### Interactive demonstration

O painel claro organiza uma interface conceitual e sua explicação. Trocar de tab atualiza ambos e cancela temporizadores pendentes. Replay apresenta conversa, deslocamento de contato ou atualização de pedido; feedback de estado acompanha a ação. Transições de controles são curtas: cor em 180–200ms e entrada suave em 350–500ms.

A abertura do título usa uma revelação horizontal de 780ms, seguida pela chegada do painel em 740ms. Na rolagem, apenas os visuais dos projetos se revelam e as linhas dos serviços se estendem uma vez. Essa adaptação foi inspirada nas animações de entrada do oneset.io e preserva a composição da Nexolution. Sem JavaScript, o conteúdo permanece visível. Movimento reduzido desativa deslocamentos, revelações e rolagem suave, mantendo o feedback de estado; o fluxo de conversa conclui imediatamente.

Não há campo de texto editável nesta interface; a faixa inferior da conversa é conteúdo demonstrativo, não um input.

## Do's and Don'ts

### Do:

- Do manter títulos fortes, com peso 800 e espaçamento negativo.
- Do usar divisórias e mudança de superfície para organizar a informação.
- Do preservar estados de foco visíveis e respeitar movimento reduzido.
- Do colocar segmento e categoria na metadata abaixo do visual de projeto.
- Do identificar exemplos conceituais e usar mídias reais autorizadas ao apresentar trabalhos entregues.

### Don't:

- Don't transformar exemplos ilustrativos em alegações de entrega ou resultados confirmados.
- Don't adicionar sombras decorativas a componentes planos.
- Don't esconder navegação essencial em telas pequenas; reorganize-a.
