// js/utils/formatters.js
// Funções puras de formatação. Nenhuma delas depende de DOM ou de estado
// global — podem ser testadas isoladamente.

/** Retorna a data atual no formato dd/mm/aaaa (pt-BR). */
export function formatDate(date = new Date()){
  return date.toLocaleDateString('pt-BR');
}

/** Retorna a hora atual no formato hh:mm (pt-BR). */
export function formatTime(date = new Date()){
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

/** Gera um número de protocolo único no padrão UBS-AAAA-XXXX. */
export function generateProtocol(){
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 8999);
  return `UBS-${year}-${random}`;
}

/** Formata segundos totais em HH:MM:SS, usado no cronômetro de atendimento. */
export function formatTimer(totalSeconds){
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

/** Aplica máscara de CPF conforme o usuário digita: 000.000.000-00 */
export function maskCPF(value){
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/** Aplica máscara de telefone: (00) 00000-0000 */
export function maskPhone(value){
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})$/, '$1-$2');
}

/** Gera as iniciais de um nome (até 2 letras) para uso em avatares. */
export function initials(name = ''){
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}
