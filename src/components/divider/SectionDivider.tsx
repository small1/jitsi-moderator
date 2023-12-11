import { styled } from "styled-components";
import Theme, { ColorType } from "../../utils/styles/Theme";

interface ISectionDivider {
	$color?: ColorType;
}

const SectionDivider = styled.hr<ISectionDivider>`
	border: 2px dotted ${({ $color }) => Theme.colors[$color ?? "gray"].normal};
	border-style: none none dotted;
	margin: 0;
`;

export default SectionDivider;
