import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "../CommonStyled";


const Nhadats = () => {
  const navigate = useNavigate();
  

  return (
    <>
      <AdminHeaders>
        <h2>Labor Services</h2>
        <PrimaryButton
          onClick={() => navigate("/admin/nhadats/create-nhadat")}
        >
          Create
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
      
    </>
  );
};

export default Nhadats;
