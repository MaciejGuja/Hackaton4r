import { FishjamClient } from "@fishjam-cloud/js-server-sdk";
import dotenv from "dotenv";

dotenv.config();

const fishjamClient = new FishjamClient({
    fishjamId: process.env.FISHJAM_ID!,
    managementToken: process.env.FISHJAM_MANAGEMENT_TOKEN!,
});

export const createPianoSession = async () => {
    try {
        const room = await fishjamClient.createRoom();

        const { peerToken } = await fishjamClient.createPeer(room.id, {
            metadata: { role: "piano-user" },
        });

        console.log(`Session created: ${room.id}`);

        return {
            roomId: room.id,
            peerToken,
            fishjamId: process.env.FISHJAM_ID
        };
    } catch (error) {
        console.error("Fishjam Server Error:", error);
        throw new Error("Błąd podczas komunikacji z serwerem Fishjam.");
    }
};