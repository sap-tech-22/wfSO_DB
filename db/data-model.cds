namespace wfSOstaging.db;

using { managed } from '@sap/cds/common';

entity Product {
    key ID: String(40);
    name: String(255);
    price: Integer;
    stock: Integer;
}

entity Customer {
    key ID: String(40);
    name: String(255);
    city: String(40);
    phone: String(20);
}

entity SalesOrder : managed {
    key ID: UUID @Core.Computed;
    customerID: String(40);
    productID: String(40);
    quantity: Integer;
    unitPrice: Integer;
    totalPrice: Integer;
    decisionStatus: String(10);
    decisionText: String(255);
    processStatus: String(1);
    backendSO: String(20);
}