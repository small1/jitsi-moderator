// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

export type Role = "none" | "participant" | "moderator";

interface Participant {
	id: string;
	jid: string;
	role: Role;
	displayName: string;
}

export type Participants = { [key: string]: Participant };

export default Participant;
