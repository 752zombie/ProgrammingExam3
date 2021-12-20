package com.example.election.restcontroller;

import com.example.election.model.PoliticalParty;
import com.example.election.repository.CandidateRepository;
import com.example.election.model.Candidate;
import com.example.election.repository.PoliticalPartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class CandidateRestController {

    @Autowired
    CandidateRepository candidateRepository;

    @Autowired
    PoliticalPartyRepository politicalPartyRepository;

    @GetMapping("/api/get-all-candidates")
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        return new ResponseEntity<>(candidateRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/api/get-candidates-by-party/{id}")
    public ResponseEntity<Set<Candidate>> getCandidatesByParty(@PathVariable("id") Integer id) {

        Optional<PoliticalParty> politicalPartyOptional = politicalPartyRepository.findById(id);

        if (politicalPartyOptional.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        PoliticalParty politicalParty = politicalPartyOptional.get();

        return new ResponseEntity<>(politicalParty.getCandidates(), HttpStatus.OK);
    }

    @PostMapping(value = "/api/create-candidate", consumes = "application/json")
    public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate candidate) {
        candidateRepository.save(candidate);
        return new ResponseEntity<>(null, HttpStatus.ACCEPTED);
    }

    @PutMapping(value = "/api/edit-candidate", consumes = "application/json")
    public ResponseEntity<Candidate> editCandidate(@RequestBody Candidate candidate) {
        candidateRepository.save(candidate);
        return new ResponseEntity<>(null, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/api/delete-candidate/{id}")
    public ResponseEntity<Candidate> deleteCandidate(@PathVariable("id") Integer id) {
        candidateRepository.deleteById(id);
        return new ResponseEntity<>(null, HttpStatus.ACCEPTED);
    }

}
