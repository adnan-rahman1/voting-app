package com.votingapp.main.controller;

import com.votingapp.main.dto.CandidateDTO;
import com.votingapp.main.service.CandidateService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/candidates")
@CrossOrigin
public class CandidateController {

    private final CandidateService candidateService;

    @GetMapping
    public List<CandidateDTO> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    @PostMapping("/create")
    public CandidateDTO create(@RequestBody CandidateDTO candidateDTO) {
        return candidateService.createCandidate(candidateDTO);
    }

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteCandidate(@PathVariable("id") long id) {
        return candidateService.deleteCandidateById(id);
    }
}
