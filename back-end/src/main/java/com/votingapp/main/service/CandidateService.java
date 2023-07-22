package com.votingapp.main.service;

import com.votingapp.main.dto.CandidateDTO;
import com.votingapp.main.exception.CandidateNotFoundException;
import com.votingapp.main.modal.Candidate;
import com.votingapp.main.repository.CandidateRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CandidateService {

    private final CandidateRepository candidateRepository;

    public CandidateDTO findById(long id) {
        Optional<Candidate> candidate = candidateRepository.findById(id);
        return candidate.map(CandidateDTO::convert).orElse(null);
    }

    public List<CandidateDTO> getAllCandidates() {
        return candidateRepository.findAll().stream().map(CandidateDTO::convert).collect(Collectors.toList());
    }

    public CandidateDTO createCandidate(CandidateDTO candidateDTO) {
        candidateDTO.setVotes(0);
        Candidate candidate = candidateRepository.save(Candidate.convert(candidateDTO));
        return CandidateDTO.convert(candidate);
    }

    public void updateCandidate(CandidateDTO candidateDTO) {
        candidateRepository.save(Candidate.convert(candidateDTO));
        deleteCandidateById(candidateDTO.getId());
    }

    public HttpStatus deleteCandidateById(long id) {
        Optional<Candidate> candidate = candidateRepository.findById(id);
        if (candidate.isPresent()) {
            candidateRepository.deleteById(id);
            return HttpStatus.OK;
        } else  throw new CandidateNotFoundException("Candidate Not Found");
    }
}
