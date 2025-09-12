package com.project.expensepilot.controller;

import com.project.expensepilot.model.Expense;
import com.project.expensepilot.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;


    @DeleteMapping("/expense/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable int id) {
        Expense existingExpense = expenseService.getExpenseById(id);
        if (existingExpense != null) {
            expenseService.deleteExpense(id);
            return new ResponseEntity<>(HttpStatus.valueOf(200));
        }
        return new ResponseEntity<>(HttpStatus.valueOf(404));
    }

    @PutMapping("/expense/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable int id, @RequestBody Expense updatedExpense) {
        Expense existingExpense = expenseService.getExpenseById(id);
        if (existingExpense != null) {
            updatedExpense.setId(id);
            Expense savedExpense = expenseService.updateExpense(updatedExpense);
            return new ResponseEntity<>(savedExpense, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

//    @GetMapping("/expense/{id}")
//    public Expense getExpenseById(@PathVariable int id) {
//        return expenseService.getExpenseById(id);
//    }
}
