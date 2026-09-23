import { LightningElement, wire } from 'lwc';

import getOpportunityController from '@salesforce/apex/OpportunityController.getOpportunityController'

import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class HandleSituation extends LightningElement {
    @wire(getOpportunityController)
    wiredOppsResult;

    get opportunityList() {
    return this.wiredOppsResult?.data || [];
    }

    
    async handleProcessRevenue(event) {
        const selectedOppId = event.target.dataset.id;
        try {
            await setExpectedRevenueLogic({ oppId: selectedOppId });

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Expected Revenue updated successfully',
                    variant: 'success'}))

            await refreshApex(this.wiredOppsResult);
        } 
        catch (error) {
            console.error('Database process failed:', error.body.message);
        }
    }

    NavigationMixin= NavigationMixin(LightningElement)this[NavigationMixin.Navigate]({
        type: '',
        attributes: {
        objectApiName: 'Opportunity',
        actionName: 'Home_page'
        }
        });


    }
    