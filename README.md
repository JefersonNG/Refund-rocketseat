# 📘 Sistema de Reembolsos

Aplicação para gerenciar reembolsos de forma simples, rápida e objetiva.  
Permite cadastrar despesas, remover, ver o total e a quantidade de reembolsos em tempo real.

---

## ✨ Funcionalidades

### ➕ Adicionar um reembolso
- Cadastro de um novo reembolso com:
  - descrição
  - valor
  - (opcional) data e/ou categoria
- O item aparece automaticamente na lista de reembolsos.

---

### ❌ Remover reembolso
- Cada reembolso possui uma ação de remoção.
- Ao remover:
  - o item é excluído da lista
  - o total é recalculado
  - a quantidade de reembolsos é atualizada

---

### 💰 Soma total dos valores
- Soma automática de todos os valores cadastrados.
- Atualização em tempo real ao:
  - adicionar um reembolso
  - remover um reembolso
- Exibição no formato brasileiro (`R$ 0,00`).

---

### 🔢 Quantidade de reembolsos
- Exibe o total de reembolsos cadastrados.
- Tratamento de singular/plural:
  - `1 despesa`
  - `2 despesas`
  - `0 despesas`

---

## 🖥️ Demonstração

<img width="625" height="747" alt="image" src="https://github.com/user-attachments/assets/d2b8c1e0-dcd5-43da-a45b-da41988616c2" />
