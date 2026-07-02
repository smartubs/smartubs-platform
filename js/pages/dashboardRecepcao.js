// js/pages/dashboardRecepcao.js
import { svg } from '../utils/icons.js';
import { navigate } from '../router.js';
import { renderStaffShell } from '../components/sidebar.js';
import { listPatients, callPatient, finishPatient } from '../services/patientService.js';

let filter = 'todos';

const STATUS_LABEL = { aguardando: 'Aguardando', 'em-atendimento': 'Em atendimento', finalizado: 'Finalizado' };

export function render(container){
  filter = 'todos';

  renderStaffShell(container, '/recepcao', 'Dashboard da recepção', 'Fila de atendimento em tempo real', `
    <div class="filters" id="dash-filters">
      <button class="chip active" data-f="todos">Todos</button>
      <button class="chip" data-f="verde"><span class="dot verde"></span>Verde</button>
      <button class="chip" data-f="amarelo"><span class="dot amarelo"></span>Amarelo</button>
      <button class="chip" data-f="vermelho"><span class="dot vermelho"></span>Vermelho</button>
    </div>
    <div class="patient-list" id="patient-list"></div>
  `);

  container.querySelector('#staff-header-actions').innerHTML = `
    <button class="btn btn-primary" id="btn-new-patient">${svg('plus', 'width="16" height="16"')} Novo paciente</button>
  `;
  container.querySelector('#btn-new-patient').addEventListener('click', () => navigate('/cadastro'));

  container.querySelectorAll('#dash-filters .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      filter = chip.dataset.f;
      container.querySelectorAll('#dash-filters .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderList(container);
    });
  });

  renderList(container);
}

function renderList(container){
  const list = container.querySelector('#patient-list');
  const items = listPatients(filter);

  if (items.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        ${svg('empty')}
        <div>Nenhum paciente nesta categoria</div>
      </div>`;
    return;
  }

  list.innerHTML = items.map(p => `
    <div class="patient-card">
      <div class="priority-bar ${p.priority}"></div>
      <div class="patient-info">
        <div class="patient-name-row">
          <span class="patient-name">${p.name}</span>
          <span class="protocol-pill mono">${p.protocol}</span>
        </div>
        <div class="patient-symptoms">${p.symptoms} · chegada ${p.arrival}</div>
      </div>
      <span class="status-pill ${p.status}">${STATUS_LABEL[p.status]}</span>
      <div class="patient-actions">
        <button class="mini-btn call" data-call="${p.id}" ${p.status !== 'aguardando' ? 'disabled' : ''}>Chamar</button>
        <button class="mini-btn finish" data-finish="${p.id}" ${p.status === 'finalizado' ? 'disabled' : ''}>Finalizar</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('[data-call]').forEach(btn => {
    btn.addEventListener('click', () => { callPatient(btn.dataset.call); renderList(container); });
  });
  list.querySelectorAll('[data-finish]').forEach(btn => {
    btn.addEventListener('click', () => { finishPatient(btn.dataset.finish); renderList(container); });
  });
}
