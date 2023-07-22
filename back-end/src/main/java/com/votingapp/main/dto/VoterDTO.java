package com.votingapp.main.dto;

import com.votingapp.main.modal.Voter;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VoterDTO {
    private long id;
    private String name;
    private boolean voted;

    public static VoterDTO convert(Voter voter) {
        VoterDTO voterDTO = new VoterDTO();
        voterDTO.setId(voter.getId());
        voterDTO.setName(voter.getName());
        voterDTO.setVoted(voter.isVoted());
        return voterDTO;
    }
}
