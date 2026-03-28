import { FishjamClient } from "@fishjam-cloud/js-server-sdk";
import dotenv from "dotenv";

dotenv.config();

const fishjamClient = new FishjamClient({
    fishjamId: process.env.FISHJAM_ID!,
    managementToken: process.env.FISHJAM_MANAGEMENT_TOKEN!,
});

export const createPianoSession = async () => {
    try {
        // create room
        const room = await fishjamClient.createRoom();

        // create peer
        const { peer, peerToken } = await fishjamClient.createPeer(room.id, {
            metadata: { name: "piano-user" },
        });

        console.log("Session created:", room.id);
        console.log("Peer created:", peer.id);

        return {
            roomId: room.id,
            peerToken,
            fishjamId: process.env.FISHJAM_ID,
        };
    } catch (error) {
        console.error("Fishjam Server Error:", error);
        throw new Error("Communication failed.");
    }
};