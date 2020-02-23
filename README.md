# Welcome to React Training!

This repo contains the latest course material for [React Training](https://reacttraining.com/).

Before attending the training, please make sure you install the code (not just clone) and run the app to make sure it works. The most common problems for not being able to install and run are related to network configurations at the workshop venue like proxies. If your having these or other issues see the Troubleshooting section below.

## The "What do I need to do before attending React Training" Checklist:

- [ ] Bring a laptop (don't forget a long power cord).
- [ ] Install this code (if you can't see the app in the browser after doing `npm run app`, then you don't quite have it installed yet).
- [ ] Read our [JavaScript Primer](https://reacttraining.com/blog/javascript-the-react-parts/) to get caught up on modern JS syntax which is common in React.
- [ ] You can take notes in the workshop, but just keep in mind we already wrote some for you. See the [Be Prepared](#be-prepared) section below.

## Install & Setup

If you have any problems with these steps, make sure you see the [Troubleshooting](#troubleshooting) section below.

**Windows Users!** Please read the [Windows Users](#windows-users) section before finishing these setup steps. Particularly, we have found that PowerShell works better.

<hr />

You need to have Git and Node installed. You might already so verify with these commands:

```sh
# Verify Git and Node are installed
$ git --version
$ node --version
```

If one of those commands doesn't work, then you don't have that tool installed. Go to these pages and follow the instructions for your operating system:

- [Git](http://git-scm.com/downloads)
- [Node](https://nodejs.org/) - If you didn't have Node installed, get the LTS (Long Term Support) version. If you have an older version like Node 8, that will probably work too.

Then **clone**, **install**, and **run** the app:

```sh
# Clone the repo to your local machine (This just clones, it does not "install")
$ git clone https://github.com/ReactTraining/react-workshop.git

# Whichever directory you run the above command from, that directory should
# now have a folder called `react-workshop`.

# Change directory to the `react-workshop` folder:
$ cd react-workshop

# Install and run. Make sure you do these two commands from within the `react-workshop` folder:
$ npm install
$ npm run app

# If you have issues, read below.
```

When you do `npm run app` you should eventually see a message that says "Compiled Successfully!" and the code might even launch the app in the browser with the correct port. If it doesn't you can visit `http://localhost:3000/` after you see that message. If the app launches, then you're all set. Please proceed to the [Be Prepared](#be-prepared) section below.

If something goes wrong, you may beed to see the [Troubleshooting](#troubleshooting) section below. We even have a special section for [Windows Users](#windows-users)

## Running the Course and Lesson Material

While in the workshop, you will be asked to do `npm start` to see a menu for courses and then lessons. The first time you run this, you'll be asked which course, and if you want to save your preferences so you're not asked again.

```
Which Course?

[1] advanced
[2] electives
[3] fundamentals
[0] CANCEL

Choose one from list [1, 2, 0]: 3

Do you want us to remember this course selection? [y/n]: y
```

From this point on, you'll be prompted with the exercise you'd like to run:

```
$ npm start

Which exercise?

[1] 01-rendering
[2] 02-state
[3] 03-controlled-vs-uncontrolled
[4] 04-effects
[5] 05-routing
[6] 06-reducers
[7] 07-data-flow
[8] 08-app-state
[9] 09-hooks-composition
[a] FULL APP
[b] BACK TO COURSE SELECTION
[0] CANCEL

Choose one from list [1...9, a, 0]:
```

Choose option "a" to run the full app, then open a web browser to [http://localhost:3000](http://localhost:3000) to play around with it.

If you don't want to deal with the CLI in the future as much, you can run `npm start 1` to go to your chosen exercise right away.

## Be Prepared

**IMPORTANT:** Please read our [JavaScript Primer](https://reacttraining.com/blog/javascript-the-react-parts/) before attending the workshop. We wrote this to be as concise as possible while covering just the right types of JS syntax that are seen most often in React (and newer JS syntax which you may not have learned yet).

If you know JS really well, it will take 3 minutes to skim through. If you don't know the topics from the article, study it if you can. We can answer JavaScript questions or explain any syntax we're writing in the workshop, but obviously if everyone is caught up on some of these pre-requisite JS things, then we can stay focused on React.

There's also a document in this repo called [Prerequisites](./prerequisites.md) if you're newer to the JS/Node ecosystem which helps explain modern tooling like Webpack and Babel, their relationship to React, and what is React.

### We took notes for you!

During the lectures, feel free to take notes. We also have some pre-made notes for you in this repo that you can edit as you see fit.

- [student-lesson-notes-fundamentals.md](/student-lesson-notes-fundamentals.md)
- student-lesson-notes-advanced (not ready yet)

## Prettier Plugin

(not required, but nice)

You might notice as the instructors save their code that a tool called "Prettier" is automatically formatting things. If you use VSCode, here is the [prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) you need to install. Clicking the install button on the website will open VSCode and install it as a plugin. However you install it, many code editors will just pick up on the settings we've setup for prettier in our `package.json` file.

## Database

When you start our code, it will start the app at port `3000` and a small local database at port `3333`. Don't worry too much about the database, it's nothing big or harmful. It's a tool called `json-server` which runs 100% within the React Training repo so as soon as you quit the app and if you remove the repo, you've removed the database.

When you do `npm install` we run a `postinstall` script to copy a `db-seed.json` file to `db.json`. We're using Node for this in a way that is supposed to help with cross-platform filesystem stuff. But incase it fails, you'll just have to copy this file manually. The file is in `apps/YesterTech/database`.

There are some rare times when you quit the app the background process for port `3333` remains open and this will prevent you from starting the app again until the port is closed. So we made `npm run kill-db-port` as a command for you in case this happens. All this does is quit the processes associated with port 3333. If you have any problems you can do this manually.

## Updating

If you've already cloned the repo but you need to get updated code, then follow these steps:

- First, `cd` into the root directory of the repo
- Then do an `ls` command to ensure you see a `package.json` file listed. If you don't you're not in the root folder of the repo
- Clear out any dirty files in your git working tree (`git stash` is a safe way to do it, `git reset ---hard` is how to live dangerously)
- Then run these steps to get the updates:

```sh
git pull origin master
npm install
```

Then you should be able to do your `npm start` again.

## Troubleshooting

A few common problems:

- **You're having problems cloning the repository.** Some corporate networks block port 22, which git uses to communicate with GitHub over SSH. Instead of using SSH, clone the repo over HTTPS. Use the following command to tell git to always use `https` instead of `git`:

```sh
$ git config --global url."https://".insteadOf git://

# This adds the following to your `~/.gitconfig`:
[url "https://"]
  insteadOf = git://
```

- **You're having trouble installing Node.** We recommend using [nvm](https://github.com/creationix/nvm). nvm makes it really easy to use multiple versions of node on the same machine painlessly. After you install nvm, install the latest stable version of node with the following command:

```sh
$ nvm use default stable
```

- **You don't have permissions to install stuff.** You might see an error like `EACCES` during the `npm install` step. If that's the case, it probably means that at some point you did an `sudo npm install` and installed some stuff with root permissions. To fix this, you need to forcefully remove all files that npm caches on your machine and re-install without sudo.

```sh
$ sudo rm -rf node_modules

# If you installed node with nvm (suggested):
$ sudo rm -rf ~/.npm

# If you installed node with Homebrew:
$ sudo rm -rf /usr/local/lib/node_modules

# Then (look ma, no sudo!):
$ npm install
```

- **You can't start the app with `npm start` or `npm start app`.** Make sure you can see a `node_modules` folder at the root. If you can't you need to run `npm install` from the root of the repo. If that's not the issue and you've ran the app before but now it's not running, try `npm run kill-db-port` (Mac/Linux). We run a small local database for our curriculum project on port `3333` and there's some circumstances where it doesn't get killed correctly when you exited the app last time.

- **The app launches but there doesn't seem to be any data. The `/products` page just says "No Results"**. This just means that your `db.json` file is missing for whatever reason. Run `npm run create-db` and see if that fixes it. If you're on Windows, see the [PowerShell](#powershell) section below.

## Windows Users

**TL;DR: You probably want to use PowerShell instead of GitBash**

There are three problems that might arise in a Windows Environment:

- Error after install. Chances are the `npm install` went well but we also do a `postinstall` script to create the `database.json` file. See the [Database](#database) section above for details
- If you're able to successfully run the app once but it doesn't start on the subsequent runs, chances are the database port didn't shut down when you recently stopped the app. See the [Database](#database) section above for details.
- If you do `npm run app` or `npm start` and you get weird errors instead of our menu system, we don't know what that is yet but the only reporters have been using GitBash instead of PowerShell.

<hr />

If you're a Windows user who already does active JS/Node development then you should be good-to-go. Otherwise this section might be able to help.

Consider using [VSCode](https://code.visualstudio.com/download) (A lightweight version of Visual Studio) for our workshops as it is probably more appropriately suited for modern JavaScript development than Visual Studio, Eclipse, IntelliJ, etc. It has a terminal built-in which uses PowerShell by default.

If you want, you can go into Windows' settings to turn on file extensions. In JavaScript projects, it's common to have a filename like `.gitignore` which would be difficult to see without extensions turned on. It's not required though.

If these instructions for Windows users can be improved, please let us know or make a PR!

## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). If you would like to use this material to conduct your own workshop, please contact us at [hello@reacttraining.com](mailto:hello@reacttraining.com).
