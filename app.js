const form = document.querySelector('form');
const amount = document.querySelector('#amount');
const expense = document.querySelector('#expense');
const category = document.querySelector('#category');
const ul = document.querySelector('ul.expenses-list');
const infExpense = document.querySelector('#inf-expense');

window.onload = () => {
  infUpdate();
}

amount.oninput = () => {
  let value = amount.value.replace(/\D/g, '');

  amount.value = formatCurrency(value);
}

amount.onkeydown = (event) => {

  if (!/^[0-9]$/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab" && event.key !== "Enter") {
    event.preventDefault();

    console.log("Digite apenas números");
  }
};

function formatCurrency(value) {
  return (Number(value) / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime().toString().slice(-6),
    expense: expense.value,
    amount: amount.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    created_at: new Date().toLocaleString('pt-BR', {
      timeZone: "America/Cuiaba"
    })
  }

  expenseAdd(newExpense);
  removeButtons = document.querySelectorAll('.btn-remove')
}

function expenseAdd(expense) {
  try {
    const li = document.createElement('li');
    li.classList.add('expense');
    li.setAttribute('data-id', expense.id);

    li.innerHTML = `
      <img src="./img/${expense.category_id}.svg" alt="Ícone de tipo da despesa" />

      <div class="expense-info">
        <strong>${expense.expense}</strong>
        <span>${expense.category_name}</span>
      </div>

      <span class="expense-amount"><small>R$</small>${expense.amount}</span>
      <img src="./img/remove.svg" alt="remover" class="remove-icon btn-remove" />
    `
    ul.prepend(li);
    clearForm()

    infUpdate();
  } catch (error) {
    console.log("Erro ao adicionar despesa: ", error);
  }
}

function infUpdate() {
  let totalAmount = 0;
  const infExpense = document.querySelector('#inf-expense');
  const countExpense = infExpense.querySelector('span');
  const currencyTotal = infExpense.querySelector('h2');
  const expenses = document.querySelectorAll('ul.expenses-list li.expense');

  for (let expense of expenses) {
    expense = expense.querySelector('.expense-amount');
    const expenseValue = expense.innerText.replace('R$', '').replace('.', '').replace(',', '.');

    totalAmount += Number(expenseValue);
  };

  if(expenses.length == 0) {
    const ul = document.querySelector('ul.expenses-list');
    const li = document.createElement('li');
    li.innerHTML = `<h2 class="no-expenses">Nenhuma despesa cadastrada.</h2>`;

    ul.append(li);
  } else {
    const noExpenses = document.querySelector('.no-expenses');
    if (noExpenses) {
      noExpenses.remove();
    }
  }

  countExpense.innerText = `${expenses.length} ${expenses.length === 1 ? 'despesa' : 'despesas'}`;

  currencyTotal.innerHTML = `<small>R$</small>${totalAmount.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function expenseRemove(id) {
  try {
    const li = document.querySelector(`li.expense[data-id='${id}']`);
    li.remove();
    infUpdate();

  } catch (error) {
    console.log("Erro ao remover despesa: ", error.message);
  }

}

function clearForm() {
  expense.value = '';
  amount.value = '';
  category.value = '';

  expense.focus();
}


// dentro da ul verifica quem foi clicado e se for o botão de remover, chama a função de remover despesa
ul.onclick = (event) => {
  if (event.target.classList.contains('btn-remove')) {
    const li = event.target.closest('li.expense');
    const id = li.getAttribute('data-id');
    expenseRemove(id);
  }
}