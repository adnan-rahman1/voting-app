import { ReactElement, useState } from "react";
import {
  CardHeader,
  CardBody,
  Typography,
  Card,
  IconButton,
} from "@material-tailwind/react";
import Modal from "./Modal";
import { PlusIcon } from "./Icons";

type CardProps = {
  title?: string;
  children: ReactElement;
};
const CustonCard = (props: CardProps) => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOnClickOpenModal = (om: string | null) => {
    setOpenModal(om);
  };

  return (
    <>
      <Card className="mt-6 w-96">
        <CardHeader
          color="blue-gray"
          className="flex relative h-56 justify-between"
          style={{ padding: "12px" }}
        >
          <Typography variant="h4">{props.title}</Typography>
          <IconButton
            variant="text"
            style={{ height: "inherit" }}
            onClick={() => handleOnClickOpenModal("xs")}
          >
            <PlusIcon />
          </IconButton>
        </CardHeader>
        <CardBody>
          <div className="px-8 py-6">{props.children}</div>
        </CardBody>
      </Card>
      <Modal
        title={props.title}
        value={openModal}
        handleOnClickOpenModal={handleOnClickOpenModal}
      />
    </>
  );
};

export default CustonCard;
