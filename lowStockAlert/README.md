# Low Stock Detection Logic - Documentation

This project contains the core logic, design artifacts, and test cases for detecting low-stock products
in an inventory management system. It includes pseudocode, a flowchart, Java implementation, and JUnit tests.

---

## **Files Overview**

### 1. `pseudoCode.md`
- **Purpose**: Contains the pseudocode for low-stock detection logic.
- **Details**:
  - Covers two triggers:
    - **Stock Update Event** (real-time check after quantity change)
    - **Scheduled Check Job** (periodic batch check for all products)
  - Includes logic to:
    - Compare quantity with low-stock threshold
    - Flag low-stock items
    - Send alerts to staff/admin
    - Save status in the database

---

### 2. `flowChart.md`
- **Purpose**: Mermaid syntax flowchart showing low-stock detection process.
- **Details**:
  - Visual representation of both real-time checks and scheduled checks.
  - Helps developers understand the decision-making process.
  - Can be rendered using [Mermaid Live Editor](https://mermaid.live).

---

### 3. `testCases.md`
- **Purpose**: Defines test cases for low-stock detection, including **edge cases**.
- **Details**:
  - Covers normal scenarios and edge cases:
    - Negative stock
    - Threshold equals zero
    - Concurrent updates
    - Stock increases/decreases
  - Structured in a table format with expected results.

---

### 4. `LowStockService.java`
- **Purpose**: Java service containing the low-stock detection logic.
- **Key Method**:
  ```java
  public boolean isLowStock(int quantity, int threshold) {
      return quantity <= threshold;
  }
  ```
- **Notes**:
  - Kept simple for testability.
  - Can be extended to integrate with alert/notification services.

---

### 5. `LowStockServiceTest.java`
- **Purpose**: JUnit 5 test class for `LowStockService`.
- **Details**:
  - Implements all test cases from `low_stock_test_cases.md`.
  - Simulates concurrency for race condition testing.
  - Ensures:
    - Correct flagging for various quantity-threshold combinations.
    - Stability under simulated concurrent updates.

---

