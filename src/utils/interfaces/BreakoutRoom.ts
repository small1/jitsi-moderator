import { Participants } from "./Participant";

interface BreakoutRoom {
	id: string;
	jid: string;
	name: string;
	isMainRoom: boolean | undefined;
	participants: Participants;
}

export type BreakoutRooms = { [key: string]: BreakoutRoom };

export default BreakoutRoom;
