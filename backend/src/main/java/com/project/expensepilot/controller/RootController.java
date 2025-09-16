package com.project.expensepilot.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    
   

    @GetMapping("/status")
    public ResponseEntity<String> status() {
        return new ResponseEntity<>("Server is healthy", HttpStatus.OK);
    }
}
