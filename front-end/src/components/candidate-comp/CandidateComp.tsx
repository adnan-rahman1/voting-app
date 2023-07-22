import { Candidate } from "@/types";
import CustomCard from "../base-comp/CustomCard";
import Table from "../base-comp/Table";

type CandidateProps = {
  candidates: Candidate[];
};
const CandidateComp = (props: CandidateProps) => {
  return (
    <CustomCard title="Candidate">
      <Table
        section="CANDIDATE"
        columns={["Names", "Num of Votes", "Delete"]}
        rows={props.candidates}
      />
    </CustomCard>
  );
};

export default CandidateComp;
