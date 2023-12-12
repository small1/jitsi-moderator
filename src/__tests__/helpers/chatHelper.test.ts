import { shouldSendMessageToCurrentRoom } from "../../utils/helpers/chatHelper";
import BreakoutRoom from "../../utils/interfaces/BreakoutRoom";

const testRooms: Array<BreakoutRoom> = [
	{
		id: "roomId1",
		jid: "roomJid1",
		name: "room1",
		isMainRoom: false,
		participants: {},
	},
	{
		id: "roomId2",
		jid: "roomJid2",
		name: "room",
		isMainRoom: true,
		participants: {},
	},
];

describe("chatHelper - shouldSendMessageToCurrentRoom", () => {
	test("should return true if there are no breakout rooms", () => {
		const result = shouldSendMessageToCurrentRoom([], [], testRooms[0]);

		expect(result).toBeTruthy();
	});

	test("should return true if the user is in the selected room", () => {
		const result = shouldSendMessageToCurrentRoom(
			[testRooms[0]],
			[testRooms[0]],
			testRooms[0],
		);

		expect(result).toBeTruthy();
	});

	test("should return false if the user has selected another room", () => {
		const result = shouldSendMessageToCurrentRoom(
			[testRooms[0]],
			[testRooms[1]],
			testRooms[0],
		);

		expect(result).toBeFalsy();
	});

	test("should return false if the user has selected another room and their current room", () => {
		const result = shouldSendMessageToCurrentRoom(
			[testRooms[0]],
			[testRooms[0], testRooms[1]],
			testRooms[0],
		);

		expect(result).toBeFalsy();
	});
});
