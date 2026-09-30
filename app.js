'use strict';
document.documentElement.classList.add('motion-enhanced');
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const whatsapp = 'https://wa.me/5581991879966?text=';
const contacts = [['JS','Juliana Souza','Olá! Gostaria de agendar um horário...'],['RC','Ricardo Costa','Vocês têm disponibilidade esta semana?'],['LM','Lucas Mendes','Preciso de mais informações.'],['AF','Amanda Ferreira','Muito obrigada pelo atendimento!'],['CP','Carlos Pereira','Podemos remarcar para sexta?']];
const views = {
  atendimento: {
    description:'Exemplo de fluxo de atendimento com resposta e confirmação de agendamento. Interface ilustrativa para mostrar como automação e organização podem simplificar sua operação.',
    outcome:`${icon('calendar')}<div><strong>Agendamento confirmado</strong><p>Terça-feira, às 10h<br>Reunião online de demonstração</p></div>`,
    action:'Reproduzir fluxo',
    render:()=>`<div class="conversation-list"><div class="list-heading">Conversas ${icon('search')}</div>${contacts.map(([initials,name,message],i)=>`<div class="contact-item ${i===0?'active':''}"><span class="avatar">${initials}</span><span class="contact-info"><strong>${name}</strong><small>${message}</small></span></div>`).join('')}</div><div class="chat"><div class="chat-heading"><span class="avatar">JS</span><span><strong>Juliana Souza</strong><small>Cliente de exemplo</small></span>${icon('search')}</div><div class="messages"><div class="message">Olá! Gostaria de agendar um horário para conhecer o sistema.</div><div class="message outgoing">Olá, Juliana! Claro, vamos agendar. Qual dia e horário funciona melhor para você?<time>10:26</time></div><div class="message">Pode ser na terça-feira, às 10h?</div><div class="message outgoing">Perfeito! Seu horário está confirmado para terça-feira, às 10h. Te envio um lembrete por aqui.<time>10:28</time></div></div><div class="chat-footer"><span>Exemplo de conversa automatizada</span>${icon('check')}</div></div>`
  },
  gestao: {
    description:'Um exemplo de CRM para reunir contatos, acompanhar propostas e saber qual é o próximo passo de cada negociação. Os dados desta interface são fictícios.',
    outcome:`${icon('user')}<div><strong>Cada contato, um próximo passo</strong><p>Informações organizadas para a equipe continuar a conversa.</p></div>`,
    action:'Simular avanço de contato',
    render:()=>`<div class="management-demo"><div class="demo-view-title"><h3>Seus negócios</h3><span class="demo-label">Funil de exemplo</span></div><div class="pipeline"><div class="pipeline-column" data-column="new"><h4>Novos contatos</h4><div class="lead" id="moving-lead"><strong><span class="lead-dot"></span>Contato A</strong><p>Interesse em um sistema</p></div><div class="lead"><strong>Contato B</strong><p>Aguardando primeiro retorno</p></div></div><div class="pipeline-column" data-column="talk"><h4>Em conversa</h4><div class="lead"><strong>Contato C</strong><p>Reunião de diagnóstico</p></div></div><div class="pipeline-column"><h4>Proposta enviada</h4><div class="lead"><strong>Contato D</strong><p>Escopo em avaliação</p></div></div></div><p class="demo-footnote">Demonstração com contatos fictícios.</p></div>`
  },
  ecommerce: {
    description:'Do catálogo ao acompanhamento do pedido: um exemplo de como uma loja pode conectar vendas, pagamento e atendimento. Pedido e valores meramente ilustrativos.',
    outcome:`${icon('bag')}<div><strong>Pedido organizado</strong><p>Cliente informado e equipe pronta para a próxima etapa.</p></div>`,
    action:'Simular atualização do pedido',
    render:()=>`<div class="commerce-demo"><div class="demo-view-title"><h3>Pedidos</h3><span class="demo-label">Loja de exemplo</span></div><div class="order-summary"><h4>Pedido demonstrativo</h4><div class="order-row"><span>Camiseta essencial</span><strong>1 unidade</strong></div><div class="order-row"><span>Forma de pagamento</span><strong>Pix</strong></div><div class="order-row"><span>Status</span><strong id="order-status">Pagamento confirmado</strong></div><div class="order-row"><span>Cliente</span><strong>Cliente de exemplo</strong></div></div><div class="order-track"><span>${icon('check')}Recebido</span><span>${icon('check')}Pago</span><span id="shipping-step">${icon('bag')}Em preparação</span></div><p class="demo-footnote">Nenhuma compra ou cobrança é realizada nesta demonstração.</p></div>`
  }
};
let currentDemo='atendimento';
let demoTimers=[];
let managementAdvanced=false;
let orderAdvanced=false;
const screen=document.getElementById('demo-screen');
const action=document.getElementById('demo-action');
const status=document.getElementById('demo-status');
function clearDemoTimers(){demoTimers.forEach(clearTimeout);demoTimers=[];}
function selectDemo(name){
  if(!views[name])return;
  clearDemoTimers();currentDemo=name;managementAdvanced=false;orderAdvanced=false;
  document.querySelectorAll('[data-demo]').forEach(tab=>{const active=tab.dataset.demo===name;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
  document.querySelectorAll('[data-nav]').forEach(item=>item.classList.toggle('selected',item.dataset.nav===name));
  document.getElementById('demo-panel').setAttribute('aria-labelledby',`tab-${name}`);
  screen.innerHTML=views[name].render();
  screen.classList.remove('is-changing');void screen.offsetWidth;screen.classList.add('is-changing');
  document.getElementById('demo-description').textContent=views[name].description;
  document.getElementById('demo-outcome').innerHTML=views[name].outcome;
  action.innerHTML=views[name].action+icon('play');action.disabled=false;status.textContent='';
}
const demoTabs=[...document.querySelectorAll('[data-demo]')];
demoTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>goTo(tab.dataset.demo));
  tab.addEventListener('keydown',event=>{let next=index;if(['ArrowDown','ArrowRight'].includes(event.key))next=(index+1)%demoTabs.length;else if(['ArrowUp','ArrowLeft'].includes(event.key))next=(index-1+demoTabs.length)%demoTabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=demoTabs.length-1;else return;event.preventDefault();goTo(demoTabs[next].dataset.demo);demoTabs[next].focus();});
});
const tabsLayout=matchMedia('(max-width: 1000px)');
function updateTabOrientation(){document.querySelector('.solution-tabs').setAttribute('aria-orientation',tabsLayout.matches?'horizontal':'vertical');}
tabsLayout.addEventListener('change',updateTabOrientation);updateTabOrientation();
function playDemo(){
  if(currentDemo==='atendimento'){
    const messages=[...screen.querySelectorAll('.message')];
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){status.textContent='Fluxo concluído: agendamento confirmado.';return;}
    action.disabled=true;status.textContent='Reproduzindo a conversa de exemplo…';messages.forEach(message=>message.classList.add('is-pending'));
    messages.forEach((message,index)=>demoTimers.push(setTimeout(()=>{message.classList.remove('is-pending');message.classList.add('message-enter');if(index===messages.length-1){action.disabled=false;status.textContent='Fluxo concluído: agendamento confirmado.';}},350+index*650)));
  }else if(currentDemo==='gestao'){
    const lead=document.getElementById('moving-lead');managementAdvanced=!managementAdvanced;
    screen.querySelector(`[data-column="${managementAdvanced?'talk':'new'}"]`).appendChild(lead);
    action.innerHTML=(managementAdvanced?'Reiniciar demonstração':views.gestao.action)+icon('play');
    status.textContent=managementAdvanced?'Contato A movido para Em conversa.':'Contato A voltou para Novos contatos.';
  }else{
    orderAdvanced=!orderAdvanced;document.getElementById('order-status').textContent=orderAdvanced?'Pedido enviado':'Pagamento confirmado';
    document.getElementById('shipping-step').innerHTML=icon(orderAdvanced?'check':'bag')+(orderAdvanced?'Enviado':'Em preparação');
    action.innerHTML=(orderAdvanced?'Reiniciar demonstração':views.ecommerce.action)+icon('play');status.textContent=orderAdvanced?'Exemplo: cliente informado sobre o envio.':'Demonstração reiniciada.';
  }
}
action.addEventListener('click',playDemo);

