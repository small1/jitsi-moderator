import { styled } from "styled-components";
import InfoCard from "./InfoCard";
import { H3, Paragraph } from "../Typography";
import Theme from "../../utils/styles/Theme";

interface IWarningInfoCard {
	title: string;
	warning: string;
}

const WarningInfoCard = ({ title, warning }: IWarningInfoCard) => {
	return (
		<StyledWarningInfoCard $color="purple">
			<TextContent>
				<Header>
					<H3 $color="white">{title}</H3>
				</Header>
				<Info>
					<Paragraph $color="white">{warning}</Paragraph>
				</Info>
			</TextContent>
		</StyledWarningInfoCard>
	);
};

const StyledWarningInfoCard = styled(InfoCard)`
	display: flex;
	flex-direction: column;
	gap: ${Theme.spacing.xs};
`;

const Header = styled.header``;

const Info = styled.article``;

const TextContent = styled.article`
	display: flex;
	flex-direction: column;
	gap: ${Theme.spacing.xs};
`;

export default WarningInfoCard;
