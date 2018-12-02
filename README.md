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

## Development

To start the development watch scripts run:
```
$ npm run dev
```

Once you're finished developing, run the build script:

```
$ npm run build
```