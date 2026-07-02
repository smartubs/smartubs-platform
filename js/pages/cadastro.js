// js/pages/cadastro.js
import { svg } from '../utils/icons.js';
import { navigate } from '../router.js';
import { maskCPF, maskPhone } from '../utils/formatters.js';
import { isRequired, isValidCPF, isValidPhone } from '../utils/validators.js';
import { draft } from '../state/triageDraft.js';

export function render(container){
  container.innerHTML = `
    <div class="kiosk-bg">
      <div class="blob blob1"></div>
      <div class="blob blob2"></div>
      <div class="glass-card form-card">
        <div class="form-header">
          <button class="back-link" id="btn-back">${svg('arrowLeft', 'width="16" height="16"')} Voltar</button>
          <h2>Identificação do paciente</h2>
          <p>Preencha seus dados para iniciarmos o atendimento.</p>
        </div>

        <div class="field" id="field-nome">
          <label for="f-nome">Nome completo</label>
          <input id="f-nome" type="text" placeholder="Digite seu nome completo" autocomplete="name">
          <div class="field-error">Informe o nome completo.</div>
        </div>

        <div class="field-row">
          <div class="field" id="field-cpf">
            <label for="f-cpf">CPF</label>
            <input id="f-cpf" type="text" inputmode="numeric" placeholder="000.000.000-00" maxlength="14">
            <div class="field-error">CPF inválido.</div>
          </div>
          <div class="field">
            <label for="f-nasc">Data de nascimento</label>
            <input id="f-nasc" type="date">
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="f-sexo">Sexo</label>
            <select id="f-sexo">
              <option value="">Selecione</option>
              <option>Feminino</option>
              <option>Masculino</option>
              <option>Prefiro não informar</option>
            </select>
          </div>
          <div class="field" id="field-tel">
            <label for="f-tel">Telefone</label>
            <input id="f-tel" type="tel" inputmode="numeric" placeholder="(00) 00000-0000" maxlength="15">
            <div class="field-error">Telefone inválido.</div>
          </div>
        </div>

        <div class="field">
          <label for="f-sus">Cartão SUS <span style="font-weight:400;color:var(--ink-faint);">(opcional)</span></label>
          <input id="f-sus" type="text" inputmode="numeric" placeholder="000 0000 0000 0000">
        </div>

        <div class="form-actions">
          <button class="btn btn-primary btn-block" id="btn-continue">Continuar</button>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-back').addEventListener('click', () => navigate('/'));

  const cpfInput = container.querySelector('#f-cpf');
  cpfInput.addEventListener('input', () => { cpfInput.value = maskCPF(cpfInput.value); });

  const telInput = container.querySelector('#f-tel');
  telInput.addEventListener('input', () => { telInput.value = maskPhone(telInput.value); });

  container.querySelector('#btn-continue').addEventListener('click', () => {
    const nome = container.querySelector('#f-nome').value.trim();
    const cpf = container.querySelector('#f-cpf').value.trim();
    const tel = container.querySelector('#f-tel').value.trim();

    let valid = true;
    valid = toggleError(container, '#field-nome', !isRequired(nome)) && valid;
    valid = toggleError(container, '#field-cpf', !isValidCPF(cpf)) && valid;
    valid = toggleError(container, '#field-tel', !isValidPhone(tel)) && valid;
    if (!valid) return;

    draft.paciente = {
      nome,
      cpf,
      nascimento: container.querySelector('#f-nasc').value,
      sexo: container.querySelector('#f-sexo').value,
      telefone: tel,
      cartaoSus: container.querySelector('#f-sus').value.trim()
    };
    draft.answers = {};
    navigate('/triagem');
  });
}

/** Ativa/desativa a mensagem de erro de um campo. Retorna true se o campo é válido. */
function toggleError(container, selector, hasError){
  container.querySelector(selector).classList.toggle('has-error', hasError);
  return !hasError;
}
