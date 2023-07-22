package com.votingapp.main.controller;

import com.votingapp.main.dto.VotingDTO;
import com.votingapp.main.service.VotingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
@AllArgsConstructor
public class VotingController {

    private VotingService votingService;

    @PostMapping("/voting")
    public VotingDTO voting(@RequestParam("voterId")  long voterId, @RequestParam("candidateId") long candidateId) {
        return  votingService.processVoting(voterId, candidateId);
    }
}
