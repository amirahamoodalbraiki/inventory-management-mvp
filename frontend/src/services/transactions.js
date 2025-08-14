// src/services/transactions.js

//  Replace this array later with your API results.
export const MOCK_TRANSACTIONS = [
    { id: 1,  ts: "01/01/2024 10:00", product: "Widget A", delta: +10, reason: "Restock", user: "Emily Carter" },
    { id: 2,  ts: "02/01/2024 12:00", product: "Widget B", delta: -5,  reason: "Sale",    user: "David Lee" },
    { id: 3,  ts: "03/01/2024 14:00", product: "Widget A", delta: -2,  reason: "Sale",    user: "Emily Carter" },
    { id: 4,  ts: "04/01/2024 09:00", product: "Widget C", delta: +20, reason: "Restock", user: "Sophia Clark" },
    { id: 5,  ts: "05/01/2024 11:00", product: "Widget B", delta: +15, reason: "Restock", user: "David Lee" },
    { id: 6,  ts: "06/01/2024 13:00", product: "Widget C", delta: -8,  reason: "Sale",    user: "Sophia Clark" },
    { id: 7,  ts: "07/01/2024 15:00", product: "Widget A", delta: +5,  reason: "Restock", user: "Emily Carter" },
    { id: 8,  ts: "08/01/2024 10:00", product: "Widget B", delta: -3,  reason: "Sale",    user: "David Lee" },
    { id: 9,  ts: "09/01/2024 12:00", product: "Widget C", delta: +12, reason: "Restock", user: "Sophia Clark" },
    { id: 10, ts: "10/01/2024 14:00", product: "Widget A", delta: -1,  reason: "Sale",    user: "Emily Carter" },
  ];
  
  // Small helper to parse "DD/MM/YYYY" (and optional "HH:MM")
  function parseDMY(s) {
    if (!s) return null;
    const [datePart, timePart] = s.trim().split(" ");
    const [d, m, y] = datePart.split("/").map(Number);
    if (!d || !m || !y) return null;
    let hh = 0, mm = 0;
    if (timePart) {
      const [h2, m2] = timePart.split(":").map(Number);
      hh = h2 ?? 0; mm = m2 ?? 0;
    }
    return new Date(y, m - 1, d, hh, mm);
  }
  
  // ✅ Mock service. Later, implement real fetch here and keep the API the same.
  export const transactionsService = {
    // params: { search, from, to }
    async getTransactions(params = {}) {
      const { search = "", from = "", to = "" } = params;
  
      // In the mock we filter locally so your UI works like an API.
      const q = search.trim().toLowerCase();
      const fromDate = parseDMY(from);
      let toDate = parseDMY(to);
      if (toDate) toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 23, 59, 59, 999);
  
      return MOCK_TRANSACTIONS.filter((t) => {
        const hay = `${t.product} ${t.reason} ${t.user} ${t.ts}`.toLowerCase();
        if (q && !hay.includes(q)) return false;
  
        const tDate = parseDMY(t.ts);
        if (fromDate && tDate < fromDate) return false;
        if (toDate && tDate > toDate) return false;
        return true;
      });
    },
  };