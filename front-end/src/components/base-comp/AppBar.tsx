import { Navbar, Typography } from "@material-tailwind/react";

export default function AppBar() {
  return (
      <Navbar
        className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4" 
        style={{
          borderRadius: 0,
          paddingLeft: "16rem",
          paddingRight: "16rem",
          background: "#607d8b"
        }}
      >
        <div className="container mx-auto flex items-center text-white">
          <Typography
            variant="h4"
            className="cursor-pointer py-1.5 font-medium"
          >
            Voting App
          </Typography>
        </div>
      </Navbar>
  );
}
