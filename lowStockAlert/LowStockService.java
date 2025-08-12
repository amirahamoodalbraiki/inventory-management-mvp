@Service
public class LowStockService {
    public boolean isLowStock(int quantity, int threshold) {
        return quantity <= threshold;
    }
}
