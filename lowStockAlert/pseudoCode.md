# Low-Stock Alert Logic (Pseudocode)

## Trigger Sources
- **Stock Update Event** (real-time check after quantity change)
- **Scheduled Check Job** (periodic check for all products)

## Pseudocode

```
START

IF Trigger_Source == "Stock Update Event" THEN
    product = get_updated_product()
    IF product.quantity <= product.low_stock_threshold THEN
        product.flagged_as_low_stock = TRUE
        send_alert(product)
    ELSE
        product.flagged_as_low_stock = FALSE
    END IF
    save_product_status(product)

ELSE IF Trigger_Source == "Scheduled Check Job" THEN
    products = fetch_all_products()
    FOR each product IN products DO
        IF product.quantity <= product.low_stock_threshold THEN
            product.flagged_as_low_stock = TRUE
            send_alert(product)
        ELSE
            product.flagged_as_low_stock = FALSE
        END IF
        save_product_status(product)
    END FOR
END IF

END
```

## Notes
- **Real-Time Check**: Runs after any stock change (restock, sale, correction).
- **Scheduled Check**: Runs daily/weekly to ensure alerts even without stock updates.
- **Alert Method**: Can be email, in-app notification, or both.
- **Flag Storage**: Save status in DB for UI highlighting and reports.
