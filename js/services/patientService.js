// js/services/patientService.js
// -----------------------------------------------------------------------
// Regras de negócio relacionadas ao paciente e à fila de atendimento.
// Mantido separado da store (persistência) e das páginas (UI) para que a
// lógica de classificação possa ser testada/alterada isoladamente.
//
// IMPORTANTE: esta classificação é um critério ORGANIZACIONAL para ordenar
// a fila de atendimento. Ela não é, e não deve ser tratada como, um
// diagnóstico médico.
// -----------------------------------------------------------------------

import * as store from '../state/store.js';
import { generateProtocol, formatDate, formatTime } from '../utils/formatters.js';

/**
 * Classifica o risco com base nas respostas da avaliação inicial.
 * Regras (conforme especificação do produto):
 *  - Vermelho: falta de ar OU febre muito alta (>= 39°C)
 *  - Amarelo: febre OU vários sintomas (3 ou mais) OU sintomas há vários dias (>= 3)
 *  - Verde: sintomas leves / demais casos
 */
export function classify(answers){
  const temperature = parseFloat(answers.temperatura || 0);
  const days = parseInt(answers.dias || 0, 10);

  const symptomKeys = ['febre', 'dor_cabeca', 'dor_corpo', 'tosse', 'dor_garganta', 'falta_ar', 'nausea', 'vomito', 'diarreia'];
  const symptomCount = symptomKeys.filter(k => answers[k] === 'sim').length;

  if (answers.falta_ar === 'sim' || (answers.febre === 'sim' && temperature >= 39)) {
    return 'vermelho';
  }
  if (answers.febre === 'sim' || symptomCount >= 3 || days >= 3) {
    return 'amarelo';
  }
  return 'verde';
}

/** Resume os sintomas relatados em uma frase curta para exibição nos dashboards. */
export function summarizeSymptoms(answers){
  const labels = {
    febre: 'Febre', dor_cabeca: 'Dor de cabeça', dor_corpo: 'Dor no corpo', tosse: 'Tosse',
    dor_garganta: 'Dor de garganta', falta_ar: 'Falta de ar', nausea: 'Náusea',
    vomito: 'Vômito', diarreia: 'Diarreia'
  };
  const present = Object.keys(labels).filter(k => answers[k] === 'sim').map(k => labels[k]);
  return present.length ? present.join(', ') : 'Sem sintomas relevantes relatados';
}

/**
 * Fecha a triagem: gera protocolo, classifica o risco e adiciona o
 * paciente à fila (store). Retorna os dados do resultado para a tela.
 */
export function finalizeTriage(patientInfo, answers){
  const priority = classify(answers);
  const now = new Date();

  const record = {
    id: 'p' + Date.now(),
    protocol: generateProtocol(),
    name: patientInfo.nome || 'Paciente',
    priority,
    status: 'aguardando',
    symptoms: summarizeSymptoms(answers),
    arrival: formatTime(now),
    createdAt: now.getTime(),
    // dados administrativos adicionais coletados no cadastro/triagem
    cpf: patientInfo.cpf || '',
    cartaoSus: patientInfo.cartaoSus || '',
    answers
  };

  store.addPatient(record);

  return {
    protocol: record.protocol,
    date: formatDate(now),
    time: formatTime(now),
    priority
  };
}

export function listPatients(filter = 'todos'){
  const all = store.getPatients();
  if (filter === 'todos') return all;
  return all.filter(p => p.priority === filter);
}

export function callPatient(id){
  store.callPatient(id);
}

export function finishPatient(id){
  store.finishPatient(id);
}

export function getCurrentInAttendance(){
  return store.getPatients().find(p => p.status === 'em-atendimento') || null;
}

export function getWaitingQueue(){
  const order = { vermelho: 0, amarelo: 1, verde: 2 };
  return store.getPatients()
    .filter(p => p.status === 'aguardando')
    .sort((a, b) => order[a.priority] - order[b.priority]);
}
