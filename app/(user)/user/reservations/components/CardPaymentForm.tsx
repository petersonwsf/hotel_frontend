"use client"
import { Payment } from "@/types/Payment.types";
import { handleToast } from "@/utils/handleToast";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface CardPaymentFormProps {
    payment: Payment;
}

export default function CardPaymentForm({ payment } : CardPaymentFormProps) {

    const stripe = useStripe()
    const elements = useElements()
    const [name, setName] = useState<string>('')
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return
        setIsProcessing(true)

        const cardNumberElement = elements.getElement(CardNumberElement)

        const { paymentIntent, error } = await stripe.confirmCardPayment(payment.clientSecret, {
            payment_method: {
                card: cardNumberElement!,
                billing_details: { name }
            }
        })

        if (error) {
            console.log(error)
            handleToast(error.message ?? '', 'error')
        } else if (paymentIntent.status === 'succeeded') {
            handleToast('Pagamento realizado com sucesso', 'success')
        }
        setIsProcessing(false)
    }
    

    const elementOptions = {
        style: {
            base: {
                fontSize: '17px',
                fontWeight: '200',
                color: '#1f2937',
                backgroundColor: 'transparent',
                fontFamily: 'inherit',
                '::placeholder': { color: '#9ca3af', fontWeight: '400' },
            },
            invalid: {
                color: '#dc2626',
            },
        }
    };

    const stripeWrapperClass =
        "w-full rounded-lg border outline-none border-gray-300 bg-white p-3 text-[17px] transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"

    return (
        <form onSubmit={handleSubmit} className="p-[1.5rem] bg-blue-100 rounded-xl">
            <div className="flex flex-col my-2">
                <label className="font-light">Nome no Cartão</label>
                <input type="text" value={name} className={stripeWrapperClass} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="flex flex-col my-2">
                <label className="font-light">Número do Cartão</label>
                <div className={stripeWrapperClass}>
                    <CardNumberElement options={elementOptions} />
                </div>
            </div>

            <div className="row">
                <div className="flex flex-col my-2">
                <label className="font-light">Validade</label>
                <div className={stripeWrapperClass}>
                    <CardExpiryElement options={elementOptions} />
                </div>
                </div>

                <div className="flex flex-col my-2">
                <label className="font-light">CVC</label>
                <div className={stripeWrapperClass}>
                    <CardCvcElement options={elementOptions} />
                </div>
                </div>
            </div>
            
            <div className="flex justify-center items-center w-full mt-[2rem]">
                 <button type="submit" disabled={isProcessing || !stripe} className={`px-[4rem] py-[.5rem] rounded-xl bg-[#0022B3] flex items-center justify-center font-light text-lg text-white ${isProcessing ? 'opacity-[.5] pointer-events-none' : 'cursor-pointer'}`}>
                    {isProcessing && <div className="animate-spin"><AiOutlineLoading3Quarters fontSize={15}/></div>}
                    {isProcessing ? 'Pagando' : 'Pagar'}
                </button>
            </div>
        </form>
    )
}