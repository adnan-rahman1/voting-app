import { TableProps, Row } from "@/types";
import { IconButton } from "@material-tailwind/react";
import { CheckboxIcon, DeleteIcon } from "./Icons";
import { CandidatesContext, VotersContext } from "../Main";
import { useContext } from "react";

const retunRowVal = (val: any) => {
  switch (val) {
    case typeof val === "boolean" && String(val) === "0":
      return <CheckboxIcon color="red" />;
    case typeof val === "boolean" && val:
      return <CheckboxIcon color="green" />;
  }
  return val;
};

const Table = (props: TableProps) => {
  const { candidates, setCandidates } = useContext(CandidatesContext);
  const { voters, setVoters } = useContext(VotersContext);
  
  const deletebyID = async (sec: string, id: number) => {
    try {
      const response = await (
        await fetch(`http://localhost:8080/api/v1/${sec}/delete/${id}`, {
          method: "DELETE",
        })
      ).json();
      if (response) {
        console.log(`Successfully deleted a user by id: ${response}`);
        return response;
      }
    } catch (e) {
      throw new Error("Failed to delete candidate or voter by id");
    }
  };

  const handleOnDelete = async (id: number | undefined) => {
    if (id && props.section === "VOTER") {
      const body = await deletebyID("voters", id);
      if (body) {
        setVoters(voters.filter((v) => v.id != id));
      }
    } else if (id && props.section === "CANDIDATE") {
      const body = await deletebyID("candidates", id);
      if (body) {
        setCandidates(candidates.filter((c) => c.id != id));
      }
    }
  };

  return (
    <div className="overflow-auto" style={{ maxHeight: "300px" }}>
      <table className="w-full">
        <thead style={{ position: "sticky", top: 0, zIndex: 200 }}>
          <tr>
            {props.columns.map((column) => (
              <th
                key={column}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row) => (
            <tr className="hover:bg-gray-50" key={row.name}>
              {Object.keys(row).map((key) => (
                key != "id" ? <td key={key} className={`border px-4 py-2`}>
                  {retunRowVal(row[key as keyof Row])}
                </td> : null
              ))}
              <td className="border px-4 py2 text-center">
                <IconButton
                  onClick={() => handleOnDelete(row["id"])}
                  variant="text"
                  style={{ width: "24px", height: "24px" }}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
