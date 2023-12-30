const FormatPrice = ({price})=>{
    return Intl.NumberFormat("vi-VN",{
        style: "currency",
        currency:"VND",
        maximumFractionDigits:2,
    }).format(price/100);
 };
 export default FormatPrice;