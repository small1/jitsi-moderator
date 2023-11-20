# Jitsi Moderator

**Description**:
A React Vite app that adds more features on top of Jitsi to help manage meetings through an intuitive dashboard. It allows you to either connect to a meeting by pasting the url or to create an entirely new meeting.

## Table of Contents

-   [Installation and Requirements](#installation-and-requirements)
-   [Quickstart Instructions](#quick-start-instructions)
-   [Usage](#usage)
-   [Known Issues](#known-issues)
-   [Support](#support)
-   [Contributing](#contributing)
-   [Development](#development)
-   [License](#license)
-   [Maintainers](#maintainers)
-   [Credits and References](#credits-and-references)

## Installation and Requirements

Detailed instructions on how to install, configure, and get the project running.

You need to install the dependencies prior to following any of the steps in this section:

`$ npm install`

> Follow this [link](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) to install Yarn if you don't have it installed.

### Running the development environment

In order to start the development server you need to run the following command:

`$ npm run start`

The project will run on localhost:3000.

### Building a production-ready version

The project first needs to build and generate the proper production-ready code, which can be achieved by running:

`$ npm run build`

This build script will create a `build` folder in the root directory, which can then be served on a local web server with the following:

`$ npm run serve`

### Running the tests

The project is unit tested with Jest and these tests can be run with or without coverage output:

`$ npm run test`

or

`$ npm run test:coverage`

### Supported Jitsi Versions

We are using the [React wrapper](https://github.com/jitsi/jitsi-meet-react-sdk) around the Jitsi iFrame API found here:
https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe.

## Quick start instructions

Just run `$ yarn install && yarn dev` to start the project as quickly as possible. Note that this starts the development version of the project.

## Usage

The software can be used to connect to a Jitsi meeting and get some extra features that are not necessarily available in the normal Jitsi interface. Some of the features that are available are listed below:

-   Mute and unmute all participants
-   Send messages between breakout rooms
-   Send messages to all breakout rooms
-   Create breakout rooms with specific names

## Known issues

-   It is currently not possible to join a meet.jit.si conference with the dashboard
-   Jitsi instances leveraging Jitsi's own authentication mechanism are not possible to join with the dashboard

## Support

Instruct users how to get help with this software; this might include links to an issue tracker, wiki, mailing list, etc.

**Example**

If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.

## Contributing

This section should detail why people should get involved and describe key areas you are
currently focusing on; e.g., trying to get feedback on features, fixing certain bugs, building
important pieces, etc.

General instructions on _how_ to contribute should be stated with a link to [CONTRIBUTING](CONTRIBUTING.adoc).

## Deployment

This project is deployed to GitHub Pages (the deployed version can be found [here](https://diggsweden.github.io/jitsi-moderator)), which requires the use of a HashRouter instead of BrowserRouter.
This is because BrowserRouter relies on the HTML5 history API, which is not supported by GitHub Pages.
HashRouter uses the URL hash to simulate a full URL and allows for proper routing on GitHub Pages.
Visit this [link](https://create-react-app.dev/docs/deployment/#github-pages) for more information.

### Deploy your own instance

The Jitsi Moderator can be deployed on any Node.js web server that supports either client-side or static rendering.

## Configuration

It is possible to create a new meeting on the project's start page by clicking the "Create new meeting" button. The default url can be configured by adding a config file in the root folder of this project. See the example below:

```
{
    domain: "example-jitsi-meeting-instance.com"
}
```

## License

This project is licensed under the Apache 2.0 license.

License - see the [LICENSE](LICENSE) file for details

## Maintainers

General Governance of the project is currently handled by asom (arbetsgruppen för samordning av mjukvara).

For information about the current individual or team maintainers, see CODEOWNERS.
