# Databases

For apps, you can choose to use `json-server` which makes an Express API against a JSON powered database. It gives us a RESTful interface to the JSON file to feel like a real persistency layer.

All you have to do is ensure a `database/db.json` file exists in the root of your project at the time you start the project using `npm start`.

BUT WAIT!

Don't actually make that file. Instead make a `db-seed.json` file which can be used to establish and/or reset your database. When someone does an `npm install`, the `postinstall` script will seek and copy `db-seed.json` files to `db.json`.

You can also run `npm run create-db` which resets ALL `db.json` files from their respective seed files.
