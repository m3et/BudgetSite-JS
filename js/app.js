class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.totalExpense = 0;
    this.itemID = 0;
  }
  // submit budget method
  submitBudgetForm() {
    // extract budget-input
    const BudgetValue = this.budgetInput.value;
    // check budget-input
    if (BudgetValue < 0 || BudgetValue === '') {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML =
        '<p>Budget cannot be empty or negative</p>';
      const window = this;

      setTimeout(function () {
        window.budgetFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      this.budgetAmount.textContent = BudgetValue;
      this.budgetInput.value = '';
      this.showBalance();
    }
    // console.log('hey');
  }
  // submit expense form
  submitExpenseForm() {
    console.log('submit expense form');
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;

    if (expenseValue === '' || amountValue === '' || amountValue < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = '<p>Input values cannot be empty or negative</p>'
      const window = this;

      setTimeout(function () {
        window.expenseFeedback.classList.remove("showItem");
      }, 4000);

    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.amountInput.value = '';

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
      }

      this.itemID++;
      this.totalExpense += amount;
      console.log('check');
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
      this.showExpense();
    }
  }
  //  add expense to expenseList
  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

    <div class="expense-icons list-item">

     <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
      <i class="fas fa-edit"></i>
     </a>
     <a href="#" class="delete-icon" data-id="${expense.id}">
      <i class="fas fa-trash"></i>
     </a>
    </div>
   </div>
    `;

    this.expenseList.appendChild(div);
  }
  // show total balance
  showBalance() {
    const expense = this.totalExpense;
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balanceAmount.classList.remove('showGreen', 'showRed', 'showBlack');
      this.balanceAmount.classList.add('showRed');
    } else if (total > 0) {
      this.balanceAmount.classList.remove('showGreen', 'showRed', 'showBlack');
      this.balanceAmount.classList.add('showGreen');
    } else {
      this.balanceAmount.classList.remove('showGreen', 'showRed', 'showBlack');
      this.balanceAmount.classList.add('showBlack');
    }
  }
  // show total expenses
  showExpense() {
    this.expenseAmount.textContent = parseInt(this.totalExpense);
  }
  // edit expense from expenseList
  editExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;

    this.expenseList.removeChild(parent);
    // remove from DOMContent
    let expense = this.itemList.filter(function(item){
      return item.id === id;
    });

    // remove expenseVlue from total
    console.log(expense[0].amount);
    this.totalExpense -= parseInt(expense[0].amount);
    // show values
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

    let tempList = this.itemList.filter(function(item){
      return item.id !== id;
    });

    this.itemList = tempList;
    console.log(this.itemList);
    this.showBalance();
    this.showExpense();

  }
  // delete expense from expenseList
  deleteExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;

    this.expenseList.removeChild(parent);
    // remove from DOMContent
    let expense = this.itemList.filter(function(item){
      return item.id === id;
    });

    // remove expenseVlue from total
    console.log(expense[0].amount);
    this.totalExpense -= parseInt(expense[0].amount);

    let tempList = this.itemList.filter(function(item){
      return item.id !== id;
    });

    this.itemList = tempList;
    console.log(this.itemList);
    this.showBalance();
    this.showExpense();
  }
}

function eventListener() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  const ui = new UI();

  // budget form submit
  budgetForm.addEventListener('submit', function (event) {
    event.preventDefault();
    ui.submitBudgetForm();
    // console.log("budget form submit");
  });

  // expense form submit
  expenseForm.addEventListener('submit', function () {
    event.preventDefault();
    ui.submitExpenseForm();
  });


  // expense click
  expenseList.addEventListener('click', function () {
    if (event.target.parentElement.classList.contains('edit-icon')) {
      console.log('editIcon pressed');
      ui.editExpense(event.target.parentElement);
    }
    else if (event.target.parentElement.classList.contains('delete-icon')) {
      console.log('deleteIcon click');
      ui.deleteExpense(event.target.parentElement);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  eventListener();
});
