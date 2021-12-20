package com.example.election.restcontroller;

import com.example.election.model.PoliticalParty;
import com.example.election.repository.PoliticalPartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PoliticalPartyRestController {
    @Autowired
    PoliticalPartyRepository politicalPartyRepository;

    @GetMapping("/api/get-all-parties")
    public ResponseEntity<List<PoliticalParty>> getAllParties() {
        return new ResponseEntity<>(politicalPartyRepository.findAll(), HttpStatus.OK);
    }
}
