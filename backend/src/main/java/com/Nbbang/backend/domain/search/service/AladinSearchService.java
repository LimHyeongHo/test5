package com.Nbbang.backend.domain.search.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AladinSearchService {

    @Value("${aladin.ttb.key}")
    private String ttbKey;

    public Map<String, String> searchBook(String query) {
        RestTemplate restTemplate = new RestTemplate();
        
        // 바코드(숫자 13자리 또는 10자리)인지 확인하여 알라딘 API 엔드포인트를 다르게 설정합니다.
        String url;
        boolean isBarcode = query.matches("^[0-9]{10}$") || query.matches("^[0-9]{13}$");
        
        if (isBarcode) {
            // 바코드로 정확한 책 검색 (ItemLookUp)
            url = "https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey={ttbkey}&ItemIdType=ISBN13&ItemId={query}&output=js&Version=20131101";
        } else {
            // 책 이름으로 키워드 검색 (ItemSearch)
            url = "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey={ttbkey}&Query={query}&QueryType=Keyword&MaxResults=1&start=1&SearchTarget=Book&output=js&Version=20131101";
        }

        try {
            // 강제로 String으로 받아옵니다. (에러가 나든 정상 데이터든 무조건 문자열로 받아서 파싱 에러 방지)
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, null, String.class, ttbKey.trim(), query.trim());
            String responseBody = responseEntity.getBody();
            
            System.out.println("Aladin API URL: " + url);
            System.out.println("Aladin Raw Response: " + responseBody); // 터미널에서 실제 응답 확인용
            
            Map<String, String> result = new HashMap<>();
            
            if (responseBody != null && responseBody.contains("\"item\"")) {
                result.put("title", extractValue(responseBody, "title"));
                result.put("author", extractValue(responseBody, "author"));
                result.put("maker", extractValue(responseBody, "publisher"));
                result.put("brand", ""); 
                result.put("image", extractValue(responseBody, "cover"));
            } else {
                result.put("error", "알라딘 API 결과가 없거나 오류 메시지입니다: " + responseBody);
            }
            return result;
        } catch (Exception e) {
            System.err.println("Aladin API Error: " + e.getMessage());
            Map<String, String> errorResult = new HashMap<>();
            errorResult.put("error", "알라딘 API 연동 오류: " + e.getMessage());
            return errorResult;
        }
    }

    private String extractValue(String json, String key) {
        // 정규식으로 JSON 문자열에서 값을 추출합니다 (ObjectMapper 의존성 문제 회피)
        String patternString = "\"" + key + "\"\\s*:\\s*\"(.*?)\"";
        Pattern pattern = Pattern.compile(patternString);
        Matcher matcher = pattern.matcher(json);
        if (matcher.find()) {
            return matcher.group(1).replace("\\\"", "\"").replace("\\\\", "\\");
        }
        return "";
    }
}
