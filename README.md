# Apatight -

> The Journey to 10K RPS

## Progress
![alt text](https://imgur.com/KySSXKw)
Achieved over 10,000 Request Per Second using only AWS EC2 Micro instances. 
Node Backend + Redis Cache + Postgres DB


## Related Projects

  - https://github.com/Apatight/reviews
  - https://github.com/Apatight/sidebar
  - https://github.com/Apatight/gallery
  - https://github.com/Apatight/proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

Seeding database with MongoDB
```sh
npm run generage:csv
npm run seed:postgres
```

Seeding database with Postgres
```sh
npm run generage:json
npm run seed:mongo
```


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node > 6.13.0

## Development


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```


