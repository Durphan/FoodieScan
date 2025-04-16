package com.menuproject.menuproject.dto.response.business;

public record BusinessResponseDto(String name, String phoneNumber, String email, Long idBusiness) {
        public BusinessResponseDto(String name, String phoneNumber, String email) {
                this(name, phoneNumber, email, null);
        }
}
