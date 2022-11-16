# pluralsight-apollo-managing-performance 

## OTHER Recently Released Courses From Peter Kellner

| **Course**                                                                           | Release Date  |
|-------------------------------------------------------------------------------------------------------------------------------|---------------|
| **[Using Hooks in React 18](https://pluralsight.com/courses/react-18-using-hooks/)**                                          | November 2022 |
| **[What is React](https://pluralsight.com/courses/react-what-is/)**                                          | August 2022   |
| **[What's New in React 18](https://pluralsight.com/courses/react-18-whats-new/)**                                             | May 2022      |
| **[Data and UI Patterns in React](https://github.com/pkellner/pluralsight-building-essential-ui-data-elements-in-react/)**    | December 2021 |

<hr/>


The master branch has all the source code to the Pluralsight course published by Peter Kellner November 19, 2020

Course URL: https://pluralsight.com/courses/apollo-performance-management-playbook

![Benefits of Using Apollo Client and Server Together](m2-clip010-justmergingimage.gif)


## Course Description

The Apollo GraphQL client and server work together well, bringing performance and workflow benefits to your total GraphQL solution, and is a game changer for delivering high quality production GraphQL solutions.

In this course, Apollo: Performance Management Playbook, you’ll learn to improve the performance of both an Apollo server and an Apollo client. First, we’ll explore a simple implementation of an Apollo server, as long as it’s companion Apollo client can easily be setup to call it. Next, you’ll discover, how with doing no extra programming, you get a huge performance gain from the built-in cache baked into the Apollo client.

Finally, you’ll learn many techniques for building highly interactive web pages that require both server and client programming including implementation paging, infinite scrolling and how to build an optimistic UI. 

## Getting Started
1. **Install [NPM 6.14.8](https://nodejs.org)**. 
2. **Clone this repository.** - `git clone https://github.com/pkellner/pluralsight-apollo-managing-performance` or [download the zip](https://github.com/pkellner/pluralsight-apollo-managing-performance/archive/master.zip)
3. **Set your default directory to which module you want (example: cd 04-Apollo-Client-Cache - `cd clip02-Normalizing-Data`
4. **Install Node Packages with Dependencies.** - `npm install`
5. **Install [this chrome extension](https://chrome.google.com/webstore/detail/nextjs-utilities-extensio/ffcogmoganomoabikgmcmckdgojnpldo) for viewing performance data (optional).**



## Directory Structure Here

Each of the 8 folders here represent one module of the course.  In each folder, there are subfolders that represent the completed code at the end of each clip. Where this is no clip reference, either there is no code in that clip or nothing changed from the previous clip.

Once in a clip directory, the easiest way to test the app is to first install the packages by typing at the root of that directory (in a terminal window or DOS prompt)

`npm install`

Since every clip has both an Apollo Server and Apollo Client React app folder, you will need to do the following.

Always start the Apollo Server by first switching to the `ApolloServer` folder and entering the command `npm start`.

Then, switch to the `ApolloClientReactApp` folder and enter the command `npm run dev`.


And that will launch the web server on port 3000 where you can browser to it at the url: `http://localhost:3000`

GraphQL will be running on port 4000 and if you have gotten to the point in the course where we use a json-server, that will run on port 5000.

## Background

This course uses the Next.js framework as a demonstraton vehicle for the Apollo Client. If you want to know more about Next.js you should watch my other course on Pluralsight titled "Building Server-side Rendered React Apps for Beginners". You can find it [here](https://www.pluralsight.com/courses/building-server-side-rendered-react-apps-beginners). 

## Repo or Course Issues

If you find any problems or issues, feel free to post it as an issue here at this forum and I will look into it as soon as I can. You can also contact me directly at http://peterkellner.net/contact/ 

I hope you enjoy the course!











