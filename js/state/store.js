// js/state/store.js
// -----------------------------------------------------------------------
// Store central e minimalista (sem dependências externas).
// - Guarda o estado da aplicação em memória.
// - Persiste em localStorage a cada mutação (fila de pacientes e sessão).
// - Expõe um pub/sub simples (subscribe/emit) para quem precisar reagir
//   a mudanças fora do fluxo normal de "ação -> re-render da página".
//
// Quando houver backend: os métodos abaixo (getPatients, addPatient, etc.)
// continuam com a mesma assinatura, só passam a fazer fetch() em vez de
// ler/escrever no localStorage. As páginas não precisam mudar.
// -----------------------------------------------------------------------

import { initialPatients } from './mockData.js';

const STORAGE_KEY = 'smartubs_state_v1';

function loadFromStorage(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('[SmartUBS] Não foi possível ler o localStorage, iniciando com dados padrão.', err);
    return null;
  }
}

function persist(){
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      patients: state.patients,
      currentRole: state.currentRole
    }));
  } catch (err) {
    console.warn('[SmartUBS] Não foi possível salvar no localStorage.', err);
  }
}

const saved = loadFromStorage();

export const state = {
  patients: saved?.patients ?? initialPatients,
  currentRole: saved?.currentRole ?? null, // null = ninguém logado
  filter: 'todos'
};

/* ---------------------- pub/sub minimalista ---------------------- */
const listeners = new Set();
export function subscribe(fn){
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function emit(){
  listeners.forEach(fn => fn(state));
}

/* ---------------------- mutações de pacientes ---------------------- */
export function addPatient(patient){
  state.patients = [patient, ...state.patients];
  persist();
  emit();
}

export function callPatient(id){
  state.patients = state.patients.map(p => p.id === id ? { ...p, status: 'em-atendimento' } : p);
  persist();
  emit();
}

export function finishPatient(id){
  state.patients = state.patients.map(p => p.id === id ? { ...p, status: 'finalizado' } : p);
  persist();
  emit();
}

export function getPatients(){
  return state.patients;
}

/* ---------------------- sessão / login ---------------------- */
export function setCurrentRole(role){
  state.currentRole = role;
  persist();
  emit();
}

export function clearSession(){
  state.currentRole = null;
  persist();
  emit();
}
