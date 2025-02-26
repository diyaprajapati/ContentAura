package com.ContentAura.cms_service.api_request;

import com.ContentAura.cms_service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class ApiAnalyticsController {
    private final ApiRequestRepository repository;
    private final UserService userService;

    @GetMapping("/recent")
    public ResponseEntity<List<ApiRequest>> getRecentApiRequests() {
        // Get current logged-in user's ID
        Integer userId = getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Fetch only requests for the current user
        List<ApiRequest> recentRequests = repository.findTop10ByUserIdOrderByTimestampDesc(userId);
        return ResponseEntity.ok(recentRequests);
    }

    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> getUserApiOverview() {
        // Get current logged-in user's ID
        Integer userId = getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        LocalDateTime now = LocalDateTime.now();

        // Create result containers
        List<Map<String, Object>> weeklyData = new ArrayList<>();
        List<Map<String, Object>> monthlyData = new ArrayList<>();
        List<Map<String, Object>> yearlyData = new ArrayList<>();

        // Get weekly data (past 7 days)
        for (int i = 6; i >= 0; i--) {
            LocalDate date = now.toLocalDate().minusDays(i);
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.plusDays(1).atStartOfDay().minusNanos(1);

            long count = repository.countByUserIdAndTimestampBetween(
                    userId, startOfDay, endOfDay);

            Map<String, Object> dayData = new HashMap<>();
            dayData.put("date", date.toString());
            dayData.put("count", count);
            weeklyData.add(dayData);
        }

        // Get monthly data (past 12 months)
        for (int i = 11; i >= 0; i--) {
            YearMonth month = YearMonth.from(now.toLocalDate()).minusMonths(i);
            LocalDateTime startOfMonth = month.atDay(1).atStartOfDay();
            LocalDateTime endOfMonth = month.atEndOfMonth().plusDays(1).atStartOfDay().minusNanos(1);

            long count = repository.countByUserIdAndTimestampBetween(
                    userId, startOfMonth, endOfMonth);

            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", month.getMonth().getDisplayName(TextStyle.FULL, Locale.getDefault()));
            monthData.put("count", count);
            monthlyData.add(monthData);
        }

        // Get yearly data (past 5 years)
        for (int i = 4; i >= 0; i--) {
            int year = now.getYear() - i;
            LocalDateTime startOfYear = LocalDate.of(year, 1, 1).atStartOfDay();
            LocalDateTime endOfYear = LocalDate.of(year, 12, 31).plusDays(1).atStartOfDay().minusNanos(1);

            long count = repository.countByUserIdAndTimestampBetween(
                    userId, startOfYear, endOfYear);

            Map<String, Object> yearData = new HashMap<>();
            yearData.put("year", String.valueOf(year));
            yearData.put("count", count);
            yearlyData.add(yearData);
        }

        // Calculate total count
        long totalCount = repository.countByUserId(userId);

        // Build the complete response
        Map<String, Object> overview = new HashMap<>();
        overview.put("weekly", weeklyData);
        overview.put("monthly", monthlyData);
        overview.put("yearly", yearlyData);
        overview.put("total", totalCount);

        return ResponseEntity.ok(overview);
    }

    /**
     * Helper method to get the current authenticated user's ID
     */
    private Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return null;
        }

        try {
            String email = authentication.getName();
            return userService.getUserIdByEmail(email);
        } catch (Exception e) {
            // Failed to get ID from email
            return null;
        }
    }
}