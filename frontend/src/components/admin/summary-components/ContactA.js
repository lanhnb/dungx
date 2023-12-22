import { Outlet, useNavigate } from "react-router-dom";
import ContactList from "../list/Contactlist";


const ContactsA = () => {
  const navigate = useNavigate();
  

  return (
    <>
     <ContactList/>
     <Outlet />
      
    </>
  );
};

export default ContactsA;