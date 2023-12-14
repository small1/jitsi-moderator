import { JitsiCommands } from "../enums/JitsiCommands";
import { JitsiEvents } from "../enums/JitsiEvents";
import { IBreakoutRoomsUpdated } from "../hooks/useBreakoutRoomsUpdated";
import IExtendedJitsiMeetExternalApi from "../interfaces/IExtendedJitsiMeetExternalApi";
import {
	breakoutRoomsObjectContainsRoom,
	getParticipantFromRooms,
	getParticipantsFromRoom,
	getRoomByParticipant,
} from "../helpers/roomHelper";
import BreakoutRoom from "../interfaces/BreakoutRoom";
import JitsiNotification from "../interfaces/JitsiNotification";

export const executeCommand = (
	command: JitsiCommands,
	api?: IExtendedJitsiMeetExternalApi,
	value?: any,
) => {
	if (!api) return;

	api.executeCommand(command, value);
};

export const sendMessageToAll = async (
	text: string,
	currentUserId: string,
	api?: IExtendedJitsiMeetExternalApi,
) => {
	if (!api) return;

	const breakoutRoomsList = await api.listBreakoutRooms();
	const rooms = Object.values(breakoutRoomsList);
	const mainRoom = rooms.find((r) => r.isMainRoom);
	const currentParticipant = getParticipantFromRooms(
		breakoutRoomsList,
		currentUserId,
	);

	for (const room of rooms) {
		if (!room.isMainRoom) {
			await joinBreakoutRoom(
				api,
				room.jid,
				room.id,
				currentParticipant?.jid ?? "",
			);
			api.executeCommand(JitsiCommands.SEND_CHAT_MESSAGE, text);
		}
	}

	await joinBreakoutRoom(
		api,
		mainRoom?.jid!,
		mainRoom?.id!,
		currentParticipant?.jid ?? "",
	);
};

export const sendMessageToRooms = async (
	text: string,
	currentUserId: string,
	roomsJids: Array<BreakoutRoom>,
	api?: IExtendedJitsiMeetExternalApi,
) => {
	if (!api) return;

	const breakoutRoomsList = await api.listBreakoutRooms();
	const rooms = Object.values(breakoutRoomsList).filter(
		(breakoutRoom) =>
			roomsJids.find((r) => breakoutRoom.jid === r.jid) !== undefined,
	);
	const currentParticipant = getParticipantFromRooms(
		breakoutRoomsList,
		currentUserId,
	);
	const currentParticipantRoom = getRoomByParticipant(
		breakoutRoomsList,
		currentUserId,
	);

	for (const room of rooms) {
		if (room.jid !== currentParticipantRoom!.jid) {
			await joinBreakoutRoom(
				api,
				room.jid,
				room.id,
				currentParticipant?.jid ?? "",
			);
			api.executeCommand(JitsiCommands.SEND_CHAT_MESSAGE, text);
		}
	}

	await joinBreakoutRoom(
		api,
		currentParticipantRoom?.jid!,
		currentParticipantRoom?.id!,
		currentParticipant?.jid ?? "",
	);
};

export const sendMessageToCurrentRoom = async (
	text: string,
	api?: IExtendedJitsiMeetExternalApi,
) => {
	if (!api) return;

	api.executeCommand(JitsiCommands.SEND_CHAT_MESSAGE, text);
};

export const joinBreakoutRoom = (
	api: IExtendedJitsiMeetExternalApi,
	roomJid: string,
	roomId: string,
	userJid: string,
): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		const handleBreakoutRoomsUpdated = (event: IBreakoutRoomsUpdated) => {
			const participantsInRoom = getParticipantsFromRoom(event.rooms, roomId);

			if (participantsInRoom === undefined) {
				api.removeListener(
					JitsiEvents.BREAKOUT_ROOMS_UPDATED,
					handleBreakoutRoomsUpdated,
				);
				reject();
			}

			const participants = Object.values(participantsInRoom!);

			if (participants.find((p) => p.jid === userJid)) {
				api.removeListener(
					JitsiEvents.BREAKOUT_ROOMS_UPDATED,
					handleBreakoutRoomsUpdated,
				);
				resolve();
			}
		};

		api.addListener(
			JitsiEvents.BREAKOUT_ROOMS_UPDATED,
			handleBreakoutRoomsUpdated,
		);

		api.executeCommand(JitsiCommands.JOIN_BREAKOUT_ROOM, roomJid);
	});
};

export const removeBreakoutRoom = (
	api: IExtendedJitsiMeetExternalApi,
	roomJid: string,
): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		const handleBreakoutRoomsUpdated = (event: IBreakoutRoomsUpdated) => {
			const roomExists = breakoutRoomsObjectContainsRoom(event.rooms, roomJid);

			if (!roomExists) {
				api.removeListener(
					JitsiEvents.BREAKOUT_ROOMS_UPDATED,
					handleBreakoutRoomsUpdated,
				);
				resolve();
			}
		};

		api.addListener(
			JitsiEvents.BREAKOUT_ROOMS_UPDATED,
			handleBreakoutRoomsUpdated,
		);

		api.executeCommand(JitsiCommands.REMOVE_BREAKOUT_ROOM, roomJid);
	});
};

export const joinMainRoom = (
	api: IExtendedJitsiMeetExternalApi,
	userJid: string,
	mainRoomId: string,
): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		const handleBreakoutRoomsUpdated = (event: IBreakoutRoomsUpdated) => {
			const participantsInRoom = getParticipantsFromRoom(
				event.rooms,
				mainRoomId,
			);

			if (participantsInRoom === undefined) {
				api.removeListener(
					JitsiEvents.BREAKOUT_ROOMS_UPDATED,
					handleBreakoutRoomsUpdated,
				);
				reject();
			}

			if (Object.values(participantsInRoom!).find((p) => p.jid === userJid)) {
				api.removeListener(
					JitsiEvents.BREAKOUT_ROOMS_UPDATED,
					handleBreakoutRoomsUpdated,
				);
				resolve();
			}
		};

		api.addListener(
			JitsiEvents.BREAKOUT_ROOMS_UPDATED,
			handleBreakoutRoomsUpdated,
		);

		api.executeCommand(JitsiCommands.JOIN_BREAKOUT_ROOM);
	});
};

export const sendEveryoneBackToMainRoom = async (
	api?: IExtendedJitsiMeetExternalApi,
) => {
	if (!api) return;

	const { rooms } = await api.getRoomsInfo();
	const mainRoomId = rooms.find((r) => r.isMainRoom)?.id;

	for (const room of rooms) {
		for (const participant of room.participants) {
			api.executeCommand(
				JitsiCommands.SEND_PARTICIPANT_TO_ROOM,
				participant.id,
				mainRoomId,
			);
		}
	}
};

export const showNotification = async (
	notification: JitsiNotification,
	api?: IExtendedJitsiMeetExternalApi,
) => {
	if (!api) return;

	api.executeCommand(JitsiCommands.SHOW_NOTIFICATION, notification);
};
