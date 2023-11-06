import { useNavigate } from "react-router-dom";
import { createJitsiMeetingInfoFromConfig } from "../utils/helpers/configHelper";
import {
	getJitsiMeetingInfoFromUrlString,
	createMeetingUrlFromJitsiMeetingInfo,
} from "../utils/helpers/urlHelper";
import JitsiMeetInputDialog from "../components/dialog/JitsiMeetInputDialog";

const Home = () => {
	const navigate = useNavigate();

	const handleOnJoinClick = (url: string) => {
		const jitsiMeetingInfo = getJitsiMeetingInfoFromUrlString(url);
		const meetingUrl =
			createMeetingUrlFromJitsiMeetingInfo(jitsiMeetingInfo);
		navigate(meetingUrl);
	};

	const handleOnCreateMeetingClick = async () => {
		const jitsiMeetingInfo = await createJitsiMeetingInfoFromConfig();
		const meetingUrl =
			createMeetingUrlFromJitsiMeetingInfo(jitsiMeetingInfo);
		navigate(meetingUrl);
	};

	return (
		<JitsiMeetInputDialog
			onJoinClick={handleOnJoinClick}
			onCreateMeetingClick={handleOnCreateMeetingClick}
		/>
	);
};

export default Home;
