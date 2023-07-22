package com.votingapp.main.service;

import com.votingapp.main.dto.CandidateDTO;
import com.votingapp.main.dto.VoterDTO;
import com.votingapp.main.dto.VotingDTO;
import com.votingapp.main.modal.Candidate;
import com.votingapp.main.modal.Voter;
import com.votingapp.main.repository.CandidateRepository;
import com.votingapp.main.repository.VoterRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VotingService {

    private final VoterService voterService;
    private final CandidateService candidateService;


    public VotingDTO processVoting(long voterId, long candidateId) {
        VoterDTO voterDTO = voterService.findById(voterId);
        CandidateDTO candidateDTO = candidateService.findById(candidateId);
        if (voterDTO != null && candidateDTO != null) {
            candidateDTO.setVotes(candidateDTO.getVotes() + 1);
            candidateService.updateCandidate(candidateDTO);

            voterDTO.setVoted(true);
            voterService.updateVoter(voterDTO);
        }

        VotingDTO votingDTO = new VotingDTO();
        votingDTO.setCandidateDTOList(candidateService.getAllCandidates());
        votingDTO.setVoterDTOList(voterService.getAllVoter());

        return votingDTO;

    }
}
