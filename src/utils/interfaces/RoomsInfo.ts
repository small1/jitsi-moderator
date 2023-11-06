import Participant from "./Participant";

interface Room {
	isMainRoom: boolean;
	id: string;
	jid: string;
	participants: Array<Participant>;
}

interface RoomsInfo {
	rooms: Array<Room>;
}

export default RoomsInfo;
