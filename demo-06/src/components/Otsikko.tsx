import { Typography } from '@mui/material';

interface Props {
  children: string;
  tyyli?: "iso" | "pieni";
}

const Otsikko = ({ children, tyyli = "iso" }: Props) => {
  return (
    <Typography
      sx={{
        fontSize: tyyli === "pieni" ? "18px" : "22px",
        marginTop: "10px",
        marginBottom: "10px"
      }}
    >
      {children}
    </Typography>
  );
};

export default Otsikko;
