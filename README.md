# Nexolution — portfólio

Site estático em HTML, CSS e JavaScript, sem dependências de produção.

## Abrir localmente

Na pasta do projeto:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Acesse http://127.0.0.1:4173. Publique `index.html`, `styles.css`, `app.js` e `assets/` no serviço de hospedagem. Arquivos de planejamento, revisão e prompts não são necessários na publicação.

## Mídias dos projetos

Os seis itens em `projects`, no arquivo `app.js`, têm identificadores estáveis: `clinica`, `barbearia`, `loja`, `delivery`, `escritorio` e `estetica`. Enquanto aguardam os prints reais, são apresentados como exemplos de aplicação sem métricas de resultados.

Crie `assets/projects/` e coloque os prints (WebP, PNG ou JPEG) e vídeos MP4. No item correspondente, substitua `media: null` por:

```js
media: {
  type: 'image',
  src: 'assets/projects/loja.webp',
  alt: 'Tela real do catálogo da loja',
  caption: 'Descrição aprovada do projeto'
}
```

Para vídeos:

```js
media: {
  type: 'video',
  src: 'assets/projects/loja.mp4',
  poster: 'assets/projects/loja-capa.webp',
  alt: 'Demonstração da navegação e finalização de pedido',
  caption: 'Demonstração do projeto'
}
```

Os vídeos têm controles, não iniciam automaticamente e carregam apenas metadados. Use gravações sem informações privadas dos clientes. Confirme a identificação do projeto e qualquer resultado antes de alterar o rótulo de exemplo de aplicação.

## Visual

Impeccable orienta as mudanças de front-end. As demonstrações da abertura usam HTML interativo e dados fictícios claramente identificados. Não são prints de projetos entregues. A paleta principal é branco, azul-marinho e ciano, conforme o print da marca enviado pelo usuário. O símbolo “N” em `assets/brand/nexolution-n.png` foi isolado/reconstruído a partir do print e mantém seu prompt de origem incorporado. As fontes Manrope estão hospedadas no próprio projeto; consulte `assets/fonts/OFL.txt`.

## Verificação de interface

Com o servidor local em execução, `node scripts/review-ui.mjs` verifica cinco larguras de tela, navegação por teclado, filtros, detalhes e demonstrações. Requer Google Chrome e Playwright no ambiente de desenvolvimento. O script usa a instalação local do Playwright ou a disponível no runtime do Codex; também aceita `PLAYWRIGHT_MODULE` com o caminho do módulo. Capturas e relatórios são gravados em `.impeccable/review/`, fora do controle de versão.

`node scripts/review-motion.mjs` verifica a abertura, a revelação dos projetos e o comportamento com movimento reduzido. A referência para o ritmo das animações foi o site [OneSet](https://oneset.io/); a implementação usa CSS e `IntersectionObserver`, sem dependências de produção.
