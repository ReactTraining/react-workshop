# Welcome to React Training!

Be sure to also checkout https://reacttraining.com/workshops to see our schedule of public workshops. We offer:

- Monthly Public Workshops
- Private/tailored Corporate Workshops

This repo contains the latest course material for [React Training](https://reacttraining.com/).

## Table of Contents

- [How to get ready for the workshop](#how-to-get-ready-for-the-workshop)
- [Setup For Mac and Linux Users (Unix Users)](#setup-for-mac-and-linux-users-unix-users)
- [Setup For Windows Users](#setup-for-windows-users)
- [Consider Using VSCode](#consider-using-vscode)
- [Clone and Install](#clone-and-install)
- [Running the code](#running-the-code)
- [Running the code on Windows](#running-the-code-on-windows)
- [Database](#database)
- [Updating Workshop Code](#updating-workshop-code)
- [Troubleshooting](#troubleshooting)
- [Improvements?](#improvements)
- [License](#license)

## How to get ready for the workshop

- [ ] Make sure you have Git and Node installed first. **Windows Users** see the special section below on this.
- [ ] Install this code (instructions below)
- [ ] [Learn the JavaScript syntax that matters the most to React](https://reacttraining.com/blog/javascript-the-react-parts/).
- [ ] We have some [additional reading material](./reading) for those who are interested in getting a head start
- [ ] **WAIT!** Does your company or computer use VPN's or any sort of proxy? That might cause some issues. We normally see at companies that use these things that someone on your team knows how to get around the problem. We can't really help out because the issues surrounding VPN's and proxies are so diverse and out of our control.

❗️❗️❗️ Please Read ❗️❗️❗️

This workshop assumes you know how to program. We do get some attending our workshops who don't anticipate how JavaScript-heavy the workshop is. You don't necessarily have to be good at JavaScript going into the workshop, that's why we have the "Learn the JavaScript syntax" article listed above. Please read it. We get TONS of feedback from those who read it that it's what made the workshop a success for them. We get TONS of questions in our workshops about basic JS things from those who didn't read the article. As long as you know how to program in any programming language, you'll be fine in the workshop -- even if you're not good at JavaScript, as long as you read that article.

## Setup For Mac and Linux Users (Unix Users)

If you have any problems with these steps, see the **Troubleshooting** section at the bottom of this page.

- **Need to install Git?** - http://git-scm.com/downloads
- **Need to install Node?** We recommend using [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)

Note that **NPM (Node Package Manager)** is a command-line tool that will also be installed with Node

If you need to verify that you have NVM installed, do: `nvm version`. Then install Node. Which version of Node should I use? It probably won't matter much, but we try to use the [Active Version](https://nodejs.org/en/about/releases/).

```sh
# For Node 16 (for example)
$ nvm install 16

# See this page for more install options:
# https://github.com/nvm-sh/nvm#usage
```

Verify you have Git, Node, and npm installed. Installing Node will install NPM:

```sh
$ git --version
$ node --version
$ npm --version
```

Now jump to **Clone and Install** below

<hr />

## Setup For Windows Users

If you have any problems with these steps, see the **Troubleshooting** section at the bottom of this page.

- **Need to install Git?** - http://git-scm.com/downloads
- **Need to install Node?** We recommend using a version manager for Node. The NVM (Node Version Manager) tool that lots of devs use is only for Mac and Linux, so there's a special [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) version. Microsoft also recommends this approach in this article. Be sure to follow all their steps:

https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows

> Microsoft: "There are multiple ways to install Node.js. We recommend using a version manager as versions change very quickly. You will likely need to switch between multiple versions based on the needs of different projects you're working on"

Note that **NPM (Node Package Manager)** is a command-line tool that will also be installed with Node.

If you need to verify that you have NVM installed, do: `nvm version`. Then install Node. Which version of Node should I install? It probably won't matter much, but we try to use the [Active Version](https://nodejs.org/en/about/releases/).

```sh
# For Node 16 (for example)
$ nvm install 16

# IMPORTANT: You'll be also prompt to `nvm use`
# the version number that you installed. You may
# need to run your shell as admin in order to do this.
```

Verify you have Git, Node, and npm installed. Installing Node will install NPM:

```sh
$ git --version
$ node --version
$ npm --version
```

## Consider Using VSCode

Consider using [VSCode](https://code.visualstudio.com/download) -- a lightweight version of Visual Studio that isn't at all tied to .NET.

If you're a Java/C# developer, we know you have you're editors for those languages, but you can expect a less optimal experience with poor tooling when you write JavaScript in those tools.

## Clone and Install

Installing is the same for **Mac, Linux, and Windows** users:

```sh
# Clone the repo to your local machine
$ git clone https://github.com/ReactTraining/react-workshop.git

# Whichever directory you run the above command from, that
# directory should now have a folder called `react-workshop`.

# Change directory to the project's root folder
$ cd react-workshop

# From the project's root folder
$ npm install
```

## Running the code

🚨 **Windows users**, your way of running the code might be different. See the section for **Running the code on Windows** after this section.

If you have any issues running the code, we have a general **Troubleshooting** section at the bottom of this page.

```sh
# If you're in the root path of the repo

# Run the full project
$ npm start app

# Run a lecture or exercise
$ npm start
```

In both of those commands you'll get a CLI menu asking what you want to do next. To make sure you can run the code, just do `npm start app` and choose any of the apps in the menu.

Go to `localhost:3000` in your browser. You have to do this manually.

If the application renders up in the browser, you're ready to go. 👍

Remember to [learn the JavaScript syntax that matters the most to React](https://reacttraining.com/blog/javascript-the-react-parts/) before attending the workshop. Many of our attendees say this article was essential for their preparedness for the workshop.

See you soon.

## Running the code on Windows

You can do the above **Running the Code** section after you read these common issues on Windows.

Some issues are not Windows-specific so they will be listed in the general **Troubleshooting** section at the bottom of this page.

- **Don't use spaces** for your repo folder name (if you change it from the default `react-workshop`), we've had some issues with Windows users regarding this.

- **PowerShell Users**: We've tested this repo out with PowerShell and it seems to work fine. If something doesn't seem to work, see the **Troubleshooting** section below.

- 🚨 **GitBash Users**: Doing `npm start` or `npm start app` seems to be broken if you open a normal GitBash terminal. However we noticed that if you're in VSCode and you open the terminal window from within VSCode `` Ctrl+` `` (it will probably be PowerShell by default). You can use the `+` plus sign on the right to make a new terminal that is GitBash and we've had success running the code from that GitBash window from within VSCode.

- **WSL (Windows Subsystem for Linux)**

We think we fixed some of our recent issues with PowerShell and GitBash, but historically we've recommended WSL because it always seems to work well but it takes a bit of effort to setup:

- WSL 2 Installation: https://docs.microsoft.com/en-us/windows/wsl/install-win10
- Node on Windows: https://docs.microsoft.com/en-us/windows/nodejs/setup-on-wsl2

When running the code, if the app launches and runs but you can't see your changes reflected in the browser -- there is a known issue in one of Webpack's dependencies when running on Node 14 on certain platforms that breaks the dev server. If you experience this, try updating the start script in `package.json` as follows:

```diff
  "scripts": {
-    "start": "node scripts/start.js"
+    "start": "CHOKIDAR_USEPOLLING=true node scripts/start.js"
```

If you're not using WSL and you experience issues, they might be:

- Repos with spaces can fail to build.
- Permissions issues when attempting to clone the repo. If you are using WSL but usually use another shell, you may want to copy your SSH keys where WSL can access them. [This article explains why this is necessary and how to do it.](https://devblogs.microsoft.com/commandline/sharing-ssh-keys-between-windows-and-wsl-2/)

## Database

When you start our code, it will start the app at port `3000` and a small local database at port `3333`. Don't worry about the database, it's not even a real database. It's a tool called `json-server` that treats a JSON file like a restful database and runs 100% within this repo so as soon as you quit the app and if you remove the repo, you've removed the database.

When you do `npm install` we run a `postinstall` script to copy a `db-seed.json` file to `db.json`. We're using Node for this in a way that is supposed to help with cross-platform filesystem stuff. But incase it fails, you'll just have to copy this file manually. The file is in `apps/[project name]/database`.

There are some rare times when you quit the app the background process for port `3333` remains open and this will prevent you from starting the app again until the port is closed. So we made `npm run kill-db-port` as a command for you in case this happens. All this does is quit the processes associated with port 3333. If you have any problems you can do this manually.

## Updating Workshop Code

If you've already cloned the repo but you need to get updated code, then follow these steps:

- First, `cd` into the root directory of the repo
- Then do an `ls` command to ensure you see a `package.json` file listed. If you don't you're not in the root folder of the repo
- Clear out any dirty files in your Git working tree (`git stash` is a safe way to do it, `git reset ---hard` is how to live dangerously)
- Then run these steps to get the updates:

```sh
git pull origin main
npm install
```

Then you should be able to do your `npm start` again.

## Troubleshooting

A few common problems:

- **You're having problems cloning the repository.** Some corporate networks block port 22, which Git uses to communicate with GitHub over SSH. Instead of using SSH, clone the repo over HTTPS. Use the following command to tell Git to always use `https` instead of `git`:

```sh
$ git config --global url."https://".insteadOf git://

# This adds the following to your `~/.gitconfig`:
[url "https://"]
  insteadOf = git://
```

<hr />

- **You're having trouble installing Node.** We recommend using a node version manager. See the sections above for setting these up -- it's different from Mac/Linux vs Windows.

<hr />

- **You can't start the app with `npm start` or `npm start app`.** Make sure you can see a `node_modules` folder at the root. If you can't you need to run `npm install` from the root of the repo. If you're on Windows, see the sections above for running the code as a Windows user.

If you're missing the `db.json` file the app also won't run. See the **Database** section above for more details.

<hr />

- **You were able to run the code once but not again** and you're getting something like `JSON-SERVER was not able to start. Port 3333 might still be open from a previous run.`

Sometimes the background process for the database doesn't shut down property. It's rare but you can do:

```
$ npm run kill-db-port
```

If this script doesn't work for any reason, just kill port `3333` on your machine which is the database's port.

<hr />

- **You don't have permissions to install stuff.** You might see an error like `EACCES` during the `npm install` step. If that's the case, it probably means that at some point you did an `sudo npm install` and installed some stuff with root permissions. To fix this, you need to forcefully remove all files that npm caches on your machine and re-install without sudo.

```sh
$ sudo rm -rf node_modules

# If you installed Node with nvm (suggested):
$ sudo rm -rf ~/.npm

# If you installed Node with Homebrew:
$ sudo rm -rf /usr/local/lib/node_modules

# Then (look ma, no sudo!):
$ npm install
```

## Improvements?

If these instructions can be improved, please let us know or make a PR!

## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). If you would like to use this material to conduct your own workshop, please contact us at [hello@reacttraining.com](mailto:hello@reacttraining.com).
