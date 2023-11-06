import { useEffect, useState } from "react";
import { JitsiEvents } from "../enums/JitsiEvents";
import IExtendedJitsiMeetExternalApi from "../interfaces/IExtendedJitsiMeetExternalApi";

export interface IVideoConferenceJoined {
	roomName: string;
	id: string;
	displayName: string;
	avatarURL: string;
	breakoutRoom: boolean;
}

const useVideoConferenceJoined = (
	api: IExtendedJitsiMeetExternalApi | undefined
) => {
	const [userId, setUserId] = useState<string>("");

	useEffect(() => {
		const handleVideoConferenceJoined = (event: IVideoConferenceJoined) => {
			setUserId(event.id);
		};

		if (api) {
			api.addListener(
				JitsiEvents.VIDEO_CONFERENCE_JOINED,
				handleVideoConferenceJoined
			);
		}

		return () => {
			if (api) {
				api.removeListener(
					JitsiEvents.VIDEO_CONFERENCE_JOINED,
					handleVideoConferenceJoined
				);
			}
		};
	}, [api]);

	return userId;
};

export default useVideoConferenceJoined;
