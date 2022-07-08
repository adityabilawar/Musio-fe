# Musio

https://www.youtube.com/watch?v=rt20B6Y3nqY

## Inspiration
Are you a musician or music is one of your favorite subjects? Are you alone when finding someone to play music with? Don’t worry, Musio will help you find friends from around the globe to share and play music together with. 🔥🔥

## What it does
Musio is a video call web app that enables users from around the globe to call each other and together create random awesome fire songs, which builds connections between people who share the same passion: music. With Musio, you not only find new friends from around the world but also learn how to use new instruments, learn about other people’s music philosophy, music culture, and tips to perform. Users can record the online jam session via a single Play button and after the session, they can edit the music video if there are some delays in their internet connection. After editing the final music video, users can upload it to Tiktok and other social media sites. Here is a fun fact, if their music created from Musio sounds super catchy and 🔥🔥, they can become viral on social media. Furthermore, they can even form a band!
## How we built it
We built Musio using many technologies. 
- Authentication: We build complete authentication using the CockroackDB as a database to store user information. 
- Video calling: We used WebRTC for a low latency peer-to-peer video calling connection. We also implemented socket.io to create the room call joining features where multiple users can join at the same time 
- Video recording: We used the MediaStream recording API to trigger the screen recording from user browser to record the video
Send Invitation: We used Twilio SendGrid to invite people to join the Musio playing session.
- Frontend: We designed the UI/UX using Figma. After getting the final sketch, we used React, HTML, CSS to build the website and create complicated interactive features. 
- Backend: We used Express, Node.js, and SQL for cockroachDB to build a server and host it in Heroku.
![Tech Stack](https://media.discordapp.net/attachments/987884033381896203/988093722145226762/graph.png)
![Graph](https://cdn.discordapp.com/attachments/987884033381896203/988093722459770880/tech-stack.PNG)

## Challenges we ran into
Since our project was so front-end heavy, some of our members were forced to learn frontend technologies and style the website similar to our Figma, which was quite new to use and difficult. Through these challenges, we were able to pull through by having long hour zoom meeting debugging sessions and then finally have a working product in the end.

## Accomplishments that we're proud of
We are extremely proud that we have a working application by the end of the 48 hour period for judges to test!! Regardless of everyone having to work on technologies they have never heard of before, we were able to pull through and deliver an application that is not only visually appealing, but also works to its fullest extent that we expected it to.

## What we learned
We learned how WebRTC may be praised for its low latency peer-to-peer connection, but also that it gets very unstable when more people join the video call as it is not connecting to any server. We also learned how to convert Figma frames to HTML and CSS without any annoying plug-ins! More importantly, we learned the most important competency through working as a team: communication. Due to being a virtual hackathon, without our constant communication through discord and zoom meetings, we wouldn’t have been able to accomplish what we have today. 

## What's next for Musio
We want to add a feature where people who do not have instruments can play the instrument virtually on their computer during their Musio session to get rid of the digital divide between users who have instruments at their hands. We also want to include live audiences and have them be able to add reactions/emotes visible to the video recording(kind of like Twitch) to make the application lively and interactive for viewers watching people play Musio.

# Our Backend
Here is the link to our backend repo https://github.com/adityabilawar/WaffleHacks-Backend 
We built our backend using Express.js, Node.js, and cockroachDB.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
