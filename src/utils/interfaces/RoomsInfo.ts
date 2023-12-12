// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

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
