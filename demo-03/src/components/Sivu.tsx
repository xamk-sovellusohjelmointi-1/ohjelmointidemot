interface Props {
  children: React.ReactNode;
}

const Sivu = ({ children }: Props) => {
  return (
    <div className="sivu">
      {children}
    </div>
  );
};

export default Sivu;
