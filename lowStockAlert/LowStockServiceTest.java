import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

class LowStockServiceTest {
    private final LowStockService lowStockService = new LowStockService();

    @Test
    @DisplayName("TC01: Quantity above threshold → Not flagged")
    void testQuantityAboveThreshold() {
        assertFalse(lowStockService.isLowStock(15, 10));
    }

    @Test
    @DisplayName("TC02: Quantity equals threshold → Flagged")
    void testQuantityEqualsThreshold() {
        assertTrue(lowStockService.isLowStock(10, 10));
    }

    @Test
    @DisplayName("TC03: Quantity below threshold → Flagged")
    void testQuantityBelowThreshold() {
        assertTrue(lowStockService.isLowStock(5, 10));
    }

    @Test
    @DisplayName("TC04: Zero quantity → Flagged")
    void testZeroQuantity() {
        assertTrue(lowStockService.isLowStock(0, 5));
    }

    @Test
    @DisplayName("TC05: Negative quantity → Flagged")
    void testNegativeQuantity() {
        assertTrue(lowStockService.isLowStock(-3, 5));
    }

    @Test
    @DisplayName("TC06: Threshold zero, quantity above zero → Not flagged")
    void testThresholdZeroQuantityAboveZero() {
        assertFalse(lowStockService.isLowStock(5, 0));
    }

    @Test
    @DisplayName("TC07: Threshold zero, quantity equals zero → Flagged")
    void testThresholdZeroQuantityZero() {
        assertTrue(lowStockService.isLowStock(0, 0));
    }

    @Test
    @DisplayName("TC08: Threshold zero, quantity negative → Flagged")
    void testThresholdZeroQuantityNegative() {
        assertTrue(lowStockService.isLowStock(-1, 0));
    }

    @Test
    @DisplayName("TC09: Concurrent updates → Must handle correctly")
    void testConcurrentUpdates() throws InterruptedException {
        final int initialQuantity = 12;
        final int threshold = 5;

        // Simulating two threads updating stock
        final int[] quantity = {initialQuantity};
        Thread t1 = new Thread(() -> quantity[0] -= 3);
        Thread t2 = new Thread(() -> quantity[0] -= 10);

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        assertTrue(lowStockService.isLowStock(quantity[0], threshold),
                   "Final quantity should be flagged low-stock after concurrent updates");
    }

    @Test
    @DisplayName("TC10: Stock increase above threshold after being flagged → Not flagged")
    void testRestockAboveThreshold() {
        assertFalse(lowStockService.isLowStock(8, 5));
    }

    @Test
    @DisplayName("TC11: Stock decrease below threshold after being safe → Flagged")
    void testDecreaseBelowThreshold() {
        assertTrue(lowStockService.isLowStock(4, 5));
    }
}
