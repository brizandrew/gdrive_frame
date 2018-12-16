# GDrive Frame

An app to create a slideshow out of a Google Drive folder.

## Installation

Copy the `.env` template and fill it out. 

```
$ cp .env.template .env
```

## Usage

To download all the images shared with the service account specified in the `.env` file run the following:

```
$ npm run start
```

This whill save images to the `downloads` directory by default.

To use this is part of a larger app you can import it and run it, passing the desired output directory as the only argument.

```javascript
import gdrive from "./path/to/gdrive_frame"; // ES6 Imports
const gdrive = require("./path/to/gdrive_frame").default // CommonJS;

gdrive("path/to/downloads");
```

## Development

To start the development watch scripts run:
```
$ npm run dev
```

Once you're finished developing, run the build script:

```
$ npm run build
```