// Para publicar mídias reais, preencha media e mediaAlt conforme README.md.
const projects=[
 {id:'clinica',category:'automacao',label:'Automação',segment:'Clínica odontológica',title:'Atendimento e acompanhamento de pacientes',intro:'Uma conversa mais organizada, do primeiro contato ao lembrete de consulta.',visual:'Atendimento.\nSem interrupções.',tone:'blue',steps:['Contato','Agendamento','Lembrete'],features:['Respostas para dúvidas frequentes e encaminhamento para a equipe','Confirmação e lembrete de consulta pelo WhatsApp','Fluxos de acompanhamento para a base de pacientes'],media:null},
 {id:'barbearia',category:'crm',label:'CRM & gestão',segment:'Barbearia',title:'Clientes, agenda e histórico no mesmo lugar',intro:'Uma visão do relacionamento para organizar o atendimento e os retornos.',visual:'Conheça quem\nvolta sempre.',tone:'mint',steps:['Cliente','Histórico','Retorno'],features:['Perfil de cliente com histórico de serviços e preferências','Agenda integrada com confirmação de horário','Visão dos atendimentos e oportunidades de retorno'],media:null},
 {id:'loja',category:'ecommerce',label:'E-commerce',segment:'Loja de moda',title:'Da vitrine digital ao pedido organizado',intro:'Uma loja conectada ao atendimento, ao estoque e à rotina de vendas.',visual:'Sua loja.\nAlém do balcão.',tone:'ink',steps:['Catálogo','Pedido','Entrega'],features:['Catálogo de produtos com controle de estoque','Checkout com integração de pagamento','Acompanhamento de pedidos e comunicação com o cliente'],media:null},
 {id:'delivery',category:'automacao',label:'Automação',segment:'Pizzaria & delivery',title:'Pedidos que chegam com tudo no lugar',intro:'Um fluxo para reduzir o trabalho manual entre o WhatsApp e a cozinha.',visual:'Do pedido\nà cozinha.',tone:'sand',steps:['Cardápio','Pedido','Preparo'],features:['Cardápio digital e montagem de pedidos','Confirmação com informações de entrega','Fila organizada para acompanhamento pela equipe'],media:null},
 {id:'escritorio',category:'crm',label:'CRM & gestão',segment:'Escritório de advocacia',title:'Cada contato com acompanhamento',intro:'Organização para reunir solicitações, tarefas e próximos passos da equipe.',visual:'Nenhuma conversa\nsem contexto.',tone:'lilac',steps:['Contato','Consulta','Acompanhamento'],features:['Funil de contatos e organização de consultas','Lembretes de tarefas e acompanhamento de solicitações','Centralização de informações para a equipe'],media:null},
 {id:'estetica',category:'agendamento',label:'Agendamento',segment:'Clínica de estética',title:'Uma agenda que começa no seu site',intro:'Uma experiência para conhecer os serviços e solicitar um horário.',visual:'Seu próximo\nhorário. Online.',tone:'blue',steps:['Serviço','Horário','Confirmação'],features:['Site com apresentação dos serviços','Seleção de horários e confirmação de agendamento','Painel de agenda e lembretes automáticos'],media:null}
];
function mediaMarkup(project){
  if(!project.media)return `<div class="project-visual ${project.tone}"><p class="project-visual-title">${escapeHtml(project.visual).replace(/\n/g,'<br>')}</p>${icon('external')}<div class="project-route">${project.steps.map(escapeHtml).join(icon('arrow'))}</div></div>`;
  const src=escapeHtml(project.media.src);const description=escapeHtml(project.media.alt||project.title);
  const element=project.media.type==='video'?`<video controls playsinline preload="metadata" aria-label="${description}" ${project.media.poster?`poster="${escapeHtml(project.media.poster)}"`:''}><source src="${src}" type="video/mp4">Seu navegador não suporta vídeo. <a href="${src}">Baixar demonstração</a>.</video>`:`<img src="${src}" alt="${description}" loading="lazy" decoding="async">`;
  return `<div class="project-media">${element}</div>${project.media.caption?`<p class="project-caption">${escapeHtml(project.media.caption)}</p>`:''}`;
}
const grid=document.getElementById('projects-grid');
grid.innerHTML=projects.map(project=>`<article class="project" data-category="${project.category}" id="projeto-${project.id}">${mediaMarkup(project)}<div class="project-meta"><span>${escapeHtml(project.label)} · ${escapeHtml(project.segment)}</span><span>Exemplo de aplicação</span></div><h3>${escapeHtml(project.title)}</h3><p class="project-intro">${escapeHtml(project.intro)}</p><details><summary>Explorar a solução ${icon('plus')}</summary><div class="project-details"><h4>O que pode fazer parte</h4><ul>${project.features.map(feature=>`<li>${escapeHtml(feature)}</li>`).join('')}</ul><a class="text-link" href="${whatsapp}${encodeURIComponent(`Olá! Quero conversar sobre ${project.title.toLowerCase()} para o meu negócio.`)}" target="_blank" rel="noopener noreferrer">Quero uma solução assim ${icon('arrow')}</a></div></details></article>`).join('');
function setFilter(filter){
  if(!['todos','automacao','crm','ecommerce','agendamento'].includes(filter))return;
  document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===filter)));
  let count=0;grid.querySelectorAll('.project').forEach(project=>{project.hidden=filter!=='todos'&&project.dataset.category!==filter;if(!project.hidden)count++;});
  document.getElementById('filter-status').textContent=`${count} ${count===1?'aplicação encontrada':'aplicações encontradas'}.`;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>setFilter(button.dataset.filter)));
