import styled from "styled-components"

const Widget = ({data})=>{
    return <StyledWidget>
            <Icon color={data.color} bgcolor={data.bgcolor}>{data.icon}</Icon>
            <Text>
              <h3>
                {data.isMoney ? "$" + data.digits?.toLocaleString(): data.digits?.toLocaleString()}
              </h3>
            <Title>
            <p>
              {data.title}
            </p>
            </Title>
            </Text>
              {data.percentage < 0 ? <> <Percentage isPositive = {false}>
                {Math.floor(data.percentage) + "%"}</Percentage>
              </> : <>
              <Percentage isPositive = {true}>
                {Math.floor(data.percentage) + "%"}</Percentage></>}
        
            </StyledWidget>;
}

export default Widget;

const StyledWidget = styled.div`
align-items: center;
display: flex;
`;

const Icon = styled.div`
margin-right: 0.5rem;
padding: 0.5rem;
color: ${({color}) => color};
background: ${({bgcolor}) => bgcolor};
border-radius: 3px;
font-size:25px;

`;
const Text = styled.div`
p{
  font-size: 14px;
  color: rgb(255, 255, 255, 0.68);
}

h3{
  font-size: 18px;
  color: rgb(255, 255, 255);
}
`;


const Title = styled.div`
p{
  font-size: 20px;
  color: rgb(255, 255, 255, 0.68);
}
`;
const Percentage = styled.div`
margin-left: 0.5rem;
font-size: 14px;
color: ${({isPositive})=> isPositive ? "rgb(114, 225, 40)" : "rgb(255, 77, 73)"};
`



