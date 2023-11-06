import { JitsiMeetingInfo } from "../interfaces/JitsiMeetingInfo";

const DEFAULT_JITSI_DOMAIN = "meet.jit.si";

export const getRandomMeetingName = (length: number): string => {
	const charset =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let result = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		result += charset[randomIndex];
	}

	return result;
};

export const getDomainFromConfig = async (): Promise<string> => {
	try {
		const response = await fetch("/config.json");
		const jsonData = await response.json();
		return jsonData.domain ?? DEFAULT_JITSI_DOMAIN;
	} catch (error) {
		return DEFAULT_JITSI_DOMAIN;
	}
};

export const isDomainInConfigFile = async (): Promise<boolean> => {
	try {
		const response = await fetch("/config.json");
		const jsonData = await response.json();
		if (jsonData.domain) {
			return true;
		}
		return false;
	} catch (error) {
		return false;
	}
};

export const createJitsiMeetingInfoFromConfig =
	async (): Promise<JitsiMeetingInfo> => {
		return {
			domain: await getDomainFromConfig(),
			roomName: getRandomMeetingName(16),
		};
	};
