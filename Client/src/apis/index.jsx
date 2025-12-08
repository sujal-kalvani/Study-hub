const backendDomain="http://localhost:8000";

const SummaryApi={
    signup : {
        url : `${backendDomain}/signup`,
        method : "post"
    },

    login:{
        url:`${backendDomain}/login`,
        method:"post"
    }
    
}

export default SummaryApi