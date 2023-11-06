import { useState, useRef } from "react";
import {
	LoaderFunction,
	redirect,
	useNavigate,
	useLoaderData,
} from "react-router-dom";
import styled from "styled-components";
import JitsiMeetContainer from "../components/JitsiMeetContainer";
import SidePanel from "../components/side-panel/SidePanel";
import JitsiContext from "../context/jitsiContext";
import devices from "../utils/devices";
import { getRoomByParticipant } from "../utils/helpers/roomHelper";
import { getJitsiMeetingInfoFromUrlParams } from "../utils/helpers/urlHelper";
import useBreakoutRoomsUpdated from "../utils/hooks/useBreakoutRoomsUpdated";
import useParticipantRoleChanged from "../utils/hooks/useParticipantRoleChanged";
import useVideoConferenceJoined from "../utils/hooks/useVideoConferenceJoined";
import IExtendedJitsiMeetExternalApi from "../utils/interfaces/IExtendedJitsiMeetExternalApi";
import { JitsiMeetingInfo } from "../utils/interfaces/JitsiMeetingInfo";
import JitsiMeetErrorDialog from "../components/dialog/JitsiMeetErrorDialog";
import MessageOverlay from "../components/MessageOverlay";

export const loader: LoaderFunction = async ({
	request,
}): Promise<JitsiMeetingInfo | Response> => {
	const url = new URL(request.url);
	const jitsiMeetingInfo = getJitsiMeetingInfoFromUrlParams(url);

	if (jitsiMeetingInfo.domain === "" || jitsiMeetingInfo.roomName === "") {
		return redirect("/");
	}

	return jitsiMeetingInfo;
};

const Meeting = () => {
	const navigate = useNavigate();
	const meetingInfo = useLoaderData() as JitsiMeetingInfo;
	const [api, setApi] = useState<IExtendedJitsiMeetExternalApi | undefined>();
	const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
	const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
	const jitsiApiRef = useRef<IExtendedJitsiMeetExternalApi | undefined>();
	const userId = useVideoConferenceJoined(api);
	const breakoutRooms = useBreakoutRoomsUpdated(api);
	const newRole = useParticipantRoleChanged(api, userId);

	const handleJitsiMeetLoaded = async (
		jitsiMeetAPI: IExtendedJitsiMeetExternalApi
	) => {
		jitsiApiRef.current = jitsiMeetAPI;
		setApi(jitsiApiRef.current);
	};

	const handleJitsiMeetFailedToLoad = () => {
		setShowErrorDialog(true);
	};

	const handleOnGoBackToStartClick = () => {
		navigate("/", { replace: true });
		navigate(0);
	};

	const handleJitsiMeetClosed = () => {
		jitsiApiRef.current?.dispose();
		setApi(undefined);
		navigate("/");
	};

	return (
		<JitsiContext.Provider
			value={{
				api: api,
				breakoutRooms,
				userId,
				currentBreakoutRoom: getRoomByParticipant(
					breakoutRooms,
					userId
				),
				isSendingMessage,
				setIsSendingMessage,
			}}
		>
			{!showErrorDialog ? (
				<Main>
					<JitsiMeetContainer
						jitsiMeetingInfo={meetingInfo}
						onApiReady={handleJitsiMeetLoaded}
						onApiFailedToLoad={handleJitsiMeetFailedToLoad}
						onReadyToClose={handleJitsiMeetClosed}
					/>
					{isSendingMessage && <MessageOverlay />}
				</Main>
			) : (
				<JitsiMeetErrorDialog
					onGoBackToStartClick={handleOnGoBackToStartClick}
				/>
			)}
			<Aside hidden={userId.length === 0}>
				<SidePanel isUserModerator={newRole === "moderator"} />
			</Aside>
		</JitsiContext.Provider>
	);
};

const Main = styled.main`
	position: relative;
	flex: 1;
`;

interface IAside {
	hidden: boolean;
}

const Aside = styled.aside<IAside>`
	display: none;

	@media ${devices.tablet} {
		display: flex;
		${({ hidden }) => hidden && `display: none; `};
		flex-basis: 25%;
	}
`;

export default Meeting;
