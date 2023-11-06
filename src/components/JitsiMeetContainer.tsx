import styled from "styled-components";
import Card from "./Card";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { IJitsiMeetExternalApi } from "@jitsi/react-sdk/lib/types";
import { JitsiMeetingInfo } from "../utils/interfaces/JitsiMeetingInfo";
import IExtendedJitsiMeetExternalApi from "../utils/interfaces/IExtendedJitsiMeetExternalApi";
import { useState, useEffect } from "react";
import JitsiSpinner from "./loaders/JitsiSpinner";

interface IJitsiMeetContainer {
	jitsiMeetingInfo: JitsiMeetingInfo;
	onApiReady: (JitsiMeetAPI: IExtendedJitsiMeetExternalApi) => void;
	onApiFailedToLoad: () => void;
	onReadyToClose: () => void;
}

const JitsiMeetContainer = ({
	jitsiMeetingInfo,
	onApiReady,
	onApiFailedToLoad,
	onReadyToClose,
}: IJitsiMeetContainer) => {
	const [apiReady, setApiReady] = useState<boolean>(false);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		timer = setTimeout(() => {
			if (!apiReady) {
				onApiFailedToLoad();
			}
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [apiReady, onApiFailedToLoad]);

	return (
		<JitsiMeetArticle>
			<Card>
				<JitsiMeeting
					domain={jitsiMeetingInfo.domain}
					roomName={jitsiMeetingInfo.roomName}
					spinner={() => <JitsiSpinner />}
					onApiReady={(api: IJitsiMeetExternalApi) => {
						onApiReady(api as IExtendedJitsiMeetExternalApi);
						setApiReady(true);
					}}
					getIFrameRef={(iframeRef) => {
						iframeRef.style.width = "100%";
						iframeRef.style.height = "100%";
					}}
					onReadyToClose={() => {
						onReadyToClose();
					}}
				/>
			</Card>
		</JitsiMeetArticle>
	);
};

const JitsiMeetArticle = styled.article`
	height: 100%;
	overflow: hidden;
`;

export default JitsiMeetContainer;
