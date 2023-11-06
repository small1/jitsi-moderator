import { useNavigate } from "react-router-dom";
import GlobalStyle from "../utils/styles/GlobalStyle";
import AppContainer from "../components/AppContainer";
import JitsiMeetErrorDialog from "../components/dialog/JitsiMeetErrorDialog";

const Error = () => {
	const navigate = useNavigate();

	const handleOnGoBackToStartClick = () => {
		navigate("/", { replace: true });
		navigate(0);
	};

	return (
		<>
			<GlobalStyle />
			<AppContainer>
				<JitsiMeetErrorDialog
					onGoBackToStartClick={handleOnGoBackToStartClick}
				/>
			</AppContainer>
		</>
	);
};

export default Error;
