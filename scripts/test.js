// // const isVerified="";
// // if(isVerified===true){
// //     console.log("verfied")

// // }
// // else{
// //     console.log("not verifed")
// // }
// const isVerified=true;
// console.log(
//     `${isVerified===true? "user is verified" : "user is not verified"}`
// )

function getTimeString(time){
    const hour =parseInt(time/3600);
    let remainSeconds=parseInt(time%3600)
    const Minit=parseInt(remainSeconds/60);
    const Seconds=parseInt(remainSeconds%60);
    return `${hour} hours ${Minit} minites and ${Seconds} Seconds Ago`;      
}
console.log(getTimeString(3675))