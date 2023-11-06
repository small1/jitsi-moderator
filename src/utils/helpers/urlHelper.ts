import Routes, { QueryParams } from "../enums/Routes";
import { JitsiMeetingInfo } from "../interfaces/JitsiMeetingInfo";

export const getJitsiMeetingInfoFromUrlString = (
	url: string
): JitsiMeetingInfo => {
	const urlWithoutProtocol = url.replace(/^https?:\/\//, "");
	const [domain, roomName] = urlWithoutProtocol.split("/");

	if (domain === undefined || roomName === undefined) {
		return {
			domain: "",
			roomName: "",
		};
	}

	return { domain, roomName };
};

export const getJitsiMeetingInfoFromUrlParams = (
	url: URL
): JitsiMeetingInfo => {
	const domain = url.searchParams.get("domain") ?? "";
	const roomName = url.searchParams.get("roomName") ?? "";

	return {
		domain,
		roomName,
	};
};

export const createMeetingUrlFromJitsiMeetingInfo = (
	jitsiMeetingInfo: JitsiMeetingInfo
): string => {
	return `${Routes.MEETING}?${QueryParams.DOMAIN}=${jitsiMeetingInfo.domain}&${QueryParams.ROOM_NAME}=${jitsiMeetingInfo.roomName}`;
};

export const getParticipantUrlFromJitsiMeetingInfo = (
	jitsiMeetingInfo: JitsiMeetingInfo
): string => {
	return `${jitsiMeetingInfo.domain}/${jitsiMeetingInfo.roomName}`;
};
