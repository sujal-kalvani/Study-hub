import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SummaryApi from "../apis";
import { toast } from "react-toastify";

const Payment_success = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      toast.error("Invalid payment session");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(SummaryApi.verifyPayment.url, {
          method: SummaryApi.verifyPayment.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Student Enrolled Successfully 🎉");
          navigate("/");
        } else {
          toast.error(data.message || "Payment verification failed");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    verifyPayment();
  }, [sessionId, token, navigate]);

  return (
    <div className="h-full mt-20 text-center">
      Verifying payment...
    </div>
  );
};

export default Payment_success;
