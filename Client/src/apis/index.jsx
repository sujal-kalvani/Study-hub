const backendDomain="http://localhost:8000";

const SummaryApi={
    signup : {
        url : `${backendDomain}/signup`,
        method : "post"
    },

    login:{
        url:`${backendDomain}/signin`,
        method:"post"
    },

    profile:{
        url:`${backendDomain}/profile`,
        method:"put"
    },
    
    getProfile:{
        url:`${backendDomain}/me`,
        method:"get"
    }
}

export default SummaryApi