package com.project.expensepilot.controller;

import com.project.expensepilot.model.Expense;
import com.project.expensepilot.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
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

    @DeleteMapping("/expense/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable int id) {
        boolean deleted = expenseService.deleteExpense(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


//    @GetMapping("/expense/{id}")
//    public Expense getExpenseById(@PathVariable int id) {
//        return expenseService.getExpenseById(id);
//    }
}
