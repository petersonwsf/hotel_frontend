type TypeMessage = 'success' | 'error' | 'warning' | 'info'
import { events } from "@/lib/events/events"

export function handleToast(message: string, typeMessage: TypeMessage) {
    events.emit("alert", {message, typeMessage})
}