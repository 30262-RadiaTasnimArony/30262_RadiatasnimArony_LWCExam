public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunityController() {
        return [SELECT Id, Name, StageName, CloseDate, Amount,Probability, Expected_Revenue_Overridden__c
        FROM Opportunity
        WHERE CloseDate = THIS_MONTH AND StageName != 'Proposal/Price Quote' AND StageName != 'Negotiation/Review' AND StageName != 'Closed Won' AND StageName'
        WITH USER_MODE];
    }

    @AuraEnabled
    public static void setExpectedRevenue(Id opportunityId) {

        Opportunity opp = [
            SELECT Id,Amount,Probability
            FROM Opportunity
            WHERE Id = :opportunityId
            WITH USER_MODE
        ];

        Decimal expectedRevenue;

        if (opp.Amount != null &&
            opp.Amount > 2000000 &&
            opp.Probability != null &&
            opp.Probability > 50) {

            expectedRevenue = opp.Amount * 0.15;
        }

        else {

            expectedRevenue = opp.Amount * 0.10;
        }

        opp.Expected_Revenue_Overridden__c = expectedRevenue;

        update opp;
}
}
