# SmartUBS — MVP

Sistema Operacional Inteligente para Atenção Primária à Saúde. Organiza o
fluxo de atendimento em Unidades Básicas de Saúde (UBS): cadastro do
paciente, avaliação inicial, fila de atendimento e dashboards de recepção,
profissional, gestor e administrador.

**A SmartUBS não realiza diagnóstico médico, não emite receita e não
substitui a avaliação de um profissional de saúde.** Ela apenas organiza
informações, fila e fluxo de atendimento.

---

## Stack

HTML + CSS + JavaScript puro (ES Modules nativos do navegador). **Sem
frameworks, sem bundler, sem passo de build.** Isso foi uma escolha
deliberada para o MVP: qualquer pessoa consegue abrir, ler e editar o
código sem precisar instalar dependências pesadas.

- Persistência: `localStorage` (fila de pacientes e sessão de login).
- Nenhuma biblioteca externa além das fontes do Google Fonts.

## Como rodar localmente

Como o projeto usa `import`/`export` (ES Modules), o navegador exige que os
arquivos sejam servidos por **http://**, não abertos diretamente como
`file://`. O jeito recomendado é usar o **Live Server** do VS Code:

### Opção recomendada — VS Code + Live Server

1. Abra a pasta `smartubs-mvp` no VS Code (`File > Open Folder...`).
2. Instale a extensão **Live Server** (autor: Ritwick Dey), caso ainda não
   tenha.
3. Clique com o botão direito em `index.html` → **"Open with Live Server"**
   (ou clique em "Go Live" na barra de status, no canto inferior direito).
4. O navegador abre automaticamente em algo como
   `http://127.0.0.1:5500` — a aplicação já está funcionando, com
   recarregamento automático a cada alteração salva.

O projeto já inclui `.vscode/settings.json` com a porta e a raiz configuradas
para o Live Server; não é necessário nenhum ajuste adicional.

### Alternativas (sem VS Code)

```bash
# Python (já vem instalado na maioria dos sistemas)
cd smartubs-mvp
python3 -m http.server 8080
# depois acesse http://localhost:8080

# Node.js, sem instalar nada globalmente
cd smartubs-mvp
npx serve .
```

Não há `npm install` nem etapa de build: os arquivos já são servidos como
estão. O `package.json` incluído serve apenas como metadado do projeto e
para o atalho `npm start` (equivalente a `npx serve .`).

## Estrutura do projeto

```
smartubs-mvp/
├── .vscode/
│   └── settings.json           # configuração da porta/raiz para o Live Server
├── package.json                 # metadado do projeto (sem dependências/build)
├── .gitignore
├── index.html                 # único HTML da aplicação (shell + a11y bar)
├── css/
│   ├── variables.css          # tokens de cor, espaçamento, sombra, raio
│   ├── base.css                # reset, tipografia, botões, campos
│   ├── layout.css              # kiosk (paciente) e shell da equipe (sidebar)
│   ├── components.css          # cartões, tabelas, gráficos, chips etc.
│   └── accessibility.css       # fonte ajustável e alto contraste
└── js/
    ├── main.js                 # registra as rotas e inicia o router
    ├── router.js                # roteador via hash (#/rota), com guarda de login
    ├── state/
    │   ├── store.js             # estado central + persistência em localStorage
    │   ├── mockData.js          # dados mockados (pacientes, equipe, unidades)
    │   └── triageDraft.js       # rascunho do atendimento em andamento
    ├── services/
    │   ├── patientService.js    # classificação de risco + regras da fila
    │   └── authService.js       # login mockado por perfil
    ├── components/
    │   └── sidebar.js           # barra lateral reutilizada pelas 4 telas de equipe
    ├── utils/
    │   ├── formatters.js        # datas, protocolo, máscaras de CPF/telefone
    │   ├── validators.js        # validações simples de formulário
    │   └── icons.js              # ícones SVG centralizados
    └── pages/
        ├── home.js                       # tela inicial do paciente
        ├── cadastro.js                    # cadastro do paciente
        ├── triagem.js                     # avaliação inicial inteligente
        ├── resultado.js                   # protocolo + classificação
        ├── login.js                       # login da equipe (4 perfis)
        ├── dashboardRecepcao.js           # fila de atendimento
        ├── dashboardProfissional.js       # paciente atual + próximos + notas
        ├── dashboardGestor.js             # indicadores estratégicos + equipe
        └── painelAdministrativo.js        # usuários, unidades, relatórios
```

### Por que essa organização

