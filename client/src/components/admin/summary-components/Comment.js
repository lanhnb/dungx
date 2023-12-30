import { Outlet, useNavigate } from "react-router-dom";
import CommentList from "../list/Commentlist";


const Comment = () => {
  const navigate = useNavigate();
  

  return (
    <>
     <CommentList/>
     <Outlet />
      
    </>
  );
};

export default Comment;