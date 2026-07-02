// js/pages/resultado.js
import { svg } from '../utils/icons.js';
import { navigate } from '../router.js';
import { draft, resetDraft } from '../state/triageDraft.js';

const LABELS = { verde: 'VERDE', amarelo: 'AMARELO', vermelho: 'VERMELHO' };

export function render(container){
  const result = draft.result;
  if (!result) { navigate('/'); return; }

  container.innerHTML = `
    <div class="kiosk-bg">
      <div class="blob blob1"></div>
      <div class="blob blob2"></div>
      <div class="glass-card result-card">
        <div class="status-ring ${result.priority}">${svg('check')}</div>
        <span class="classif-tag ${result.priority}">${LABELS[result.priority]}</span>
        <h2 style="font-size:1.25rem;margin:8px 0 0;">Atendimento registrado com sucesso</h2>
        <p class="result-wait">Aguarde ser chamado pela equipe da unidade.</p>
        <div class="protocol-box">
          <div class="protocol-item"><div class="k">Protocolo</div><div class="v big mono">${result.protocol}</div></div>
          <div class="protocol-item"><div class="k">Data</div><div class="v">${result.date}</div></div>
          <div class="protocol-item"><div class="k">Hora</div><div class="v">${result.time}</div></div>
        </div>
        <button class="btn btn-secondary btn-block" id="btn-finish">Concluir</button>
        <p class="footnote">Esta classificação organiza a fila e não representa diagnóstico médico.</p>
      </div>
    </div>
  `;

  container.querySelector('#btn-finish').addEventListener('click', () => {
    resetDraft();
    navigate('/');
  });
}
