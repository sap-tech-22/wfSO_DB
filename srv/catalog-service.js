const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    this.on('OrderStatus', async (req) => {
        console.log(req.data.ID);

        const { SalesOrder } = cds.entities('wfSOstaging.db');
        console.log(SalesOrder);
        try {
        const SODetails = await cds.tx(req).run(
            SELECT.from(SalesOrder).where({
                ID:req.data.ID //'efb19ae6-e9c4-4777-81b8-86bf5011ac4d'
            })
        );
        let message = {};
        console.log(SODetails);
        if (SODetails.length == 0){
            message.text = 'Order ' + req.data.ID + ' is not found';
            return message;
        }
        if (SODetails[0].decisionStatus == 'Approved') {
            message.text = 'Order ' + SODetails[0].ID + ' has been approved with comment \'' + SODetails[0].decisionText + '\'';
            return message;
        } else if (SODetails[0].decisionStatus == 'Rejected') {
            message.text = 'Order ' + SODetails[0].ID + ' has been rejected with comment \'' + SODetails[0].decisionText + '\'';
            return message;
        } else {
            message.text = 'Order ' + SODetails[0].ID + ' is awating approval';
            return message;
        }

        //return JSON.stringify(SODetails);//'Hello';
        } catch (err) {
            console.error(err);
        }

    });
    this.after('READ', 'SalesOrders', (each) => {
        each.totalPrice = each.quantity * each.unitPrice 
        if (each.decisionStatus == null) {each.decisionStatus = 'Pending';}
    });
    // this.on('READ', "SalesOrders", async (req) => {

    //     const SalesOrders = await cds.tx(req).run(req.query);
    //     const SalesOrders_final = [];

    //     console.log(SalesOrders);
        
    //     for (i=0; i<SalesOrders.length; i++)
    //     {
    //         SalesOrders[i].totalPrice = SalesOrders[i].unitPrice * SalesOrders[i].quantity;
    //         SalesOrders_final.push(SalesOrders[i]);                
    //         // if (computers[i].name === 'HP')
    //         // {
    //         //     computers[i].name = Hewlett-Packard;
    //         //     computers_final.push(computers[i])
    //         // }
    //     }
        
    //     return SalesOrders_final;

    // });

    this.before('CREATE', "SalesOrders", (req) => {
        console.log(req.data);
        console.log(req.data.customerID);
        req.data.totalPrice = req.data.unitPrice * req.data.quantity;
    });
});