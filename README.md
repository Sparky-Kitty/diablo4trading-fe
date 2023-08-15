# @sanctuaryteam/web-app

## Pre-requisites

Requires [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/).

## Windows Set Up
Follow this setup guide - [Windows Setup Instructions](https://github.com/SanctuaryTeam/.github/blob/main/profile/SETUP.md)

## Unix Set Up
1. Create a [new GitHub personal access token](https://github.com/settings/tokens/new) with the following scopes:

    ```
    read:packages
    ```

2. Set env variable `SANCTUARYTEAM_AUTH_TOKEN` to the token value. You should run `cp .env.example .env` and modify this new file to store your token.

3. Run
    ```bash
    yarn install
    ```

## Compiles and hot-reloads for development

```bash
yarn dev
```

## Running commands on Docker service

```bash
docker-compose run web-app yarn add my-package --dev
```

## Running dprint

```bash
yarn run format
```
## Adding or updating localizations

1. Add localizations in English using the string templating pattern that is throughout the project
2. Run `yarn lingui:extract` to extract the English words to hashes.
3. Update any localization `.json` files found in `src/modules/common/i18n`, this folder is auto-generated.
4. Once you have updated the `.json` files run `yarn lingui:compile`.
5. Check in the changes in a PR

## Running Tests
After a Unit test execution, a coverage folder will be created. Reports will be displayed in the output.
an HTML copy you can open in a boewser will be located here "coverage/unit/src/index.html"
1. Execute Unit tests
   1. Will run all files with *.test.ts
```bash
yarn run test:unit
```
2. Execute unit tests and provide coverage
   1. After a Unit test execution, a coverage folder will be created.
   2. Reports will be displayed in the output.
   3. An HTML copy you can open in a boewser will be located here "coverage/unit/src/index.html"
```bash
yarn run test:coverage 
```
