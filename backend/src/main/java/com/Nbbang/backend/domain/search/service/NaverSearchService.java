package com.Nbbang.backend.domain.search.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NaverSearchService {

    @Value("${naver.client.id}")
    private String clientId;

    @Value("${naver.client.secret}")
    private String clientSecret;

    public Map<String, String> search(String query) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://openapi.naver.com/v1/search/shop.json?query={query}&display=1";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class, query);
            Map<String, String> result = new HashMap<>();
            
            if (response.getBody() != null && response.getBody().containsKey("items")) {
                List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");
                if (!items.isEmpty()) {
                    Map<String, Object> item = items.get(0);
                    // HTML 태그 제거
                    result.put("title", item.get("title").toString().replaceAll("<[^>]*>", ""));
                    result.put("mallName", item.get("mallName") != null ? item.get("mallName").toString() : "");
                    result.put("maker", item.get("maker") != null ? item.get("maker").toString() : "");
                    result.put("brand", item.get("brand") != null ? item.get("brand").toString() : "");
                    result.put("image", item.get("image") != null ? item.get("image").toString() : "");
                }
            }
            return result;
        } catch (Exception e) {
            System.err.println("Naver API Error: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResult = new HashMap<>();
            errorResult.put("error", "Naver API 연동 오류: " + e.getMessage());
            return errorResult;
        }
    }
}
