// js/utils/validators.js
// Validações simples de formulário. Propositalmente permissivas: o objetivo
// do MVP é organizar o fluxo, não bloquear o paciente por causa de um dígito.

export function isRequired(value){
  return typeof value === 'string' && value.trim().length > 0;
}

/** Validação estrutural de CPF (11 dígitos). Não verifica dígitos verificadores
 *  de propósito — em produção, trocar por uma validação completa ou por
 *  verificação via backend/Receita Federal. */
export function isValidCPF(value){
  const digits = (value || '').replace(/\D/g, '');
  return digits.length === 11;
}

export function isValidPhone(value){
  const digits = (value || '').replace(/\D/g, '');
  return digits.length >= 10;
}
