"use client"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"

export default function PaymentCardForm() {
    
    const stripe = useStripe()
    const elements = useElements()
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return
        
    }
    
    return (
        <div>

        </div>
    )
}