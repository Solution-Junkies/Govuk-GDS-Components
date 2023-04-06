/**
 * Component Name: Gov UK Header
 * Derived_From_Frontend_Version:v3.13.1
 * Created by: Simon Cook Updated by Neetesh Jain/Brenda Campbell
 **/
import {LightningElement, api, track} from 'lwc';
import {NavigationMixin} from "lightning/navigation";

export default class nhsHeroBanner extends NavigationMixin(LightningElement) {
    @api heroDescription = "Hero Description";
    @api heroTitle = "Hero Title";
    @api heroImage = "Hero Image URL";
}
