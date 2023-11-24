import BreakoutRoom, { BreakoutRooms } from "../interfaces/BreakoutRoom";
import Participant, { Participants } from "../interfaces/Participant";

type NullableString = string | undefined;

export const isParticipantInRoom = (
	participants: Participants,
	userId: string
): NullableString => {
	const participantId: NullableString = Object.keys(participants).find(
		(participantId) => participantId.includes(userId)
	);
	return participantId;
};

export const getParticipantFromRooms = (
	rooms: BreakoutRooms,
	userId: string
): Participant | undefined => {
	const roomsValues = Object.values(rooms);

	for (const room of roomsValues) {
		const foundParticipantId = isParticipantInRoom(
			room.participants,
			userId
		);

		if (foundParticipantId !== undefined) {
			return room.participants[foundParticipantId];
		}
	}

	return undefined;
};

export const getParticipantsFromRoom = (
	rooms: BreakoutRooms,
	roomId: string
): Participants | undefined => {
	const room = rooms[roomId];

	if (room === undefined) {
		return undefined;
	}

	return rooms[roomId].participants;
};

export const getRoomByParticipant = (
	rooms: BreakoutRooms | Array<BreakoutRoom>,
	userId: string
): BreakoutRoom | undefined => {
	const roomsValues =
		typeof rooms === "object" ? Object.values(rooms) : rooms;

	for (const room of roomsValues) {
		const test = isParticipantInRoom(room.participants, userId);
		if (test !== undefined) {
			return room;
		}
	}

	return undefined;
};

export const sortBreakoutRooms = (
	rooms: Array<BreakoutRoom>
): Array<BreakoutRoom> => {
	const breakoutRooms = rooms.filter((room) => !room.isMainRoom);
	const mainRoom = rooms.find((room) => room.isMainRoom);
	/* c8 ignore next 3 */
	const sortedBreakoutRooms = breakoutRooms.sort((room1, room2) =>
		room1.name.localeCompare(room2.name)
	);

	if (!mainRoom) {
		return sortedBreakoutRooms;
	}

	return [mainRoom, ...sortedBreakoutRooms];
};

export const breakoutRoomsArrayContainsRoom = (
	breakoutRooms: Array<BreakoutRoom>,
	breakoutRoom: BreakoutRoom
): boolean => {
	return breakoutRooms.find((r) => r.jid === breakoutRoom?.jid) !== undefined;
};

export const breakoutRoomsObjectContainsRoom = (
	breakoutRooms: BreakoutRooms,
	roomJid: string
): boolean => {
	return breakoutRooms[roomJid] !== undefined;
};
