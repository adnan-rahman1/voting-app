import { useEffect, useMemo, useState, createContext } from "react";
import Dropdown from "./base-comp/Dropdown";
import { Button, Typography } from "@material-tailwind/react";
import {
  Candidate,
  CandidateContext,
  PersonType,
  Voter,
  VoterContext,
} from "@/types";
import VoterComp from "./voter-comp/VoterComp";
import CandidateComp from "./candidate-comp/CandidateComp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const VotersContext = createContext<VoterContext>({
  voters: [] as Voter[],
  setVoters: () => {},
});
export const CandidatesContext = createContext<CandidateContext>({
  candidates: [] as Candidate[],
  setCandidates: () => {},
});

const Main = () => {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const [voter, setVoter] = useState<Voter>();
  const [candidate, setCandidate] = useState<Candidate>();

  const voterDropDownOptions = useMemo(
    () => voters.filter((v) => !v.voted),
    [voters]
  );

  const fetchVoters = async () => {
    try {
      const body = await (
        await fetch("http://localhost:8080/api/v1/voters")
      ).json();
      if (body) {
        setVoters(body);
      }
    } catch (e) {
      console.error("Failed to fetch voters data");
    }
  };
  const fetchCandidates = async () => {
    try {
      const body = await (
        await fetch("http://localhost:8080/api/v1/candidates")
      ).json();
      if (body) {
        setCandidates(body);
      }
    } catch (e) {
      console.error("Failed to fetch candidates data");
    }
  };

  useEffect(() => {
    fetchVoters();
    fetchCandidates();
  }, []);

  const handleOnSelectOption = (id: number, type: PersonType) => {
    if (type === "VOTER") {
      setVoter(voters.find((v) => v.id == id));
    } else if (type === "CANDIDATE") {
      setCandidate(candidates.find((c) => c.id === id));
    }
  };

  const handleOnSubmit = async () => {
    if (voter && candidate) {
      try {
        const response = await (
          await fetch(
            `http://localhost:8080/api/v1/voting?voterId=${voter.id}&candidateId=${candidate.id}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
            }
          )
        ).json();
        if (response) {
          setVoters(response.voterDTOList);
          setCandidates(response.candidateDTOList);
          toast.success("Successfully Voted");
        }
      } catch (e) {
        throw new Error("Faild Voting Process");
      }
    }
  };

  return (
    <VotersContext.Provider value={{ voters, setVoters }}>
      <CandidatesContext.Provider value={{ candidates, setCandidates }}>
        <div
          className="h-screen flex flex-col items-center justify-center gap-10"
          style={{ height: "calc(100vh - 60px)" }}
        >
          <div className="flex" style={{ gap: 60 }}>
            <VoterComp voters={voters} />
            <CandidateComp candidates={candidates} />
          </div>
          <div
            className="flex items-center gap-4"
            style={{ marginTop: "4rem" }}
          >
            <Typography variant="h4">Votes!</Typography>
            <Dropdown
              type="VOTER"
              label="I am"
              optionsData={voterDropDownOptions}
              handleOnSelectOption={handleOnSelectOption}
            />
            <Dropdown
              type="CANDIDATE"
              label="I vote for"
              optionsData={candidates}
              handleOnSelectOption={handleOnSelectOption}
            />
            <Button onClick={handleOnSubmit}>Submit</Button>
          </div>
          <ToastContainer />
        </div>
      </CandidatesContext.Provider>
    </VotersContext.Provider>
  );
};

export default Main;
