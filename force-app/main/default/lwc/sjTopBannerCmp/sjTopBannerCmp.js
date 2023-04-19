import { LightningElement, api, wire, track } from 'lwc';

import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id'; //this is how you will retreive the USER ID of current in user.
import NAME_FIELD from '@salesforce/schema/User.Name';

export default class SjTopBannerCmp extends LightningElement {
    @api title = "";
    @api contentHTML = "";
    @api buttonText = "";
    @api buttonLink = "";

    renderedCallback() {
        if(this.initialised) {
            return;
        }
        const htmlElement = this.template.querySelector(".html-element");
        if(htmlElement) {
            htmlElement.innerHTML = this.contentHTML;
            this.initialised = true;
        }
    }

    @track error ;
    @track userName;
    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
           this.error = error ; 
        } else if (data) {
            this.userName = data.fields.Name.value;
        }
    }
}
