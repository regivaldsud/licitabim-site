/* NexoLicita — site institucional.
   CONFIGURE AQUI antes de publicar: */
document.documentElement.classList.add('js');
const CONFIG = {
  DOWNLOAD_URL: '',        // ex.: 'downloads/NexoLicita-Setup-6.3.0.exe' ou o link da página de versões
  CONTATO_WHATSAPP: '5569992065695', // WhatsApp de contato (55 + DDD + número)
  CONTATO_EMAIL: '',       // ex.: 'contato@seudominio.com.br'
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* topo: fica sólido ao rolar; menu no celular */
const topBar = $('#top');
const onScroll = () => topBar.classList.toggle('solid', window.scrollY > 24);
onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
const burger = $('#burger'), menu = $('#menu');
burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
menu.addEventListener('click', e => { if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });
$('#ano').textContent = new Date().getFullYear();

/* download */
$$('[data-download]').forEach(a => {
  if (CONFIG.DOWNLOAD_URL) { a.href = CONFIG.DOWNLOAD_URL; return; }
  a.addEventListener('click', e => {
    e.preventDefault();
    $('#contato').scrollIntoView({ behavior: 'smooth' });
    const m = $('#formMsg'); m.textContent = 'O link de download será publicado em breve. Deixe seu contato e enviamos o instalador.';
  });
});

/* revelar ao rolar */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' }) : null;
$$('.rv').forEach(el => io ? io.observe(el) : el.classList.add('in'));

/* um dia com o NexoLicita */
const DIA = [
  { h: '07:00', t: 'As consultas salvas já rodaram', d: 'Antes de você chegar, cada consulta salva refez a busca no PNCP. As licitações novas da sua área aparecem com o selo Nova, e as que encerraram saem da lista sozinhas.', img: 'consultas-1366-light.png' },
  { h: '08:30', t: 'Triagem por aderência', d: 'Na Busca por área, cada contratação tem uma nota de 0 a 100 com o motivo: objeto, região, valor, prazo e modalidade. Você salva as que valem a pena e descarta o resto.', img: 'busca-continua-1366-light.png' },
  { h: '10:00', t: 'Ler o edital', d: 'O PDF é baixado do PNCP e lido. Em poucos segundos sai o resumo e o checklist de habilitação, com a página e o trecho de cada exigência.', img: 'edital-checklist-1366-light.png' },
  { h: '11:30', t: 'Documentos do cliente', d: 'O checklist é comparado com as certidões cadastradas. Aparece o que está válido, o que vence antes da sessão e o que falta, com o link oficial para emitir.', img: 'documentacao-1366-light.png' },
  { h: '14:00', t: 'Sessão pública', d: 'Durante a disputa, os lances de cada fornecedor entram no ranking com o desconto sobre o estimado. As mensagens do pregoeiro ficam registradas no processo.', img: 'sessao-publica-ranking-1366-light.png' },
  { h: '16:00', t: 'Tempo real', d: 'Os processos que você acompanha são consultados de novo. Mudou a situação, o prazo ou o valor? O NexoLicita destaca a diferença.', img: 'tempo-real-1366-light.png' },
  { h: '17:30', t: 'Relatório em ABNT', d: 'O dia termina com o relatório do edital ou o dossiê do cliente em PDF, no padrão ABNT, pronto para enviar.', img: 'relatorios-1366-light.png' },
];
const hours = $('#hours'), moment = $('#moment');
hours.innerHTML = DIA.map((x, i) => `<button type="button" role="tab" data-i="${i}" aria-selected="false"><b>${x.h}</b><span>${esc(x.t)}</span></button>`).join('');
function showHour(i) {
  const x = DIA[i];
  $$('button', hours).forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i); });
  moment.innerHTML = `<span class="eyebrow">${x.h}</span><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p><div class="frame"><img src="img/${x.img}" alt="${esc(x.t)}"></div>`;
}
hours.addEventListener('click', e => { const b = e.target.closest('button'); if (b) showHour(+b.dataset.i); });
showHour(0);

