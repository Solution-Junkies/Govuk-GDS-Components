# Gov UK GDS UI Components

A repository of UK government GDS UI components in SFDX format


## How to use this repository

You will need the latest version of the sfdx cli (https://developer.salesforce.com/tools/sfdxcli) and a hub org configured.  This repository is designed to be deployed to a Scratch Org.  It is possible to create the sfdx components into org metadata and deploy using the sfdx cli to a non-scratch org.  Please see the documentation for deploying metadata using sfdx (https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_mdapi.htm).


## Getting started

Download or clone this repository to your local machine


## Create your scratch org

 - Open your terminal and navigate to the repositories base directory.
 - Make sure the scripts are executable (chmod +x scripts/*.sh)
 - run scripts/createScrachOrg.sh
 - Wait for the scratch org to build


## Create the GDS experience cloud
 
 - run scripts/createCommunity.sh
 - Wait for the community to build (you can run the command listed in the output of the previous command to check the status)
 - It should take no longer than 1 min to create the community


## Deploy your source code

 - run scripts/deploySource.sh
 - Wait for the command to complete


## Deploy your source code

 - run scripts/publishCommunity.sh
 - Wait for the command to complete


## Open your org

 - run scripts/openOrg.sh
 - The org will now open in your default browser window
 - Goto Setup -> All Communities to see the GDS Demo Community


## Configure Navigation (optional)
 
If you would like the Juggling license application page to appear in the main header bar as a navigatable page option then you'll need to add the page to the default community menu.

To do this:

 - Open the Experience Builder
 - Open the Settings menu (Clog on theleft-hand side of the page)
 - Select Navigation
 - Click the down arrow menu on the right and select Edit
 - Click Add Menu Item
 - Name Juggling license
 - Type Community Page
 - Page Juggling license
 - Check Publically available
 - Click Save Menu
