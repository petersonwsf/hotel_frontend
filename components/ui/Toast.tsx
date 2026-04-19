"use client";
import { LuTriangleAlert } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";


import { events } from "@/lib/events/events";
import { useState, useEffect } from "react";

type TypeMessage = 'success' | 'error' | 'warning' | 'info'

export default function Toast() {
    const [message, setMessage] = useState<string>('')
    const [typeMessage, setTypeMessage] = useState<TypeMessage>('info')
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        events.on('alert', (data) => {
            setMessage(data.message)
            setTypeMessage(data.typeMessage)
            setVisible(true)

            setTimeout(() => setVisible(false), 5000)
        })
    }, [])

    function handleBackground(typeMessage: TypeMessage) {
        if (typeMessage === 'success') return 'bg-green-500'
        if (typeMessage === 'error') return 'bg-red-500'
        if (typeMessage === 'warning') return 'bg-orange-400'
        if (typeMessage === 'info') return 'bg-sky-500'
    }

    function renderIcon(typeMessage: TypeMessage) {
        if (typeMessage === 'success') return <FaRegCheckCircle className="text-white w-5 h-5"/>
        if (typeMessage === 'error') return <MdErrorOutline className="text-white w-5 h-5" />
        if (typeMessage === 'warning') return <LuTriangleAlert className="text-white w-5 h-5"/>
        if (typeMessage === 'info') return <IoMdInformationCircleOutline className="text-white w-5 h-5" />
    }

    if (!visible) return null;

    return (
        <div className={`flex gap-2  items-center fixed top-5 right-5 z-[1000] py-3 px-[2rem] ${handleBackground(typeMessage)} rounded-[10px]`}>
            {renderIcon(typeMessage)}
            <p className="text-white">{message}</p>
        </div>
    )
}