- **`state/`** guarda o que muda (dados). **`services/`** guarda as regras de
  negócio (classificação de risco, login). **`pages/`** só cuida de desenhar
  a tela e reagir a cliques. Essa separação é o que vai permitir trocar o
  `localStorage` por uma API real sem reescrever as páginas.
- **`components/sidebar.js`** existe porque as 4 telas de equipe compartilham
  a mesma barra lateral — evita duplicar HTML/CSS/JS quatro vezes.
- **`router.js`** é intencionalmente pequeno (~40 linhas): mapeia uma rota
  (`#/recepcao`) para uma função `render(container)`. Rotas de equipe
  (`/recepcao`, `/profissional`, `/gestor`, `/admin`) exigem login — se não
  houver sessão, o usuário é redirecionado para `/login`.

## Fluxo navegável

```
/  (tela inicial)
 └─ /cadastro  →  /triagem  →  /resultado  →  volta para /

/login  (seleciona perfil: recepção, profissional, gestor, administrador)
 ├─ /recepcao       (dashboard da recepção)
 ├─ /profissional   (dashboard do profissional)
 ├─ /gestor         (dashboard do gestor)
 └─ /admin          (painel administrativo)
```

Todos os botões principais funcionam: cadastrar paciente, responder a
avaliação inicial, gerar protocolo e classificação, chamar/finalizar
pacientes na recepção e no dashboard do profissional (com cronômetro ao
vivo), navegar entre os 4 perfis de equipe. Os dados aparecem em tempo real
nos dashboards porque todos leem da mesma `store` central.

## Lógica de classificação de risco (`js/services/patientService.js`)

A classificação é um critério **organizacional**, usado apenas para ordenar
a fila — não é um diagnóstico.

```js
Vermelho: falta de ar OU febre muito alta (>= 39°C)
Amarelo:  febre OU 3 ou mais sintomas relatados OU sintomas há 3+ dias
Verde:    demais casos (sintomas leves)
```

Essa função é pura (recebe as respostas, devolve uma cor) e fica isolada do
resto do código — fica fácil ajustar os critérios ou, futuramente, plugar
uma regra vinda do backend/protocolo Manchester real, sem tocar na UI.

## Persistência de dados

Hoje os dados ficam em `localStorage`, sob a chave `smartubs_state_v1`
(fila de pacientes + perfil logado) e chaves separadas para as preferências
de acessibilidade. Isso significa que a fila sobrevive a um refresh da
página, mas é local ao navegador — não é compartilhada entre dispositivos.

Para "zerar" os dados de teste, no console do navegador:
```js
localStorage.removeItem('smartubs_state_v1')
```

## Preparado para conectar com backend/API

Os módulos em `js/services/` foram desenhados como a única porta de entrada
para dados. Quando o backend existir, a migração é:

1. Em `js/services/patientService.js` e `js/services/authService.js`,
   trocar as chamadas a `js/state/store.js` por `fetch('/api/...')`.
2. `js/state/store.js` deixa de ser a fonte de verdade — pode virar apenas
   um cache local opcional.
3. Nenhuma página (`js/pages/*.js`) precisa mudar, porque elas só conhecem
   as funções exportadas pelos serviços (`listPatients`, `callPatient`,
   `login`, etc.), não os detalhes de onde os dados vêm.

Sugestões de endpoints para essa evolução:
```
POST   /api/auth/login
GET    /api/patients?filter=amarelo
POST   /api/patients            (cadastro + resultado da triagem)
PATCH  /api/patients/:id/call
PATCH  /api/patients/:id/finish
GET    /api/team
GET    /api/units
GET    /api/metrics/gestor
GET    /api/metrics/admin
```

## Acessibilidade

Pensada para uso por idosos e pessoas com baixa familiaridade digital:

- Barra fixa no canto inferior direito com **A- / A+** (tamanho de texto) e
  **◐** (alto contraste), com preferência salva entre sessões.
- Tipografia grande por padrão, alto contraste de cor nos textos principais,
  áreas de toque grandes nos botões.
- Foco de teclado sempre visível (`:focus-visible`).
- Fluxo do paciente é linear (uma pergunta por vez, com barra de progresso)
  para reduzir a carga cognitiva.

## Limitações conhecidas deste MVP (por design)

- Login é mockado (qualquer usuário/senha entra no perfil selecionado) —
  substituir por autenticação real na integração com backend.
- Validação de CPF verifica apenas o formato (11 dígitos), não o dígito
  verificador.
- Dados de equipe, unidades e usuários administrativos são mockados em
  `js/state/mockData.js`.
- Um único dispositivo/navegador não reflete o estado de outro (sem
  sincronização entre terminais) até a integração com backend.
