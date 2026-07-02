// js/state/triageDraft.js
// Estado temporário do atendimento em andamento no totem/tela do paciente.
// Diferente da store principal, este rascunho não precisa sobreviver a um
// refresh de página — por isso fica só em memória.

export const draft = {
  paciente: {},
  answers: {}
};

export function resetDraft(){
  draft.paciente = {};
  draft.answers = {};
}
