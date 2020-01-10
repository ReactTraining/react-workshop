# Welcome to React Training!

This repo contains the latest fundamentals course material for [React Training](https://reacttraining.com/).

Before attending the training, please make sure you install the code (not just clone) and run the app to make sure it works. The most common problems for not being able to install and run are related to network configurations at the workshop venue like proxies. If your having these or other issues see the Troubleshooting section below.

## Install

First, install [git](http://git-scm.com/downloads) and the LTS version of [node](https://nodejs.org/).

```sh
# Verify Git and Node are installed
$ git --version
$ node --version
```

Windows Machine?

We'll be running commands like the ones from the install/update instructions above. These are _bash_ commands which means if you're on Windows you'll need a bash-enabled command-line tool. If you've installed [Git For Windows](https://gitforwindows.org) then you'll have a command-line tool called Git Bash already, or if you use VSCode you can use the built-in terminal.

Then install and run the app:

```sh
$ git clone https://github.com/ReactTraining/react-workshop.git
$ cd react-workshop
$ npm install
$ npm start app
```

If the app runs then you're all set for the workshop.

While in the workshop, you will be asked to do `npm start` to see a menu for courses and then lessons. The first time you run this, you'll be asked which course, and if you want to save your preferences so you're not asked again.

```
Which Course?

[1] advanced
[2] electives
[3] fundamentals
[0] CANCEL

Choose one from list [1, 2, 0]: 2

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
[a] Full App
[0] CANCEL

Choose one from list [1...9, a, 0]:
```

Choose option "a" to run the full app, then open a web browser to [http://localhost:3000](http://localhost:3000) to play around with it.

## We took notes for you!

During the lectures, feel free to take notes. We also have some [pre-made notes](/student-lesson-notes.md) for you in this repo that you can edit as you see fit.

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

## Be Prepared

**IMPORTANT:** Please read our [JavaScript Primer](https://reacttraining.com/blog/javascript-the-react-parts/) before attending the workshop.
It's a refresher on some of the newer bits of JavaScript you'll want to be familiar with in order to get the most out of the experience.

## Troubleshooting

A few common problems:

- **You're having problems cloning the repository.** Some corporate networks block port 22, which git uses to communicate with GitHub over SSH. Instead of using SSH, clone the repo over HTTPS. Use the following command to tell git to always use `https` instead of `git`:

```sh
$ git config --global url."https://".insteadOf git://

# This adds the following to your `~/.gitconfig`:
[url "https://"]
  insteadOf = git://
```

- **You're having trouble installing node.** We recommend using [nvm](https://github.com/creationix/nvm). nvm makes it really easy to use multiple versions of node on the same machine painlessly. After you install nvm, install the latest stable version of node with the following command:

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

- **You can't start the app with `npm start` or `npm start app`.** Make sure you can see a node_modules folder at the root. If you can't you need to run `npm install` from the root of the directory. If that's not the issue, if you've ran the app before but now it's not running, try `npm run kill-db`. We run a small local database on port `3333` and there's some circumstances where it doesn't get killed correctly when you exited the app last time.

## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). If you would like to use this material to conduct your own workshop, please contact us at [hello@reacttraining.com](mailto:hello@reacttraining.com).
