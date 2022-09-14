import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { subscribeToChat, unSubscribeFromChat, WS_ChatEvent } from "../../utils/chat";
import styles from "../css/chat.module.css";

export default function DashboardChatPage() {

    const [chatMessages, setChatMessages] = useState<WS_ChatEvent[]>([]);


    const { tag } = useParams() as { tag: string };

    useEffect(() => {
        function handleChatUpdate(data: WS_ChatEvent) {
            setChatMessages((oldMessages) => {
                // TODO: fix bug double messages
                if (data.data === oldMessages[oldMessages.length - 1].data) {
                    return oldMessages;
                }
                return [...oldMessages, data]
            });
        }
        subscribeToChat(tag, handleChatUpdate);
        return function cleanup() {
            unSubscribeFromChat(tag, handleChatUpdate);
        };
    }, [tag]);

    return (
        <div className={styles.chatText}>
            {
                chatMessages.map((msg, index) => {
                    return <p key={index}>{msg.data}</p>
                })
            }
        </div>
    )
}