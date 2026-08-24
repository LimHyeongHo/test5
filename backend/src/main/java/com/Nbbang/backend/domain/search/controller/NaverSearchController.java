package com.Nbbang.backend.domain.search.controller;

import com.Nbbang.backend.domain.search.service.AladinSearchService;
import com.Nbbang.backend.domain.search.service.NaverSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class NaverSearchController {

    private final NaverSearchService naverSearchService;
    private final AladinSearchService aladinSearchService;

    @GetMapping("/product")
    public ResponseEntity<Map<String, String>> searchProduct(@RequestParam String query, @RequestParam String type) {
        Map<String, String> result;
        if ("BOOK".equals(type)) {
            result = aladinSearchService.searchBook(query);
        } else {
            result = naverSearchService.search(query);
        }
        if (result.containsKey("error")) {
            return ResponseEntity.badRequest().body(result);
        }
        if (result.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }
}
