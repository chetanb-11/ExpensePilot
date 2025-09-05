package com.project.expensepilot.service;

import com.project.expensepilot.model.Expense;
import com.project.expensepilot.repo.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepo expenseRepo;

    private final List<Expense> expenses = new ArrayList<>(Arrays.asList(
            new Expense("1", 75000.00, "Income", "Salary", "Monthly Salary", "2025-09-01"),
            new Expense("2", 1500.00, "Expense", "Food", "Lunch", "2025-09-02"),
            new Expense("3", 2000.00, "Expense", "Transport", "Bus fare", "2025-09-03")
    ));

    public void addExpense(Expense expense) {
        expenseRepo.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepo.findAll();
    }
    public Expense getExpenseById(int id) {
        return expenseRepo.findById(id).orElse(null);
    }

//    public void deleteExpense(int id) {
//        expenses.removeIf(expense -> expense.getId() == id);
//    }
}
