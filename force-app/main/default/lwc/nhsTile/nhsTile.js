/**
 * Component Name: NHS UK Home Tile 
 **/
import {LightningElement, api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class nhsTile extends NavigationMixin(LightningElement) {
    @api label;
    @api tileType = 'Title';
    @api tileTypeWrapperClass = "";
    @api pageType;
    @api link;
    @api objectName;
    @api filterObjectName;
    @api tileTextColour = 'Default';
    @track tileClass = "govuk-tile";

    @api isContentType = false;

    connectedCallback(){   
        if(this.tileTextColour.toUpperCase() === 'GREY') {
            this.tileClass += " govuk-tile--grey";
        } else if(this.tileTextColour.toUpperCase() === 'GREEN') {
            this.tileClass += " govuk-tile--green";
        } else if(this.tileTextColour.toUpperCase() === 'TURQUOISE') {
            this.tileClass += " govuk-tile--turquoise";
        } else if(this.tileTextColour.toUpperCase() === 'BLUE') {
            this.tileClass += " govuk-tile--blue";
        } else if(this.tileTextColour.toUpperCase() === 'PURPLE') {
            this.tileClass += " govuk-tile--purple";
        } else if(this.tileTextColour.toUpperCase() === 'LIGHT BLUE') {
            this.tileClass += " govuk-tile--light-blue";
        } else if(this.tileTextColour.toUpperCase() === 'LIGHT PURPLE') {
            this.tileClass += " govuk-tile--light-purple";
        } else if(this.tileTextColour.toUpperCase() === 'PINK') {
            this.tileClass += " govuk-tile--pink";
        } else if(this.tileTextColour.toUpperCase() === 'DARK PINK') {
            this.tileClass += " govuk-tile--dark-pink";
        } else if(this.tileTextColour.toUpperCase() === 'LIGHT PINK') {
            this.tileClass += " govuk-tile--light-pink";
        } else if(this.tileTextColour.toUpperCase() === 'RED') {
            this.tileClass += " govuk-tile--red";
        } else if(this.tileTextColour.toUpperCase() === 'ORANGE') {
            this.tileClass += " govuk-tile--orange";
        } else if(this.tileTextColour.toUpperCase() === 'YELLOW') {
            this.tileClass += " govuk-tile--yellow";
        } else {
            this.tileClass += "";
        }

        if(this.tileType.toUpperCase() === 'TITLE') {
            this.tileClass += " govuk-tile_type--title";
            this.isContentType = false;
        } else if(this.tileType.toUpperCase() === 'CONTENT') {
            this.tileClass += " govuk-tile_type--content";
            this.isContentType = true;
        }

        this.tileType.toUpperCase() === 'CONTENT'? this.tileTypeWrapperClass += "govuk-grid-row": this.tileTypeWrapperClass += "";
        
    }

    handleClick(event) {
        event.preventDefault();

        if(this.pageType=='ObjectList') {
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: this.objectName,
                    actionName: 'list'
                },
                state: {
                    filterName: this.filterObjectName
                }
            });

        } else if(this.pageType=='Community') {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: this.link
                },
                state: {
                }
            });
        }
    }

    hovered(event) {
        this.template.querySelector('.tile-content-arrow').classList.add('tile-content-arrow--hovered');
    }

    notHovered(event) {
        this.template.querySelector('.tile-content-arrow').classList.remove('tile-content-arrow--hovered');
    }
}