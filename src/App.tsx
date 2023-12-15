// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import "./i18n";
import JitsiProApp from "./components/JitsiProApp";
import GlobalStyle from "./utils/styles/GlobalStyle";
import AppContainer from "./components/AppContainer";

const App = () => {
	return (
		<>
			<GlobalStyle />
			<AppContainer>
				<JitsiProApp />
			</AppContainer>
		</>
	);
};

export default App;
