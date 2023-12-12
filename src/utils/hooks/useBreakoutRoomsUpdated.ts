// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from "react";
import { JitsiEvents } from "../enums/JitsiEvents";
import IExtendedJitsiMeetExternalApi from "../interfaces/IExtendedJitsiMeetExternalApi";
import BreakoutRoom, { BreakoutRooms } from "../interfaces/BreakoutRoom";
import { sortBreakoutRooms } from "../helpers/roomHelper";

export interface IBreakoutRoomsUpdated {
	rooms: BreakoutRooms;
}

const useBreakoutRoomsUpdated = (
	api: IExtendedJitsiMeetExternalApi | undefined,
) => {
	const [breakoutRooms, setBreakoutRooms] = useState<Array<BreakoutRoom>>([]);

	useEffect(() => {
		const handleBreakoutRoomsUpdated = (event: IBreakoutRoomsUpdated) => {
			const roomsArray = Object.values(event.rooms);

			if (roomsArray.length === 1) {
				setBreakoutRooms([]);
			} else {
				const sortedRooms = sortBreakoutRooms(roomsArray);

				setBreakoutRooms(sortedRooms);
			}
		};

		if (api) {
			api.addListener(
				JitsiEvents.BREAKOUT_ROOMS_UPDATED,
				handleBreakoutRoomsUpdated,
			);
		}

		return () => {
			if (api) {
				api.addListener(
					JitsiEvents.BREAKOUT_ROOMS_UPDATED,
					handleBreakoutRoomsUpdated,
				);
			}
		};
	}, [api]);

	return breakoutRooms;
};

export default useBreakoutRoomsUpdated;
