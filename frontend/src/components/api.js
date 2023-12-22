export const url = "http://178.128.213.109:5000/api";

export const setHeaders = () => {
  const headers = {
    headers: {
      // 'Content-Type': 'application/json',
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};


export const getComments = async()=>{
  return[
    {
      id: "1",
      body:"First comment",
      username:"lanh",
      userId:"1",
      parentId:null,
      createAt:"2023-12-16T15:40:03.532+00:00"
    },
    {
      id: "2",
      body:"Second comment",
      username:"Hoa",
      userId:"2",
      parentId:null,
      createAt:"2023-12-16T15:40:03.532+00:00"
    },

    {
      id: "3",
      body:"third comment",
      username:"Binh",
      userId:"3",
      parentId:null,
      createAt:"2023-12-16T15:40:03.532+00:00"
    },



  ]
}