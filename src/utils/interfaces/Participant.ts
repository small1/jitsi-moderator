export type Role = "none" | "participant" | "moderator";

interface Participant {
	id: string;
	jid: string;
	role: Role;
	displayName: string;
}

export type Participants = { [key: string]: Participant };

export default Participant;
