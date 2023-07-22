import { Voter } from "@/types";
import CustomCard from "../base-comp/CustomCard";
import Table from "../base-comp/Table";

type VoterProps = {
    voters: Voter[]
}
const VoterComp = (props: VoterProps) => {
  return (
    <CustomCard title="Voter">
      <Table
        section="VOTER"
        columns={["Names", "Has Voted", "Delete"]}
        rows={props.voters}
      />
    </CustomCard>
  );
};

export default VoterComp;
