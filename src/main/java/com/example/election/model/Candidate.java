package com.example.election.model;

import javax.persistence.*;

@Entity
public class Candidate {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "party_id")
    private PoliticalParty politicalParty;

    private Integer numberOfVotes;

    public Candidate() {
    }

    public Candidate(String name, Integer numberOfVotes) {
        this.name = name;
        this.numberOfVotes = numberOfVotes;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Integer getNumberOfVotes() {
        return numberOfVotes;
    }

    public void setNumberOfVotes(Integer numberOfVotes) {
        this.numberOfVotes = numberOfVotes;
    }
}
