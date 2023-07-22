package com.votingapp.main.dto;

import com.votingapp.main.modal.Candidate;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CandidateDTO {
    private long id;
    private String name;
    private int votes;

    public static CandidateDTO convert(Candidate candidate) {
        CandidateDTO candidateDTO = new CandidateDTO();
        candidateDTO.setId(candidate.getId());
        candidateDTO.setName(candidate.getName());
        candidateDTO.setVotes(candidate.getVotes());
        return candidateDTO;
    }
}
