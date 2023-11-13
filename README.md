# **Jitsi Moderator**

A React Vite app that adds more features on top of Jitsi to help manage meetings through an intuitive dashboard. It allows you to either connect to a meeting by pasting the url or to create an entirely new meeting.

## Features

-   Mute and unmute all participants
-   Send messages between breakout rooms
-   Send messages to all breakout rooms
-   Create breakout rooms with specific names

## Usage

1. Install the dependencies:

```
yarn install
```

2. Start the development server:

```
yarn dev
```

3. Run the tests:

```
yarn test
```

4. Build the production version:

```
yarn build
```

5. Start the production version:

```
yarn start
```

## Config

It is possible to create a new meeting through the website by clicking the "Create new meeting" button. The default url can be configured by adding a config file in the root folder of this project. See the example below:

```
{
    domain: "example-jitsi-meeting-instance.com"
}
```

## Deployment

This application is deployed to GitHub Pages, which requires the use of a HashRouter instead of BrowserRouter.
This is because BrowserRouter relies on the HTML5 history API, which is not supported by GitHub Pages.
HashRouter uses the URL hash to simulate a full URL and allows for proper routing on GitHub Pages.
Visit this [link](https://create-react-app.dev/docs/deployment/#github-pages) for more information.
