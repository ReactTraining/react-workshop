# Prerequisites

(These are nice-to-know things and are not actually required-to-know in order to be successful in our workshops)

We know that there's a lot of things that go into learning React besides React itself. There's the DOM and other front-end concepts which you may or may not already be familiar with. Then there's also the tooling ecosystem around React just to setup a project. Also, what exactly is React? While you don't necessarily have to know all that stuff super well to take our workshop, sometimes it's good to have this extra knowledge. This document should at least help some to get you caught up.

Also, we have a [JavaScript Primer](https://reacttraining.com/blog/javascript-the-react-parts/) which you should read if you need to get caught up on modern JavaScript syntax. A LOT has changed in the last 5 years.

# The DOM

Long story short, the DOM is an API that allows front-end JavaScript to manipulate elements on the page. Whereas HTML has tags which tell the browser what to build when the page starts, the browser takes those HTML instructions and builds "elements". So we might say that `<div>` is a "div tag" if we're talking about HTML, but once the browser builds the page, HTML is no longer apart of the picture. Now we have a "div element".

## Manipulating the DOM

If we want to change elements based on events like button clicks, we need JavaScript to manipulate the DOM to do so. So besides being an API, the DOM is also talked about as being the full set of elements that are currently making up the web page. Certain tools like jQuery, Dojo, Backbone, Angular, Ember and Knockout have all focused their efforts on making DOM manipulation easier for the developer.

# What is React?

React could broadly be described as a DOM manipulation tool in a similar way to the others just mentioned. Each DOM manipulation tool comes from a certain era of the Web and has specific goals. For example, in 2006 jQuery was really good at normalizing browser consistency problems and making DOM manipulation approachable. Since then, browsers became much more consistent and new standards for JavaScript have made it easy to manipulate the DOM without jQuery.

As the Web evolved, new goals started to become popularized that weren't even conceivable before -- to make the Web feel more like applications and not just web pages. We call these "web apps" because they're application-like but they're in the browser. This was never a goal of earlier tools like jQuery, so they tend to be pretty awful at it. Some tools like Angular and Ember were created with applications in mind, but React took a very different approach to them. React was created by Facebook to create Facebook itself. So it's very well tested and proven for very large applications. React is different that other tools for several reasons but one that sticks out is that it is a paradigm shift in how we think about building front-ends. Whereas Angular and Ember were trying to be MVC-like in the front-end, React used a different paradigm called "reactive programming". As a paradigm, reactive programming is becoming really popular in the front-end. Other tools like Vue are doing it too. The background doesn't matter as much for the workshop, but I know some people really like to know how things come to be.

Another thing that makes React really good at building applications is its component-oriented approach which allows for easy composition to build complex things from smaller parts. It also gives us nice tools for abstractions, but we'll get into all those ideas in the workshop.

# Tooling

As with most modern JavaScript environments, there's a number of tools that get used to facilitate the development process of a React application.

**VSCode** has quickly become a very popular code editor for many programming communities including React. The instructors at React Training will probably be using it or vim. We do not suggest using Java IDE's or something like Visual Studio for doing React/JS unless you do already and you feel comfortable doing so. Feel free to download VSCode and try it out. It's free.

**NPM** is the most popular package manager so we'll use that to install any third-party software that we're using including React itself. NPM organizes it's configuration in a file called `package.json` and that's where you can see all the third-party dependencies, development dependencies, and other configurations for things like Webpack, Babel, ESLint, TypeScript and Prettier if those tools are being used on a given project.

**Webpack** is a bundler. Its job is to take the numerous JS files that is our application and to turn them into one file (the bundle). Each file that we write is in a standard called ESModules which means we "export" and "import" files between each other similar to a server-side language. Webpack knows how to create the single-file bundle in a way that honors the scope and encapsulation of the original files we wrote. It can do lots of things with its configuration options and you can expect different application teams will have slightly different or very different Webpack setups.

**Babel** is a compiler for JavaScript. In 2015 when ES2015 aka ES6 came out (those are just the more formal names for JavaScript) Babel became very popular for allowing us to write in the JavaScript syntax that wasn't even supported by all browser yet, and it would compile our code into a version of JavaScript that all browser do understand with polyfills as needed. React also created a special syntax called JSX which browser don't understand. Babel compiles that into regular JavaScript as well. Babel is often setup as a plugin to Webpack. You tell Webpack "Here are all my JS files including ones that have JSX" and Webpack bundles them into one file all while using it's plugins like Babel to manipulate the end-result bundle along the way.

Babel is practically ubiquitous in the React community and Webpack is very popular. They could almost be considered staples of the React community. The other tools listed below are popular too, but aren't quite as common as these.

**TypeScript** is a superset of JavaScript that adds additional syntax to bring "types" to JavaScript. Some people love it and can't imagine writing JS without it. Others would say it's syntax makes JS almost un-readable and it's difficult to setup and manage.

**Flow** is a similar tool to TypeScript made by Facebook. It's not nearly as popular though.

**ESLint** is one of several linting possibilities in JavaScript (it's probably the most popular one). If you're not aware, linting is when we want our computer to complain to us when we haven't written our code to a specific set of rules -- usually agreed upon by the team leads. It can help us know if we're doing somethinig that is probably a mistake like creating a variable and then not using it. It can also be configured to tell us about how the code should be written from a visually appeasing standpoint (curlies on top or bottom, etc).

**Prettier** is a more modern approach to making code look pretty. When installed, it will actually fix your code to a certain "pretty" convention when you save you file. Many developers use prettier now and use it instead of linting or they use prettier for the beautification of their code and linting for only a few things that prettier doesn't do (like catching those unused variables).
