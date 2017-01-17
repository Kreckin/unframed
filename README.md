[![Stories in Ready](https://badge.waffle.io/Kreckin/unexpectedpony.png?label=ready&title=Ready)](https://waffle.io/Kreckin/unexpectedpony)
# Unframed

> A react-native app to find and post nearby street art. 

## Team

  - __Product Owner__: Kelly Braun
  - __Scrum Master__: Kevin Sheehy
  - __Development Team Members__: Robin Dykema, Casey Billman, Ethan Fourie

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Contributing](#contributing)

## Requirements

General:  
- Node
- React-native

iOS:  
- XCode
- Cocoapods

Android:  
- Android Studio

## Development
### Installing Dependencies

From within the root directory:

```sh
npm install
```

Installing iOS dependencies:

Run the following command within the `client/ios/` directory:  
```sh
pod install
```

#### Running the database and server:

1. Install [docker](https://www.docker.com/products/overview).

1. Start the neo4j/spatial container

```sh
docker run \
  -d \
  --publish=7474:7474 --publish=7687:7687 \
  --volume=$HOME/neo4j/data:/data \
  --volume=$HOME/neo4j/logs:/logs \
  --name=DB \
  klaw/neo4j-spatial
```

This will:
 - run the container in the background
 - expose ports 7474 and 7687 which are used to connect to the database
 - use the designated files for data and logs
 - name the container 'DB'
 - use the image `klaw/neo4j-spatial` image - it will download the image if it is not found on your computer

Note: if this is your first time running with this directory you will need to log into the database, change the default password, and update config.js with this information.

Other usefull docker commands:
`docker ps`  - show running containers
`docker ps -a` - show all containers
`docker stop DB` - stop the 'DB' container
`docker start DB` - start the 'DB' container

1. Start the server

From within the server directory
 `npm start`

### Roadmap

View the project roadmap [here](https://github.com/Kreckin/unexpectedpony/issues)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
