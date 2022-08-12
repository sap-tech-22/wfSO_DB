const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    this.after('READ', 'SalesOrders', (each) => each.totalPrice = each.quantity * each.unitPrice );
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