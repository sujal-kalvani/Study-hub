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
    },

    changepassword:{
        url:`${backendDomain}/ChangePassword`,
        method:"post",
    },
    ResetPassword:{
        url:`${backendDomain}/ResetPassword`,
        method:"post",
    },
    verifyOtp:{
        url:`${backendDomain}/verifyOtp`,
        method:"post"
    },
    becomeEducator:{
        url:`${backendDomain}/become-educator`,
        method:"put"
    },
    AddCourses:{
        url:`${backendDomain}/create-course`,
        method:"post"
    }
}

export default SummaryApi