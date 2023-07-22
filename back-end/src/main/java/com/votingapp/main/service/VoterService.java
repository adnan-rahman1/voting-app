package com.votingapp.main.service;

import com.votingapp.main.dto.CandidateDTO;
import com.votingapp.main.dto.VoterDTO;
import com.votingapp.main.exception.CandidateNotFoundException;
import com.votingapp.main.exception.VoterNotFoundException;
import com.votingapp.main.modal.Candidate;
import com.votingapp.main.modal.Voter;
import com.votingapp.main.repository.VoterRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VoterService {

    private final VoterRepository voterRepository;

    public VoterDTO findById(long id) {
        Optional<Voter> voter = voterRepository.findById(id);
        return voter.map(VoterDTO::convert).orElse(null);
    }
    public List<VoterDTO> getAllVoter() {
        return voterRepository.findAll().stream().map(VoterDTO::convert).collect(Collectors.toList());
    }

    public VoterDTO createVoter(VoterDTO voterDTO) {
        voterDTO.setVoted(false);
        Voter voter = voterRepository.save(Voter.convert(voterDTO));
        return VoterDTO.convert(voter);
    }

    public void updateVoter(VoterDTO voterDTO) {
        voterRepository.save(Voter.convert(voterDTO));
        deleteVoterById(voterDTO.getId());
    }

    public HttpStatus deleteVoterById(long id) {
        Optional<Voter> voter= voterRepository.findById(id);
        if (voter.isPresent()) {
            voterRepository.deleteById(id);
            return HttpStatus.OK;
        } else  throw new VoterNotFoundException("Voter Not Found");
    }
}
