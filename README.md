# 💎 Gem Tycoon: Miner & Lapidary - Commercial Edition

Um jogo incremental completo e balanceado com 12 melhorias, cada uma com 12 níveis de progressão.

## 🎮 Jogar Agora

**[▶️ CLIQUE AQUI PARA JOGAR](https://marcelopalacioabreu.github.io/gem-tycoon/)**

---

## 📋 Sobre o Projeto

Gem Tycoon é um jogo incremental (clicker game) moderno desenvolvido com React, TypeScript e Tailwind CSS. O jogo oferece uma progressão balanceada e sem impossibilidades, com um sistema de três recursos (Pedras, Gemas e Dinheiro) que se complementam.

### ✨ Características Principais

- **12 Melhorias × 12 Níveis** = 144 objetivos de progressão
- **Sistema Balanceado**: Sem condições impossíveis
- **Múltiplas Pedras**: Chance de encontrar gemas ao minerar
- **Automação Progressiva**: Desbloqueie mineradores, lapidadores e vendedores automáticos
- **Interface Moderna**: Tema escuro elegante com animações fluidas
- **Totalmente Responsivo**: Funciona em desktop, tablet e mobile
- **Salvamento Automático**: Seus dados são salvos no navegador
- **Funciona Offline**: Sem necessidade de servidor

---

## 🎮 Como Jogar

### Objetivo
Construir um império de mineração de gemas, começando com cliques manuais e evoluindo para uma operação totalmente automatizada.

### Recursos
- **⛏️ Pedras**: Coletadas ao minerar, usadas para upgrades básicos
- **💎 Gemas**: Encontradas ao minerar pedras, usadas para upgrades avançados
- **💵 Dinheiro**: Obtido vendendo gemas, usado para upgrades industriais

### Progressão
1. Clique para minerar pedras
2. Encontre gemas (chance aumenta com upgrades)
3. Compre upgrades com pedras, gemas ou dinheiro
4. Desbloqueie automação
5. Ganhe mais rápido
6. Repita! 🔄

---

## 🏗️ Estrutura do Projeto

### Branches

- **`main`** - Código-fonte completo (React + TypeScript)
- **`github-pages`** - Aplicação compilada e pronta para produção

### Diretórios

```
├── source/              # Código-fonte React
│   └── src/
│       ├── hooks/       # useGameState.ts (lógica do jogo)
│       ├── components/  # Componentes React
│       └── pages/       # Páginas
├── dist/                # Aplicação compilada
│   └── public/          # Arquivos estáticos
├── package.json         # Dependências
└── README.md            # Este arquivo
```

---

## 🛠️ Tecnologias

- **React 19** - Framework UI moderno
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Estilização responsiva
- **Framer Motion** - Animações fluidas
- **shadcn/ui** - Componentes de UI premium
- **Vite** - Build tool rápido

---

## 📊 As 12 Melhorias

### Categoria: Mineração Manual (3)
1. **Picareta de Ferro** - Aumenta pedras por clique
2. **Luvas de Minerador** - Aumenta velocidade de clique
3. **Lupa de Geólogo** - Aumenta chance crítica de gema

### Categoria: Automação de Campo (3)
4. **Minerador Aprendiz** - Gera pedras por segundo
5. **Broca a Vapor** - Gera pedras por segundo (eficiente)
6. **Equipe de Escavação** - Aumenta chance de gemas automáticas

### Categoria: Processamento (3)
7. **Rebolo de Água** - Aumenta velocidade de lapidação
8. **Lapidador Automático** - Processa gemas brutas automaticamente
9. **Polimento de Luxo** - Aumenta valor de venda das gemas

### Categoria: Industrial & Comercial (3)
10. **Mercado de Gemas** - Vende gemas automaticamente
11. **Refinaria Industrial** - Chance de duplicar gemas
12. **Contratos de Exportação** - Bônus passivo de dinheiro

---

## 🚀 Desenvolvimento

### Requisitos
- Node.js 18+
- pnpm (ou npm)

### Instalação

```bash
# Clonar repositório
git clone https://github.com/marcelopalacioabreu/gem-tycoon.git
cd gem-tycoon

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Compilar para produção
pnpm build
```

### Estrutura do Código

#### Hook Principal: `useGameState.ts`
Gerencia toda a lógica do jogo:
- Estado dos recursos (pedras, gemas, dinheiro)
- Configuração das 12 melhorias
- Funções de mineração e compra de upgrades
- Loop de atualização automática

#### Componentes Principais
- `ResourceDisplay` - Exibe recursos atuais
- `MiningArea` - Botão interativo de mineração
- `UpgradesPanel` - Painel com abas de upgrades

---

## 💾 Dados do Jogador

- **Salvamento**: Automático no localStorage do navegador
- **Sincronização**: Local apenas (sem servidor necessário)
- **Backup**: Dados persistem entre sessões
- **Reset**: Use DevTools (F12 → Application → Clear Storage) para resetar

---

## 📱 Compatibilidade

| Navegador | Status |
|-----------|--------|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |

| Dispositivo | Status |
|-------------|--------|
| Desktop | ✅ |
| Tablet | ✅ |
| Mobile | ✅ |

---

## 📊 Performance

| Métrica | Valor |
|---------|-------|
| Tamanho do Bundle | 675 KB |
| Comprimido (Gzip) | 206 KB |
| Tempo de Carregamento | < 2 segundos |
| FPS | 60 em dispositivos modernos |
| Memória | ~50-100 MB |

---

## 🎨 Customização

### Alterar Cores
Edite `source/src/index.css` (variáveis CSS OKLCH)

### Alterar Nomes/Custos
Edite `source/src/hooks/useGameState.ts` (array `UPGRADES_CONFIG`)

### Adicionar Novos Upgrades
1. Adicione novo objeto em `UPGRADES_CONFIG`
2. Implemente lógica no `autoTick` ou `buyUpgrade`
3. Recompile: `pnpm build`

---

## 📚 Documentação Adicional

- **[LEIA-ME-PRIMEIRO.txt](./LEIA-ME-PRIMEIRO.txt)** - Guia inicial
- **[INSTRUCOES.md](./INSTRUCOES.md)** - Documentação completa
- **[PUBLICAR.txt](./PUBLICAR.txt)** - Guia de publicação
- **[README_TECNICO.md](./README_TECNICO.md)** - Referência técnica
- **[SUMARIO.txt](./SUMARIO.txt)** - Resumo executivo

---

## 🔄 Fluxo de Trabalho

### Desenvolvimento
```bash
# Branch: main
pnpm dev          # Servidor de desenvolvimento
pnpm build        # Compilar para produção
```

### Deploy
```bash
# Compilar
pnpm build

# Copiar dist/public para branch github-pages
# GitHub Pages publica automaticamente
```

---

## 🐛 Troubleshooting

### Jogo não carrega
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Verifique o console (F12) para erros

### Dados não salvam
- Verifique se localStorage está habilitado
- Tente em modo incógnito

### Performance lenta
- Desative extensões do navegador
- Atualize para a versão mais recente do navegador

---

## 📝 Licença

Este projeto é fornecido como-está para uso comercial.

---

## 🎯 Roadmap

- [ ] Sistema de prestige/reset com bônus
- [ ] Eventos especiais e desafios
- [ ] Multiplayer cooperativo
- [ ] Achievements e badges
- [ ] Temas customizáveis
- [ ] Integração com Discord
- [ ] Modo dark/light toggle

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a documentação incluída
2. Verifique o console do navegador (F12)
3. Abra uma issue no repositório

---

## 🙏 Créditos

Desenvolvido com ❤️ usando:
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- shadcn/ui

---

**Divirta-se minerando! 💎⛏️**

[▶️ JOGAR AGORA](https://marcelopalacioabreu.github.io/gem-tycoon/)
