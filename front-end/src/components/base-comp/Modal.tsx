import { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { Voter, Candidate } from "@/types";
import { VotersContext, CandidatesContext } from "../Main";
import { ToastContainer, toast } from "react-toastify";

type ModalProps = {
  title: string | undefined;
  value: null | string;
  handleOnClickOpenModal: (val: string | null) => void;
};

export default function Modal(props: ModalProps) {
  const { voters, setVoters } = useContext(VotersContext);
  const { candidates, setCandidates } = useContext(CandidatesContext);

  const [name, setName] = useState("");

  const handleOnChangeName = (e: any) => {
    setName(e.target.value);
  };

  const handleOpen = (value: null | string) => {
    props.handleOnClickOpenModal(value);
  };

  const createCandidateOrVoters = async () => {
    if (name == "") return;
    try {
      const response = await (
        await fetch(
          `http://localhost:8080/api/v1/${
            props.title === "Voter" ? "voters" : "candidates"
          }/create`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              name: name,
            }),
          }
        )
      ).json();
      if (response) {
        if (props.title == "Voter") setVoters([...voters, response as Voter]);
        if (props.title == "Candidate")
          setCandidates([...candidates, response as Candidate]);
        handleOpen(null);

        toast.success(`${props.title} created.`)
        console.log("Successfully created a candidate or voters");
      }
    } catch (e) {
      console.error("Failed to create candidate or voters");
    }
    setName("");
  };

  return (
    <Dialog open={props.value === "xs"} size="xs" handler={handleOpen}>
      <DialogHeader className="text-grey-300">Add {props.title}</DialogHeader>
      <DialogBody divider>
        <div className="w-72">
          <Input
            value={name}
            onChange={handleOnChangeName}
            required
            variant="outlined"
            label="Please enter a name"
          />
        </div>
      </DialogBody>
      <DialogFooter style={{ display: "flex", gap: 10 }}>
        <Button
          variant="text"
          color="red"
          onClick={() => handleOpen(null)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => createCandidateOrVoters()}
        >
          <span>Create</span>
        </Button>
      </DialogFooter>
      <ToastContainer />
    </Dialog>
  );
}
