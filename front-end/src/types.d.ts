export type Voter = {
  id: number;
  name: string;
  voted: boolean;
};

export type VoterContext = {
  voters: Voter[];
  setVoters: (voters: Voter[]) => void;
};

export type Candidate = {
  id: number;
  name: string;
  votes: number;
};

type CandidateContext = {
  candidates: Candidate[];
  setCandidates: (candidates: Candidate[]) => void;
};

export type Row = {
  id?: number;
  name: string;
  votes?: number;
  voted?: boolean;
};
export type TableProps = {
  section: string;
  columns: Array<string>;
  rows: Array<Row>;
};

export type CheckboxIconProp = {
  color: string
}


export type PersonType = "VOTER" | "CANDIDATE"
export type DropdownProps = {
  type: PersonType;
  label: string;
  optionsData: Row[];
  handleOnSelectOption: (id: number, type: PersonType) => void;
};