# Git
- Pull from the latest develop branch before development
- After completion of development, create a pull request to merge your branch into the develop branch
- Pull request will be required to be reviewed by one other developer and approved before merging 

# Development
## API Server
**Path:** Studio2A/studio-2a/api/studio2a

### Important Commands
- Install Packages: composer install
- Start up server: php -S 127.0.0.1:8000 -t public

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

## FrontEnd Server
**Path:** Studio2A/studio-2a

### Important Commands
- Install Packages: npm install
- Start up server: npm start
- Close server: ctrl+c
