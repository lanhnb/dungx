import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "../CommonStyled";


const Xklds = () => {
  const navigate = useNavigate();
  

  return (
    <>
      <AdminHeaders>
        <h2>Labor Services</h2>
        <PrimaryButton
          onClick={() => navigate("/admin/xklds/create-xkld")}
        >
          Create
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
      
    </>
  );
};

export default Xklds;
