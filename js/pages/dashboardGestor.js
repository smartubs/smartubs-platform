// js/pages/dashboardGestor.js
import { svg } from '../utils/icons.js';
import { renderStaffShell } from '../components/sidebar.js';
import { listPatients } from '../services/patientService.js';
import { teamMembers } from '../state/mockData.js';
import { initials } from '../utils/formatters.js';

const STAT_ICON_COLOR = { blue: ['var(--blue-light)', 'var(--blue)'], amber: ['var(--amber-light)', 'var(--amber-text)'], green: ['var(--green-light)', 'var(--green-dark)'] };

export function render(container){
  renderStaffShell(container, '/gestor', 'Dashboard do gestor', 'Visão estratégica da unidade — semana atual', `
    <div class="stat-grid" id="gestor-stats"></div>
    <div class="panel-grid">
      <div class="panel">
        <h3>Atendimentos por dia da semana</h3>
        <p class="sub">Comparativo dos últimos 7 dias</p>
        <div class="bar-chart" id="gestor-bar-chart"></div>
      </div>
      <div class="panel">
        <h3>Alertas e insights</h3>
        <p class="sub">Pontos de atenção identificados pelo sistema</p>
        <div class="alert-list" id="alert-list"></div>
      </div>
    </div>
    <div class="panel">
      <h3>Desempenho da equipe</h3>
      <p class="sub">Profissionais ativos na unidade hoje</p>
      <table class="data-table">
        <thead><tr><th>Profissional</th><th>Especialidade</th><th>Atendimentos</th><th>Tempo médio</th><th>Ocupação</th><th>Status</th></tr></thead>
        <tbody id="team-table-body"></tbody>
      </table>
    </div>
  `);

  const patients = listPatients('todos');
  const waiting = patients.filter(p => p.status === 'aguardando').length;
  const finished = patients.filter(p => p.status === 'finalizado').length;
  const priority = patients.filter(p => p.priority === 'vermelho' && p.status !== 'finalizado').length;

  const stats = [
    { label: 'Pacientes do dia', value: patients.length + 18, icon: 'users', color: 'blue', trendv: '+6% vs. semana passada' },
    { label: 'Pacientes aguardando', value: waiting, icon: 'queue', color: 'amber', trendv: 'atualizado em tempo real' },
    { label: 'Tempo médio de espera', value: '24 min', icon: 'clock', color: 'blue', trendv: '-3 min vs. semana passada' },
    { label: 'Casos prioritários', value: priority, icon: 'gauge', color: 'amber', trendv: 'classificação vermelha ativa' },
    { label: 'Atendimentos finalizados', value: finished + 21, icon: 'trend', color: 'green', trendv: '+8% vs. semana passada' }
  ];

  container.querySelector('#gestor-stats').innerHTML = stats.map(s => {
    const [bg, fg] = STAT_ICON_COLOR[s.color];
    return `
      <div class="stat-card">
        <div class="stat-icon" style="background:${bg};color:${fg}">${svg(s.icon)}</div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
        <div class="kpi-trend up">${svg('trendUp', 'width="11" height="11"')} ${s.trendv}</div>
      </div>`;
  }).join('');

  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const vals = [42, 48, 39, 51, 58, 27, 15];
  const max = Math.max(...vals);
  container.querySelector('#gestor-bar-chart').innerHTML = days.map((d, i) => `
    <div class="bar-col">
      <div class="bar" style="height:${(vals[i] / max) * 100}%"></div>
      <span class="lbl">${d}</span>
    </div>
  `).join('');

  const alerts = [
    { type: 'warn', title: 'Fila amarela acima da média', desc: 'Entre 13h e 15h a fila amarela ficou 30% maior que a média das últimas 4 semanas.', icon: 'alertTriangle' },
    { type: 'info', title: 'Novo profissional cadastrado', desc: 'Dr. Felipe Duarte foi adicionado à equipe de Clínica Geral nesta semana.', icon: 'info' },
    { type: 'good', title: 'Meta semanal atingida', desc: 'A unidade superou em 8% a meta de atendimentos definida para esta semana.', icon: 'check' }
  ];
  container.querySelector('#alert-list').innerHTML = alerts.map(a => `
    <div class="alert-item ${a.type}">
      ${svg(a.icon)}
      <div><div class="a-title">${a.title}</div><div class="a-desc">${a.desc}</div></div>
    </div>
  `).join('');

  container.querySelector('#team-table-body').innerHTML = teamMembers.map(t => `
    <tr>
      <td><div class="name-cell"><div class="avatar" style="width:26px;height:26px;font-size:.65rem;">${initials(t.name)}</div>${t.name}</div></td>
      <td>${t.specialty}</td>
      <td>${t.attendedToday}</td>
      <td>${t.avgTime}</td>
      <td><span class="occ-bar-track"><span class="occ-bar-fill" style="width:${t.occupancy}%"></span></span>${t.occupancy}%</td>
      <td><span class="badge-status ${t.status}">${t.status === 'ativo' ? 'Ativo' : 'Em pausa'}</span></td>
    </tr>
  `).join('');
}
