// js/pages/triagem.js
import { svg } from '../utils/icons.js';
import { navigate } from '../router.js';
import { draft } from '../state/triageDraft.js';
import { finalizeTriage } from '../services/patientService.js';

// Perguntas fixas da Avaliação Inicial Inteligente.
// `insertAfter` permite acrescentar uma pergunta condicional logo depois
// de outra, dependendo da resposta (ex.: temperatura só aparece se febre = sim).
const BASE_QUESTIONS = [
  { id: 'febre', text: 'Você está com febre?', type: 'bool', icon: 'thermo' },
  { id: 'dor_cabeca', text: 'Está sentindo dor de cabeça?', type: 'bool', icon: 'head' },
  { id: 'dor_corpo', text: 'Está com dor no corpo?', type: 'bool', icon: 'body' },
  { id: 'tosse', text: 'Está com tosse?', type: 'bool', icon: 'lungs' },
  { id: 'dor_garganta', text: 'Sente dor de garganta?', type: 'bool', icon: 'throat' },
  { id: 'falta_ar', text: 'Está sentindo falta de ar?', type: 'bool', icon: 'breath' },
  { id: 'nausea', text: 'Está sentindo náusea?', type: 'bool', icon: 'nausea' },
  { id: 'vomito', text: 'Teve episódios de vômito?', type: 'bool', icon: 'vomit' },
  { id: 'diarreia', text: 'Está com diarreia?', type: 'bool', icon: 'diarrhea' },
  { id: 'dias', text: 'Há quantos dias sente esses sintomas?', type: 'number', unit: 'dias', icon: 'calendar' },
  { id: 'cronica', text: 'Possui alguma doença crônica?', type: 'bool', icon: 'chronic' },
  { id: 'medicamentos', text: 'Utiliza algum medicamento atualmente?', type: 'bool', icon: 'pill' },
  { id: 'alergias', text: 'Possui alguma alergia conhecida?', type: 'bool', icon: 'allergy' }
];

const CONDITIONAL = {
  febre: { id: 'temperatura', text: 'Qual é a temperatura aproximada?', type: 'number', unit: '°C', icon: 'thermo' },
  cronica: { id: 'cronica_qual', text: 'Qual doença crônica você possui?', type: 'text', icon: 'note' },
  medicamentos: { id: 'medicamentos_qual', text: 'Quais medicamentos você utiliza?', type: 'text', icon: 'note' },
  alergias: { id: 'alergias_qual', text: 'Quais alergias você possui?', type: 'text', icon: 'note' }
};

let qIndex = 0;

function buildQueue(){
  const queue = [];
  BASE_QUESTIONS.forEach(q => {
    queue.push(q);
    const cond = CONDITIONAL[q.id];
    if (cond && draft.answers[q.id] === 'sim') queue.push(cond);
  });
  return queue;
}

export function render(container){
  if (!draft.paciente?.nome) {
    // Segurança: sem cadastro em andamento, volta para o início do fluxo.
    navigate('/cadastro');
    return;
  }
  qIndex = 0;

  container.innerHTML = `
    <div class="kiosk-bg">
      <div class="blob blob1"></div>
      <div class="blob blob2"></div>
      <div style="width:100%;display:flex;flex-direction:column;align-items:center;">
        <div class="progress-wrap">
          <div class="progress-top">
            <span class="progress-label">Avaliação inicial inteligente</span>
            <span class="progress-label" id="progress-count"></span>
          </div>
          <div class="progress-track"><div class="progress-fill" id="progress-fill" style="width:0%"></div></div>
        </div>
        <div class="glass-card q-card">
          <div id="q-content" class="q-transition"></div>
        </div>
      </div>
    </div>
  `;

  renderQuestion(container);
}

function renderQuestion(container){
  const queue = buildQueue();
  if (qIndex >= queue.length) { finish(); return; }

  const q = queue[qIndex];
  container.querySelector('#progress-count').textContent = `${qIndex + 1} / ${queue.length}`;
  container.querySelector('#progress-fill').style.width = `${Math.round(((qIndex + 1) / queue.length) * 100)}%`;

  const content = container.querySelector('#q-content');
  content.classList.add('leaving');

  setTimeout(() => {
    content.innerHTML = questionMarkup(q, qIndex > 0);
    content.classList.remove('leaving');
    bindQuestionEvents(container, q);
  }, 160);
}

function questionMarkup(q, showBack){
  let body = `
    <div class="q-icon">${svg(q.icon)}</div>
    <h3 class="q-text">${q.text}</h3>
  `;

  if (q.type === 'bool') {
    body += `
      <p class="q-hint">Selecione uma opção</p>
      <div class="q-options">
        <button class="opt-btn yes" data-answer="sim">${svg('check', 'width="17" height="17"')} Sim</button>
        <button class="opt-btn no" data-answer="nao">${svg('close', 'width="17" height="17"')} Não</button>
      </div>
    `;
  } else if (q.type === 'number') {
    body += `
      <p class="q-hint">Digite um valor${q.unit ? ' em ' + q.unit : ''}</p>
      <div class="q-input-wrap">
        <input type="number" id="q-input" min="0" step="${q.unit === '°C' ? '0.1' : '1'}" placeholder="${q.unit === '°C' ? 'Ex: 38.5' : 'Ex: 3'}">
      </div>
      <div class="q-nav"><button class="btn btn-primary" id="q-submit">Continuar</button></div>
    `;
  } else if (q.type === 'text') {
    body += `
      <p class="q-hint">Descreva brevemente</p>
      <div class="q-input-wrap"><textarea id="q-input" placeholder="Digite aqui..."></textarea></div>
      <div class="q-nav"><button class="btn btn-primary" id="q-submit">Continuar</button></div>
    `;
  }

  if (showBack) {
    body += `<div class="q-nav" style="margin-top:14px;"><button class="btn-ghost" id="q-back">← Pergunta anterior</button></div>`;
  }
  return body;
}

function bindQuestionEvents(container, q){
  container.querySelectorAll('[data-answer]').forEach(btn => {
    btn.addEventListener('click', () => {
      draft.answers[q.id] = btn.dataset.answer;
      qIndex++;
      renderQuestion(container);
    });
  });

  const submitBtn = container.querySelector('#q-submit');
  if (submitBtn) {
    const submit = () => {
      const input = container.querySelector('#q-input');
      const value = input.value.trim();
      if (!value) { input.style.borderColor = 'var(--red)'; input.focus(); return; }
      draft.answers[q.id] = value;
      qIndex++;
      renderQuestion(container);
    };
    submitBtn.addEventListener('click', submit);
    container.querySelector('#q-input').addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
    container.querySelector('#q-input').focus();
  }

  const backBtn = container.querySelector('#q-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => { qIndex = Math.max(0, qIndex - 1); renderQuestion(container); });
  }
}

function finish(){
  const result = finalizeTriage(draft.paciente, draft.answers);
  draft.result = result;
  navigate('/resultado');
}
