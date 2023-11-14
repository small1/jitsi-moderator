import styled from "styled-components";
import SectionDivider from "./SectionDivider";
import { Label } from "../Typography";
import Theme from "../../utils/styles/Theme";

interface ILabeledDivider {
	label: string;
}

const LabeledDivider = ({ label }: ILabeledDivider) => {
	return (
		<DividersContainer>
			<SectionDivider />
			<Label $color="gray">{label}</Label>
			<SectionDivider />
		</DividersContainer>
	);
};

const DividersContainer = styled.div`
	display: flex;
	align-content: center;
	align-items: center;
	gap: ${Theme.spacing.xs};

	${SectionDivider} {
		flex: 1;
	}
`;

export default LabeledDivider;