document.querySelectorAll('[data-service-filter]').forEach(link=>link.addEventListener('click',()=>setFilter(link.dataset.serviceFilter)));
grid.querySelectorAll('img,video').forEach(media=>{
  const handleError=()=>{const fallback=document.createElement('p');fallback.className='project-media-error';fallback.textContent='Não foi possível carregar esta mídia. Explore os detalhes da solução abaixo.';media.closest('.project-media').replaceChildren(fallback);};
  media.addEventListener('error',handleError,{once:true});media.querySelector('source')?.addEventListener('error',handleError,{once:true});
});
selectDemo('atendimento');

// Rolagem guiada (desktop): cada terço da seção escolhe e inicia uma demonstração.
const showcase=document.querySelector('.showcase');
// Só em tela larga: no celular o painel é alto e as abas ficam manuais.
const scrollMode=matchMedia('(min-width: 1001px) and (prefers-reduced-motion: no-preference)');
let scrollIndex=-1;
// Do topo da página (ou de quando a seção entra na tela) até a base da seção passar de 50% da tela.
function scrollRange(){const docTop=showcase.getBoundingClientRect().top+scrollY;const start=Math.max(0,docTop-innerHeight*.7);return [start,Math.max(start+1,docTop+showcase.offsetHeight-innerHeight*.5)];}
function scrollProgress(){const [start,end]=scrollRange();return Math.min(.999,Math.max(0,(scrollY-start)/(end-start)));}
function autoPlay(name){
  selectDemo(name);
  if(name!=='atendimento')demoTimers.push(setTimeout(playDemo,1100));else playDemo();
}
function onScroll(){
  if(!scrollMode.matches)return;
  if(scrollIndex===-1&&showcase.getBoundingClientRect().top>innerHeight*.7)return;
  const progress=scrollProgress();const count=demoTabs.length;
  let index=Math.min(count-1,Math.floor(progress*count));
  // Folga de 3% nas fronteiras evita que a troca fique oscilando quando a altura da seção muda.
  if(scrollIndex>-1&&index!==scrollIndex&&Math.abs(progress*count-(index>scrollIndex?index:scrollIndex))<.09)index=scrollIndex;
  if(index===scrollIndex)return;
  scrollIndex=index;autoPlay(demoTabs[index].dataset.demo);
}
function goTo(name){
  if(!scrollMode.matches){selectDemo(name);return;}
  const i=demoTabs.findIndex(tab=>tab.dataset.demo===name);
  const [start,end]=scrollRange();
  scrollTo({top:start+(end-start)*(i+.5)/demoTabs.length,behavior:'smooth'});
}
function syncScrollMode(){document.documentElement.classList.toggle('scroll-demo',scrollMode.matches);scrollIndex=-1;onScroll();}
scrollMode.addEventListener('change',syncScrollMode);
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);
syncScrollMode();

// A abertura acontece uma vez; no restante da página, a rolagem só revela
// os visuais dos projetos e as linhas que ligam os serviços.
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  const motionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('is-in-view');
      motionObserver.unobserve(entry.target);
    });
  },{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.project-visual,.service-row').forEach(element=>motionObserver.observe(element));
}
