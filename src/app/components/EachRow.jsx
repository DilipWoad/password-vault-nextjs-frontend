const EachRow =()=>{
    const vault = {
        title:"This is gpassword",
        username:"dilipwoad",
        password:"Snnefgoieimo",
        note:"",
        url:"www.google.com"
    }
    const {title,username,password,note,url} = vault;
    return(
        <div className="bg-red-500">
            <div>{title}</div>
            <div>{username}</div>
            <div>{password}</div>
            <div>{note}</div>
            <div>{url}</div>
        </div>
    )
}


export default EachRow;