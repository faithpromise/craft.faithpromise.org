Welcome to Craft CMS!
===========================================

Here are some online resources you might find useful:


### Documentation
Installation instructions and much more.
https://craftcms.com/docs


### Changelog

Release notes with bug fixes, improvements and additions.
https://craftcms.com/changelog

### Stack Exchange

A great place to ask your Craft questions, meet the awesome Craft community and earn mad reputation.
https://craftcms.stackexchange.com/

### Development With Docker

The docker compose file utilizes two containers: `php-apache` and `mysql`.

The `mysql` container provides a mechanism to import a sql export when the database is first created.

#### Installation

- [Install Docker](https://docs.docker.com/install) if you haven't already
- `git clone <repository-url>` this repository
- `npm install`

#### SQL

If you would like to start up the application with a database export, perform these steps before running `docker-compose up`.

1. Create this directory `.data/sql`
 - i.e. `mkdir -p .data/sql`
1. Copy a version of the database export sql file to this folder
 - e.g. `.data/sql/export.sql`

#### Running / Development
- `docker-compose up`
- Visit your app at http://localhost:8440.
