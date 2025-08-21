package com.team7.inventorymanagement.it;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TransactionFiltersIT {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(roles = "USER")
    void whenFilterByDateRange_thenReturnTransactionsInRange() throws Exception {
        mockMvc.perform(get("/stock-changes")
                        .param("dateFrom", "2024-08-15")
                        .param("dateTo", "2024-08-21"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[*].id", containsInAnyOrder(1002, 1003)));
    }

    @Test
    @WithMockUser(roles = "USER")
    void whenFilterByAmountRange_thenReturnTransactionsInRange() throws Exception {
        mockMvc.perform(get("/stock-changes")
                        .param("minAmount", "5")
                        .param("maxAmount", "15"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[*].changeAmount", everyItem(greaterThanOrEqualTo(5))))
                .andExpect(jsonPath("$[*].changeAmount", everyItem(lessThanOrEqualTo(15))));
    }

    @Test
    @WithMockUser(roles = "USER")
    void whenFilterByUserId_thenReturnTransactionsForUser() throws Exception {
        mockMvc.perform(get("/stock-changes")
                        .param("userId", "2"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[*].changedBy", everyItem(is(2))));
    }

    @Test
    @WithMockUser(roles = "USER")
    void whenFilterByDateAndAmount_thenReturnMatchingTransaction() throws Exception {
        mockMvc.perform(get("/stock-changes")
                        .param("dateFrom", "2024-08-10")
                        .param("dateTo", "2024-08-15")
                        .param("minAmount", "-10")
                        .param("maxAmount", "0"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(1002)))
                .andExpect(jsonPath("$[0].changeAmount", is(-5)));
    }

    @Test
    @WithMockUser(roles = "USER")
    void whenUsingPagination_thenReturnPaginatedResults() throws Exception {
        mockMvc.perform(get("/stock-changes")
                        .param("page", "0")
                        .param("size", "3")
                        .param("sort", "id,asc"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(3)))
                .andExpect(jsonPath("$.totalPages", is(2)))
                .andExpect(jsonPath("$.totalElements", is(6)))
                .andExpect(jsonPath("$.content[0].id", is(1001)))
                .andExpect(jsonPath("$.content[1].id", is(1002)))
                .andExpect(jsonPath("$.content[2].id", is(1003)));
    }

    @Test
    @WithMockUser(roles = "USER")
    void whenFilterHasNoMatches_thenReturnEmptyList() throws Exception {
        mockMvc.perform(get("/stock-changes")
                        .param("dateFrom", "2025-01-01"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void whenRequestWithoutAuth_thenReturnUnauthorized() throws Exception {
        mockMvc.perform(get("/stock-changes"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isUnauthorized());
    }
}
