package com.votingapp.main.modal;

import com.votingapp.main.dto.VoterDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "voters", schema = "votingapp")
public class Voter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private boolean voted;

    public static Voter convert(VoterDTO voterDTO) {
        Voter voter = new Voter();
        voter.setName(voterDTO.getName());
        voter.setVoted(voterDTO.isVoted());
        return voter;
    }

}
