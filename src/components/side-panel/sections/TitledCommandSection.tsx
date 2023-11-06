import { styled } from "styled-components";
import { H3, Ingress } from "../../Typography";
import Theme from "../../../utils/styles/Theme";
import CommandSection from "./CommandSection";

interface ITitledCommandSection {
	disabled?: boolean;
	title: string;
	ingress?: string;
	children: JSX.Element;
}

export const TitledCommandSection = ({
	disabled,
	title,
	ingress,
	children,
}: ITitledCommandSection) => {
	return (
		<CommandSection disabled={disabled}>
			<CommandSectionHeader>
				<H3 color="white">{title}</H3>
				{ingress && <Ingress color="white">{ingress}</Ingress>}
			</CommandSectionHeader>
			<CommandSectionArticle>{children}</CommandSectionArticle>
		</CommandSection>
	);
};

const CommandSectionHeader = styled.header`
	margin-bottom: ${Theme.spacing.xs};
`;

const CommandSectionArticle = styled.article``;

export default TitledCommandSection;
