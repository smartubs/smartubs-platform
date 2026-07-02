// js/pages/painelAdministrativo.js
import { svg } from '../utils/icons.js';
import { renderStaffShell } from '../components/sidebar.js';
import { listPatients } from '../services/patientService.js';
import { systemUsers, units } from '../state/mockData.js';

const TABS = [
  { key: 'geral', label: 'Visão geral' },
  { key: 'usuarios', label: 'Usuários' },
  { key: 'unidades', label: 'Unidades' },
  { key: 'relatorios', label: 'Relatórios' }
];

let activeTab = 'geral';

export function render(container){
  activeTab = 'geral';

  renderStaffShell(container, '/admin', 'Painel administrativo', 'Visão geral da operação do sistema', `
    <div class="tab-bar" id="admin-tabs">
      ${TABS.map(t => `<button class="tab-btn ${t.key === activeTab ? 'active' : ''}" data-tab="${t.key}">${t.label}</button>`).join('')}
    </div>
    <div id="admin-tab-content"></div>
  `);

  container.querySelectorAll('#admin-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      container.querySelectorAll('#admin-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTab(container);
    });
  });

  renderTab(container);
}

function renderTab(container){
  const el = container.querySelector('#admin-tab-content');
  if (activeTab === 'geral') el.innerHTML = tabGeral();
  else if (activeTab === 'usuarios') el.innerHTML = tabUsuarios();
  else if (activeTab === 'unidades') el.innerHTML = tabUnidades();
  else el.innerHTML = tabRelatorios();

  if (activeTab === 'geral') mountCharts(container);
}

function tabGeral(){
  const patients = listPatients('todos');
  const waiting = patients.filter(p => p.status === 'aguardando').length;
  const finished = patients.filter(p => p.status === 'finalizado').length;

  const stats = [
    { label: 'Pacientes hoje', value: patients.length + 18, icon: 'users', color: 'blue' },
    { label: 'Tempo médio de espera', value: '24 min', icon: 'clock', color: 'amber' },
    { label: 'Tempo médio de atendimento', value: '13 min', icon: 'stopwatch', color: 'green' },
    { label: 'Pacientes atendidos', value: finished + 21, icon: 'trend', color: 'green' },
    { label: 'Aguardando', value: waiting, icon: 'queue', color: 'blue' }
  ];
  const colorMap = { blue: ['var(--blue-light)', 'var(--blue)'], amber: ['var(--amber-light)', 'var(--amber-text)'], green: ['var(--green-light)', 'var(--green-dark)'] };

  return `
    <div class="stat-grid">
      ${stats.map(s => {
        const [bg, fg] = colorMap[s.color];
        return `
        <div class="stat-card">
          <div class="stat-icon" style="background:${bg};color:${fg}">${svg(s.icon)}</div>
          <div class="stat-value">${s.value}</div>
          <div class="stat-label">${s.label}</div>
        </div>`;
      }).join('')}
    </div>
    <div class="panel-grid">
      <div class="panel">
        <h3>Atendimentos por hora</h3>
        <p class="sub">Volume de pacientes recebidos ao longo do dia</p>
        <div class="bar-chart" id="admin-bar-chart"></div>
      </div>
      <div class="panel">
        <h3>Distribuição por classificação</h3>
        <p class="sub">Proporção da fila atual</p>
        <div class="donut-wrap" id="admin-donut"></div>
      </div>
    </div>
  `;
}

