// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

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
