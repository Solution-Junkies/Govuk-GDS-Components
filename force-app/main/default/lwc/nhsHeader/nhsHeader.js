/**
 * Component Name: Gov UK Header
 * Derived_From_Frontend_Version:v3.13.1
 * Created by: Simon Cook Updated by Neetesh Jain/Brenda Campbell
 **/
import {LightningElement, api, track} from 'lwc';
import {NavigationMixin} from "lightning/navigation";
import communityBasePath from '@salesforce/community/basePath';
import CROWN_LOGO from '@salesforce/resourceUrl/govuklogotypecrown';
import getDefaultMenuItems from '@salesforce/apex/GovComponentHelper.getDefaultMenuItems';

export default class NhsHeader extends NavigationMixin(LightningElement) {
    
    crownLogo = CROWN_LOGO;

    @api headerLabel = "GOV.UK";
    @api headerURL = "#";
    @api serviceName = "Service Name";
    @api serviceURL = "#";
    @api menuLabel = "Menu";
    @api navigationMenuDevName = "Default_Navigation";
    
    @track menuItems = [];
    @track showMenuInMobile = false;

    //Custom label for NHS branding 
    get nhsVariation() {
        return govUKVariationLabel === 'nhs';
    }

    //if no variation exists, return true
    get noVariation() {
        return !this.nhsVariation; // if additional variations are created, they can be included in this check
    }
  
    connectedCallback() {
        getDefaultMenuItems({
            strNavigationMenuDevName: this.navigationMenuDevName
        })
            .then(menuItems => {
                try {
                    // get the page title
                    let urlParts = window.location.href.split("/");
                    let pageTarget = `/${urlParts.pop()}`;
                    pageTarget = pageTarget.split('#')[0];

                    // update the menu item's url for this community's base path and activate the target page menu item
                    menuItems.forEach(menuItem => {
                        menuItem.class = (menuItem.Target === pageTarget) ? "nhsuk-header__navigation-item nhsuk-header__navigation-item--active" : "nhsuk-header__navigation-item";
                        menuItem.fullTarget = (menuItem.Type === "InternalLink") ? (communityBasePath + menuItem.Target) : (menuItem.Target);
                        menuItem.targetPref = (menuItem.Type === "ExternalLink" &&  menuItem.TargetPrefs === "None") ? "_blank"  : "_self";
                    });
                    this.menuItems = menuItems;
                    
                } catch (err) {
                    console.error(err);
                }
            })
            .catch(error => {
                console.error(`Could not load menu items due to ${JSON.stringify(error)}`);
            })
    }

    toggleButton(event) {
        if(this.showMenuInMobile) {
            this.showMenuInMobile = false;
            this.template.querySelector('nav.nhsuk-header__navigation').classList.add('js-show');
        } else {
            this.showMenuInMobile = true;
            this.template.querySelector('nav.nhsuk-header__navigation').classList.remove('js-show');
        }
        
    }

    search(event) {
        event.preventDefault();
        
        let searchTerm = this.template.querySelector('.govuk-search__input').value;
        
        let targetUrl = '/global-search/' + searchTerm;
        // navigate to global search page with search term
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: targetUrl
            }
        });
    }
}