function mountCharts(container){
  const hours = ['07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h'];
  const vals = [4, 9, 14, 11, 7, 3, 8, 12];
  const max = Math.max(...vals);
  const barEl = container.querySelector('#admin-bar-chart');
  if (barEl) {
    barEl.innerHTML = hours.map((h, i) => `
      <div class="bar-col"><div class="bar" style="height:${(vals[i] / max) * 100}%"></div><span class="lbl">${h}</span></div>
    `).join('');
  }

  const donutEl = container.querySelector('#admin-donut');
  if (donutEl) {
    const patients = listPatients('todos');
    const counts = { verde: 0, amarelo: 0, vermelho: 0 };
    patients.forEach(p => counts[p.priority]++);
    const total = counts.verde + counts.amarelo + counts.vermelho || 1;
    const colors = { verde: '#00A86B', amarelo: '#F5A623', vermelho: '#E5484D' };
    let acc = 0;
    const segments = ['verde', 'amarelo', 'vermelho'].map(k => {
      const frac = counts[k] / total;
      const seg = `${colors[k]} ${acc * 360}deg ${(acc + frac) * 360}deg`;
      acc += frac;
      return seg;
    }).join(', ');

    donutEl.innerHTML = `
      <div style="width:130px;height:130px;border-radius:50%;background:conic-gradient(${segments});display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <div style="width:76px;height:76px;border-radius:50%;background:var(--white);display:flex;align-items:center;justify-content:center;flex-direction:column;">
          <span style="font-size:1.1rem;font-weight:700;">${total}</span>
          <span style="font-size:.6rem;color:var(--ink-faint);font-weight:600;">na fila</span>
        </div>
      </div>
      <div class="legend">
        <div class="legend-item"><span class="dot" style="background:${colors.verde}"></span>Verde <b>${counts.verde}</b></div>
        <div class="legend-item"><span class="dot" style="background:${colors.amarelo}"></span>Amarelo <b>${counts.amarelo}</b></div>
        <div class="legend-item"><span class="dot" style="background:${colors.vermelho}"></span>Vermelho <b>${counts.vermelho}</b></div>
      </div>
    `;
  }
}

function tabUsuarios(){
  return `
    <div class="panel">
      <h3>Usuários do sistema</h3>
      <p class="sub">Perfis com acesso à SmartUBS nesta organização</p>
      <table class="data-table">
        <thead><tr><th>Nome</th><th>Perfil</th><th>Unidade</th><th>Status</th></tr></thead>
        <tbody>
          ${systemUsers.map(u => `
            <tr>
              <td><div class="name-cell">${u.name}</div></td>
              <td>${u.role}</td>
              <td>${u.unit}</td>
              <td><span class="badge-status ${u.status}">${u.status === 'ativo' ? 'Ativo' : 'Inativo'}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function tabUnidades(){
  return `
    <div class="panel">
      <h3>Unidades cadastradas</h3>
      <p class="sub">UBS conectadas à plataforma</p>
      <table class="data-table">
        <thead><tr><th>Unidade</th><th>Cidade</th><th>Pacientes hoje</th><th>Status</th></tr></thead>
        <tbody>
          ${units.map(u => `
            <tr>
              <td><div class="name-cell">${svg('building', 'width="16" height="16"')} ${u.name}</div></td>
              <td>${u.city}</td>
              <td>${u.patientsToday}</td>
              <td><span class="badge-status ${u.status}">${u.status === 'ativa' ? 'Ativa' : 'Inativa'}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function tabRelatorios(){
  return `
    <div class="panel">
      <h3>Relatórios simples</h3>
      <p class="sub">Exportações rápidas para acompanhamento da operação</p>
      <div class="patient-list">
        ${['Atendimentos do dia', 'Atendimentos da semana', 'Distribuição por classificação', 'Tempo médio por unidade'].map(r => `
          <div class="patient-card">
            <div class="patient-info"><div class="patient-name">${svg('report', 'width="15" height="15" style="vertical-align:-2px;margin-right:6px;"')}${r}</div></div>
            <button class="mini-btn finish" disabled title="Disponível quando o backend estiver conectado">Exportar PDF</button>
          </div>
        `).join('')}
      </div>
      <p class="notes-hint" style="margin-top:14px;">Os relatórios completos (com filtros por período e exportação real) serão habilitados na integração com o backend.</p>
    </div>
  `;
}
