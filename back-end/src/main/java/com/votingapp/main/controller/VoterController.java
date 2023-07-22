package com.votingapp.main.controller;

import com.votingapp.main.dto.VoterDTO;
import com.votingapp.main.service.VoterService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/voters")
@CrossOrigin
public class VoterController {
    private final VoterService voterService;

    @GetMapping
    public List<VoterDTO> getAllVoter() {
        return voterService.getAllVoter();
    }

    @PostMapping("/create")
    public VoterDTO createVoter(@RequestBody VoterDTO voterDTO) {
        return voterService.createVoter(voterDTO);
    }

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteVoter(@PathVariable("id") long id) {
        return voterService.deleteVoterById(id);
    }
}
