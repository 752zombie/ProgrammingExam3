package com.example.election.config;

import com.example.election.model.Candidate;
import com.example.election.model.PoliticalParty;
import com.example.election.repository.CandidateRepository;
import com.example.election.repository.PoliticalPartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class InitData implements CommandLineRunner {

    @Autowired
    PoliticalPartyRepository politicalPartyRepository;

    @Autowired
    CandidateRepository candidateRepository;

    @Override
    public void run(String... args) {
        PoliticalParty[] parties = {new PoliticalParty("A - Socialdemokratiet"), new PoliticalParty("C - Det konservative Folkeparti"),
                new PoliticalParty("F - SF, Socialistisk Folkeparti"), new PoliticalParty("O - Dansk Folkeparti"),
                new PoliticalParty("V - Venstre, Danmarks Liberale Parti"), new PoliticalParty("Ø - Enhedslisten + De Rød Grønne")};

        Candidate[] arr1 = {new Candidate("Marcel Meijer", 0), new Candidate("Michael Kristensen", 0), new Candidate("Helle Hansen", 0)};
        Candidate[] arr2 = {new Candidate("Per Urban Olsen", 0), new Candidate("Peter Askjær", 0), new Candidate("Martin Sørensen", 0)};
        Candidate[] arr3 = {new Candidate("Ulla Holm", 0), new Candidate("Kjeld Bønkel", 0), new Candidate("Anne Grethe Olsen", 0)};
        Candidate[] arr4 = {new Candidate("Per Mortensen", 0)};
        Candidate[] arr5 = {new Candidate("Søren Wiese", 0), new Candidate("Anita Elgaard Højholt Olesen", 0), new Candidate("Carsten Bruun", 0) };
        Candidate[] arr6 = {new Candidate("Katrine Høegh Mc Quaid", 0), new Candidate("Jette M. Søgaard", 0), new Candidate("Søren Caspersen", 0)};

        Candidate[][] arrayOfArrays = {arr1, arr2, arr3, arr4, arr5, arr6};

        for (int i = 0; i < parties.length; i++) {
            parties[i].setCandidates(new HashSet<>(Arrays.asList(arrayOfArrays[i])));
            for (Candidate candidate : parties[i].getCandidates()) {
                candidateRepository.save(candidate);
            }
            politicalPartyRepository.save(parties[i]);
        }





    }

}
