package com.example.election.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

@Entity
public class PoliticalParty {
    @Id
    @GeneratedValue
    private Integer partyId;

    private String name;

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "party_id")
    private Set<Candidate> candidates;

    public PoliticalParty() {
    }

    public PoliticalParty(String name) {
        this.name = name;
    }

    public Integer getPartyId() {
        return partyId;
    }

    public void setPartyId(Integer partyId) {
        this.partyId = partyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCandidates(Set<Candidate> candidates) {
        this.candidates = candidates;
    }

    public Set<Candidate> getCandidates() {
        return candidates;
    }
}
