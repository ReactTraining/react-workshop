## Migrating to React 18

```sh
# Remove all @reach modules first
npm uninstall @reach/dialog @reach/menu-button @reach/portal

npm install react@rc react-dom@rc
```

Then install these after

```sh
npm i @reach/dialog @reach/menu-button @reach/portal --force
```

Fix all the `ReactDOM` stuff

There are some places where we use `useId` from 18
