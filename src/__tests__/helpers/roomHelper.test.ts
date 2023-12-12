import {
	breakoutRoomsArrayContainsRoom,
	breakoutRoomsObjectContainsRoom,
	getParticipantFromRooms,
	getParticipantsFromRoom,
	getRoomByParticipant,
	isParticipantInRoom,
	sortBreakoutRooms,
} from "../../utils/helpers/roomHelper";
import { BreakoutRooms } from "../../utils/interfaces/BreakoutRoom";
import { Participants } from "../../utils/interfaces/Participant";

const room1Participants: Participants = {
	"testing/userId1": {
		id: "userId1",
		jid: "userJid1",
		displayName: "user1",
		role: "participant",
	},
	"testing/userId2": {
		id: "userId2",
		jid: "userJid2",
		displayName: "user2",
		role: "participant",
	},
};

const room2Participants: Participants = {
	"testing/userId3": {
		id: "userId3",
		jid: "userJid3",
		displayName: "user3",
		role: "participant",
	},
};

const testRooms: BreakoutRooms = {
	"room/roomId2": {
		id: "roomId2",
		jid: "room/roomJid2",
		name: "room2",
		isMainRoom: false,
		participants: room2Participants,
	},
	"room/roomId1": {
		id: "roomId1",
		jid: "room/roomJid1",
		name: "room1",
		isMainRoom: true,
		participants: room1Participants,
	},
};

describe("roomHelper - isParticipantInRoom", () => {
	test("should return the user's id if user is in specified room", () => {
		const result = isParticipantInRoom(room1Participants, "userId1");

		expect(result).toBe("testing/userId1");
	});

	test("should return undefined if user is not in the specified room", () => {
		const result = isParticipantInRoom(room1Participants, "userId3");

		expect(result).toBe(undefined);
	});
});

describe("roomHelper - getParticipantFromRooms", () => {
	test("should return the user's id if the user is in one of the specified rooms", () => {
		const result = getParticipantFromRooms(testRooms, "userId1");

		expect(result).toStrictEqual({
			id: "userId1",
			jid: "userJid1",
			displayName: "user1",
			role: "participant",
		});
	});

	test("should return undefined if the user is not in one of the specified rooms", () => {
		const result = getParticipantFromRooms(testRooms, "userId4");

		expect(result).toBe(undefined);
	});
});

describe("roomHelper - getParticipantsFromRoom", () => {
	test("should return the participants from the given room id", () => {
		const result = getParticipantsFromRoom(testRooms, "room/roomId1");

		expect(result).toStrictEqual(room1Participants);
	});

	test("should return undefined if the given room id does not exist", () => {
		const result = getParticipantsFromRoom(testRooms, "room/roomId3");

		expect(result).toBe(undefined);
	});
});

describe("roomHelper - getRoomByParticipant", () => {
	test("should return the room object for the room that the specified user is in", () => {
		const result = getRoomByParticipant(testRooms, "userId3");

		expect(result).toEqual(testRooms["room/roomId2"]);
	});

	test("should return undefined if user cannot be found in any room", () => {
		const result = getRoomByParticipant(testRooms, "userId4");

		expect(result).toEqual(undefined);
	});
});

describe("roomHelper - sortBreakoutRooms", () => {
	test("should sort the breakout rooms alphabetically", () => {
		const roomsArray = Object.values(testRooms);
		const result = sortBreakoutRooms(roomsArray);
		const sortedRooms = roomsArray.reverse();

		expect(result).toStrictEqual(sortedRooms);
		expect(result.length).toBe(sortedRooms.length);
	});

	test("should not change the initial array", () => {
		const roomsArray = Object.values(testRooms);
		const initialRoomsArray = [...roomsArray];
		sortBreakoutRooms(roomsArray);

		expect(roomsArray).toStrictEqual(initialRoomsArray);
	});

	test("should return an empty array if no rooms are provided", () => {
		const result = sortBreakoutRooms([]);

		expect(result).toEqual([]);
	});
});

describe("roomHelper - breakoutRoomsArrayContainsRoom", () => {
	test("should return true if room is in array", () => {
		const result = breakoutRoomsArrayContainsRoom(
			Object.values(testRooms),
			testRooms["room/roomId2"],
		);

		expect(result).toBeTruthy();
	});

	test("should return false if room is not in array", () => {
		const result = breakoutRoomsArrayContainsRoom(Object.values(testRooms), {
			id: "roomId3",
			jid: "roomJid3",
			name: "room3",
			isMainRoom: false,
			participants: {},
		});

		expect(result).toBeFalsy();
	});

	test("should return false if array is empty", () => {
		const result = breakoutRoomsArrayContainsRoom([], testRooms[0]);

		expect(result).toBeFalsy();
	});
});

describe("roomHelper - breakoutRoomsObjectContainsRoom", () => {
	test("should return true if room is in object", () => {
		const result = breakoutRoomsObjectContainsRoom(testRooms, "room/roomId1");

		expect(result).toBeTruthy();
	});

	test("should return false if room is not in object", () => {
		const result = breakoutRoomsObjectContainsRoom(testRooms, "room/roomId4");

		expect(result).toBeFalsy();
	});
});
