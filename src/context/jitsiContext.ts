// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import { createContext } from "react";
import IExtendedJitsiMeetExternalApi from "../utils/interfaces/IExtendedJitsiMeetExternalApi";
import BreakoutRoom from "../utils/interfaces/BreakoutRoom";

interface IJitsiContext {
	api?: IExtendedJitsiMeetExternalApi;
	currentBreakoutRoom?: BreakoutRoom;
	breakoutRooms: Array<BreakoutRoom>;
	userId: string;
	isSendingMessage: boolean;
	setIsSendingMessage: (isSendingMessage: boolean) => void;
}

const JitsiContext = createContext<IJitsiContext>({
	api: undefined,
	currentBreakoutRoom: undefined,
	breakoutRooms: [],
	userId: "",
	isSendingMessage: false,
	setIsSendingMessage: () => {},
});

export default JitsiContext;
