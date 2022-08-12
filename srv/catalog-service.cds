using { wfSOstaging.db as db } from '../db/data-model';

service CatalogService {

    entity Products as projection on db.Product;
    entity Customers as projection on db.Customer;
    // @odata.draft.enabled
    entity SalesOrders as projection on db.SalesOrder;
}