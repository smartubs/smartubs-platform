// js/pages/dashboardProfissional.js
import { svg } from '../utils/icons.js';
import { renderStaffShell } from '../components/sidebar.js';
import { getCurrentInAttendance, getWaitingQueue, callPatient, finishPatient } from '../services/patientService.js';
import { formatTimer } from '../utils/formatters.js';

let timerInterval = null;
let timerPatientId = null;
let consultStart = null;

export function render(container){
  renderStaffShell(container, '/profissional', 'Dashboard do profissional', 'Seus atendimentos de hoje', `
    <div id="cp-container"></div>
    <div class="dash-grid">
      <div>
        <div class="section-title">Próximos da fila <span class="count" id="queue-count">0</span></div>
        <div class="queue-mini" id="queue-mini"></div>
      </div>
      <div>
        <div class="section-title">Anotações do atendimento</div>
        <div class="notes-card">
          <textarea id="prof-notes" placeholder="Registre observações organizacionais sobre o atendimento atual..."></textarea>
          <div class="notes-hint">Campo de apoio administrativo. Não substitui o prontuário clínico nem constitui diagnóstico.</div>
        </div>
      </div>
    </div>
  `);

  // Limpa qualquer timer de uma visita anterior a esta página.
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; timerPatientId = null; }

  renderCurrentPatient(container);
  renderQueue(container);
}

function renderCurrentPatient(container){
  const current = getCurrentInAttendance();
  const box = container.querySelector('#cp-container');
  if (!box) return; // usuário já navegou para outra página

  if (!current) {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    timerPatientId = null;
    box.innerHTML = `
      <div class="cp-empty">
        ${svg('professional')}
        <div style="font-weight:700;color:var(--ink);margin-bottom:4px;">Nenhum paciente em atendimento</div>
        <div style="font-size:.85rem;">Chame o próximo paciente da fila ao lado para iniciar.</div>
      </div>`;
    return;
  }

  if (timerPatientId !== current.id) {
    timerPatientId = current.id;
    consultStart = Date.now();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      const el = document.getElementById('cp-timer-value');
      if (!el) { clearInterval(timerInterval); return; } // página trocou
      el.textContent = formatTimer(Math.floor((Date.now() - consultStart) / 1000));
    }, 1000);
  }

  box.innerHTML = `
    <div class="current-patient">
      <div class="cp-left">
        <div class="cp-ring">${svg('check', 'style="color:white"')}</div>
        <div>
          <div class="cp-eyebrow">Em atendimento agora</div>
          <div class="cp-name">${current.name}</div>
          <div class="cp-meta">${current.protocol} · ${current.symptoms} · classificação: ${current.priority}</div>
        </div>
      </div>
      <div class="cp-actions">
        <div class="cp-timer" id="cp-timer-value">00:00:00</div>
        <button class="btn btn-secondary" style="background:rgba(255,255,255,.92);" id="btn-finish-current">Finalizar atendimento</button>
      </div>
    </div>
  `;

  box.querySelector('#btn-finish-current').addEventListener('click', () => {
    finishPatient(current.id);
    renderCurrentPatient(container);
    renderQueue(container);
  });
}

function renderQueue(container){
  const waiting = getWaitingQueue();
  const countEl = container.querySelector('#queue-count');
  const listEl = container.querySelector('#queue-mini');
  if (!countEl || !listEl) return;

  countEl.textContent = waiting.length;

  if (waiting.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state" style="padding:30px 12px;">
        ${svg('empty')}
        <div>Fila vazia no momento</div>
      </div>`;
    return;
  }

  listEl.innerHTML = waiting.map((p, i) => `
    <div class="queue-mini-item">
      <div class="queue-order">${i + 1}</div>
      <div class="priority-bar ${p.priority}" style="min-height:34px;"></div>
      <div style="flex:1;min-width:0;">
        <div class="qi-name">${p.name}</div>
        <div class="qi-sym">${p.symptoms}</div>
      </div>
      <button class="mini-btn call qi-call" data-call="${p.id}">Chamar</button>
    </div>
  `).join('');

  listEl.querySelectorAll('[data-call]').forEach(btn => {
    btn.addEventListener('click', () => {
      callPatient(btn.dataset.call);
      renderCurrentPatient(container);
      renderQueue(container);
    });
  });
}
