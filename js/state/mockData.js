// js/state/mockData.js
// Dados mockados usados para popular o app na primeira execução.
// -----------------------------------------------------------------------
// Quando o backend estiver disponível, este arquivo deixa de ser a fonte
// de verdade: basta trocar as chamadas em js/services/*.js para usar
// fetch()/API real mantendo a mesma interface de funções exportadas.
// -----------------------------------------------------------------------

export const ROLES = {
  recepcao: { key: 'recepcao', label: 'Recepção', name: 'Beatriz Nogueira', sub: 'Turno da manhã', initials: 'BN' },
  profissional: { key: 'profissional', label: 'Profissional de saúde', name: 'Dra. Camila Rocha', sub: 'Clínica Geral', initials: 'CR' },
  gestor: { key: 'gestor', label: 'Gestor', name: 'Rodrigo Teixeira', sub: 'Gestor da unidade', initials: 'RT' },
  admin: { key: 'admin', label: 'Administrador', name: 'Equipe de TI', sub: 'Administrador do sistema', initials: 'TI' }
};

export const initialPatients = [
  { id: 'p1', protocol: 'UBS-2026-0417', name: 'Maria de Fátima Souza', priority: 'amarelo', status: 'aguardando', symptoms: 'Febre, tosse, dor de garganta', arrival: '08:12', createdAt: Date.now() - 1000 * 60 * 40 },
  { id: 'p2', protocol: 'UBS-2026-0418', name: 'João Pedro Alves', priority: 'vermelho', status: 'em-atendimento', symptoms: 'Falta de ar, febre alta', arrival: '08:20', createdAt: Date.now() - 1000 * 60 * 32 },
  { id: 'p3', protocol: 'UBS-2026-0419', name: 'Antônio Carlos Lima', priority: 'verde', status: 'aguardando', symptoms: 'Dor de cabeça leve', arrival: '08:24', createdAt: Date.now() - 1000 * 60 * 28 },
  { id: 'p4', protocol: 'UBS-2026-0420', name: 'Rita de Cássia Nunes', priority: 'verde', status: 'aguardando', symptoms: 'Check-up de rotina', arrival: '08:31', createdAt: Date.now() - 1000 * 60 * 21 },
  { id: 'p5', protocol: 'UBS-2026-0421', name: 'Sebastião Ferreira', priority: 'amarelo', status: 'finalizado', symptoms: 'Diarreia, náusea', arrival: '07:55', createdAt: Date.now() - 1000 * 60 * 65 }
];

export const teamMembers = [
  { name: 'Dra. Camila Rocha', specialty: 'Clínica Geral', attendedToday: 14, avgTime: '12 min', occupancy: 82, status: 'ativo' },
  { name: 'Dr. Felipe Duarte', specialty: 'Clínica Geral', attendedToday: 11, avgTime: '15 min', occupancy: 70, status: 'ativo' },
  { name: 'Dra. Larissa Prado', specialty: 'Pediatria', attendedToday: 9, avgTime: '18 min', occupancy: 64, status: 'ativo' },
  { name: 'Enf. Marcos Vieira', specialty: 'Enfermagem', attendedToday: 19, avgTime: '8 min', occupancy: 91, status: 'ativo' },
  { name: 'Dra. Helena Brito', specialty: 'Ginecologia', attendedToday: 6, avgTime: '20 min', occupancy: 45, status: 'pausa' }
];

export const units = [
  { name: 'UBS Jardim das Flores', city: 'São Paulo, SP', patientsToday: 96, status: 'ativa' },
  { name: 'UBS Vila Esperança', city: 'São Paulo, SP', patientsToday: 71, status: 'ativa' },
  { name: 'UBS Parque Novo Mundo', city: 'São Paulo, SP', patientsToday: 58, status: 'ativa' },
  { name: 'UBS Bela Vista', city: 'Guarulhos, SP', patientsToday: 0, status: 'inativa' }
];

export const systemUsers = [
  { name: 'Beatriz Nogueira', role: 'Recepção', unit: 'UBS Jardim das Flores', status: 'ativo' },
  { name: 'Dra. Camila Rocha', role: 'Profissional de saúde', unit: 'UBS Jardim das Flores', status: 'ativo' },
  { name: 'Rodrigo Teixeira', role: 'Gestor', unit: 'UBS Jardim das Flores', status: 'ativo' },
  { name: 'Equipe de TI', role: 'Administrador', unit: 'Todas as unidades', status: 'ativo' },
  { name: 'Dr. Felipe Duarte', role: 'Profissional de saúde', unit: 'UBS Vila Esperança', status: 'ativo' }
];
