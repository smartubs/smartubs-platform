// js/services/authService.js
// -----------------------------------------------------------------------
// Autenticação mockada. Em produção, `login()` deve chamar um endpoint
// (ex.: POST /api/auth/login) que valide usuário/senha e retorne um token
// + o papel (role) do usuário. A assinatura da função foi pensada para
// não precisar mudar nas páginas quando isso acontecer.
// -----------------------------------------------------------------------

import * as store from '../state/store.js';
import { ROLES } from '../state/mockData.js';

/**
 * Tenta autenticar. Neste MVP, qualquer usuário/senha não vazios são
 * aceitos para o perfil selecionado — o objetivo é validar o fluxo de
 * navegação, não a segurança real (isso fica para a integração com API).
 */
export function login({ username, password, role }){
  if (!username?.trim() || !password?.trim()) {
    return { ok: false, message: 'Informe usuário e senha para continuar.' };
  }
  if (!ROLES[role]) {
    return { ok: false, message: 'Selecione um perfil de acesso válido.' };
  }
  store.setCurrentRole(role);
  return { ok: true };
}

export function logout(){
  store.clearSession();
}

export function getCurrentUser(){
  const role = store.state.currentRole;
  return role ? ROLES[role] : null;
}

export function isAuthenticated(){
  return Boolean(store.state.currentRole);
}