/* tour pelas telas */
const TOUR = [
  { id: 'busca', ic: 'travel_explore', l: 'Busca por área', img: 'busca-continua-1366-light.png', c: 'Contratações abertas no PNCP, classificadas pela aderência ao seu perfil.' },
  { id: 'editais', ic: 'description', l: 'Editais', img: 'editais-1366-light.png', c: 'Carteira de participação com valor em disputa, prazos e andamento do checklist.' },
  { id: 'processo', ic: 'gavel', l: 'Processo 360°', img: 'processos-1366-light.png', c: 'Itens, arquivos, resultados e histórico de qualquer compra do PNCP.' },
  { id: 'fornecedores', ic: 'storefront', l: 'Fornecedores', img: 'fornecedores-1366-light.png', c: 'Cadastro na Receita, contratos e itens vencidos por CNPJ.' },
  { id: 'agenda', ic: 'calendar_month', l: 'Agenda', img: 'agenda-1366-light.png', c: 'Aberturas, encerramentos e vencimentos de documentos num só calendário.' },
  { id: 'relatorios', ic: 'monitoring', l: 'Relatórios', img: 'relatorios-1366-light.png', c: 'Painel de mercado com valores reais em R$ e PDF no padrão ABNT.' },
];
const tabs = $('#tourTabs'), timg = $('#tourImg'), tcap = $('#tourCap');
tabs.innerHTML = TOUR.map((x, i) => `<button type="button" role="tab" data-i="${i}"><span class="ms">${x.ic}</span>${esc(x.l)}</button>`).join('');
function showTour(i) { const x = TOUR[i]; $$('button', tabs).forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i); }); timg.src = 'img/' + x.img; timg.alt = x.l; tcap.textContent = x.c; }
tabs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) showTour(+b.dataset.i); });
showTour(0);

/* formulário: valida o CNPJ e monta a mensagem para WhatsApp ou e-mail */
const form = $('#contactForm'), fmsg = $('#formMsg'), cnpjIn = form.cnpj;
cnpjIn.addEventListener('input', () => {
  const d = cnpjIn.value.replace(/\D/g, '').slice(0, 14);
  cnpjIn.value = d.replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2');
});
function cnpjValido(v) {
  const c = v.replace(/\D/g, ''); if (c.length !== 14 || /^(\d)\1+$/.test(c)) return false;
  const dv = n => { let s = 0, p = n - 7; for (let i = 0; i < n; i++) { s += +c[i] * p--; if (p < 2) p = 9; } const r = s % 11; return r < 2 ? 0 : 11 - r; };
  return dv(12) === +c[12] && dv(13) === +c[13];
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  if (!cnpjValido(d.cnpj)) { fmsg.textContent = 'Confira o CNPJ: os dígitos verificadores não conferem.'; cnpjIn.focus(); return; }
  if (!d.nome.trim()) { fmsg.textContent = 'Informe o seu nome.'; form.nome.focus(); return; }
  const texto = `Olá! Quero conhecer o NexoLicita.\nNome: ${d.nome}\nCNPJ: ${d.cnpj}\nRamo: ${d.ramo}${d.msg ? '\nMensagem: ' + d.msg : ''}`;
  if (CONFIG.CONTATO_WHATSAPP) { window.open('https://wa.me/' + CONFIG.CONTATO_WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener'); fmsg.textContent = 'Abrimos o WhatsApp com a sua mensagem pronta.'; return; }
  if (CONFIG.CONTATO_EMAIL) { location.href = 'mailto:' + CONFIG.CONTATO_EMAIL + '?subject=' + encodeURIComponent('NexoLicita — contato') + '&body=' + encodeURIComponent(texto); fmsg.textContent = 'Abrimos o seu e-mail com a mensagem pronta.'; return; }
  fmsg.textContent = 'O canal de contato ainda não foi configurado neste site.';
});
