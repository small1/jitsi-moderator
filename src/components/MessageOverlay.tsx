import styled from "styled-components";
import Theme from "../utils/styles/Theme";
import { H3 } from "./Typography";
import JitsiProgress from "./loaders/JitsiProgress";

const MessageOverlay = () => {
	return (
		<Section>
			<AnimationContainer>
				<JitsiProgress />
				<H3 $color={"white"}>Skickar meddelanden</H3>
			</AnimationContainer>
		</Section>
	);
};

const AnimationContainer = styled.article`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${Theme.spacing.l};
`;

const Section = styled.section`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	border-radius: ${Theme.borderRadiuses.l};
	background-color: ${Theme.colors.black.normal};
	opacity: 0.95;
	top: 0;
`;

export default MessageOverlay;
