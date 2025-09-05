package com.project.expensepilot.controller;

import com.project.expensepilot.model.Expense;
import com.project.expensepilot.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;


//    @RequestMapping("/")
//    public String greet(){
//        return "Hello World! Welcome to my ExpensePilot";
//    }

    @PostMapping("/expense")
    public void createExpense(@RequestBody Expense expense) {
        expenseService.addExpense(expense);
    }

    @GetMapping("/expenses")
    public Iterable<Expense> getExpenses() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/expense/{id}")
    public Expense getExpenseById(@PathVariable int id) {
        return expenseService.getExpenseById(id);
    }
}
