/**
 * Component Name: Gov UK Header
 * Derived_From_Frontend_Version:v3.13.1
 * Created by: Simon Cook Updated by Neetesh Jain/Brenda Campbell
 **/
import {LightningElement, api, track} from 'lwc';
import {NavigationMixin} from "lightning/navigation";
import HeroImg from '@salesforce/resourceUrl/HeroImg';
export default class nhsHeroBanner extends NavigationMixin(LightningElement) {
    @api heroDescription = "Hero Description";
    @api heroTitle = "Hero Title";

    //Background image stored in static resources for the Hero Banner
    imageUrl = HeroImg;
    get getHeroImg(){
        return `background-image:url("${this.imageUrl}")`;
    }
}
