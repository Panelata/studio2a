# Git
## Getting started (terminal)
- In terminal cd to the folder where you want the project cloned and run `git clone https://github.com/Panelata/studio2a.git`
- Go into the cloned folder `cd studio2a`
- Run `git init`

## Adding changes
- Make sure you are branching from the latest code by pulling from the latest develop branch before development with `git checkout develop` and `git pull develop`
- Create a new branch: follow the structure "initials-branchName" | E.g. `git checkout -b hl-newBranch`
- Add your changes with `git add .`
- Commit your changes with `git commit -m "Add your reason for the changes here"`
- Push your changes to your github branch with `git push`
- If this is the first push to that branch copy the command it gives you e.g `git push --set-upstream origin h1-newBranch` 
- After completion of development, create a pull request on GitHub to merge your branch into the develop branch
- Pull request will be required to be reviewed by one other developer and approved before merging 

# Development
## API Server
**Path:** Studio2A/studio-2a/api/studio2a

### Important Commands
- Install Packages: composer install
- Start up server: php -S 127.0.0.1:8000 -t public
- Create new database migration: `php artisan make:migration create_name_table`
- Run database migration scripts: `php artisan migrate`

## FrontEnd Server
**Path:** Studio2A/studio-2a

### Important Commands
- Install Packages: `npm install`
- Start up server: `npm start`
- Close server: ctrl+c

## Setup DB Connection
Update **DB_DATABASE**, **DB_USERNAME**, **DB_PASSWORD** to match your MYSQL Server

**Example .env**

<sub>
APP_NAME=Lumen
  
APP_ENV=local

APP_KEY=

APP_DEBUG=true

APP_URL=http://localhost

APP_TIMEZONE=UTC

<br/>
  
LOG_CHANNEL=stack

LOG_SLACK_WEBHOOK_URL=
  

<br/>
  

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=studio2a

DB_USERNAME=root

DB_PASSWORD="studio2a"

CACHE_DRIVER=file

QUEUE_CONNECTION=sync
  
</sub>
