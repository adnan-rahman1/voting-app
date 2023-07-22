package com.votingapp.main.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@Getter
@ToString
public class VotingDTO {
    List<VoterDTO> voterDTOList;
    List<CandidateDTO> candidateDTOList;
}
