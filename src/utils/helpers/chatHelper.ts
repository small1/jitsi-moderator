// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import BreakoutRoom from "../interfaces/BreakoutRoom";

export const shouldSendMessageToCurrentRoom = (
	breakoutRooms: Array<BreakoutRoom>,
	selectedBreakoutRooms: Array<BreakoutRoom>,
	currentBreakoutRoom: BreakoutRoom,
): boolean => {
	if (breakoutRooms.length === 0) {
		return true;
	}

	if (
		selectedBreakoutRooms.length === 1 &&
		selectedBreakoutRooms.find((room) => currentBreakoutRoom?.jid === room.jid)
	) {
		return true;
	}

	return false;
};
